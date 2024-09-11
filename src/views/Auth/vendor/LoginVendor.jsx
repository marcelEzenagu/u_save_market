import React, { useState, useEffect } from "react";
import RightImage from "../../../assets/images/vendor/Auth/login.webp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Googleicon from "../../../assets/images/auth/google.png"
import Logo from "../../../assets/images/nav/logo.webp";
import {useDispatch} from 'react-redux'
import { setCredentials } from "../../../features/auth/authSlice";
import { useLoginMutation } from "../../../features/auth/authApiSlice";
import useErrorMessageHooks from "../../../hooks/useErrorMessageHooks";
import { setCookie } from "../../../utils";
const LoginVendor = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [data, setData] = useState({
    email:'',
    password:'',
    eye:false,
  })
const navigate = useNavigate()
const [errorMessagesList, setErrorMessagesList, handleErrorMessagesList] = useErrorMessageHooks();;
const [errMsg, setErrMsg] = useState('')
const [login, {isLoading}] = useLoginMutation()
const dispatch = useDispatch()
useEffect(()=>{
  setErrMsg('')
}, [data.email, data.password])
const handleSubmit = async (e) => {
  e.preventDefault()
  setErrMsg("");
  setErrorMessagesList([]);
  try {
    const {response } = await login({ email : data.email, password : data.password }).unwrap()
    setCookie("accessToken", response?.access_data?.access_token)
    dispatch(setCredentials({ accessToken: response?.access_data?.access_token, user : response?.vendor, role: response?.access_data?.role,}))
    setData({
      email:'',
      password:'',
      eye:false,
    })
    navigate('/vendor/dashboard/home')
  }catch (err) {
    console.log(err)
    if (err?.status === 200) {
      return;
    } else if (err?.status >= 400) {
      setErrorMessagesList(err?.data?.message);
    } else if (err?.status >= 401 && err?.status <= 404) {
      setErrMsg(err?.data?.message);
    }  else if (err?.status >= 500){
      setErrMsg("Login failed")
    }else{
      setErrMsg("Login failed")
    }
  }
}
const handleChange = e => {
  const newData = Object.assign({}, data, {
    [e.target.name]: e.target.value,
  })
  setData(newData)
}

  return (
    <div className="block lg:flex  items-start px-4 pt-8 pb-4 max-w-[1366px] mx-auto">
      <div className=" lg:w-1/2 animated fadeInDown">
        <div className="flex flex-col  justify-center md:w-[440px] mx-auto">
          <Link to="/" className="mb-10">
            <img src={Logo} alt="" className="w-36 mx-auto" />
          </Link>
          <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 md:w-[410px] mx-auto ">
          Welcome Back
          </h1>
          {/* Description Text */}
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum elit eget purus suscipit, sed egestas 
          </p>

          <form action="" onSubmit={handleSubmit}>

            <div className="mb-4 col-span-2 mt-4">
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

            <div className="mb-4 col-span-2">
              <label
                htmlFor="password"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Password
              </label>
              <div className="mb-4 relative">
                <input
                  type={data.eye ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  id="text"
                  placeholder="Enter password"
                  className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                   {handleErrorMessagesList("password")}
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
               
                >
                  {data.eye ? (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="text-regal-light-gray"
                      onClick={()=> setData({...data, eye:!data.eye})}
                    />
                  ) : (
                    <AiOutlineEye size={20} className="text-regal-light-gray" onClick={()=> setData({...data, eye:!data.eye})}/>
                  )}
                </div>
              </div>
            </div>
            <p className="text-red-600 text-xs">{errMsg && errMsg}</p>

            <Link to="/vendor/auth/forgot-password" className="text-xs text-regal-blue">Forgot Password ?</Link>

            <div className="w-full ">
              <button className=" text-xs md:text-[12px] bg-regal-sky-blue text-white px-4  py-3 font-semibold w-full rounded-lg hover:bg-blue-600 mt-4 "
                    disabled={isLoading}
                        type="submit"
              >
               {isLoading ? 'Loading...' : 'Sign In'}
              </button>
            </div>
                
         
            <div className="flex flex-row items-center my-6">
                <hr  className="w-full border-b-[1px]"/>
                <span className="mx-4 text-[12px] font-[600] text-regal-black ">OR</span>
                <hr className="w-full border-b-[1px]"/>
            </div>

            <div className="relative w-full mt-4">
                <button className="w-full rounded-md  text-[12px] bg-white border  font-[700] py-3 flex flex-row items-center justify-center  "
                type="button"
                >
                <img src={Googleicon} alt="" className=" mr-4" />
                    Log in with Google</button>
            </div>

            <h5 className="text-regal-black text-sm font-[500] text-center mt-4">Don't have an account <Link to="/vendor/auth/register"  className="underline">Sign up for free</Link></h5>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 h-[94vh]">
        <img
          src={RightImage}
          alt="Right Side"
          className="w-full h-full object-cover rounded-lg animate-fade-in"
        />
      </div>
    </div>
  );
};

export default LoginVendor;