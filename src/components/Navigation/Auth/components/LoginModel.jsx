
import React, {  } from "react";
import Googleicon from "../../../../assets/images/auth/google.png";
import Facebookicon from "../../../../assets/images/auth/facebook.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  useLoginUserMutation} from "../../../../features/auth/authApiSlice";
import { setCookie } from "../../../../utils";
import { setCredentials, setCountry, setCurrency } from "../../../../features/auth/authSlice";
import {useErrorMessageHooks} from "../../../../hooks/useErrorMessageHooks";
import { useSelector } from "react-redux";
const LoginModel = ({handleToggle , onClose}) => {
    const {
      setErrorMessagesList,
      handleErrorMessagesList,
      setErrMsg,
      errMsg,
      handleError,
      handleChange,
      navigate,
      dispatch,
      setData,
      data,
     } = useErrorMessageHooks();
     const countries = useSelector((state) => state?.auth?.countries);
    const [loginUser, { isLoading }] = useLoginUserMutation();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrMsg("");
      setErrorMessagesList([]);
      try {
        const value = await loginUser({

          // email:"vanyanka@yahoo.com",
          // password: "@123A234233"
          email: data.email,
          password: data.password,
        }).unwrap();
        const userData = value.response;
  
        // Dispatch actions to Redux
        dispatch(
          setCredentials({
            accessToken: userData?.access_data?.access_token,
            user: userData?.user,
            role: userData?.access_data?.role,
          })
        );
  
        if (userData?.user?.preferredCountry) {
          const country = countries.find(
            (i) =>
              i.name.toLowerCase() ===
              userData?.user?.preferredCountry.toLowerCase()
          );
          if (country) {
            dispatch(setCountry(country));
            dispatch(setCurrency(country));
          }

        }
  
        setCookie("accessToken", userData?.access_data?.access_token);
        onClose();
        setData({
          email: "",
          password: "",
          eye: false,
        });

        navigate("/");
        
      } catch (err) {
        console.log(err);
        handleError(err, "login");
      }
    };
  
    return (
      <div className="max-w-[400px]">
        <div className="relative w-full mt-4 z-10">
          <button className="w-full rounded-full  bg-white border text-[10px] md:text-sm font-[700] py-3 ">
            Continue with Google
          </button>
          <img
            src={Googleicon}
            alt=""
            className="absolute top-2 md:top-3 left-4"
          />
        </div>
        <div className="relative w-full mt-3 z-10">
          <button className="w-full rounded-full  bg-white border text-[10px] md:text-sm font-[700] py-3 ">
            Continue with Facebook
          </button>
          <img src={Facebookicon} alt="" className="absolute  top-2 md:top-3 left-4" />
        </div>
        <div className="flex flex-row items-center my-2 md:my-4">
          <hr className="w-full border-b-[1px]" />
          <span className="mx-2 font-[500] text-regal-crum-gray  text-[10px]  md:text-sm ">
            or
          </span>
          <hr className="w-full border-b-[1px]" />
        </div>
  
        <form onSubmit={handleSubmit}>
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
          <div className="w-100 text-end">
            <button
              className="text-xs text-regal-blue font-[600]"
              onClick={() => {
                handleToggle("Forget Password");
              }}
            >
              Forgot Password ?
            </button>
          </div>
  
          <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
  
          <div className="flex flex-col gap-4 mt-3">
            <button
              className="w-full bg-regal-blue text-white font-semibold py-2 rounded-full"
              type="submit"
            disabled={isLoading}
            >
              {isLoading ? (
                'Login...'
              ) : (
                "Login"
              )}
            </button>
            <button
                 className="block md:hidden text-regal-sky-blue text-xs w-full py-2 rounded-full"
                 onClick={() => {
                   onClose();
                 }}
            >
              Close
            </button>
          </div>
  
          <h5 className="text-regal-black z-50  text-[10px] md:text-sm font-[500] text-center mt-4">
            Don't have an account?{" "}
            <button
              className="underline z-50 "
              onClick={() => {
                handleToggle("signup");
              }}
            >
              Sign up for free
            </button>
          </h5>
        </form>
      </div>
    );
  }; 


  export default LoginModel