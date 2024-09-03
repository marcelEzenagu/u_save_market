import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { countries } from "../../../data/mockData";
function Shippinginfo(props) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpenSelect(false); // Close dropdown after selection
  };
  return (
    <div className="px-4  md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-5">
          <div className="mb-1 col-span-2 md:col-span-1">
            <label
              htmlFor="firstName"
              className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
            >
              First Name
            </label>
            <input
              type="text"
              value={props.data?.firstName}
              onChange={props.handleChange}
              name="firstName"
              id="text"
              placeholder="Enter First Name"
              className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray "
              required
            />
          </div>
          <div className="mb-1 col-span-2 md:col-span-1">
            <label
              htmlFor="lastName"
              className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={props.data?.lastName}
              onChange={props.handleChange}
              id="text"
              placeholder="Enter Last Name"
              className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
            required
              />
          </div>

          <div className="mb-1  col-span-2 md:col-span-1">
            <label
              htmlFor="phoneNumber"
              className="block text-xs md:text-sm  font-[700]  leading-6 mb-2 text-regal-black"
            >
              Phone
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {/* <spanclassName="text-gray-500 sm:text-sm">$</span> */}
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center">
                <div className="relative">
                  {/* Dropdown button */}
                  <button
                  type="button"
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
                name="phoneNumber"
                id="phoneNumber"
                value={props.data?.phoneNumber}
                onChange={props.handleChange}
                className="w-full py-3 pl-28 text-xs md:text-sm border rounded-sm bg-transparent text-regal-crum-gray focus:outline-none"
                placeholder="Phone"
                required
              />
            </div>
          </div>
          <div className="mb-1 col-span-2 md:col-span-1">
            <label
              htmlFor="email"
              className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={props.data?.email}
              onChange={props.handleChange}
              placeholder="Enter Email"
              className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                required
            />
          </div>
          <div className="mb-1 col-span-2">
            <label
              htmlFor="street"
              className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
            >
              Street Name
            </label>
            <input
              type="text"
              name="street"
              value={props.data?.street}
              onChange={props.handleChange}
              id="text"
              placeholder="Enter Street Name"
              className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
            required
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="country"
              className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
            >
              Country
            </label>
            <select
              name="country"
              id="country"
              value={props.data?.country}
              onChange={props.handleChange}
              placeholder="Enter Country"
              className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
           required
            >
              <option value="">Enter Country</option>
              <option >Nigeria</option>
              <option >usa</option>
            </select>
          </div>
          <div className="mb-1">
            <label
              htmlFor="city"
              className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
            >
              City
            </label>
            <select
              name="city"
              id="city"
              value={props.data?.city}
              onChange={props.handleChange}
              placeholder="Enter City"
              className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
            >
              <option value="">Enter City</option>
              <option >oshodi isolo</option>
            </select>
          </div>
          <div className="mb-1">
            <label
              htmlFor="state"
              className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
            >
              State/Region
            </label>
            <select
              name="state"
              id="state"
              value={props.data?.state}
              onChange={props.handleChange}
              placeholder="Enter State/Region"
              className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
            >
              <option value="">Enter State</option>
              <option>Lagos</option>
              <option >Imo</option>
            </select>
          </div>
          <div className="mb-1">
            <label
              htmlFor="zipCode"
              className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
            >
              Zip Code
            </label>
            <input
              name="zipCode"
              id="zipCode"
              value={props.data?.zipCode}
              onChange={props.handleChange}
              placeholder="Enter Zip Code"
              className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
            />
          </div>
        </div>
        <div className="flex items-center my-4">
          <input type="checkbox" id="checkbox" name="checkbox" />
          <label
            htmlFor="checkbox"
            class=" text-xs  font-[500]  leading-6 mx-2 text-regal-black"
          >
            Set as default
          </label>
        </div>
        <div className="w-full mb-14">
          <button className="py-3 px-10 float-end text-xs md:text-sm active:scale-95 font-[500] text-white rounded-md bg-regal-sky-blue"
           type="button"
          onClick={()=>{props.setActiveTab('2')}}
          >
            Save and Continue
          </button>
        </div>
    </div>
  );
}

export default Shippinginfo;
