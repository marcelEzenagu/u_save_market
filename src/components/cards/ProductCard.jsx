import React from "react";
import { PiMinus } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoAddOutline } from "react-icons/io5";
import { numberWithCommas, ReplaceImage } from "../../utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductStatus from "../ProductStatus";
import useCartOperationsHooks from "../../hooks/useCartOperationsHooks";
import useWishListOperationsHooks from "../../hooks/useWishListOperationsHooks";

const ProductCard = ({ item, category }) => {
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
    <div key={item.productID} className="text-sm font-[500] animate-fade-in">
      <div className="relative bg-white rounded-lg overflow-hidden h-[200px] group">
        <img
          src={item.image || ReplaceImage}
          alt={item.name}
          onError={ReplaceImage}
          className="w-full h-full object-contain"
        />
        <ProductStatus item={item} />
        {wishListItem ? (
          <div
            className="absolute top-2 right-4 flex space-x-2 duration-300"
            onClick={() => {
              handleRemoveFromWishList(item);
            }}
          >
            <button className="p-2 rounded-full shadow-md bg-white active:scale-95">
              <GoHeartFill className="w-4 h-4 text-red-600" />
            </button>
          </div>
        ) : (
          <div
            className="absolute top-2 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => {
              handleAddToWishList(item);
            }}
          >
            <button className="p-2 rounded-full shadow-md bg-regal-wishlist-gray active:scale-95">
              <GoHeart className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {item?.in_stock && (
          <div
            className={`absolute bottom-2 right-4 flex flex-row items-center bg-white rounded-full space-x-2 shadow-sm ${
              cartItem ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          >
            {cartItem ? (
              <>
                <button
                  className="p-2 active:scale-95 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
                  onClick={() => {
                    handleDecrement(cartItem);
                  }}
                >
                  <PiMinus className="w-4 h-4 text-white text-xs" />
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  className="p-2 active:scale-95 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
                  onClick={() => {
                    handleIncrement(cartItem);
                  }}
                >
                  <IoAddOutline className="w-4 h-4 text-white text-xs" />
                </button>
              </>
            ) : (
              <button
                className="p-2 active:scale-95 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue"
                onClick={() => {
                  handleAddToCart(item);
                }}
              >
                <IoAddOutline className="w-4 h-4 text-white text-xs" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="py-4">
        <Link
          className="text-sm font-[400] mb-3 line-clamp-2 "
          to={`/products/${category}/${item.name}`}
        >
          {item.name}
        </Link>
        <span className="text-xs text-regal-light-gray mb-3">
          {item.country}
        </span>
        <p className="text-regal-sky-blue font-[600] text-sm md:text-[16px] flex items-center gap-2 ">
          ₦{numberWithCommas(item?.price)}{" "}
          {item?.percentageOFF !== null ? (
            <s className="font-[400] text-xs text-regal-light-gray ">
              ₦ {numberWithCommas(item?.old_price)}
            </s>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
