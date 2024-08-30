import React from 'react'
import { PiMinus } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { IoAddOutline } from "react-icons/io5";
import {numberWithCommas} from '../../utils'
import { Link } from 'react-router-dom';
import {  addToCart, incrementItemInCart, decrementItemInCart, removeItemInCart } from '../../features/cart/cartSlice';
import { updateCartOnBackend, deleteCartItemOnBackend } from '../../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
const ProductCard = ({ item, category }) => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const cartItem = cart.find((cartItem) => cartItem.id === item.id);

  const handleAddToCart = async () => {
    dispatch(addToCart(item));
    dispatch(updateCartOnBackend(cart));
  };

  const handleIncrement = async () => {
    dispatch(incrementItemInCart(item.id));
    dispatch(updateCartOnBackend(cart));
  };

  const handleDecrement = async () => {
    if (cartItem.quantity > 1) {
      dispatch(decrementItemInCart(item.id));
      dispatch(updateCartOnBackend(cart));
    }else{
      handleRemove(item.id)
    }
  };

  const handleRemove = async (itemId) => {
    dispatch(removeItemInCart(itemId));
    dispatch(deleteCartItemOnBackend(itemId));
  };

  return (
    <div key={item.id} className="text-sm font-[500] animate-fade-in">
      <div className="relative bg-white rounded-lg overflow-hidden h-[200px] group">
        <img
          src={item.image}
          alt={item.name}
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
                onClick={handleDecrement}
              >
                <PiMinus className="w-4 h-4 text-white text-xs" />
              </button>
              <span>{cartItem.quantity}</span>
              <button
                className="p-2 active:scale-95 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
                onClick={handleIncrement}
              >
                <IoAddOutline className="w-4 h-4 text-white text-xs" />
              </button>
            </>
          ) : (
            <button
              className="p-2 active:scale-95 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
              onClick={handleAddToCart}
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