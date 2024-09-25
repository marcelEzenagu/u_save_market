import React, { useState, useRef, useEffect } from "react";
import { countries } from "../../../data/mockData"; // Assume you have a list of countries
import Profilecircle from "../../../assets/images/nav/icons/profilecircle.webp";
import Googleicon from "../../../assets/images/auth/google.png";
import Facebookicon from "../../../assets/images/auth/facebook.png";
import icon1 from "../../../assets/images/auth/1.webp";
import icon2 from "../../../assets/images/auth/3.webp";
import icon3 from "../../../assets/images/auth/2.webp";
import { SlArrowDown } from "react-icons/sl";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "../../../features/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCookie } from "../../../utils";
import { setCredentials, setLoginModal, setCountry, setCurrency } from "../../../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";


const Modal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(true);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleToggle = () => {
    setActiveTab(!activeTab);
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
            Log in or Sign up
          </h2>
          {activeTab ? (
            <LoginModel
              handleToggle={handleToggle}
              onClose={() => {
                onClose();
              }}
            />
          ) : (
            <RegisterModel
              handleToggle={handleToggle}
              onClose={() => {
                onClose();
              }}
            />
          )}
        </div>
      </div>
    )
  );
};
const RegisterModel = (props) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [RegisterUser, { isLoading }] = useRegisterUserMutation();
  const [errorMessagesList, setErrorMessagesList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
    eye: false,
    eyeConfirm: false,
  });
  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpenSelect(false); // Close dropdown after selection
  };
  useEffect(() => {
    setErrMsg("");
  }, [data.email, data.password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setErrorMessagesList([]);
    try {
      const userData = await RegisterUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phone,
      }).unwrap();
      dispatch(
        setCredentials({
          accessToken: userData?.access_data?.token,
          user: userData?.user,
          role: userData?.access_data?.role,
        })
      );
      setData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        terms: false,
        eye: false,
        eyeConfirm: false,
      });
      setCookie("accessToken", userData?.access_data?.token);
      props.onClose();
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err?.status === 200) {
        return;
      } else if (err?.status >= 400) {
        setErrorMessagesList(err?.data?.message);
      } else if (err?.status >= 401 && err?.status <= 404) {
        setErrMsg(err?.data?.message);
      } else if (err?.status >= 500) {
        setErrMsg("Register failed");
      } else {
        setErrMsg("Register failed");
      }
    }
  };
  const handleChange = (e) => {
    const newData = Object.assign({}, data, {
      [e.target.name]: e.target.value,
    });
    setData(newData);
  };
  const handleErrorMessagesList = (key) => {
    if (errorMessagesList[0]?.field) {
      let message = errorMessagesList.filter((e) =>
        e?.field.toLowerCase().includes(key.toLowerCase())
      );
      return (
        <div className="mt-2">
          {message.map((e) => (
            <p className="text-red-600 text-xs" key={e}>
              {e?.message.replaceAll("Path ", "").replaceAll("`", "")}
            </p>
          ))}
        </div>
      );
    } else if (typeof errorMessagesList === "string") {
      return (
        <div className="mt-2">
          <p className="text-red-600 text-xs">
            {errorMessagesList.toLowerCase().includes(key.toLowerCase()) &&
              errorMessagesList.replaceAll(",", " ")}
          </p>
        </div>
      );
    } else {
      let message = errorMessagesList.filter((e) =>
        e.toLowerCase().includes(key.toLowerCase())
      );
      return (
        <div className="mt-2">
          {message.map((e) => (
            <p className="text-red-600 text-xs" key={e}>
              {e}
            </p>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="max-w-[400px]  animate-fade-in">
      <div className="relative w-full mt-4 z-10">
        <button className="w-full rounded-full  bg-white border text-[10px] md:text-sm font-[700] py-3 ">
          Continue with Google
        </button>
        <img src={Googleicon} alt="" className="absolute top-2 md:top-3 left-4" />
      </div>
      <div className="relative w-full mt-3 z-10">
        <button className="w-full rounded-full  bg-white borde text-[10px] md:text-sm font-[700] py-3 ">
          Continue with Facebook
        </button>
        <img src={Facebookicon} alt="" className="absolute  top-2 md:top-3" />
      </div>
      <div className="flex flex-row items-center my-2 md:my-4">
        <hr className="w-full border-b-[1px]" />
        <span className="mx-2 font-[500] text-regal-crum-gray   text-[10px] md:text-sm ">or</span>
        <hr className="w-full border-b-[1px]" />
      </div>

      <div>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block  text-[10px] md:text-sm font-[700]  leading-6 mb-2 text-regal-black"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={data.firstName}
            placeholder="Enter first name"
            className="w-full p-3  text-[10px] md:text-sm border  focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
          />
          {handleErrorMessagesList("firstName")}
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block  text-[10px] md:text-sm font-[700]  leading-6 mb-2 text-regal-black"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={data.lastName}
            placeholder="Enter last name"
            className="w-full p-3  text-[10px] md:text-sm border  focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
          />
          {handleErrorMessagesList("lastName")}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block  text-[10px] md:text-sm font-[700]  leading-6 mb-2 text-regal-black"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={data.email}
            placeholder="Enter Email"
            className="w-full p-3  text-[10px] md:text-sm border  focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
          />
          {handleErrorMessagesList("email")}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block  text-[10px] md:text-sm font-[700]  leading-6 mb-2 text-regal-black"
          >
            Phone
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* <span className="text-gray-500 sm: text-[10px] md:text-sm">$</span> */}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <div className="relative">
                {/* Dropdown button */}
                <button
                  type="button"
                  onClick={() => setIsOpenSelect(!isOpenSelect)}
                  className="w-full flex justify-between items-center border-none  rounded-md px-4 py-2 bg-transparent text-gray-700"
                >
                  {selectedCountry ? (
                    <div className="flex items-center  text-[10px] md:text-sm">
                      <img
                        src={selectedCountry.flag}
                        alt="flag"
                        className="w-6 h-4 mr-2"
                      />
                      {selectedCountry.number}
                    </div>
                  ) : (
                    "Select a country"
                  )}

                  <SlArrowDown className="ml-1" />
                </button>

                {/* Dropdown menu */}
                {isOpenSelect && (
                  <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
                    {countries.map((country, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelect(country)}
                        className="flex items-center  text-[10px] md:text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="w-6 h-4  mr-2"
                        />
                        {country.number}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={data.phone}
              className="w-full py-3 pl-28  text-[10px] md:text-sm border rounded-sm bg-transparent text-regal-crum-gray focus:outline-none"
              placeholder="Phone"
            />
          </div>
          {handleErrorMessagesList("phoneNumber")}
        </div>
        <div className="mb-6">
          <label
            htmlFor="Password"
            className="block  text-[10px] md:text-sm font-[600]  leading-6 mb-2 text-regal-black"
          >
            Password
          </label>
          <div className=" relative">
            <input
              type={data?.eye ? "text" : "password"}
              name="password"
              id="password"
              onChange={handleChange}
              value={data.password}
              placeholder="Enter password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              className="w-full p-3  text-[10px] md:text-sm border  focus:outline-regal-blue focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
              {data?.eye ? (
                <AiOutlineEyeInvisible
                  size={20}
                  className="text-regal-light-gray"
                  onClick={() => setData({ ...data, eye: !data.eye })}
                />
              ) : (
                <AiOutlineEye
                  size={20}
                  className="text-regal-light-gray"
                  onClick={() => setData({ ...data, eye: !data.eye })}
                />
              )}
            </div>
          </div>

          {handleErrorMessagesList("password")}
        </div>

        <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
        <div className="flex flex-row gap-4">
        <button
          className="py-2 px-6  text-[10px] md:text-lg active:scale-95 text-white rounded-md bg-regal-sky-blue"
          onClick={(e) => {
            handleSubmit(e);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>

        <button className="block md:hidden text-regal-sky-blue text-xs" 
          onClick={()=>{
            props.onClose();
          }}
        >
          Close
        </button>
        </div>
     

        <h5 className="text-regal-black   z-50 text-[10px] md:text-sm font-[500] text-center mt-4">
          Already have an account?{" "}
          <button className="underline z-50 " onClick={props.handleToggle}>
            Log In
          </button>
        </h5>
      </div>
    </div>
  );
};
const LoginModel = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    eye: false,
  });
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [errorMessagesList, setErrorMessagesList] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setErrorMessagesList([]);
    try {
      const value = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      const userData = value.response;
      dispatch(
        setCredentials({
          accessToken: userData?.access_data?.
          access_token
          ,
          user: userData?.user,
          role: userData?.access_data?.role,
        })
      );
      if (userData?.user?.preferredCountry){
        const country = countries.find((i)=> i.name.toLowerCase() === userData?.user?.preferredCountry.toLowerCase());
        if (country) {
          dispatch(setCountry(country))
          dispatch(setCurrency(country))
        }
      }
      setCookie("accessToken", userData?.access_data?.access_token);
      props.onClose();
      setData({
        email: "",
        password: "",
        eye: false,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err?.status === 200) {
        return;
      } else if (err?.status >= 400) {
        setErrorMessagesList(err?.data?.message);
      } else if (err?.status >= 401 && err?.status <= 404) {
        setErrMsg(err?.data?.message);
      } else if (err?.status >= 500) {
        setErrMsg("Login failed");
      } else {
        setErrMsg("Login failed");
      }
    }
  };
  const handleChange = (e) => {
    const newData = Object.assign({}, data, {
      [e.target.name]: e.target.value,
    });
    setData(newData);
  };

  const handleErrorMessagesList = (key) => {
    if (errorMessagesList[0]?.field) {
      let message = errorMessagesList.filter((e) =>
        e?.field.toLowerCase().includes(key.toLowerCase())
      );
      return (
        <div className="mt-2">
          {message.map((e) => (
            <p className="text-red-600 text-xs" key={e}>
              {e?.message.replaceAll("Path ", "").replaceAll("`", "")}
            </p>
          ))}
        </div>
      );
    } else if (typeof errorMessagesList === "string") {
      return (
        <div className="mt-2">
          <p className="text-red-600 text-xs">
            {errorMessagesList.toLowerCase().includes(key.toLowerCase()) &&
              errorMessagesList.replaceAll(",", " ")}
          </p>
        </div>
      );
    } else {
      let message = errorMessagesList.filter((e) =>
        e.toLowerCase().includes(key.toLowerCase())
      );
      return (
        <div className="mt-2">
          {message.map((e) => (
            <p className="text-red-600 text-xs" key={e}>
              {e}
            </p>
          ))}
        </div>
      );
    }
  };
  return (
    <div className="max-w-[400px]">
       <div className="relative w-full mt-4 z-10">
        <button className="w-full rounded-full  bg-white border text-[10px] md:text-sm font-[700] py-3 ">
          Continue with Google
        </button>
        <img src={Googleicon} alt="" className="absolute top-2 md:top-3 left-4" />
      </div>
      <div className="relative w-full mt-3 z-10">
        <button className="w-full rounded-full  bg-white border text-[10px] md:text-sm font-[700] py-3 ">
          Continue with Facebook
        </button>
        <img src={Facebookicon} alt="" className="absolute  top-2 md:top-3" />
      </div>
      <div className="flex flex-row items-center my-2 md:my-4">
        <hr className="w-full border-b-[1px]" />
        <span className="mx-2 font-[500] text-regal-crum-gray  text-[10px]  md:text-sm ">or</span>
        <hr className="w-full border-b-[1px]" />
      </div>

      <div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block  text-[10px] md:text-sm font-[700]  leading-6 mb-2 text-regal-black"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={data.email}
            placeholder="Enter Email"
            className="w-full p-3  text-[10px] md:text-sm border  focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
          />
               {handleErrorMessagesList("email")}
        </div>

        <div className="mb-6">
          <label
            htmlFor="Password"
            className="block  text-[10px] md:text-sm font-[500]  leading-6 mb-2 text-regal-black"
          >
            Password
          </label>
          <div className="mb-4 relative">
            <input
              type={data.eye ? "text" : "password"}
              name="password"
              id="Password"
              onChange={handleChange}
              value={data.password}
              placeholder="Enter Password"
              className="w-full p-3  text-[10px] md:text-sm border  focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
              {data.eye ? (
                <AiOutlineEyeInvisible
                  size={20}
                  className="text-regal-light-gray"
                  onClick={() => setData({ ...data, eye: !data.eye })}
                />
              ) : (
                <AiOutlineEye
                  size={20}
                  className="text-regal-light-gray"
                  onClick={() => setData({ ...data, eye: !data.eye })}
                />
              )}
            </div>
          </div>
          {handleErrorMessagesList("password")}
        </div>
        <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
        <div className="flex flex-row items-center gap-2">
        <button
          className="py-2 px-6  text-[10px] md:text-lg active:scale-95 text-white rounded-md bg-regal-sky-blue"
          onClick={(e) => {
            handleSubmit(e);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>
        <button className="block md:hidden text-regal-sky-blue text-xs" 
          onClick={()=>{
            props.onClose();
          }}
        >
          Close
        </button>
        </div>


        <h5 className="text-regal-black z-50  text-[10px] md:text-sm font-[500] text-center mt-4">
          Don't have an account?{" "}
          <button className="underline z-50 " onClick={props.handleToggle}>
            Sign up for free
          </button>
        </h5>
      </div>
    </div>
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
