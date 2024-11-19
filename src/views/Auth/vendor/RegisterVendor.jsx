import React, {  } from "react";
import RightImage from "../../../assets/images/vendor/Auth/register.webp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Googleicon from "../../../assets/images/auth/google.png"
import Logo from "../../../assets/images/nav/logo.webp";
import { useRegisterMutation } from "../../../features/auth/authApiSlice";
import useErrorMessageHooks from "../../../hooks/useErrorMessageHooks";
import { setCookie } from "../../../utils";
import { setCredentials } from "../../../features/auth/authSlice";
const RegisterVendor = () => {
  const {errMsg, data, setData, handleChange, handleError, setErrMsg, dispatch, navigate, setErrorMessagesList, handleErrorMessagesList} = useErrorMessageHooks();
  const [Register, {isLoading}] = useRegisterMutation()

const handleSubmit = async (e) => {
  e.preventDefault()
  setErrMsg("");
  setErrorMessagesList([]);
  try {
    // const  {
    //   access_data,
    //   vendor
    //    } 

    const {requestID,user} = await Register({ firstName: data.firstName, lastName:data.lastName,  email : data.email, password : data.password }).unwrap()
    
    //    setCookie("accessToken", access_data?.token)
    // dispatch(setCredentials({  user }))
    setData({
      firstName:'',
      lastName: '',
      email:'',
      password:'',
      terms:false,
      eye:false,
      eyeConfirm:false
    })
    // setModal(true)
    navigate(`/vendor/verify-email`,{state:{requestID,email:data.email}})
  }catch (err) {
    console.log(err);
    handleError(err, "Register");
  }
}





  return (
    <div className="block lg:flex   items-start px-4  max-w-[1366px] mx-auto">
      <div className=" lg:w-1/2 animated my-auto fadeInDown">
      <div className="flex flex-col  justify-center   md:w-[440px] mx-auto">
      <Link to="/" className="mb-8">
            <img src={Logo} alt="" className="w-36 mx-auto" />
          </Link>
          <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto ">
            Join to Enjoy Shopping Experience
          </h1>
          {/* Description Text */}
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-6 font-[400]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            elementum elit eget purus suscipit, sed egestas.
          </p>

          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  htmlFor="FirstName"
                  className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="FirstName"
                  onChange={handleChange}
                  value={data.firstName}
                  placeholder="Enter first name"
                  className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                 {handleErrorMessagesList("firstName")}
              </div>
              <div className="mb-4 col-span-2 md:col-span-1">
                <label
                  htmlFor="LastName"
                  className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  id="LastName"
                  placeholder="Enter last name"
                  className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                     {handleErrorMessagesList("lastName")}
              </div>
            </div>
            <div className="mb-4 col-span-2">
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
                  type={data?.eye ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={data.password}
                  placeholder="Enter password"
                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                 {handleErrorMessagesList("password")}
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

            <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
            <div className="w-full ">
            <button className=" text-xs md:text-[12px] bg-regal-sky-blue text-white px-4  py-3 font-semibold w-full rounded-lg hover:bg-blue-600 mt-4 "
            type="submit"
            disabled={isLoading}
            >
                 {isLoading ? 'Loading...' : ' Sign Up '}
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

            <h5 className="text-regal-black text-sm font-[500] text-center mt-4">Already have an account? <Link to="/vendor/login" className="underline">Log In</Link></h5>
          </form>
        </div>
      </div>
      <div className=" hidden lg:block w-1/2 h-screen py-4 py-4 ">
        <img
          src={RightImage}
          alt="Right Side"
          className="w-full h-full object-cover rounded-xl  animate-fade-in"
        />
      </div>
    </div>
  );
};

export default RegisterVendor;
