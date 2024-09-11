import React, { useState } from 'react';
import { LuCalendarDays } from "react-icons/lu";
import { SlArrowDown } from "react-icons/sl";
import { countries } from '../../../data/mockData';
import { PiCopy } from "react-icons/pi";
import { IoIosCheckmarkCircle } from "react-icons/io";
function UserAccountTab({data}) {
    const [image, setImage] = useState(null); // State for the uploaded image
    const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const handleSelect = (country) => {
      setSelectedCountry(country);
      setIsOpenSelect(false); // Close dropdown after selection
    };

  
    // Handle image removal
    const handleImageRemove = () => {
      setImage(null); // Remove the image
    };
    return (
      <div className='p-4 md:px-8 md:pt-8 pb-4 animate-fade-in'>
        <div className="flex items-end space-x-4">
        <div className="relative">
          <img
            src={image || 'https://via.placeholder.com/150'} // Default image if no image is selected
            alt="Profile"
            className="w-[100px] h-[10] rounded-full object-cover border border-gray-300"
          />

        </div>
        <div className='flex flex-col items-start gap-4 '>
          <div className='flex items-center gap-1'>
          <IoIosCheckmarkCircle className='text-xl text-green-800' />
          <span className='text-sm text-green-800 font-[600]'>Verified</span>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <div className='flex items-center gap-1'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_17362_19693)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11 16C11.5304 16 12.0391 16.2107 12.4142 16.5858C12.7893 16.9609 13 17.4696 13 18C13 18.5304 12.7893 19.0391 12.4142 19.4142C12.0391 19.7893 11.5304 20 11 20C10.4696 20 9.96086 19.7893 9.58579 19.4142C9.21071 19.0391 9 18.5304 9 18C9 17.4696 9.21071 16.9609 9.58579 16.5858C9.96086 16.2107 10.4696 16 11 16ZM4.741 13C5.40404 13 6.03993 13.2634 6.50877 13.7322C6.97761 14.2011 7.241 14.837 7.241 15.5C7.241 16.163 6.97761 16.7989 6.50877 17.2678C6.03993 17.7366 5.40404 18 4.741 18C4.07796 18 3.44207 17.7366 2.97323 17.2678C2.50439 16.7989 2.241 16.163 2.241 15.5C2.241 14.837 2.50439 14.2011 2.97323 13.7322C3.44207 13.2634 4.07796 13 4.741 13ZM16.319 13.5C16.8494 13.5 17.3581 13.7107 17.7332 14.0858C18.1083 14.4609 18.319 14.9696 18.319 15.5C18.319 16.0304 18.1083 16.5391 17.7332 16.9142C17.3581 17.2893 16.8494 17.5 16.319 17.5C15.7886 17.5 15.2799 17.2893 14.9048 16.9142C14.5297 16.5391 14.319 16.0304 14.319 15.5C14.319 14.9696 14.5297 14.4609 14.9048 14.0858C15.2799 13.7107 15.7886 13.5 16.319 13.5ZM18.5 9.319C18.8978 9.319 19.2794 9.47704 19.5607 9.75834C19.842 10.0396 20 10.4212 20 10.819C20 11.2168 19.842 11.5984 19.5607 11.8797C19.2794 12.161 18.8978 12.319 18.5 12.319C18.1022 12.319 17.7206 12.161 17.4393 11.8797C17.158 11.5984 17 11.2168 17 10.819C17 10.4212 17.158 10.0396 17.4393 9.75834C17.7206 9.47704 18.1022 9.319 18.5 9.319ZM2.5 6C3.16304 6 3.79893 6.26339 4.26777 6.73223C4.73661 7.20107 5 7.83696 5 8.5C5 9.16304 4.73661 9.79893 4.26777 10.2678C3.79893 10.7366 3.16304 11 2.5 11C1.83696 11 1.20107 10.7366 0.732233 10.2678C0.263392 9.79893 0 9.16304 0 8.5C0 7.83696 0.263392 7.20107 0.732233 6.73223C1.20107 6.26339 1.83696 6 2.5 6ZM17.786 5.207C18.0512 5.207 18.3056 5.31236 18.4931 5.49989C18.6806 5.68743 18.786 5.94178 18.786 6.207C18.786 6.47222 18.6806 6.72657 18.4931 6.91411C18.3056 7.10164 18.0512 7.207 17.786 7.207C17.5208 7.207 17.2664 7.10164 17.0789 6.91411C16.8914 6.72657 16.786 6.47222 16.786 6.207C16.786 5.94178 16.8914 5.68743 17.0789 5.49989C17.2664 5.31236 17.5208 5.207 17.786 5.207ZM8 0C8.79565 0 9.55871 0.31607 10.1213 0.87868C10.6839 1.44129 11 2.20435 11 3C11 3.79565 10.6839 4.55871 10.1213 5.12132C9.55871 5.68393 8.79565 6 8 6C7.20435 6 6.44129 5.68393 5.87868 5.12132C5.31607 4.55871 5 3.79565 5 3C5 2.20435 5.31607 1.44129 5.87868 0.87868C6.44129 0.31607 7.20435 0 8 0ZM15.5 3C15.6326 3 15.7598 3.05268 15.8536 3.14645C15.9473 3.24021 16 3.36739 16 3.5C16 3.63261 15.9473 3.75979 15.8536 3.85355C15.7598 3.94732 15.6326 4 15.5 4C15.3674 4 15.2402 3.94732 15.1464 3.85355C15.0527 3.75979 15 3.63261 15 3.5C15 3.36739 15.0527 3.24021 15.1464 3.14645C15.2402 3.05268 15.3674 3 15.5 3Z" fill="#DE8208"/>
                </g>
                <defs>
                <clipPath id="clip0_17362_19693">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <span className='text-sm text-regal-warning font-[600]'>Pending</span>
            </div>
            <span className='w-2 h-2 rounded-full bg-gray-200'></span>

            <div className='flex items-center gap-1'>
          <LuCalendarDays  className='text-xl text-regal-sky-blue' />
          <u className='text-sm text-regal-sky-blue  font-[600] '>Schedule Meeting</u>
          </div>
          </div>
            <button
              onClick={handleImageRemove}
              className="flex items-center  px-8 p py-1 md:py-1  space-x-1 text-red-600 border border-red-600 bg-white rounded-md"
            >
              <span className='font-[600] text-[10px] md:text-xs py-1'>Disable account</span>
            </button>
       
        </div>
      </div>
  
      <section className='max-w-[800px] overflow-hidden'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-4">
      <div className="mb-1 col-span-2">
                <label
                  htmlFor="Business Name"
                  className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                 Business Name
                </label>
                <input
                  type="text"
                  name="text"
                  id="Business Name"
                  placeholder="Trust Fund"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
              </div>
               <div className="mb-1 col-span-1">
                <label
                  htmlFor="Name"
                  className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                 First Name
                </label>
                <input
                  type="text"
                  name="text"
                  id="Name"
                  placeholder="Enter name"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
              </div>
              <div className="mb-1 col-span-1">
                <label
                  htmlFor="Name"
                  className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="text"
                  id="Name"
                  placeholder="Enter name"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
              </div>
              <div className="mb-1  col-span-2">
              <label
                htmlFor="phone"
                       className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
              >
                Phone 
              </label>
              <div className="relative mt-2 rounded-md ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <spanclassName="text-gray-500 sm:text-sm">$</span> */}
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center">
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
                      <SlArrowDown className="ml-1" />
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
                  name="phone"
                  id="phone"
                   className="w-full py-3 md:py-4 text-xs pl-28 md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                  placeholder="Phone"
                />
              </div>
            </div>
              <div className="mb-1 col-span-2">
                <label
                  htmlFor=" Home Address"
                  className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                 Home Address
                </label>
                <input
                  type="text"
                  name="text"
                  id=" Home Address"
                  placeholder="22, Anthony Cresent Avenue, Old Montane road, Ikoyi, Lagos"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
              </div>
              <div className="mb-1 col-span-2">
                <label
                  htmlFor="Email"
                  className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                  Email
                </label>
                <div className='relative'>
                <input
                  type="email"
                  name="text"
                  id="Email"
                  placeholder="Enter Email"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                <button className='absolute top-4 right-4 text-regal-black text-xl'>
                  <PiCopy />
                </button>
                </div>
              </div>
        
          
        </div>
            <button
            className="inline-block px-8  py-2 md:py-3 mt-8  text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-sm cursor-pointer">
                Update Details 
                
            </button>
      </section>
      </div>
    )
  }

export default UserAccountTab