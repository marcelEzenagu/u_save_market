import React, { useState, useMemo, useEffect } from "react";
import {  useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PiMinus, PiTrash } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";
import { GoHeart, GoHeartFill } from "react-icons/go";
import RelatedProduct from "../../components/RelatedProduct";
import CartImage from "../../assets/images/cart/Empty-cart.webp";
import { numberWithCommas, ReplaceImage } from "../../utils";
import useCartOperationsHooks from "../../hooks/useCartOperationsHooks";
import { useProduct } from "../../hooks/useProduct";
import useWishListOperationsHooks from "../../hooks/useWishListOperationsHooks";

const   baseUrl = import.meta.env.VITE_APP_API_URL
const CartItem = React.memo(

  ({ item, onDecrement, onIncrement, onRemove, lastItemId, exchangeRate }) => {
    const {
      handleAddToWishList,
      handleRemoveFromWishList,
    } = useWishListOperationsHooks();
    const wishList = useSelector((state) => state?.user.wishList);
    
    const wishListItem = wishList.find(
      (cartItem) => cartItem.productID === item?.productID
    );
    
    return (
      <div
        className={`flex items-center justify-between md:gap-4 py-8 px-1 md:px-2 ${
          lastItemId !== item.itemID && "border-b"
        }`}
      >
        <div className="flex items-center gap-3">
          <img
            src={item.images? `${baseUrl}${item.images[0]}`:ReplaceImage}
            alt={item.itemName}
            className="w-20 h-20 object-contain rounded-md"
          />
          <div className="flex flex-col">
            <span className="font-[500] max-w-[150px] md:max-w-[300px] text-xs md:text-sm">
              {item.itemName}
            </span>
            <div className="flex flex-row items-center gap-2 md:gap-4 mt-3 md:mt-5">
              <button
                className="text-regal-light-gray border-b-2 custom-text-line text-xs md:text-sm cursor-pointer"
                onClick={() => onRemove(item.itemID)}
              >
                Remove
              </button>
              {wishListItem ? (
              <button className="flex items-center gap-1 text-xs md:text-sm"
              onClick={() => {
                handleRemoveFromWishList(item);
              }}>
                <GoHeartFill className="text-sm md:text-xl text-red-600" />
                <span className="text-regal-light-gray border-b-2 custom-text-line cursor-pointer">
                  Saved In WishList
                </span>
              </button>
               ) : (
                <button className="flex items-center gap-1 text-xs md:text-sm"
                onClick={() => {
                  handleAddToWishList(item);
                }}
                > 
                <GoHeart className="text-sm md:text-xl text-regal-light-gray" />
                <span className="text-regal-light-gray border-b-2 custom-text-line cursor-pointer">
                  Save for later
                </span>
              </button>
               )}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <button className="active:scale-95" onClick={() => onDecrement(item)}>
            {item.quantity > 1 ? <PiMinus /> : <PiTrash />}
          </button>
          <span className="text-gray-600">{item.quantity}</span>
          <button className="active:scale-95" onClick={() => onIncrement(item)}>
            <IoAddOutline />
          </button>
        </div>
        <span className="text-regal-black font-[600] text-xs md:text-sm">
        {exchangeRate?.currency}{' '}{ numberWithCommas((
          (item?.newPrice ? item?.newPrice : item?.salesPrice) 
          * exchangeRate?.rate).toFixed(2))}
        </span>
      </div>
    );
  }
);

const OrderSummary = ({ total, itemCount, navigate,exchangeRate }) => {
  return (
    <div className="border shadow-sm bg-white py-4 rounded-md">
      <h5 className="text-sm text-regal-blue font-[700] px-4">Order Summary</h5>
      <div className="flex flex-row justify-between items-start m-4">
        <div>
          <h6 className="text-sm font-[500] text-regal-black">Subtotal</h6>
          <p className="text-xs font-[500] text-regal-light-gray">
            {itemCount} items
          </p>
        </div>
        <p className="text-sm font-[600] text-regal-black">
        {exchangeRate?.currency}{' '}{ numberWithCommas((total * exchangeRate?.rate).toFixed(2))}{" "}
        </p>
      </div>
      <div className="flex flex-row justify-between items-start m-4">
        <div>
          <h6 className="text-sm font-[500] text-regal-black">
            Estimated Shipping
          </h6>
          <p className="text-xs font-[500] text-regal-light-gray">
            {itemCount} items
          </p>
        </div>
        <p className="text-sm font-[600] text-regal-black">₦0</p>
      </div>
      <div className="flex flex-row justify-between items-start py-4 border-t">
        <div className="px-4">
          <h6 className="text-sm font-[500] text-regal-black">Est.Total</h6>
        </div>
        <p className="text-lg font-[600] text-regal-black px-4">
        {exchangeRate?.currency}{' '}{ numberWithCommas((total * exchangeRate?.rate).toFixed(2))}{" "}
        </p>
      </div>

      <div className="px-4 py-2 w-full">
        <button
          onClick={() => {
            navigate("/checkout");
          }}
          className="text-sm bg-regal-sky-blue text-white px-4 py-2 font-semibold w-full rounded-md hover:bg-blue-600">
          Go to payment
        </button>
      </div>
    </div>
  );
};

const EmptyCart = ({ navigate }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[400px] w-full p-8 rounded-lg text-center">
        <img
          src={CartImage}
          alt="Empty Cart"
          className="mx-auto mb-6 h-[150px] object-contain"
        />
        <h2 className="text-sm md:text-lg font-semibold mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6 text-xs md:text-sm">
          Products you order will appear here.
        </p>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-xs md:text-sm bg-blue-600 text-white px-6 py-3 w-full rounded-sm hover:bg-blue-900 transition"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

const CartModal = ({ isModalOpen, toggleModal, handleRemoveAll }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 animated fadeInDown bg-black w-full bg-opacity-75 z-50 flex justify-center items-center">
      <div className="bg-white p-14 rounded-lg shadow-lg w-[400px] text-center">
        <h2 className="text-xl font-bold mb-2">Empty Cart?</h2>
        <p className="text-regal-black text-sm mt-4 mb-6">
          We’re just double checking
        </p>
        <div className="flex flex-col gap-4 w-[200px] mx-auto">
          <button
            onClick={() => {
              handleRemoveAll();
              toggleModal();
            }}
            className="bg-regal-sky-blue text-white py-2 rounded-md hover:bg-blue-900 transition active:scale-95 text-xs md:text-sm"
          >
            Delete
          </button>
          <button
            onClick={toggleModal}
            className="text-regal-sky-blue py-2 border-2 border-white rounded-md hover:border-regal-sky-blue transition active:scale-95 text-xs md:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Items = useSelector((state) => state.cart.items || []);
  const user = useSelector((state) => state?.auth);
  const exchangeRate = useSelector((state)=> state?.auth?.exchangeRate);
  const [ITemsDiv, setITemsDiv] = useState([])
  const navigate = useNavigate();
  const {isLoading, userProduct, } = useProduct();
  const { handleIncrement, handleDecrement, handleRemove, handleRemoveAll } =
    useCartOperationsHooks();

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const total = useMemo(
    () => Items.reduce((acc, item) => acc + (item.newPrice ? item.newPrice :item.salesPrice) * item.quantity, 0),
    [Items]
  );
  const lastItemId = useMemo(
    () => (Items.length > 0 ? Items[Items.length - 1].itemID : null),
    [Items]
  );
  useEffect(()=>{
    if (userProduct.length > 0) {
      setITemsDiv(userProduct)
    }else{
      setITemsDiv([])
    }
  }, [userProduct]);
  return (
    <div className="w-full md:p-4">
      {Items.length > 0 && (
        <nav>
          <Link
            to="/"
            className="flex items-center gap-2 font-[600] text-regal-sky-blue text-xs md:text-sm"
          >
            <IoIosArrowRoundBack className="text-regal-black text-sm md:text-xl" />
            Back to categories
          </Link>
        </nav>
      )}

      <div className="flex flex-row items-center justify-between my-4">
        <h5 className="text-xl font-[700]">Cart</h5>
        {Items.length > 0 && (
          <button
            onClick={toggleModal}
            className="flex flex-row items-center justify-between gap-2 text-xs md:text-sm p-3 font-[600] text-regal-sky-blue bg-regal-secondary-light rounded-md hover:bg-regal-secondary-dark"
          >
            <PiTrash />
            Empty Cart
          </button>
        )}
      </div>

      {Items.length > 0 ? (
        <div className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            <div className="border shadow-sm bg-white md:p-4 rounded-md col-span-2">
              {Items.map((item) => (
                <CartItem
                  key={item.itemID}
                  item={item}
                  onDecrement={handleDecrement}
                  onIncrement={handleIncrement}
                  onRemove={handleRemove}
                  lastItemId={lastItemId}
                  exchangeRate={exchangeRate}
                />
              ))}
            </div>
            <div className="cols-span-1">
              {!user && (
                <div className="flex items-center gap-2 font-[500] text-xs mb-2 p-4">
                  <button
                    className="text-regal-sky-blue"
                    onClick={() => {
                      dispatch(setLoginModal(true));
                    }}
                  >
                    Sign in
                  </button>
                  to proceed to checkout
                </div>
              )}

              <OrderSummary
                total={total}
                itemCount={Items.length}
                navigate={navigate}
                exchangeRate={exchangeRate}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart navigate={navigate} />
      )}
       {/* <RelatedProduct Items={ITemsDiv} className="mt-10" cols={"5"} /> */}
      
      <CartModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        handleRemoveAll={handleRemoveAll}
        
      /> 
    </div>
  );
}

export default Cart;
