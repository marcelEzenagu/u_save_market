import React, {  } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/nav/logo.webp";
import { setCredentials } from "../../../features/auth/authSlice";
import { useLoginAdminMutation } from "../../../features/auth/authApiSlice";
import {useErrorMessageHooks} from "../../../hooks/useErrorMessageHooks";
import { setCookie } from "../../../utils";
const LoginAdmin = () => {
const {errMsg, data, setData, handleChange, handleError, setErrMsg, dispatch, navigate, setErrorMessagesList, handleErrorMessagesList} = useErrorMessageHooks();
const [loginAdmin, {isLoading}] = useLoginAdminMutation()
const handleSubmit = async (e) => {
  e.preventDefault()
  setErrMsg("");
  setErrorMessagesList([]);
  try {
    const {response } = await loginAdmin({ email : data.email, password : data.password }).unwrap()
    setCookie("accessToken", response?.access_data?.access_token)
    dispatch(setCredentials({ accessToken: response?.access_data?.access_token, user : response?.user, role: response?.access_data?.role,}))
    setData({
      email:'',
      password:'',
      eye:false,
    })
     navigate('/admin/overview')
  }catch (err) {
    console.log(err);
    handleError(err, "Login");
  }
}


  return (
    <div className="block lg:flex  items-start px-4 pt-8 pb-4 h-screen max-w-[1366px] mx-auto">
        {/* <div className="hidden lg:block w-1/2 h-[94vh]">
        <img
          src={'https://images.pexels.com/photos/2386152/pexels-photo-2386152.jpeg?auto=compress&cs=tinysrgb&w=600'}
          alt="Right Side"
          className="w-full h-full object-cover rounded-lg animate-fade-in"
        />
      </div> */}
      <div className=" mx-auto my-auto animated fadeInDown">
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
              {handleErrorMessagesList("password")}
            </div>
            <p className="text-red-600 text-xs">{ errMsg}</p>

            <div className="w-full ">
              <button className=" text-xs md:text-[12px] bg-regal-sky-blue text-white px-4  py-3 font-semibold w-full rounded-lg hover:bg-blue-600 mt-4 "
                    disabled={isLoading}
                        type="submit"
              >
               {isLoading ? 'Loading...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    
    </div>
  );
};

export default LoginAdmin;