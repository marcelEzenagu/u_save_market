import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moneys from '../../../assets/images/nav/icons/moneys.webp';
import { IoCloseCircleOutline } from "react-icons/io5";
import { useUpdateUserMutation , useGetExchangeRateQuery} from '../../../features/auth/authApiSlice';
import { setCurrency } from '../../../features/auth/authSlice';
import { FaCheckCircle } from "react-icons/fa";
import { setExchangeRate } from '../../../features/auth/authSlice';
const Modal = ({ isOpen, onClose, onCurrencySelect, errorMsg, preferredCurrency, isLoading, dispatch }) => {
  const countries = useSelector((state) => state?.auth?.countries);
  const [search, setSearch] = useState('');
  const {data:getExchangeRate, isSuccess } = useGetExchangeRateQuery(preferredCurrency?.currency_code,{
    skip : !preferredCurrency?.currency_code,
  });
  const filteredCurrencies =(countries || []).filter((country) =>
    search === "" || country?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const [pickedCurrency, setPickedCurrency] = useState(preferredCurrency);
  const dropdownRef = useRef(null);
  useEffect(()=>{
    setPickedCurrency(preferredCurrency)
  }, [preferredCurrency])
  
  useEffect(()=> {
    if (isSuccess && getExchangeRate && preferredCurrency) {
      dispatch(setExchangeRate({
        ...getExchangeRate, 
        currency : preferredCurrency?.currency
      }));
    }
  }, [isSuccess, getExchangeRate, preferredCurrency]);
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
  }, [onClose]);
  const handleSelectedCurrency = () => {
    onCurrencySelect(pickedCurrency);
  } 
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black w-full bg-opacity-75 flex justify-center lg:items-center z-50 animated fadeInDown">
        <div
          className="bg-white lg:rounded-lg lg:max-w-[600px] w-full z-52"
          ref={dropdownRef}
        >
         
          <div className="flex items-center bg-gray-200 py-2 px-4 justify-between lg:hidden">
            <span className="flex items-center w-10">
              <img src={Moneys} alt="" className="w-6 mr-1 xl:mr-2" />
              <span className="font-[500] text-sm"> Currency </span>
            </span>
            <button onClick={onClose}>
              <IoCloseCircleOutline className="text-xl text-regal-black" />
            </button>
          </div>
          <div className="lg:pt-12 lg:pb-8 p-4 lg:p-8 relative">
            <h2 className="text-lg lg:text-xl font-bold text-regal-blue mb-2 lg:mb-3">Choose Currency</h2>
            <p className="text-xs lg:text-[14px] font-[500] text-regal-black mb-4">Select currency you’d like prices to be displayed in</p>
            <label htmlFor="search" className='hidden lg:block mb-2 text-sm text-regal-black font-[500]'>Currency</label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Select currency"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-4 px-4 border text-xs md:text-[14px] rounded-lg mb-4"
            />
            <p className='text-sm text-regal-black font-[600] mb-4'>Recently used currencies</p>
            <p className="text-red-700 text-sm mt-4 mb-1">{errorMsg}</p>
            <ul className="max-h-[50vh] lg:max-h-[300px] overflow-y-scroll w-full">
              {filteredCurrencies.map((country) => (
                <li
                  key={country.name}
                  className="flex items-center py-2 my-2 px-2 cursor-pointer hover:font-[700] hover:text-regal-blue hover:bg-regal-secondary-light"
                  onClick={() => setPickedCurrency(country)}
                >
                  <span className='text-sm font-[400] mr-2'>{country.currency}</span>
                  <span className="text-sm font-[400] w-full flex flex-row items-center justify-between">
                    {country.name} {pickedCurrency?.name?.toLowerCase() === country?.name?.toLowerCase() && <FaCheckCircle className="text-xl text-green-600" />}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className=" w-full px-4 pb-8 bg-white">
            {pickedCurrency && 
                        <button
              className="bg-regal-sky-blue text-white px-4 py-2 font-bold w-full rounded-md hover:bg-blue-600 transition"
              onClick={handleSelectedCurrency}
              disabled={isLoading}
            >
             {isLoading ? 'Saving...' : 'Apply'} 
            </button>
            }


          </div>
        </div>
      </div>
    )
  );
};

function CurrencyModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const preferredCurrency = useSelector((state) => state.auth?.preferredCurrency);
  const isLoggedIn = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const [updateUser, 
    {isLoading}
   ] = useUpdateUserMutation();
  const [errorMsg, setErrMsg] = useState('');

  useEffect(() => {
    const localStoragePreferredCurrency = JSON.parse(localStorage.getItem("preferredCurrency"));
    if (localStoragePreferredCurrency) {
      if (!preferredCurrency) {
        dispatch(setCurrency(localStoragePreferredCurrency));
      }
    }

    if (!preferredCurrency && !localStoragePreferredCurrency) {
    }
  }, [preferredCurrency, dispatch]);

  const handleCurrencySelect = async (currency) => {
    if (isLoggedIn) {
      try {
        // await updateUser({ preferredCurrency: currency.currency }).unwrap();
        dispatch(setCurrency(currency));
      } catch (err) {
        if (err?.status >= 400 && err?.status <= 404) {
          setErrMsg(err?.data?.message || "Failed to update user preferred currency");
        } else if (err?.status >= 500) {
          setErrMsg(err?.data?.message || "Server error");
        } else {
          setErrMsg("Failed to update user preferred currency");
        }
        console.error("Failed to update user preferred currency:", err);
      }
    } else {
      localStorage.setItem("preferredCurrency", JSON.stringify(currency));
      dispatch(setCurrency(currency));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="flex items-center hover:text-regal-blue text-sm xl:text-sm text-regal-black cursor-pointer font-[500]   truncate whitespace-nowrap"
        onClick={() => setIsModalOpen(true)}
      >
        {preferredCurrency?.currency ? <span className='text-sm mr-1'>{preferredCurrency?.currency }</span> :
         <img src={Moneys} alt="" className="w-4 md:w-6 mr-1 xl:mr-2" />
        }
       
        {preferredCurrency?.currencyName || 'Currency'}
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCurrencySelect={handleCurrencySelect}
        errorMsg={errorMsg}
        preferredCurrency={preferredCurrency}
        isLoading={isLoading}
        dispatch={dispatch}
      />
    </>
  );
}

export default CurrencyModal;
