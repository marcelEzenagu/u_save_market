import React, { useEffect, useLayoutEffect } from "react";
import RightImage from "../../../assets/images/vendor/Auth/resetpassword.webp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../assets/images/nav/logo.webp";
import { useErrorMessageHooks } from "../../../hooks/useErrorMessageHooks";
import { useResetPasswordMutation } from "../../../features/auth/authApiSlice";
import { useToaster } from "../../../components/ToasterContext";
import { clearVerifiedDetails} from "../../../features/auth/authSlice";

const ResetPasswordVendor = () => {
  const {
    setErrorMessagesList,
    handleErrorMessagesList,
    setErrMsg,
    errMsg,
    handleError,
    setData,
    handleChange,
    data,
  } = useErrorMessageHooks();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { showToast } = useToaster();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access verified details from Redux state
  const { verifiedDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect if there are no verified details
    if (!verifiedDetails?.email || !verifiedDetails?.requestID || !verifiedDetails?.token) {
      navigate("/vendor/forgot-password");
    }
  }, [verifiedDetails, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setErrorMessagesList([]);

    try {
      await resetPassword({
        token: verifiedDetails?.token,
        password: data.password,
        confirmPassword: data.confirmpassword,
      }).unwrap();
      showToast('Password reset successful', 'success');
      setData({
        password: "",
        confirmpassword: "",
        eye: false,
        eyeConfirm: false,
      });
      navigate("/vendor/login");
      dispatch(clearVerifiedDetails());
    } catch (err) {
      console.log(err);
      handleError(err, 'Reset Password');
    }
  };

  return (
    <div className="block lg:flex items-start px-4 pt-8 pb-4 max-w-[1366px] mx-auto">
      <div className="lg:w-1/2 animated fadeInDown">
        <div className="flex flex-col justify-center md:w-[440px] mx-auto">
          <Link to="/" className="mb-8">
            <img src={Logo} alt="" className="w-36 mx-auto" />
          </Link>
          <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto">
            Setup New Password
          </h1>
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
            Create a unique password that you will remember easily.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 col-span-2">
              <label htmlFor="password" className="block text-xs md:text-[12px] font-[400] leading-6 mb-2 text-regal-black">
                New Password
              </label>
              <div className="mb-4 relative">
                <input
                  type={data?.eye ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={data.password}
                  placeholder="Enter password"
                  
                  className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  {data?.eye ? (
                    <AiOutlineEyeInvisible size={20} className="text-regal-light-gray" onClick={() => setData({ ...data, eye: !data.eye })} />
                  ) : (
                    <AiOutlineEye size={20} className="text-regal-light-gray" onClick={() => setData({ ...data, eye: !data.eye })} />
                  )}
                </div>
              </div>
              {handleErrorMessagesList('password')}
            </div>

            <div className="mb-4 col-span-2">
              <label htmlFor="confirmpassword" className="block text-xs md:text-[12px] font-[400] leading-6 mb-2 text-regal-black">
                Confirm Password
              </label>
              <div className="mb-4 relative">
                <input
                  name="confirmpassword"
                  id="confirmpassword"
                  onChange={handleChange}
                  value={data.confirmpassword}
                  type={data.eyeConfirm ? "text" : "password"}
                  placeholder="Enter password"
                  
                  className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  {data?.eyeConfirm ? (
                    <AiOutlineEyeInvisible size={20} className="text-regal-light-gray" onClick={() => setData({ ...data, eyeConfirm: !data.eyeConfirm })} />
                  ) : (
                    <AiOutlineEye size={20} className="text-regal-light-gray" onClick={() => setData({ ...data, eyeConfirm: !data.eyeConfirm })} />
                  )}
                </div>
              </div>
              {handleErrorMessagesList('confirmPassword')}
            </div>

            <p className="text-red-600 text-xs">{errMsg && errMsg}</p>

            <div className="w-full flex flex-row gap-4">
              <button
                className="text-xs md:text-[12px] bg-regal-sky-blue text-white px-4 py-3 font-semibold w-full rounded-md hover:bg-blue-600 mt-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Finish'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className=" hidden lg:block w-1/2 h-screen py-4">
        <img src={RightImage} alt="Right Side" className="w-full h-full object-cover rounded-xl  animate-fade-in" />
      </div>
    </div>
  );
};

export default ResetPasswordVendor;
