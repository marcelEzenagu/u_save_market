import React, {useState,  useRef, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/nav/logo.webp";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { LiaBoxSolid } from "react-icons/lia";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaLaptopMedical } from "react-icons/fa6";
import SearchBarIcon from "../../assets/images/nav/icons/search-normal.webp";
import { IoSearchOutline } from "react-icons/io5";
import VendorDropdown from './Auth/VendorDropdown';
import { Items } from '../../data/mockData';
import { FaRegCheckCircle } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
function VendorNavigation() {
    const [active, setActive]= useState('');
    const [searchDiv, setSearchDiv] = useState(false);
    const location = useLocation();
    const handleSearchDiv = () => {
        setSearchDiv(!searchDiv)
    }
    useEffect(()=> {
      const activeLink = Links.filter((e)=> location?.pathname.includes(e?.url))
              if (activeLink.length > 0) {
                setActive(location.pathname);
              }
    }, [location])

    const Links = [
        {
            id: '1',
            name : 'Dashboard',
            url:'/vendor/home',
            image: <RxDashboard  className='text-lg  font-[600]' /> 
        },
        {
            id: '2',
            name : ' Products',
            url:'/vendor/products',
            image: <LiaBoxSolid  className='text-xl  font-[600]' /> 
        },
        {
            id: '3',
            name : 'Orders',
            url:'/vendor/orders',
            image: <FaLaptopMedical className='text-xl  font-[600]'  /> 
        },
        {
            id: '4',
            name : ' Analytics',
            url:'/vendor/analytics',
            image:  <TbBrandGoogleAnalytics className='text-lg  font-[600]' /> 
        },
        {
            id: '5',
            name : ' Payment',
            url:'/vendor/payment',
            image:  <TbBrandGoogleAnalytics className='text-lg  font-[600]' /> 
        },
    ]
  return (
    <header>
        <nav className="border-b-[1px] bg-white ">
        <div className="mx-auto py-3 px-4 flex max-w-[1366px]  flex-row justify-between items-center lg:container-fluid  ">

            
        <Link to="/vendor/home">
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
          <VendorDropdown/>
          {/* <img src="" alt="" className='w-9 h-9 rounded-full object-cover bg-gray-200' /> */}
          </div>
         </div>
        </nav>
    </header>
  )
}

function SearchForm(props) {
  const [query, setQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownOption, setDropdownOption] = useState("products"); // "orders" or "products"
  const [items, setItems] = useState([]); // This should be populated with your items
  const dropdownRef = useRef(null);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (event) => {
    setQuery(event.target.value);
    setDropdownVisible(true);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setQuery("");
        setDropdownVisible(false);
        props.handleSearchDiv();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle item selection
  const handleItemSelect = (item) => {
    setQuery("");
    setDropdownVisible(false);
    const queryParam = dropdownOption === "products" ? `products=${item.name}` : `orders=${item.name}`;
    navigate(`/vendor/search?${queryParam}`);

  };

  // Handle dropdown option change
  const handleOptionChange = (option) => {
    setDropdownOption(option);
    setQuery(""); // Clear query when changing options
    setIsOpenSelect(false);
  };

  // Filter items based on query and dropdown option
  const filteredItems = Items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <form
      action=""
      className="hidden lg:block xl:min-w-[500px] animate-fade-in"
      ref={dropdownRef}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          className="w-full py-2 pl-32 px-6 text-sm rounded-full border-2 focus:outline-none"
        />
          <div className="absolute inset-y-0 left-0 flex items-center">
              <div className="relative">
                {/* Dropdown button */}
                <button
                  type="button"
                  onClick={() => setIsOpenSelect(!isOpenSelect)}
                  className="w-full text-xs flex justify-between items-center border-r  pl-4 pr-1 py-2 bg-transparent text-gray-700"
                >
                 {dropdownOption}
                  <SlArrowDown className="ml-8 text-xs" />
                </button>

                {/* Dropdown menu */}
                {isOpenSelect && (
                  <ul className="absolute left-0 w-full bg-white border shadow-sm rounded-md p-2 mt-2 z-10 max-h-60 overflow-y-auto">
                   <li className='py-1 flex flex-row items-center justify-between'>
                   <button
                   type='button'
                    className={`text-xs  ${dropdownOption === "products" ? "text-regal-blue font-[600]" : ""}`}
                    onClick={() => handleOptionChange("products")}
                  >
                    Products
                  </button>
                  {dropdownOption === "products" &&
                  <FaRegCheckCircle  className={`text-xs  ${dropdownOption === "products" ? "text-regal-blue font-[600]"  : ""}`} />
                  }
                   </li>
                   <li className='py-1 flex flex-row items-center justify-between'>
                   <button
                   type='button'
                    className={`text-xs  ${dropdownOption === "orders" ? "text-regal-blue font-[600]"  : ""}`}
                    onClick={() => handleOptionChange("orders")}
                  >
                    Orders
                  </button>
                  {dropdownOption === "orders" &&  <FaRegCheckCircle  className={`text-xs ${dropdownOption === "orders" ? "text-regal-blue font-[600]"  : ""}`} /> }
                 
                   </li>
                  </ul>
                )}
              </div>
            </div>
        <button
          type="button"
          className="absolute right-[0.1rem] top-1/2 -translate-y-1/2 p-3 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
        >
          <img src={SearchBarIcon} alt="Search Icon" className='w-4' />
          {/* <IoSearchOutline className='text-white text-2xl' /> */}
        </button>
        {dropdownVisible && (
        <div className="absolute top-16 z-50 bg-white p-4 w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 shadow-md">
            <div className="flex flex-row justify-between items-center gap-2 py-2">
              <p className="text-sm font-[600]">Recent searches </p>
              <button className="text-sm font-[600] text-regal-sky-blue">
                Clear
              </button>
            </div>
            <div>
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
                    onClick={() => handleItemSelect(item)}
                  >
                    <IoSearchOutline />
                    <p className="text-xs font-[400]">{item.name}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No results found</p>
              )}
            </div>
          </div>
                )}
      </div>
    </form>
  );
}

export default VendorNavigation