import React, { useState, useRef, useEffect } from "react";
import { countries } from "../../../data/mockData"; // Assume you have a list of countries
import Profilecircle from "../../../assets/images/nav/icons/profilecircle.webp";
import Googleicon from "../../../assets/images/auth/google.png"
import Facebookicon from "../../../assets/images/auth/facebook.png"
import icon1 from "../../../assets/images/auth/1.webp"
import icon2 from "../../../assets/images/auth/3.webp"
import icon3 from "../../../assets/images/auth/2.webp"
import { SlArrowDown } from "react-icons/sl";
// import { HiOutlineUserCircle } from "react-icons/hi2";
const Modal = ({ isOpen, onClose }) => {

  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpenSelect(false); // Close dropdown after selection
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black w-full bg-opacity-75 flex justify-center items-center z-50">
        <div
          className="bg-regal-auth-bg-color py-12 p-8 rounded-2xl overflow-hidden max-w-lg md:max-w-[600px] w-full  z-52 relative animated fadeInDown"
          ref={dropdownRef}
        >   
        <img src={icon1} alt=""   className="absolute top-0 right-0 z-10 object-contain"/>
        <img src={icon2}  alt=""   className="absolute right-0 top-1/2 transform -translate-y-1/2  object-contain"/>
        <img src={icon3} alt=""  className="absolute bottom-0 right-0 object-contain" />
          <h2 className="text-xl font-bold text-regal-blue mb-4">
            Log in or Sign up
          </h2>

          <div className="max-w-[400px]">
            <div className="relative w-full mt-4">
                <button className="w-full rounded-full  bg-white border text-sm font-[700] py-3 ">Continue with Google</button>
            <img src={Googleicon} alt="" className="absolute top-3 left-4" />
            </div>
            <div className="relative w-full mt-3">
                <button className="w-full rounded-full  bg-white border text-sm font-[700] py-3 ">Continue with Facebook</button>
            <img src={Facebookicon} alt="" className="absolute top-3 left-4" />
            </div>
          <div className="flex flex-row items-center my-4">
                <hr  className="w-full border-b-[1px]"/>
                <span className="mx-2 font-[500] text-regal-crum-gray ">or</span>
                <hr className="w-full border-b-[1px]"/>
            </div>

            <div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  class="block text-sm font-[700]  leading-6 mb-2 text-regal-black"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className="w-full p-3 text-sm border  focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Password"
                  class="block text-sm font-[500]  leading-6 mb-2 text-regal-black"
                >
                  Password
                </label>
                <input
                  type="text"
                  name="Password"
                  id="Password"
                  placeholder="Enter Password"
                  className="w-full p-3 text-sm border  focus:outline-none rounded-sm bg-transparent text-regal-crum-gray"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  class="block text-sm  font-[500]  leading-6 mb-2 text-regal-black"
                >
                  Phone
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* <span class="text-gray-500 sm:text-sm">$</span> */}
                  </div>
                  <div class="absolute inset-y-0 left-0 flex items-center">
        
                    <div className="relative">
                      {/* Dropdown button */}
                      <button
                        onClick={() => setIsOpenSelect(!isOpenSelect)}
                        className="w-full flex justify-between items-center border-none  rounded-md px-4 py-2 bg-transparent text-gray-700"
                      >
                        {selectedCountry ? (
                          <div className="flex items-center text-sm">
                            <img
                              src={selectedCountry.flag}
                              alt="flag"
                              className="w-6 h-4 mr-2"
                            />
                            {selectedCountry.number}
                          </div>
                        ) : (
                          "Select a country"
                        )}
                        
                        <SlArrowDown className="ml-1"/>
                      </button>

                      {/* Dropdown menu */}
                      {isOpenSelect && (
                        <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
                          {countries.map((country, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelect(country)}
                              className="flex items-center text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <img
                                src={country.flag}
                                alt={country.name}
                                className="w-6 h-4  mr-2"
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
                    name="price"
                    id="price"
                    className="w-full py-3 pl-28 text-sm border rounded-sm bg-transparent text-regal-crum-gray focus:outline-none"
                    placeholder="Phone"
                  />
                </div>
              </div>

              <button className="py-2 px-6 text-lg active:scale-95 text-white rounded-md bg-regal-sky-blue">Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

function AuthModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className=" flex items-center hover:text-regal-blue text-xs xl:text-sm text-regal-black cursor-pointer font-[500]"
        onClick={() => setIsModalOpen(true)}
      >
        <img src={Profilecircle} alt="" className=" w-4 md:w-6 mr-1 xl:mr-2" />
        {/* <HiOutlineUserCircle  className=" text-xl xl:text-2xl mr-1 xl:mr-2"/> */}
       <span className="hidden lg:block"> Login / Signup  </span>
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default AuthModal;
