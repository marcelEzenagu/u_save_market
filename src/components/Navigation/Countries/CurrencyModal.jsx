import React, { useState, useRef, useEffect} from 'react';
import { countries } from '../../../data/mockData'; // Assume you have a list of countries
import Moneys from '../../../assets/images/nav/icons/moneys.webp';
import { IoCloseCircleOutline } from "react-icons/io5";
import { PiMoneyWavy } from "react-icons/pi";
const Modal = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const filteredCountries = countries.filter(country =>
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
  <div className="flex items-center bg-gray-200 py-2 px-4  justify-between lg:hidden">
            <span className="flex items-center w-10 ">
              {" "}
              <img
                src={Moneys}
                alt=""
                className="w-6 mr-1 xl:mr-2"
              />{" "}
              <span className="font-[500] text-sm"> Currency </span>{" "}
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
          <h2 className="text-lg lg:text-xl font-bold text-regal-blue mb-2 lg:mb-3">Choose Currency</h2>
          <p className="text-xs lg:text-[14px] font-[500] text-regal-black mb-4">Select currency you’d like prices to be displayed in</p>
          <label htmlFor="search"  className='hidden lg:block mb-2 text-sm text-regal-black font-[500]'>Currency</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Select currency"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           className="w-full py-4 px-4 border text-xs md:text-[14px] rounded-lg mb-4"
          />

          <p className=' text-sm text-regal-black font-[600] mb-4'> 
          Recently used currencies
          </p>
          <ul className="max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => (
              <li key={country.code} className="flex items-center py-2 my-2 px-2 cursor-pointer hover:font-[700] hover:text-regal-blue hover:bg-regal-secondary-light"
              onClick={()=> setSearch(`${country.currency} ${country.name}`)}
              >
                 <span className='text-sm font-[400] mr-2'>{country.currency}</span>
                <span className='text-sm font-[400]'>{country.name}</span>
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

function CurrencyModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
       <button
        className="flex items-center hover:text-regal-blue text-sm xl:text-sm text-regal-black cursor-pointer font-[500]"
        onClick={() => setIsModalOpen(true)}
      >
                <img src={Moneys} alt="" className="w-4 md:w-6 mr-1 xl:mr-2" />
                {/* <PiMoneyWavy   className=" text-xl xl:text-2xl mr-1 xl:mr-2"  /> */}
                Currency
                </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default CurrencyModal;