import React, { useState, useEffect } from "react";
import RightImage from "../../../assets/images/vendor/Auth/forgotpassword.webp";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import Logo from "../../../assets/images/nav/logo.webp";
import { useForgotPasswordAgentMutation } from "../../../features/auth/authApiSlice";
import {useErrorMessageHooks} from "../../../hooks/useErrorMessageHooks";
import { setVerifiedDetails } from "../../../features/auth/authSlice";
const ForgotPasswordAgent = () => {
  const {
    setErrorMessagesList,
    handleErrorMessagesList,
    handleError,
    handleChange,
    setErrMsg,
    errMsg,
    data, 
    dispatch,
    navigate,
    setData,
  } = useErrorMessageHooks();
  const [modal, setModal] = useState(false)
  const [forgotPasswordAgent, {isLoading}] = useForgotPasswordAgentMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setErrorMessagesList([]);
    try {
      const userData = await forgotPasswordAgent({ email: data.email }).unwrap();
      dispatch(
        setVerifiedDetails({
          email: data?.email,
          requestID: userData?.requestID,
        })
      );
      navigate("/agent/otp");
      setData({
        email: "",
      });
    } catch (err) {
      console.log(err);
      handleError(err, "Forget Password");
    }
  };


  return (
    <div className="block lg:flex   items-start px-4  max-w-[1366px] mx-auto">
         <div className=" hidden lg:block w-1/2 h-screen py-4">
        <img
          src={RightImage}
          alt="Right Side"
          className="w-full h-full object-cover rounded-xl  animate-fade-in"
        />
      </div>
      <div className=" lg:w-1/2 my-auto animated fadeInDown">
      <div className="flex flex-col  justify-center  md:w-[440px] mx-auto">
      <Link to="/" className="mb-8">
            <img src={Logo} alt="" className="w-36 mx-auto" />
          </Link>
          <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto ">
          Forgot Password
          </h1>
          {/* Description Text */}
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
          These things happen all the time. Please enter the email or phone number used to create your account.
          </p>

          <form action="" onSubmit={handleSubmit}>
        
            <div className="mb-3 col-span-2">
              <label
                htmlFor="Email"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={data.email}
                placeholder="Enter Email"
                className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              />

            {handleErrorMessagesList("email")}
            </div>

            <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
            <div className="w-full flex flex-row gap-4 ">
            <button className=" text-xs md:text-[12px] text-regal-sky-blue bg-regal-secondary-light px-4  py-3 font-semibold w-full rounded-md  mt-4 "
            type="button"
            onClick={()=>{
                navigate('/agent/login')
            }}
          
            >
                Back
              </button>
           
            <button className=" text-xs md:text-[12px] bg-regal-sky-blue text-white px-4  py-3 font-semibold w-full rounded-md hover:bg-blue-600 mt-4 "
            type="submit"
            disabled={isLoading}
            >
                 {isLoading ? "Verifying Email..." : "Send PIN"}
              </button>
            </div>

          </form>
        </div>
      </div>
   
    </div>
  );
};

export default ForgotPasswordAgent;
