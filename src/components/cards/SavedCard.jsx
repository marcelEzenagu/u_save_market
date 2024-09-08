import React from "react";
import { numberWithCommas, ReplaceImage } from "../../utils";
import useCartOperationsHooks from "../../hooks/useCartOperationsHooks";
import useWishListOperationsHooks from "../../hooks/useWishListOperationsHooks";
import { FaTrashAlt } from "react-icons/fa";
import ProductStatus from "../ProductStatus";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function SaveCard({ item }) {

  const { handleAddToCart, handleIncrement, handleDecrement } =
  useCartOperationsHooks();
const {
  handleAddToWishList,
  handleRemoveFromWishList,
} = useWishListOperationsHooks();
const cart = useSelector((state) => state.cart.items);
const cartItem = cart.find(
  (cartItem) => cartItem.productID === item?.productID
);
const wishList = useSelector((state) => state?.user.wishList);
const wishListItem = wishList.find(
  (cartItem) => cartItem.productID === item?.productID
);
  return (
    <div
      key={item.id}
      className="text-xs font-[500] animate-fade-in w-[150px] mt-4 mx-auto"
    >
      <div className="relative bg-white  rounded-lg h-[200px]  overflow-hidden">
        <img
          src={item.image || ReplaceImage}
          alt={item.name}
          onError={ReplaceImage}
          className="w-full h-full object-contain"
        />

        <ProductStatus item={item} />
        {wishListItem && (
        <div className="absolute top-2 right-4 flex space-x-2">
          <button className="p-2  rounded-full shadow-md bg-regal-wishlist-gray" 
            onClick={() => {
              handleRemoveFromWishList(item);
            }}
          >
            <FaTrashAlt className=" text-white text-xs" />
          </button>
        </div>
           ) }
      </div>
    

      <div className="flex flex-col gap-2">
        <Link className="text-xs font-[500]  mb23 line-clamp-2 "
         to={`/products/${item.name}`}
        >{item.name}</Link>

        <p className="text-regal-black font-[600] text-xs md:text-[14px] flex items-center gap-2  ">
          ₦{numberWithCommas(item.price)}
          {item?.percentageOFF !== null ? (
            <s className="font-[400] text-xs text-regal-light-gray ">
              ₦ {numberWithCommas(item?.old_price)}
            </s>
          ) : (
            ""
          )}
        </p>
        {item?.in_stock && 
        cartItem ? 
        <button className="w-full py-2 rounded-md  text-white bg-green-600">
        In Cart
      </button>
        : 
        <button className="w-full py-2 rounded-md  text-white bg-regal-sky-blue active:scale-95 "
        onClick={() => {
          handleAddToCart(item);
        }}
        >
        Buy
      </button>
         
        }
      </div>
    </div>
  );
}

export default SaveCard;
