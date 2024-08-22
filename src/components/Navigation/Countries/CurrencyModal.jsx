import React, { useState, useRef, useEffect} from 'react';
import { countries } from '../../../data/mockData'; // Assume you have a list of countries
import Moneys from '../../../assets/images/nav/icons/moneys.webp';
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
      <div className="fixed inset-0 bg-black w-full bg-opacity-75 flex justify-center items-center z-50 animated fadeInDown"
      >
        <div className="bg-white py-12 p-8 rounded-lg max-w-lg md:max-w-[600px] w-full  z-52" ref={dropdownRef}>
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
          <h2 className="text-xl font-bold text-regal-blue mb-3">Choose Currency</h2>
          <p className='text-[14px] font-[500] text-regal-black mb-6'>Select currency you’d like prices to be displayed in</p>
          <label htmlFor="search"  className='block mb-2 text-sm text-regal-black font-[500]'>Currency</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Select currency"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-4 px-4 border text-[14px] rounded-lg mb-4"
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
      </div>
    )
  );
};

function CurrencyModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className='hidden lg:flex items-center hover:text-regal-blue text-xs xl:text-sm text-regal-black cursor-pointer font-[500]'  onClick={() => setIsModalOpen(true)}>
                <img src={Moneys} alt="" className="w-4 md:w-6 mr-1 xl:mr-2" />
                {/* <PiMoneyWavy   className=" text-xl xl:text-2xl mr-1 xl:mr-2"  /> */}
                Currency
                </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default CurrencyModal;