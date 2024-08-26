import React, {useState,  useRef, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import Logo from "../../assets/images/nav/logo.webp";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { LiaBoxSolid } from "react-icons/lia";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaLaptopMedical } from "react-icons/fa6";
import SearchBarIcon from "../../assets/images/nav/icons/search-normal.webp";
import { IoSearchOutline } from "react-icons/io5";
function VendorNavigation() {
    const [active, setActive]= useState('');
    const [searchDiv, setSearchDiv] = useState(false);
    const location = useLocation();
    const handleSearchDiv = () => {
        setSearchDiv(!searchDiv)
    }
    useEffect(()=> {
          setActive(location.pathname);
    }, [location])

    const Links = [
        {
            id: '1',
            name : 'Dashboard',
            url:'/vendor/dashboard/home',
            image: <RxDashboard  className='text-lg  font-[600]' /> 
        },
        {
            id: '2',
            name : ' Products',
            url:'/vendor/dashboard/products',
            image: <LiaBoxSolid  className='text-xl  font-[600]' /> 
        },
        {
            id: '3',
            name : 'Orders',
            url:'/vendor/dashboard/orders',
            image: <FaLaptopMedical className='text-xl  font-[600]'  /> 
        },
        {
            id: '4',
            name : ' Analytics',
            url:'/vendor/dashboard/analytics',
            image:  <TbBrandGoogleAnalytics className='text-lg  font-[600]' /> 
        },
        {
            id: '5',
            name : ' Payment',
            url:'/vendor/dashboard/analytics',
            image:  <TbBrandGoogleAnalytics className='text-lg  font-[600]' /> 
        },
    ]
  return (
    <header>
        <nav className="border-b-[1px] bg-white ">
        <div className="mx-auto py-3 px-4 flex max-w-[1366px]  flex-row justify-between items-center lg:container-fluid  ">

            
        <Link to="/">
              <img
                src={Logo}
                alt=""
                className=" w-[100px] md:w-[140px] lg:w-[140px]"
              />
            </Link>
        {!searchDiv && <ul className='hidden lg:flex flex-row items-center space-x-6  animate-fade-in '>
            {Links?.map((e, index) => (
        <li key={index} className="relative w-full">
        <Link
            to={e?.url}
            className={`text-regal-light-gray text-xs md:px-6 font-[600] after:scale-x-0 ${ active === e?.url ? 'text-regal-sky-blue  after:scale-x-100': 'hover:text-regal-sky-blue  hover:after:scale-x-100' }  flex flex-row items-center gap-2 relative after:content-[''] after:absolute after:left-0 after:bottom-[-26px] after:w-full after:h-[4px] after:bg-regal-sky-blue after:rounded-full  after:origin-left after:transition-transform after:duration-300 after:ease-in-out`}
        >
            {e.image}
            {e?.name}
        </Link>
    </li>
    
            ))}

          </ul>}
    

          <div className='flex flex-row gap-4 items-center'>
            {!searchDiv ? <FiSearch className='text-regal-black text-lg cursor-default' onClick={handleSearchDiv} /> : <SearchForm handleSearchDiv={handleSearchDiv}/> }
          
         
          <FaRegBell className='text-regal-black text-lg' />
          <img src="" alt="" className='w-9 h-9 rounded-full object-cover bg-gray-200' />
          </div>
         </div>
        </nav>
    </header>
  )
}

function SearchForm(props) {
    const [query, setQuery] = useState(""); // State to track the input value
    const dropdownRef = useRef(null);
    // Handle input change
    const handleChange = (event) => {
      setQuery(event.target.value);
    };
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setQuery("");
          props.handleSearchDiv()
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
        className="hidden lg:block xl:min-w-[400px] animate-fade-in "
        ref={dropdownRef}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleChange}
            className="w-full py-2 px-6 text-sm rounded-full border-2 focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-[0.1rem] top-1/2 -translate-y-1/2 p-3 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
          >
            <img src={SearchBarIcon} alt="Search Icon" className='w-4' />
            {/* <IoSearchOutline   className='text-white text-2xl'/> */}
          </button>
          {query && ( // Show dropdown only if query is not empty
            <div className="absolute top-16 z-50 bg-white p-4 w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 shadow-md">
              <div className="flex flex-row justify-between items-center gap-2 py-2">
                <p className="text-sm font-[600]">Recent searches </p>
                <button className="text-sm font-[600] text-regal-sky-blue">
                  Clear
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <IoSearchOutline />
                  <p className="text-xs font-[400]">Dropdown Item 1</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    );
  }

export default VendorNavigation