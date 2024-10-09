import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Logo from "../../assets/images/nav/logo.webp";
import Globe from "../../assets/images/nav/icons/globe.webp";
import { IoCloseOutline, IoSearchOutline,IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import CountryModal from "./Countries/CountryModal";
import AuthModal from "./Auth/Auth";
import CartDropdown from "./cart/CartDropdown";
import CurrencyModal from "./Countries/CurrencyModal";
import UserDropdown from "./Auth/UserDropdown";
import SearchBarIcon from "../../assets/images/nav/icons/search-normal.webp";
import SearchIcon from "../../assets/images/nav/icons/mobile-search-normal.webp";
import { dataCategory, Items } from "../../data/mockData";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setCountries } from "../../features/auth/authSlice";
import { useUserWishListQuery } from "../../features/user/userApiSlice";
import { setWishList } from "../../features/user/userSlice";
import BottomLinks from "../Sidebar/BottomLinks";
import { useGetCountriesQuery } from "../../features/auth/authApiSlice";
import { useSearchItemsQuery } from "../../features/item/itemApiSlice";
function Navigation() {
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [activeUser, setActiveuser] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [showMessage, setShowMessage] = useState(false);
  const preferredCountry = useSelector(
    (state) => state?.auth?.preferredCountry
  );
  const dispatch = useDispatch();
  const { data: whishList, isSuccess } = useUserWishListQuery(user, {
    skip: !user,
  });
  const {data: countries, isSuccess: successResponse } = useGetCountriesQuery();
  const [countriesWithCurrency, setCountriesWithCurrency] = useState([]);
  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
  const countriesWithCurrency = data.map(country => ({
    name: country.name.common, 
    currency: country.currencies
      ? Object.keys(country.currencies).map(code => ({
          code,
          name: country.currencies[code]?.name,
          symbol: country.currencies[code]?.symbol
        }))
      : null, 
  }));
  setCountriesWithCurrency(countriesWithCurrency);

    })
    .catch(error => {
      console.error('Error fetching countries:', error);
    });
  }, [])

  useEffect(()=> {
      if (successResponse && countries && countriesWithCurrency.length > 0) {
      const filteredCountries = countries?.map(country => {
        const restCountries =  countriesWithCurrency?.find(c => c?.name?.toLowerCase() === country?.name?.toLowerCase());
        if (restCountries) {
          return {
            ...restCountries,
            code : country?.code,
            currency_code : country?.currency_code,
            name : restCountries?.name,
            number: country?.dialCode,
            currency:  restCountries?.currency?.length > 0 ?  restCountries?.currency[0]?.symbol : country?.currency_code,
            currencyName : restCountries?.currency?.length > 0 ?  restCountries?.currency[0]?.name : country?.name,
            flag: !country?.flag ? country?.flag : `https://flagcdn.com/w320/${country?.code?.toLowerCase()}.png`,
          }
        } else{
          return {
            ...country,
            currency: country?.currency_code,
            currencyName: country?.name,
            flag: !country?.flag ? country?.flag : `https://flagcdn.com/w320/${country?.code?.toLowerCase()}.png`,
          }
        }
      })

      dispatch(setCountries(filteredCountries));

      }
  }, [countries, successResponse, countriesWithCurrency]);

  useEffect(() => {
    if (user) {
      if (isSuccess && whishList) {
        const filteredProducts = whishList?.map(product => {
          const matchingItem = Items?.find(item => item.productID === product?.itemID);
          
          if (matchingItem) {
            return {
              ...matchingItem,
              productID: matchingItem.productID,
              id: product.id  // Include the id from itemsIDArray
            };
          }
          
          return null;
        }).filter(product => product !== null);
        dispatch(setWishList(filteredProducts || []));
      } else {
        dispatch(setWishList([]));
      }
    }
  }, [whishList, isSuccess, dispatch]);
 
  useLayoutEffect(() => {
    if (user !== null) {
      setActiveuser(true);
    } else {
      setActiveuser(false);
    }
  }, [user]);

  useEffect(() => {
    if (!preferredCountry) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [preferredCountry]);

  useEffect(() => {
    const lspc = JSON.parse(localStorage.getItem("preferredCountry"));

    if (!preferredCountry) {
      if (!lspc && !user) {
        setMobileDropdown(true);
      }
    }
    if (!preferredCountry ) {
      if(!lspc && !user ){
        setMobileDropdown(true);
      }
    }
  }, [preferredCountry, user, dispatch]);

  useEffect(() => {
    if(user && !preferredCountry ){
      setMobileDropdown(true);
    }
    if(user && preferredCountry){
      setMobileDropdown(false);
    }
  }, [user, preferredCountry])

  const onToggle = () => {
    setMobileDropdown(!mobileDropdown);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMobileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0  z-50 ">
      {showMessage && (
        <div className="w-full py-3  px-2 md:px-4 bg-regal-light-blue flex justify-between items-center">
          <div className="flex items-center justify-center flex-grow">
            <img src={Globe} alt="" className="hidden md:block md:mr-2" />
            <h3 className="hidden md:block text-[10px] sm:text-xs  text-regal-black xl:text-sm font-[500] text-center">
              Select a country to see goods that are allowed in that country
            </h3>
          </div>
          <div className="rounded-full w-6 h-6 bg-regal-gray-active flex flex-col items-center justify-center">
            <IoCloseOutline
              className="text-white  text-[1rem]"
              onClick={() => {
                setShowMessage(false);
              }}
            />
          </div>
        </div>
      )}

      <nav className="border-b-[1px] bg-white ">
        <div className="mx-auto py-3 px-2 md:px-4 flex max-w-[1366px]  flex-row justify-between items-center lg:container-fluid  ">
          <div className="flex flex-row justify-between items-center">
            <button
              id="mobile-open-button"
              className={`block hamburger lg:hidden focus:outline-none mr-2 mt-2  ${
                mobileDropdown && "open"
              }`}
              onClick={onToggle}
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>

            <Link to="/">
              <img
                src={Logo}
                alt=""
                className=" w-[100px] md:w-[140px] lg:w-[150px]"
              />
            </Link>
            <SearchForm  preferredCountry={preferredCountry}/>
          </div>

          <div className="flex flex-row-reverse lg:flex-row items-center gap-4">
            {activeUser && user !== null ? <UserDropdown /> : <AuthModal />}
            <div className="hidden lg:block">
              <CountryModal />
            </div>
            <div className="hidden lg:block">
              <CurrencyModal />
            </div>
            <CartDropdown />
            <SearchFormMobile preferredCountry={preferredCountry}  showMessage={showMessage}/>
          </div>
        </div>
        <div className="xl:hidden">
          <div
            id="menu"
            className={`absolute ${
              mobileDropdown ? "flex" : "hidden"
            }   flex-col bg-white items-start self-end py-8 space-y-6  sm:self-center w-full h-[100vh] drop-shadow-md`}
          >
            <div className="flex flex-col gap-3 px-4 pb-5 w-full border-b">
              <CountryModal />

              <CurrencyModal />
            </div>
            <div className=" flex flex-col items-start gap-6 px-4 mb-10">
              {dataCategory &&
                dataCategory.map((e, i) => (
                  <Link
                    to={`/products?name=${e.name?.toLowerCase()}`}
                    className="flex flex-row items-center gap-1 md:gap-2 cursor-pointer"
                    key={i}
                    onClick={() => {
                      setMobileDropdown(!mobileDropdown);
                    }}
                  >
                    <img src={e.image} alt="" className="w-5" />
                    <span className="text-regal-black text-sm capitalize font-[500]  ">
                      {e.name}
                    </span>
                  </Link>
                ))}
            </div>

                  <div className="px-4">
                    <BottomLinks/>
                  </div>

          </div>
        </div>
      </nav>
    </header>
  );
}

const SearchForm = React.memo(({preferredCountry}) => {
  const [query, setQuery] = useState(""); // State to track the input value
  const dropdownRef = useRef(null);
  const { data: searchItems, isLoading, isError } = useSearchItemsQuery({searchTerm : query,  country : preferredCountry?.name?.toLowerCase(), filter : "" }); // Use the search query hook

  // Handle input change
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      action=""
      className="hidden lg:block xl:min-w-[450px] relative mx-[2.5rem]"
      ref={dropdownRef}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          className="w-full py-2 px-6 rounded-full border-2 focus:outline-none"
        />
        <button
          type="button"
          className="absolute right-[0.1rem] top-1/2 -translate-y-1/2 p-3 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
        >
          <img src={SearchBarIcon} alt="Search Icon" />
        </button>
        {query && ( // Show dropdown only if query is not empty
          <div className="absolute top-16 z-50 bg-white p-4 w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 shadow-md">
            
            <div className="flex flex-row justify-between items-center gap-2 py-2">
              <p className="text-sm font-[600]">Recent searches </p>
              <button className="text-sm font-[600] text-regal-sky-blue">
                Clear
              </button>
            </div>
            {isLoading && <p className="text-center">Loading...</p>}
            {isError && <p className="text-red-500 text-center">Error fetching results.</p>}
            {searchItems?.length > 0 ? (
              searchItems.map((item) => (
                <div key={item.itemID} className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer">
                  <IoSearchOutline />
                  <p className="text-xs font-[400]">{item.itemName}</p>
                </div>
              ))
            ) : (
              <p className="text-center">No items found</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
});

const SearchFormMobile = React.memo(({preferredCountry, showMessage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchItems, isLoading, isError } = useSearchItemsQuery({searchTerm : searchQuery, country : preferredCountry?.name?.toLowerCase(), filter : ""}); // Use the search query hook

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const closeSearchModal = () => {
    setIsModalOpen(false);
    clearSearch();
  };

  return (
    <div className="relative">
      {/* Search Icon Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex lg:hidden items-center hover:text-regal-blue text-xs xl:text-sm text-regal-black cursor-pointer font-[500]"
      >
        {/* Search Icon */}
        <img src={SearchIcon} alt="" className="w-6 " />
      </button>

      {/* Search Modal */}
      {isModalOpen && (
        <div className="fixed lg:hidden inset-0 z-50 flex justify-center items-start">
          <div className="w-full">
            <div className="bg-white flex flex-row py-3 px-4 items-center gap-4">
              {/* Input Field with Cancel Button Inside */}
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder=""
                  className="w-full border text-regal-black border-regal-blue rounded-full py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-none text-sm"
                />
                <button
                  onClick={clearSearch}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {/* Cancel Icon */}
                  <IoCloseCircleOutline className="text-xl text-regal-black" />
                </button>
              </div>

              {/* Cancel Button by the Side */}
              <button
                onClick={closeSearchModal}
                className="text-regal-black font-[600] focus:outline-none"
              >
                Cancel
              </button>
            </div>
            {/* Search Results Dropdown */}
            {searchQuery && (
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg mx-4">
                {isLoading && <p className="text-center p-2">Loading...</p>}
                {isError && <p className="text-red-500 text-center p-2">Error fetching results.</p>}
                {searchItems?.length > 0 && isLoading == false ? (
                  searchItems.map((result) => (
                    <div
                      key={result.itemID}
                     className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                    >
                         <IoSearchOutline />
                      {result?.itemName}
                    </div>
                  ))
                ) : (
                  <p className="text-center p-2">No items found</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Navigation;
