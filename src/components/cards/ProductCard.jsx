import React from 'react'
import { PiMinus } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { IoAddOutline } from "react-icons/io5";
import {numberWithCommas, ReplaceImage} from '../../utils'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useCartOperationsHooks from '../../hooks/useCartOperationsHooks';
const ProductCard = ({ item, category }) => {
  const {handleAddToCart, handleIncrement, handleDecrement } = useCartOperationsHooks();
  const cart = useSelector((state) => state.cart.items);
  const cartItem = cart.find((cartItem) => cartItem.productID === item?.productID);
  return (
    <div key={item.productID} className="text-sm font-[500] animate-fade-in">
      <div className="relative bg-white rounded-lg overflow-hidden h-[200px] group">
        <img
          src={item.image  || ReplaceImage}
          alt={item.name}
          onError={ReplaceImage}
          className="w-full h-full object-contain"
        />

        <div className="absolute top-2 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 rounded-full shadow-md bg-regal-wishlist-gray">
            <GoHeart className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className={`absolute bottom-2 right-4 flex flex-row items-center bg-white rounded-full space-x-2 shadow-sm ${cartItem ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
          {cartItem ? (
            <>
              <button
                className="p-2 active:scale-95 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
                onClick={() => {handleDecrement(cartItem)}}
              >
                <PiMinus className="w-4 h-4 text-white text-xs" />
              </button>
              <span>{cartItem.quantity}</span>
              <button
                className="p-2 active:scale-95 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
                onClick={()=>{handleIncrement(cartItem)}}
              >
                <IoAddOutline className="w-4 h-4 text-white text-xs" />
              </button>
            </>
          ) : (
            <button
              className="p-2 active:scale-95 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
              onClick={()=>{handleAddToCart(item)}}
            >
              <IoAddOutline className="w-4 h-4 text-white text-xs" />
            </button>
          )}
        </div>
      </div>

      <div className="py-4">
        <Link
          className="text-sm font-[400] mb-4 line-clamp-3 min-h-[60px]"
          to={`/products/${category}/${item.name}`}
        >
          {item.name}
        </Link>
        <p className="text-regal-sky-blue font-[600] text-sm md:text-[16px] ">
          ₦{numberWithCommas(item.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard