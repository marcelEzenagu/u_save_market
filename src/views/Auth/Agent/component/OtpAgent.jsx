import React, { useState, useEffect } from "react";
import RightImage from "../../../../assets/images/vendor/Auth/otp.webp";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import Logo from "../../../../assets/images/nav/logo.webp";
import { Timer } from "../../../../components/Timer"
import { usePinInput } from "react-pin-input-hook"
import { useForgotPasswordMutation, useVerifyOtpMutation } from "../../../../features/auth/authApiSlice";
import {useErrorMessageHooks} from "../../../../hooks/useErrorMessageHooks";
import { setVerifiedDetails } from "../../../../features/auth/authSlice";
const OtpAgent = ({handleNext}) => {
  const [intervals, setIntervals] = useState([]);
  const [verifyOtp, {isLoading}] = useVerifyOtpMutation()
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

  const { fields, clear } = usePinInput({
    onComplete: OTP => {
        setData(OTP)
    },
  })
//   useEffect(()=>{
//       console.log(verifiedDetails);
//       if (!verifiedDetails?.email || !verifiedDetails?.requestID){
//         navigate('vendor/auth/forgot-password');
//       }
//      }, [verifiedDetails])

     const handleResendOtp = async () => {

      setErrMsg("");
      setErrorMessagesList([]);
      try {
        const userData = await resetPassword({email : verifiedDetails?.email}).unwrap();
        dispatch(setVerifiedDetails({...verifiedDetails, requestID : userData?.requestID}));
        navigate("/")
      }catch (err) {
       console.log(err);
       handleError(err, 'OTP');
    }
    }

     const handleSubmit = async (e) => {
      e.preventDefault()
      setErrMsg("");
      setErrorMessagesList([]);
      try {
        const {access_data} = await verifyOtp({ otp : data, requestID : verifiedDetails?.requestID, email: verifiedDetails?.email}).unwrap();
        console.log(access_data?.access_token);
        dispatch(setVerifiedDetails({...verifiedDetails, token: access_data?.access_token }))
        navigate('/agent/reset-password')
      }catch (err) {
       console.log(err);
       handleError(err, 'OTP');
    }
   }

  const registerInterval = (id) => {
    setIntervals(intervals.concat([id]));
  };

  const clearTimer = () => {
    setIntervals([]);
  };

  return (
    <div className="animated fadeInDown mt-14 md:w-[450px] mx-auto">
    <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto ">
    Verify your email
          </h1>
          {/* Description Text */}
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
          We’ve sent a code to your email  {verifiedDetails?.email}
          </p>

            <div className="mb-3 col-span-2 md:mx-2">
            <div className="flex flex-row gap-4 md:pl-2">
                {fields.map((propsField, index) => (
              <input
              key={index}
              className="otp mb-3"
              type="text"
              onInput="digitValidate(this)"
              {...propsField}
              maxLength={1}
              placeholder=""
              />
            ))}
                </div>
            <Timer
              id={data}
              registerInterval={registerInterval}
              clearTimer={clearTimer}
            />
            {intervals.length == 0 ? (
            <p className="text-sm mt-4">
              Didn’t receive the code?{" "}
              <button className="text-sm text-regal-blue "
                   onClick={handleResendOtp}
                  type="button"
                  disabled={loading}

                 >
                   {loading ? 'sending Otp...': 'Send again'}
                 </button>
            </p>
          ) : (
            ""
          )}
            </div>

            <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
            <div className="w-full ">
            <button className="mt-10 text-xs md:text-[12px] bg-regal-sky-blue text-white px-4  py-3 font-semibold w-full rounded-md hover:bg-blue-600  "
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            >
                 {isLoading ? 'Confirming...' : 'Confirm PIN'}
              </button>
            </div>
    </div>
  );
};

export default OtpAgent;
