import React, { useState, useEffect } from "react";
import RightImage from "../../../assets/images/vendor/Auth/otp.webp";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../../assets/images/nav/logo.webp";
import { Timer } from "../../../components/Timer";
import { usePinInput } from "react-pin-input-hook";
import {
  useForgotPasswordMutation,
  useVerifyVendorEmailMutation,
} from "../../../features/auth/authApiSlice";
import { useErrorMessageHooks } from "../../../hooks/useErrorMessageHooks";
import { setCredentials, setVerifiedDetails } from "../../../features/auth/authSlice";
import { setCookie } from "../../../utils";
import OTPInput from "../../../components/OtpInput";
const VerifyEmail = () => {
  const [intervals, setIntervals] = useState([]);

  const location = useLocation();

  const { requestID, email } = location.state || {};

  const [verifyEmail, { isLoading }] = useVerifyVendorEmailMutation();
  const [resetPassword, { isLoading: loading }] = useForgotPasswordMutation();
  const { verifiedDetails } = useSelector((state) => state.auth);
  const {
    setErrorMessagesList,
    handleErrorMessagesList,
    setErrMsg,
    navigate,
    dispatch,
    errMsg,
    handleError,
    setData,
    data,
  } = useErrorMessageHooks();

  // const { fields, clear } = usePinInput({
  //   onComplete: (OTP) => {
  //     setData(OTP);
  //   },
  // });
  const handleOTPChange = (otp) => {
    setData(otp);
  };

  useEffect(() => {
    console.log(verifiedDetails, "====verifiedDetails");
    // if (!verifiedDetails?.email || !verifiedDetails?.requestID){
    //   navigate('vendor/auth/forgot-password');
    // }
  }, [verifiedDetails]);

  const handleResendOtp = async () => {
    setErrMsg("");
    setErrorMessagesList([]);
    try {
      const userData = await resetPassword({ email: verifiedDetails?.email }).unwrap();
      dispatch(
        setVerifiedDetails({ ...verifiedDetails, requestID: userData?.requestID })
      );
    } catch (err) {
      console.log(err);
      handleError(err, "OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setErrorMessagesList([]);
    try {
      const { access_data, user } = await verifyEmail({
        otp: data,
        requestID,
        email,
      }).unwrap();
      setCookie("accessToken", access_data?.access_token);

      dispatch(
        setCredentials({
          accessToken: access_data?.access_token,
          user,
          role: access_data?.role,
        })
      );
      navigate("/vendor/registration");
    } catch (err) {
      console.log(err);
      handleError(err, "OTP");
    }
  };

  const registerInterval = (id) => {
    setIntervals(intervals.concat([id]));
  };

  const clearTimer = () => {
    setIntervals([]);
  };

  return (
    <div className="block lg:flex   items-start px-4  max-w-[1366px] mx-auto">
      <div className=" lg:w-1/2 animated my-auto fadeInDown">
        <div className="flex flex-col  justify-center  md:w-[440px] mx-auto">
          <Link to="/" className="mb-8">
            <img src={Logo} alt="" className="w-36 mx-auto" />
          </Link>
          <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto ">
            Enter OTP
          </h1>
          {/* Description Text */}
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
            A verification PIN has been sent to your email {verifiedDetails?.email}
          </p>

          <div className="mb-3 col-span-2 md:mx-2">
            <div className="flex flex-row gap-4">
              {/* {fields?.map((propsField, index) => (
                <input
                  key={index}
                  className="otp mb-3"
                  type="text"
                  onInput="digitValidate(this)"
                  {...propsField}
                  maxLength={1}
                  placeholder=""
                />
              ))} */}
              <OTPInput length={6} onChange={handleOTPChange} />
            </div>
            <Timer
              id={data}
              registerInterval={registerInterval}
              clearTimer={clearTimer}
            />
            {intervals.length == 0 ? (
              <p className="text-sm mt-4">
                Didn’t receive the code?{" "}
                <button
                  className="text-sm text-regal-blue "
                  onClick={handleResendOtp}
                  type="button"
                  disabled={loading}
                >
                  {loading ? "sending Otp..." : "Send again"}
                </button>
              </p>
            ) : (
              ""
            )}
          </div>

          <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
          <div className="w-full ">
            <button
              className=" text-xs md:text-[12px] bg-regal-sky-blue text-white px-4  py-3 font-semibold w-full rounded-md hover:bg-blue-600 mt-4 "
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Confirming..." : "Confirm PIN"}
            </button>
          </div>
        </div>
      </div>
      <div className=" hidden lg:block w-1/2 h-screen py-4">
        <img
          src={RightImage}
          alt="Right Side"
          className="w-full h-full object-cover rounded-xl  animate-fade-in"
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
