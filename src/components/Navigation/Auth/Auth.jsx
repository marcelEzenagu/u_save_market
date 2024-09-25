import React, { useState, useRef, useEffect } from "react";
import Profilecircle from "../../../assets/images/nav/icons/profilecircle.webp";
import icon1 from "../../../assets/images/auth/1.webp";
import icon2 from "../../../assets/images/auth/3.webp";
import icon3 from "../../../assets/images/auth/2.webp";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal } from "../../../features/auth/authSlice";
import { useLocation } from "react-router-dom";
import RegisterModal from "./components/RegisterModal";
import ForgetPasswordModal from "./components/ForgetPasswordModal";
import LoginModel from "./components/LoginModel";
import OtpModal from "./components/OtpModal";
import ResetPasswordModal from "./components/ResetPasswordModal";
const CurrentTab = ({
  activeTab,
  handleToggle,
  onClose,
  setVerifiedDetails,
  verifiedDetails,
}) => {
  switch (activeTab) {
    case "login":
      return <LoginModel handleToggle={handleToggle} onClose={onClose} />;
    case "signup":
      return <RegisterModal handleToggle={handleToggle} onClose={onClose} />;
    case "Forget Password":
      return (
        <ForgetPasswordModal
          handleToggle={handleToggle}
          onClose={onClose}
          setVerifiedDetails={(e)=>{setVerifiedDetails(e)}}
        />
      );
    case "Enter OTP":
      return (
        <OtpModal
          handleToggle={handleToggle}
          onClose={onClose}
          verifiedDetails={verifiedDetails}
          setVerifiedDetails={(e)=>{setVerifiedDetails(e)}}
        />
      );
    case "Reset Password":
      return <ResetPasswordModal 
      handleToggle={handleToggle}
        onClose={onClose}
       verifiedDetails={verifiedDetails}
      setVerifiedDetails={(e)=>{setVerifiedDetails(e)}} />;
    default:
      return null;
  }
};

const Modal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const dropdownRef = useRef(null);
  const [verifiedDetails, setVerifiedDetails] = useState({});
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
        setActiveTab('login');
        setVerifiedDetails({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleToggle = (tab) => {
    setActiveTab(tab);
  };



  return (
    isOpen && (
      <div className="fixed inset-0 bg-black w-full bg-opacity-75 flex justify-center items-center z-50">
        <div
          className="bg-regal-auth-bg-color p-4 md:py-12 md:p-8 rounded-2xl overflow-hidden max-w-lg md:max-w-[600px] w-full  z-52 relative animated fadeInDown"
          ref={dropdownRef}
        >
          <img
            src={icon1}
            alt=""
            className="absolute top-0 right-0 z-10 object-contain"
          />
          <img
            src={icon2}
            alt=""
            className="absolute right-0 top-1/2 transform -translate-y-1/2  object-contain"
          />
          <img
            src={icon3}
            alt=""
            className="hidden md:absolute bottom-0 right-0 object-contain z-10"
          />
          <h2 className=" text-[10px]  md:text-xl font-bold text-regal-blue mb-4">
            {activeTab === "login" || activeTab === "signup"
              ? "Log in or Sign up"
              : activeTab}
          </h2>

          <CurrentTab
            activeTab={activeTab}
            handleToggle={handleToggle}
            onClose={onClose}
            verifiedDetails={verifiedDetails}
            setVerifiedDetails={(e)=>{setVerifiedDetails(e)}}
          />
        </div>
      </div>
    )
  );
};



function AuthModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const loginModal = useSelector((state) => state.auth.loginModal);
  const dispatch = useDispatch();

  // Check location state to open modal on initial render if applicable
  useEffect(() => {
    if (location.state?.loginModel) {
      dispatch(setLoginModal(true));
    }
  }, [location.state, dispatch]);

  // Sync local state with Redux state
  useEffect(() => {
    setIsModalOpen(loginModal);
  }, [loginModal]);

  // Close modal
  const onClose = () => {
    dispatch(setLoginModal(false)); 
  };

  // Open modal
  const onOpen = () => {
    dispatch(setLoginModal(true)); 
  };

  return (
    <>
      <button
        className="flex items-center hover:text-regal-blue text-[10px] md:text-sm text-regal-black cursor-pointer font-[500]"
        onClick={onOpen}
      >
        <img src={Profilecircle} alt="" className="w-7 md:w-6 mr-1 xl:mr-2" />
        <span className="hidden lg:block">Login / Signup</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={onClose} />
    </>
  );
}

export default AuthModal;
