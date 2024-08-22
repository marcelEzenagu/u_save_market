import React, { useState, useRef, useEffect } from "react";
import { countries } from "../../../data/mockData"; // Assume you have a list of countries
import Location from "../../../assets/images/nav/icons/location.webp";
import { IoCloseCircleOutline } from "react-icons/io5";
// import { HiOutlineLocationMarker } from "react-icons/hi";
const Modal = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );
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
      <div className="fixed inset-0 bg-black w-full bg-opacity-75 flex justify-center lg:items-center z-50 animated fadeInDown">
        <div
          className="bg-white  lg:rounded-lg  lg:max-w-[600px] w-full  z-52"
          ref={dropdownRef}
        >
          {/* <button
          
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
          <div className="flex items-center bg-gray-200 py-2 px-4  justify-between lg:hidden">
            <span className="flex items-center w-10 ">
              {" "}
              <img
                src={Location}
                alt=""
                className="w-6 mr-1 xl:mr-2"
              />{" "}
              <span className="font-[500] text-sm"> Country</span>{" "}
            </span>
            <button
              onClick={() => {
                onClose();
              }}
            >
              {/* Cancel Icon */}
              <IoCloseCircleOutline className="text-xl text-regal-black" />
            </button>
          </div>
          <div className="lg:py-12 p-4 lg:p-8 relative ">
            <h2 className="text-lg lg:text-xl font-bold text-regal-blue mb-2 lg:mb-3">
              Choose Country
            </h2>
            <p className="text-xs lg:text-[14px] font-[500] text-regal-black mb-4">
              Select a country to see goods that are allowed in that country
            </p>
            <input
              type="text"
              placeholder="Search for a country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-4 px-4 border text-xs md:text-[14px] rounded-lg mb-4"
            />
            <ul className="lg:max-h-60  overflow-y-auto">
              {filteredCountries.map((country) => (
                <li key={country.code} className="flex items-center py-2 ">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-8 h-6 mr-2"
                  />
                  <span className="text-sm font-[400]">{country.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute lg:hidden bottom-32  w-full  px-4 py-2 bg-white">
            <div className=" ">
              <button className="bg-regal-sky-blue text-white  px-4  py-2 font-bold w-full rounded-md hover:bg-blue-600 transition">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

function CountryModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center hover:text-regal-blue text-sm xl:text-sm text-regal-black cursor-pointer font-[500]"
        onClick={() => setIsModalOpen(true)}
      >
        {/* <HiOutlineLocationMarker     className=" text-xl xl:text-2xl mr-1 xl:mr-2"  /> */}
        <img src={Location} alt="" className="w-4 md:w-6 mr-1 xl:mr-2" />
        Enter Country
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default CountryModal;
