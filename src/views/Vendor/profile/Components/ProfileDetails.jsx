import React, { useState } from 'react';
import { PiTrash } from "react-icons/pi";
import { SlArrowDown } from "react-icons/sl";
import { countries } from '../../../../data/mockData';
function ProfileDetails() {
  const [image, setImage] = useState(null); // State for the uploaded image
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpenSelect(false); // Close dropdown after selection
  };
  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setImage(null); // Remove the image
  };
  return (
    <div className='p-4 md:p-8 animate-fade-in'>
      <div className="flex items-center space-x-4">
      <div className="relative">
        <img
          src={image || 'https://via.placeholder.com/150'} // Default image if no image is selected
          alt="Profile"
          className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
        />
        {image && (
          <button
            onClick={handleImageRemove}
            className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
            title="Remove image"
          >
            <PiTrash />
          </button>
        )}
      </div>
      <div className='flex flex-row items-center gap-4 '>
        <label className="block text-[10px] md:text-xs font-medium  text-gray-700">
          <span className="inline-block px-4  py-2 md:py-3  text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-md cursor-pointer">
            Change Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </span>
        </label>
        {image && (
          <button
            onClick={handleImageRemove}
            className="flex items-center  px-4 p py-1 md:py-2  space-x-1 border-[1.5px] text-regal-light-gray border-regal-light-gray rounded-md"
          >
            <PiTrash className='text-lg ' />
            <span className='font-[600] text-[10px] md:text-xs py-1'>Remove</span>
          </button>
        )}
      </div>
    </div>

    <section className='max-w-[800px] overflow-hidden'>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-4">
             <div className="mb-1 col-span-2">
              <label
                htmlFor="Name"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Name
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
                     className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
            >
              Phone Number
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
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
                htmlFor="Email"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Email
              </label>
              <input
                type="email"
                name="text"
                id="Email"
                placeholder="Enter Email"
                className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              />
            </div>

            <div className="mb-1 col-span-2">
              <label
                htmlFor="HomeAddress"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Home Address
              </label>
              <input
                type="text"
                name="HomeAddress"
                id="HomeAddress"
                placeholder="Enter Home Address"
                className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              />
            </div>
      </div>

    </section>
    </div>
  )
}

export default ProfileDetails