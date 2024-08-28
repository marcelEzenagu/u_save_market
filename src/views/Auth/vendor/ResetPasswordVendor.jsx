import React, { useState, useEffect } from "react";
import RightImage from "../../../assets/images/vendor/Auth/resetpassword.webp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Googleicon from "../../../assets/images/auth/google.png"
import {useDispatch} from 'react-redux'
import Logo from "../../../assets/images/nav/logo.webp";
import { useResetPasswordMutation } from "../../../features/auth/authApiSlice";
const ResetPasswordVendor = () => {
  const [data, setData] = useState({
    password: "",
    confirmpassword: "",
    eye: false,
    eyeConfirm: false,
    otp: "",
  });
  const [errMsg, setErrMsg] = useState('')
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  useEffect(() => {
    setErrMsg("");
  }, [data.confirmpassword, data.password]);
  const dispatch = useDispatch()
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await resetPassword({
        otp: data.otp.toString(),
        password: data.password,
        confirmPassword: data.confirmpassword,
      }).unwrap();
      console.log(userData);

      setData({
        password: "",
        confirmpassword: "",
        eye: false,
        eyeConfirm: false,
      });
      window.history.replaceState({}, "");
      navigate("/signin");
    } catch (err) {
      console.log(err);
      if (err?.status === 200) {
        return;
      } else if (err?.status >= 400 && err?.status <= 404) {
        setErrMsg(err?.data?.message);
      } else if (err?.status >= 500) {
        setErrMsg("Register failed");
      } else {
        setErrMsg("Register failed");
      }
    }
  };
const handleChange = e => {
  const newData = Object.assign({}, data, {
    [e.target.name]: e.target.value,
  })
  setData(newData)
}
  const navigate = useNavigate()


  return (
    <div className="block lg:flex   items-start px-4 pt-8 pb-4 max-w-[1366px] mx-auto">
      <div className=" lg:w-1/2 animated fadeInDown">
      <div className="flex flex-col  justify-center  md:w-[440px] mx-auto">
      <Link to="/" className="mb-10">
            <img src={Logo} alt="" className="w-36 mx-auto" />
          </Link>
          <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto ">
          Setup New Password
          </h1>
          {/* Description Text */}
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
          Create a uniques password that you would remember easily.
          </p>

          <form action="" onSubmit={handleSubmit}>
        
          <div className="mb-4 col-span-2">
              <label
                htmlFor="password"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
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
                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                
                >
                  {data?.eye ? (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="text-regal-light-gray"
                      onClick={()=> setData({...data, eye:!data.eye})}
                    />
                  ) : (
                    <AiOutlineEye size={20} className="text-regal-light-gray" onClick={()=> setData({...data, eye:!data.eye})} />
                  )}
                </div>
              </div>
            </div>
    
            <div className="mb-4 col-span-2">
              <label
                htmlFor="Confirm password"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
               Confirm password
              </label>
              <div className="mb-4 relative">
                <input
                  name="confirmpassword"
                  id="Confirm password"
                  onChange={handleChange}
                        value={data.confirmpassword}
                        type={data.eyeConfirm ? "text" : "password"}
                  placeholder="Enter password"
                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
             
                >
                  {data?.eyeConfirm ? (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="text-regal-light-gray"
                      onClick={() =>
                        setData({ ...data, eyeConfirm: !data.eyeConfirm })
                      }
                    />
                  ) : (
                    <AiOutlineEye size={20} className="text-regal-light-gray"   onClick={() =>
                        setData({ ...data, eyeConfirm: !data.eyeConfirm })
                      } />
                  )}
                </div>
              </div>
            </div>
            <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
            <div className="w-full flex flex-row gap-4 ">       
            <button className=" text-xs md:text-[12px] bg-regal-sky-blue text-white px-4  py-3 font-semibold w-full rounded-md hover:bg-blue-600 mt-4 "
            type="submit"
            disabled={isLoading}
            >
                 {isLoading ? 'Loading...' : 'Finish'}
              </button>
            </div>

          </form>
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

export default ResetPasswordVendor;
