import React, { useState, useEffect } from "react";
import RightImage from "../../../assets/images/vendor/Auth/otp.webp";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import Logo from "../../../assets/images/nav/logo.webp";
import { Timer } from "../../../components/Timer"
import { usePinInput } from "react-pin-input-hook"
import { useRegisterMutation } from "../../../features/auth/authApiSlice";
const OtpVendor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(0)
  const [intervals, setIntervals] = useState([]);
  const [errMsg, setErrMsg] = useState('')
  const [modal, setModal] = useState(false)
  const [Register, {isLoading}] = useRegisterMutation()

  const { fields, clear } = usePinInput({
    onComplete: OTP => {
        setData(OTP)
    },
  })
  const dispatch = useDispatch()
  useEffect(()=>{
    setErrMsg('')
  }, [data])


const handleSubmit = async (e) => {
    setModal(false)
    e.preventDefault()
    try {
      const userData = await forgotPassword({ otp : data}).unwrap()
      // navigate('/reset-password')
    }catch (err) {
      console.log(err?.status)
      if (err?.status === 200) {
        return
      } 
      else if (err?.status >= 400 && err?.status <= 404){
        setErrMsg(err?.data?.message)
      } else if (err?.status >= 500){
        setErrMsg("forgotPassword failed")
      }else{
        setErrMsg("forgotPassword failed")
      }
    }
  }

  const navigate = useNavigate()
  const registerInterval = (id) => {
    setIntervals(intervals.concat([id]));
  };

  const clearTimer = () => {
    setIntervals([]);
  };

  return (
    <div className="block lg:flex   items-start px-4 pt-8 pb-4 max-w-[1366px] mx-auto">
      <div className=" lg:w-1/2 animated fadeInDown">
      <div className="flex flex-col  justify-center  md:w-[440px] mx-auto">
      <Link to="/" className="mb-10">
            <img src={Logo} alt="" className="w-36 mx-auto" />
          </Link>
          <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto ">
          Enter OTP
          </h1>
          {/* Description Text */}
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
          A reset PIN has been sent to your email name@email.com
          </p>

            <div className="mb-3 col-span-2 md:mx-2">
            <div className="flex flex-row gap-4">
                {fields.map((propsField, index) => (
              <input
                key={index}
                className="otp mb-3"
                type="text"
                oninput="digitValidate(this)"
                {...propsField}
                maxlength={1}
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
              <span
                className="text-sm text-regal-blue "
                onClick={handleSubmit}
              >
                Send again
              </span>
            </p>
          ) : (
            ""
          )}
            </div>

            <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
            <div className="w-full ">
            <button className=" text-xs md:text-[12px] bg-regal-sky-blue text-white px-4  py-3 font-semibold w-full rounded-md hover:bg-blue-600 mt-4 "
            type="submit"
            disabled={isLoading}
            onClick={()=>{
                navigate('/vendor/auth/reset-password')
            }}
            >
                 {isLoading ? 'Loading...' : 'Confirm PIN'}
              </button>
            </div>

        </div>
      </div>
      <div className=" hidden lg:block w-1/2 h-[94vh]">
        <img
          src={RightImage}
          alt="Right Side"
          className="w-full h-full object-cover rounded-lg animate-fade-in"
        />
      </div>
    </div>
  );
};

export default OtpVendor;
