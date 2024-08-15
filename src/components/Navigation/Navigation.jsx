import React, {useState, useRef, useEffect} from 'react'
import Logo from '../../assets/images/nav/logo.webp';
import Globe from '../../assets/images/nav/icons/globe.webp';
import Searchicon from '../../assets/images/nav/icons/search-normal.webp';
import { IoCloseOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import CountryModal from './Countries/CountryModal';
import AuthModal from './Auth/Auth';
import CartDropdown from './cart/CartDropdown';
import CurrencyModal from './Countries/CurrencyModal';
function Navigation() {
const [mobileDropdown, setMobileDropdown] = useState(false)
const onToggle =()=> {
  setMobileDropdown(!mobileDropdown);
}
  return (
   <header className='sticky top-0  z-50 '>
    <div className='w-full py-3 px-4 bg-regal-light-blue flex justify-between items-center'>
    <div className='flex items-center justify-center flex-grow'>
        <img src={Globe} alt="" className="hidden md:mr-2" />
        <h3 className='text-xs  text-regal-black xl:text-sm font-[500] text-center'>Select a country to see goods that are allowed in that country</h3>
    </div>
    <div className='rounded-full w-6 h-6 bg-regal-gray-active flex flex-col items-center justify-center'>
         <IoCloseOutline  className='text-white  text-[1rem]'/>
    </div>
    </div>
    <nav className='border-b-[1px] bg-white '>
        <div className='mx-auto py-3 px-4 flex max-w-[1366px]  flex-row justify-between items-center lg:container-fluid  '>
        <div className='flex flex-row justify-between items-center'>
            <Link to='/'>
        <img src={Logo} alt="" className=' w-[100px] md:w-[150px]' />
            </Link>
        <SearchForm />
        </div>

            <div className='hidden lg:flex gap-8'>
               <AuthModal/>
                <CountryModal/>
                <CurrencyModal/>
                <CartDropdown />
            </div>

            <button 
            id='mobile-open-button'
            className={`block hamburger md:hidden focus:outline-none  ${mobileDropdown && 'open'}`} onClick={onToggle}>
              <span className='hamburger-top'></span>
              <span className='hamburger-middle'></span>
              <span className='hamburger-bottom'></span>
            </button>

        
            </div>
            <div className='xl:hidden'>
              <div id="menu" className={`absolute ${mobileDropdown ? 'flex' : 'hidden'}   flex-col bg-white items-start self-end py-8 mt-10 space-y-6 sm:w-auto sm:self-center left-6 right-6 drop-shadow-md`}>
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
            <img src={Searchicon} alt="Search Icon" />
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
                <CiSearch />
                <p className='text-xs font-[400]'>Dropdown Item 1</p>
                </div>
              </div>
            
            </div>
          )}
        </div>
      </form>
    );
  }
export default Navigation