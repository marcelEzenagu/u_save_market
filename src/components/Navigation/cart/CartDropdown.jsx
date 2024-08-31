import React, { useState, useRef, useEffect } from "react";
import { Items } from "../../../data/mockData";
import { LuCalendarDays } from "react-icons/lu";
import { IoAddOutline } from "react-icons/io5";
import { PiMinus, PiTrash } from "react-icons/pi";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../../utils";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useGetUserCartQuery } from "../../../features/cart/cartApiSlice";
// import { BsCart2 } from "react-icons/bs";
import Shoppingcart from "../../../assets/images/nav/icons/shoppingcart.webp";
import {
  setCartItems,
  incrementItemInCart,
  decrementItemInCart,
  removeItemInCart,
} from "../../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useCartOperationsHooks from "../../../hooks/useCartOperationsHooks";
const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth?.user);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const {handleAddToCart, handleIncrement, handleDecrement, handleRemove } = useCartOperationsHooks();
  const {
    data: cartDetails,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUserCartQuery(user, {
    skip : user === null ? true : false
  });

  useEffect(() => {
    console.log(cartDetails, error);
    if (isSuccess, cartDetails) {
       dispatch(setCartItems(cartDetails?.products));
    }
  }, [cartDetails]);
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

 
  let total = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="relative inline-block text-left">
      {/* Cart Icon / Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center hover:text-regal-blue text-sm xl:text-sm text-regal-black cursor-pointer font-[500] lg:bg-active-gray py-2 lg:px-3 rounded-md"
      >
        <div className="relative">
          <img
            src={Shoppingcart}
            alt="Shopping Cart"
            className="w-6 lg:w-6 mr-1 xl:mr-2"
          />
          <span className="absolute bottom-4 right-0 text-white text-[8px] font-[500] w-4 h-4 rounded-full bg-red-600 flex items-center justify-center">
            {cart.length}
          </span>
        </div>
        <span className="hidden lg:block">Cart</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="origin-top-right fixed inset-0 lg:inset-auto lg:absolute z-40 lg:right-0 lg:mt-2 shadow-lg animated fadeInDown bg-white w-[100vw] lg:w-[400px] h-[100vh] lg:h-auto">
          <div className="bg-white">
            <div className="bg-gray-200 w-full flex lg:hidden items-center p-4 gap-3">
              <MdOutlineArrowBackIosNew onClick={toggleDropdown} />
              <span className="font-[500]">Cart</span>
            </div>
            <div
              ref={dropdownRef}
              className="bg-white border border-t-regal-blue border-t-4 lg:rounded-md"
            >
              <div className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex flex-row items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-regal-light-item-color rounded-full">
                    <LuCalendarDays />
                  </span>
                  <h2 className="font-[600] text-sm ">Mon, 16th Aug</h2>
                </div>
                <p className="text-sm font-[600] text-regal-blue">
                  {cart.length} item{cart.length > 1 ? "s" : ""}
                </p>
              </div>
              {isLoading ? (
                <div className="text-center py-2">loading...</div>
              ) : (
                <div className="p-4">
                  <div className="max-h-[500px] lg:max-h-96 overflow-y-scroll">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-4 mb-4 pb-2"
                        >
                          {/* Item Image */}
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div className="flex flex-col">
                              <span className="font-[400] w-48 text-xs md:text-sm">
                                {item.name}
                              </span>
                              <span className="text-regal-sky-blue font-[400] text-xs md:text-sm">
                                ₦{numberWithCommas(item.price)}
                              </span>
                            </div>
                          </div>
                          {/* Item Details */}
                          <div className="flex flex-row items-center gap-2">
                            <button
                              className="active:scale-95"
                              onClick={() => handleDecrement(item)}
                            >
                              {item.quantity > 1 ? <PiMinus /> : <PiTrash />}
                            </button>
                            <span className="text-gray-600">
                              {item.quantity}
                            </span>
                            <button
                              className="active:scale-95"
                              onClick={() => handleIncrement(item)}
                            >
                              <IoAddOutline />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-2">
                        Your cart is empty.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cart Actions */}
              <div className="absolute lg:relative bottom-0 mb-2 w-full px-4 py-2 bg-white">
                {cart.length > 0 && (
                  <div className="flex justify-between">
                    <Link
                      to="/cart"
                      className="bg-regal-sky-blue text-white flex items-center justify-between px-4 py-2 font-bold w-full rounded-md hover:bg-blue-600 transition"
                    >
                      Go to cart <span>₦{numberWithCommas(total)}</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
