import React, { useState, useRef, useEffect } from 'react';
import { Items } from '../../../data/mockData';
import { LuCalendarDays } from "react-icons/lu";
import { PiTrash } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";
import { PiMinus } from "react-icons/pi";
import { Link } from 'react-router-dom';
import {numberWithCommas} from '../../../utils'
import Shoppingcart from '../../../assets/images/nav/icons/shoppingcart.webp';
const CartDropdown = () => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
  let total = 0; 

 
  return (
    <div className="relative inline-block text-left">
      {/* Cart Icon / Button */}
      <button
        onClick={toggleDropdown}
       className=' flex items-center hover:text-regal-blue text-xs xl:text-sm text-regal-black cursor-pointer font-[500] bg-active-gray py-2 px-3 rounded-md'
      >
        <div className='relative'>
        <img src={Shoppingcart} alt=""  className="w-4 md:w-6 mr-1 xl:mr-2" />
        <span className='absolute bottom-2 right-0 text-white  text-[10px] font-[500] w-5 h-5 rounded-full bg-red-600 flex flex-col items-center justify-center'>
        {Items.length}
        </span>
        </div>
        Cart
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-[400px] 
            rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50
            border border-t-regal-blue border-t-4 animated fadeInDown
            "
          ref={dropdownRef}
        >
            <div className='flex flex-row items-center justify-between p-4 border-b'>
            <div className='flex flex-row items-center gap-2'>
                <span className='w-8 h-8 flex flex-col items-center justify-center bg-regal-light-item-color rounded-full'>
                <LuCalendarDays />
                </span>
                <h2 className='font-[600] text-sm '>Mon, 16th Aug</h2>
            </div>
            <p className='text-sm font-[600] text-regal-blue '>
            {Items.length} item{Items.length > 1 ? 's': ''}
            </p>
            </div>
          <div className="p-4 ">
            <div className=" max-h-96 overflow-y-scroll">
        {Items.length > 0 ? (
              <div>
                {Items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 mb-4  pb-2"
                  >
                    {/* Item Image */}
                    <div className='flex items-center gap-3'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="font-[400] w-48 text-xs md:text-sm">{item.name}</span>
                      <span className="text-regal-sky-blue font-[400] text-xs md:text-sm">₦{numberWithCommas(item.price)}</span>
                    </div>
                    </div>
                 
                    {/* Item Details */}
               
                    <div className="flex flex-row items-center gap-2">
                        <button className='active:scale-95'>{item.quantity > 1 ?   <PiMinus /> :<PiTrash /> }</button>
                    <span className="text-gray-600">1</span>
                    <button  className='active:scale-95'><IoAddOutline/></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-2">Your cart is empty.</div>
            )}    
            </div>
            {/* Cart Actions */}
            {Items.length > 0 && (
              <div className="flex justify-between mt-4">
                <Link
                to="/cart"
                  className="bg-regal-sky-blue text-white flex flex-row items-center justify-between px-4  py-2 font-bold w-full rounded-md hover:bg-blue-600 transition"
                >
                  Go to cart <span>{total}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage of CartDropdown
const cartItems = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://via.placeholder.com/50',
    price: 10.99,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://via.placeholder.com/50',
    price: 15.99,
    quantity: 1,
  },
];

export default CartDropdown;
