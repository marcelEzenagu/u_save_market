
import React, { useState, useCallback, useMemo } from "react";
import Googleicon from "../../../../assets/images/auth/google.png";
import Facebookicon from "../../../../assets/images/auth/facebook.png";
import { SlArrowDown } from "react-icons/sl";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  useRegisterUserMutation} from "../../../../features/auth/authApiSlice";
import { setCookie } from "../../../../utils";
import { setCredentials } from "../../../../features/auth/authSlice";
import {useErrorMessageHooks} from "../../../../hooks/useErrorMessageHooks";
const RegisterModal = ({handleToggle, onClose}) => {
  const countries = useSelector((state) => state?.auth?.countries);
    const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [RegisterUser, { isLoading }] = useRegisterUserMutation();
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
  
    const handleSelect = useCallback((country) => {
      setSelectedCountry(country);
      setIsOpenSelect(false);
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrMsg("");
      setErrorMessagesList([]);
  
      if (
        !data.firstName ||
        !data.lastName ||
        !data.email ||
        !data.password ||
        !data.phone
      ) {
        setErrMsg("All fields are required.");
        return;
      }
  
      try {
        const userData = await RegisterUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phoneNumber: data.phone,
        }).unwrap();
  
        dispatch(
          setCredentials({
            accessToken: userData?.access_data?.token,
            user: userData?.user,
            role: userData?.access_data?.role,
          })
        );
        setData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          terms: false,
          eye: false,
          eyeConfirm: false,
        });
        setCookie("accessToken", userData?.access_data?.token);
        onClose();
        navigate("/");
      } catch (err) {
        console.log(err);
        handleError(err, "Register");
      }
    };
  
    // Memoize `countries` to prevent unnecessary recalculations
    const memoizedCountries = useMemo(() => countries, [countries]);
  
    return (
      <div className="max-w-[400px] animate-fade-in">
        <div className="relative w-full mt-4 z-10">
          <button className="w-full rounded-full bg-white border text-[10px] md:text-sm font-[700] py-3">
            Continue with Google
          </button>
          <img
            src={Googleicon}
            alt="Google"
            className="absolute top-2 md:top-3 left-4"
          />
        </div>
  
        <div className="relative w-full mt-3 z-10">
          <button className="w-full rounded-full bg-white border text-[10px] md:text-sm font-[700] py-3">
            Continue with Facebook
          </button>
          <img
            src={Facebookicon}
            alt="Facebook"
            className="absolute top-2 md:top-3 left-4"
          />
        </div>
  
        <div className="flex flex-row items-center my-2 md:my-4">
          <hr className="w-full border-b-[1px]" />
          <span className="mx-2 font-[500] text-regal-crum-gray text-[10px] md:text-sm">
            or
          </span>
          <hr className="w-full border-b-[1px]" />
        </div>
  
        <form  onSubmit={handleSubmit}>
       
         {/* First Name Field */}
         <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-[10px] md:text-sm font-[700] leading-6 mb-2 text-regal-black"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={data?.firstName}
              placeholder="Enter first name"
              className="w-full p-3 text-[10px] md:text-sm border focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
            />
            {  handleErrorMessagesList("firstName")}
          </div>
  
          {/* Last Name Field */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-[10px] md:text-sm font-[700] leading-6 mb-2 text-regal-black"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
              value={data?.lastName}
              placeholder="Enter last name"
              className="w-full p-3 text-[10px] md:text-sm border focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
            />
            {  handleErrorMessagesList("lastName")}
          </div>
  
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[10px] md:text-sm font-[700] leading-6 mb-2 text-regal-black"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={data?.email}
              placeholder="Enter Email"
              className="w-full p-3 text-[10px] md:text-sm border focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
            />
            { handleErrorMessagesList("email")}
          </div>
  
          {/* Phone Field */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-[10px] md:text-sm font-[700] leading-6 mb-2 text-regal-black"
            >
              Phone
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsOpenSelect(!isOpenSelect)}
                    className="w-full flex justify-between items-center border-none rounded-md px-4 py-2 bg-transparent text-gray-700"
                  >
                    {selectedCountry ? (
                      <div className="flex items-center text-[10px] md:text-sm">
                        <img
                          src={selectedCountry?.flag}
                          alt="flag"
                          className="w-6 h-4 mr-2"
                        />
                        {selectedCountry?.number}
                      </div>
                    ) : (
                      "Select a country"
                    )}
                    <SlArrowDown className="ml-1" />
                  </button>
  
                  {isOpenSelect && (
                    <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
                      {memoizedCountries?.map((country, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelect(country)}
                          className="flex items-center text-[10px] md:text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <img
                            src={country.flag}
                            alt={country.name}
                            className="w-6 h-4 mr-2"
                          />
                          {country.number}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={data?.phone}
                className="w-full py-3 pl-28 text-[10px] md:text-sm border rounded-sm bg-transparent text-regal-crum-gray focus:outline-none"
                placeholder="Phone"
              />
            </div>
            { handleErrorMessagesList("phoneNumber")}
          </div>
  
          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="Password"
              className="block text-[10px] md:text-sm font-[600] leading-6 mb-2 text-regal-black"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={data?.eye ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleChange}
                value={data?.password}
                placeholder="Enter password"
                className="w-full p-3 text-[10px] md:text-sm border focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
              />
              <span
                onClick={() =>
                  setData((prevData) => ({
                    ...prevData,
                    eye: !prevData?.eye,
                  }))
                }
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                {data?.eye ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            { handleErrorMessagesList("password")}
          </div>
    
          <p className="text-red-600 text-xs">{typeof errMsg === 'string' && errMsg}</p>
          <div className="flex flex-col gap-4 mt-3">
            <button
             className="w-full bg-regal-blue text-white font-semibold py-2 rounded-full"
                type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
               "Registering..."
              ) : (
                "Register"
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
  
          <h5 className="text-regal-black   z-50 text-[10px] md:text-sm font-[500] text-center mt-4">
            Already have an account?{" "}
            <button
              className="underline z-50 "
              onClick={() => {
                handleToggle("login");
              }}
            >
              Log In
            </button>
          </h5>
        </form>
      </div>
    );
  };


  export default RegisterModal