import React, { useState, useEffect, useRef, Fragment} from "react";
import { Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { LuListFilter } from "react-icons/lu";
import { Items } from "../../data/mockData";
import SidebarMobile from "../../components/Sidebar/SidebarMobile";
import ProductCard from "../../components/cards/ProductCard";
function Product() {
  const location = useLocation();
  const query = new URLSearchParams(location.search)
  const name = query.get('name');
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const toggleResultDropdown = () => setIsResultOpen(!isResultOpen);
  const togglePriceDropdown = () => setIsPriceOpen(!isPriceOpen);
  const toggleCountryDropdown = () => setIsCountryOpen(!isCountryOpen);

  const handleResultSelect = (result) => {
    setSelectedResult(result);
    setIsResultOpen(false);
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
    setIsPriceOpen(false);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
  };

  // Filter logic
  const filteredItems = Items.filter(item => {
    let isMatch = true;

    if (selectedResult) {
      // Apply result-specific filter logic here
      isMatch = isMatch && item.name.includes(selectedResult); // Example logic
    }

    if (selectedPrice) {
      if (selectedPrice === 'Low to High') {
        return item; // Sorted separately
      }
      if (selectedPrice === 'High to Low') {
        return item; // Sorted separately
      }
    }

    if (selectedCountry) {
      // Apply country-specific filter logic here
      isMatch = isMatch && item.name.includes(selectedCountry); // Example logic
    }

    return isMatch;
  });

  // Sorting based on Price
  if (selectedPrice === 'Low to High') {
    filteredItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (selectedPrice === 'High to Low') {
    filteredItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  return (
    <div>
      <main className="flex  flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <nav className="flex  text-gray-700 " aria-label="Breadcrumb">
          <div className="inline-flex items-center space-x-1 md:space-x-2">
            <Link
              to="/"
              className="text-regal-black text-xs md:text-sm font-[600] inline-flex items-center"
            >
              Home
            </Link>
            <SlArrowRight className="text-sm" />
            <span   className="text-regal-black text-xs md:text-sm font-[600] inline-flex items-center max-w-36 md:max-w-[180px] truncate whitespace-nowrap">
              All Results
            </span>
            <SlArrowRight className="text-sm" />
            <span className="text-regal-crum-gray text-xs md:text-sm font-[600] max-w-36 md:max-w-[180px] truncate whitespace-nowrap">
              {name}
            </span>
          </div>
        </nav>
        <div className="hidden lg:block">
        <FilterDropdown />
        </div>


      </main>
      <main>
        <SidebarMobile/>
      <div className="flex flex-row items-center justify-between lg:justify-normal space-y-2 sm:space-y-0 sm:space-x-4 my-2 lg:my-8">

        <span className="flex flex-row items-center text-regal-black mr-4">
        <LuListFilter className="text-lg mr-1" />  Filters:
        </span>
     {/* All Results Dropdown */}
     <div className="relative hidden lg:block">
          <button
            onClick={toggleResultDropdown}
            className="text-xs w-full px-3 py-2 inline-flex items-center text-regal-black font-[600] bg-active-gray rounded-md focus:outline-none"
          >
            All Results
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <Transition
            as={Fragment}
            show={isResultOpen}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute mt-2 w-full z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={() => handleResultSelect('Results 1')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Results 1
                </button>
                <button
                  onClick={() => handleResultSelect('Results 2')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Results 2
                </button>
              </div>
            </div>
          </Transition>
        </div>

        {/* Price Dropdown */}
        <div className="relative hidden lg:block">
          <button
            onClick={togglePriceDropdown}
            className="text-xs w-full px-3 py-2 inline-flex items-center text-regal-black font-[600] bg-active-gray rounded-md focus:outline-none"
          >
            Price
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <Transition
            as={Fragment}
            show={isPriceOpen}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute z-50 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={() => handlePriceSelect('Low to High')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Low to High
                </button>
                <button
                  onClick={() => handlePriceSelect('High to Low')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  High to Low
                </button>
              </div>
            </div>
          </Transition>
        </div>

        {/* Countries Dropdown */}
        <div className="relative hidden lg:block">
          <button
            onClick={toggleCountryDropdown}
            className="text-xs w-full px-3 py-2 inline-flex items-center text-regal-black font-[600] bg-active-gray rounded-md focus:outline-none"
          >
            Countries
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <Transition
            as={Fragment}
            show={isCountryOpen}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute mt-2 w-full z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={() => handleCountrySelect('USA')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  USA
                </button>
                <button
                  onClick={() => handleCountrySelect('Canada')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Canada
                </button>
                <button
                  onClick={() => handleCountrySelect('Germany')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Germany
                </button>
              </div>
            </div>
          </Transition>
        </div>
      <div className="block lg:hidden">
        <FilterDropdown />
        </div>
    </div>
      </main>
      <main className="lg:my-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredItems.map((item) => (
            <ProductCard item={item} key={item.id} category={name} />
          ))}
        </div>
      </main>
    </div>
  );
}
const options = [
  "Featured(default)",
  "Best Selling",
  "Price: Low to High",
  "Price: High to Low",
];

function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Featured(default)");
  const [checkedOptions, setCheckedOptions] = useState({});
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setCheckedOptions({
      ...checkedOptions,
      [event.target.value]: event.target.checked,
    });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="relative inline-block text-left md:w-[230px]"
      ref={dropdownRef}
    >
      <button
        type="button"
        className=" text-xs md:text-sm inline-flex items-center w-full justify-between px-4 py-1 text-regal-black  border border-regal-light-gray rounded-md  focus:outline-none "
        onClick={toggleDropdown}
      >
        <span className=" flex items-center font-[500]">
          <LuListFilter className="text-lg mr-1" />
          {selected}
        </span>
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="absolute right-0 z-10 mt-2  w-full origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            {options.map((option) => (
              <div
                key={option}
                className="flex flex-row items-center justify-between p-2 hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                <label className="text-regal-black text-sm cursor-pointer font-[500]">
                  {option}
                </label>

                <input
                  type="checkbox"
                  value={option}
                  checked={checkedOptions[option] || false}
                  onChange={handleCheckboxChange}
                  className="mr-2 h-4 w-4 font-[500] text-blue-600 focus:ring-blue-500 border-regal-black rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default Product;
