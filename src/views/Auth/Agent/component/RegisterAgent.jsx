import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Googleicon from "../../../../assets/images/auth/google.png"
import { useRegisterAgentMutation } from "../../../../features/auth/authApiSlice";
import useErrorMessageHooks from "../../../../hooks/useErrorMessageHooks";
import { setCookie } from "../../../../utils";
import { setCredentials } from "../../../../features/auth/authSlice";
import { IoClose } from "react-icons/io5";
const RegisterAgent = ({handleNext, countries, loadingCountries = false,}) => {
  const {errMsg, data, setData, handleChange, handleError, setErrMsg, dispatch, navigate, setErrorMessagesList, handleErrorMessagesList} = useErrorMessageHooks();
  const [registerAgent, {isLoading}] = useRegisterAgentMutation()
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(()=>{
    defaultData()
  }, [])
  const defaultData = () => {
    setData({
      firstName:'',
      lastName: '',
      email:'',
      password:'',
      terms:false,
      eye:false,
      eyeConfirm:false,
      servicingCountries : []
    })
  }
const handleSubmit = async (e) => {
  e.preventDefault()
  setErrMsg("");
  setErrorMessagesList([]);
  try {
    const {access_data, user} = await registerAgent({ firstName: data.firstName, lastName:data.lastName,  email : data.email, password : data.password, servicingCountries: data?.servicingCountries }).unwrap()
    setCookie("accessToken", access_data?.token)
    dispatch(setCredentials({ accessToken: access_data?.token, user : user, role: access_data?.role,}))
    defaultData();
  navigate('/agent/overview')
  }catch (err) {
    console.log(err);
    handleError(err, "Register");
  }
}

const handleSearchChange = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchTerm(query);
  setFilteredCountries(
    countries.filter((country) =>
      country?.name?.toLowerCase().includes(query)
    )
  );
};

const handleSelectCountry = (country) => {
  if (!data?.servicingCountries?.includes(country)) {
    setData((prevData) => ({
      ...prevData,
      servicingCountries: [...prevData?.servicingCountries, country],
    }));
    setSearchTerm("");
  }

};

const handleRemoveCountry = (country) => {
  setData((prevData) => ({
    ...prevData,
    servicingCountries: prevData?.servicingCountries?.filter(
      (c) => c !== country
    ),
  }));
};

  return (
    <div className="animated fadeInDown md:w-[450px] mx-auto">
 <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto ">
            Join to Enjoy Shopping Experience
          </h1>
          {/* Description Text */}
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
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
                 {/* supported countries*/}
                 <div className="grid grid-cols-1 md:grid-cols-2  col-span-2 md:col-span-2 mb-2">
      {/* Supported Countries */}
      <div className="mb-2 col-span-2">
        <label
          htmlFor="SupportedCountries"
       className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
        >
         Servicing Countries
        </label>
        <div className="relative">
          <input
            type="text"
           className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
            placeholder="Search countries"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <ul className="absolute w-full bg-white border mt-1 z-10 max-h-40 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <li
                    key={country.id}
                    onClick={() => handleSelectCountry(country.name)}
                    className="p-2 text-xs hover:bg-gray-100 cursor-pointer"
                  >
                    {country.name}
                  </li>
                ))
              ) : (
                <li className="p-2 text-xs text-gray-500">No countries found</li>
              )}
              {loadingCountries &&  <li className="p-2  text-xs text-gray-500">loading...</li>}
            </ul>
          )}
        </div>
        {handleErrorMessagesList("servicingCountries")}
        
        {/* Selected countries */}
        <div className="flex gap-2 flex-wrap mt-2">
          {data?.servicingCountries?.map((country, index) => (
            <span
              key={index}
              className=" text-xs capitalize flex items-center p-2 rounded gap-2 border"
            >
              {country}
              <IoClose
                className="cursor-pointer"
                onClick={() => handleRemoveCountry(country)}
              />
            </span>
          ))}
        </div>
      </div>
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
              {handleErrorMessagesList("password")}
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

          </form>
    </div>
  );
};

export default RegisterAgent;
