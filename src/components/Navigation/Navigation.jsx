import React, {useState, useRef, useEffect} from 'react'
import Logo from '../../assets/images/nav/logo.webp';
import Globe from '../../assets/images/nav/icons/globe.webp';
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
// import { HiOutlineUserCircle } from "react-icons/hi2";
import CountryModal from './Countries/CountryModal';
import AuthModal from './Auth/Auth';
import CartDropdown from './cart/CartDropdown';
import CurrencyModal from './Countries/CurrencyModal';
import UserDropdown from './Auth/UserDropdown';
// import { BsCart2 } from "react-icons/bs";
import SearchBarIcon from '../../assets/images/nav/icons/search-normal.webp';
import SearchIcon from '../../assets/images/nav/icons/mobile-search-normal.webp';
import Profilecircle from "../../assets/images/nav/icons/profilecircle.webp";
import Shoppingcart from '../../assets/images/nav/icons/shoppingcart.webp';
function Navigation() {
const [mobileDropdown, setMobileDropdown] = useState(false)
const [activeUser , setActiveuser] = useState(true);
const onToggle =()=> {
  setMobileDropdown(!mobileDropdown);
}

const handleModel = () => {
  setMobileDropdown(!mobileDropdown)
}
  return (
   <header className='sticky top-0  z-50 '>
    <div className='w-full py-3 px-4 bg-regal-light-blue flex justify-between items-center'>
    <div className='flex items-center justify-center flex-grow'>
        <img src={Globe} alt="" className="hidden md:block md:mr-2" />
        <h3 className='text-[10px] sm:text-xs  text-regal-black xl:text-sm font-[500] text-center'>Select a country to see goods that are allowed in that country</h3>
    </div>
    <div className='rounded-full w-6 h-6 bg-regal-gray-active flex flex-col items-center justify-center'>
         <IoCloseOutline  className='text-white  text-[1rem]'/>
    </div>
    </div>
    <nav className='border-b-[1px] bg-white '>
        <div className='mx-auto py-3 px-4 flex max-w-[1366px]  flex-row justify-between items-center lg:container-fluid  '>
        <div className='flex flex-row justify-between items-center'>
        <button 
            id='mobile-open-button'
            className={`block hamburger lg:hidden focus:outline-none mr-2 mt-2  ${mobileDropdown && 'open'}`} onClick={onToggle}>
              <span className='hamburger-top'></span>
              <span className='hamburger-middle'></span>
              <span className='hamburger-bottom'></span>
            </button>

            <Link to='/'>
           <img src={Logo} alt="" className=' w-[100px] md:w-[140px] lg:w-[150px]' />
            </Link>
        <SearchForm />
        </div>

            <div className='flex flex-row-reverse lg:flex-row gap-4'>
         
              {activeUser ? <UserDropdown/> :  <AuthModal/>}
                <CountryModal/>
                <CurrencyModal/>
                <CartDropdown />
                  <SearchFormMobile />
            </div>

          {/* <div className='flex lg:hidden flex-row items-center gap-4'>
          <button
              className=" flex items-center hover:text-regal-blue text-xs xl:text-sm text-regal-black cursor-pointer font-[500]"
              onClick={() => handleModel(true)}
            >
             <img src={SearchIcon} alt=""  className="w-4 md:w-6 " />
            </button>

              <button
              className=" flex items-center hover:text-regal-blue text-xs xl:text-sm text-regal-black cursor-pointer font-[500]"
              onClick={() => handleModel(true)}
            >
             <img src={Shoppingcart} alt=""  className="w-4 md:w-6 " />
            </button>
            <button
              className=" flex items-center hover:text-regal-blue text-xs xl:text-sm text-regal-black cursor-pointer font-[500]"
              onClick={() => handleModel(true)}
            >
              <img src={Profilecircle} alt="" className=" w-4 md:w-6 " />
            </button>
          </div> */}
         

        
            </div>
            <div className='xl:hidden'>
              <div id="menu" className={`absolute ${mobileDropdown ? 'flex' : 'hidden'}   flex-col bg-white items-start self-end py-8 space-y-6  sm:self-center w-full h-[100vh] drop-shadow-md`}>
               {[1,2,3,4,5,6,7,8].map((e)=>(
                <a href="">Links</a>
               ))} 
              </div>
            </div>
    </nav>
   </header>
  )
}

function SearchForm() {
    const [query, setQuery] = useState(''); // State to track the input value
    const dropdownRef = useRef(null);
    // Handle input change
    const handleChange = (event) => {
      setQuery(event.target.value);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setQuery('');
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    return (
      <form action="" className="hidden lg:block xl:min-w-[450px] relative mx-[2.5rem]"     ref={dropdownRef}>
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
            {/* <IoSearchOutline   className='text-white text-2xl'/> */}
          </button>
          {query && ( // Show dropdown only if query is not empty
            <div className="absolute top-16 z-50 bg-white p-4 w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 shadow-md">
                <div className='flex flex-row justify-between items-center gap-2 py-2'>
                    <p className='text-sm font-[600]'>Recent searches </p>
                    <button className='text-sm font-[600] text-regal-sky-blue'>
                        Clear
                    </button>
                </div>
              <div>
                <div className='flex items-center gap-2'>
                <IoSearchOutline   />
                <p className='text-xs font-[400]'>Dropdown Item 1</p>
                </div>
              </div>
            
            </div>
          )}
        </div>
      </form>
    );
  }

  function SearchFormMobile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
  
      // Simulate search results - in a real app, you'd fetch these from an API
      if (query.length > 0) {
        setSearchResults(['Result 1', 'Result 2', 'Result 3']);
      } else {
        setSearchResults([]);
      }
    };
  
    const clearSearch = () => {
      setSearchQuery('');
      setSearchResults([]);
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
       className=" flex lg:hidden items-center hover:text-regal-blue text-xs xl:text-sm text-regal-black cursor-pointer font-[500]"
        >
          {/* Search Icon */}
          <img src={SearchIcon} alt=""  className="w-6 " />
        </button>
  
        {/* Search Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-start pt-6">
            <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
              {/* Input Field with Cancel Button Inside */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={clearSearch}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {/* Cancel Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 8.586l-4.95-4.95a1 1 0 00-1.414 1.414L8.586 10l-4.95 4.95a1 1 0 001.414 1.414L10 11.414l4.95 4.95a1 1 0 001.414-1.414L11.414 10l4.95-4.95a1 1 0 00-1.414-1.414L10 8.586z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
  
              {/* Cancel Button by the Side */}
              <button
                onClick={closeSearchModal}
                className="absolute top-2 right-2 text-gray-500 focus:outline-none"
              >
                Cancel
              </button>
  
              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="mt-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {searchResults.map((result, index) => (
                    <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
export default Navigation