import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { useItem } from "../../hooks/useItem";
import { useProduct } from "../../hooks/useProduct";
import { numberWithCommas, ReplaceImage } from "../../utils";
import { GoHeart, GoHeartFill } from "react-icons/go";
import RelatedProduct from "../../components/RelatedProduct";
import { BsCart3 } from "react-icons/bs";
import SidebarMobile from "../../components/Sidebar/SidebarMobile";
import ProductDescription from "../../components/ProductDescription";
import { useSelector } from "react-redux";

import { IoAddOutline } from "react-icons/io5";
import { PiMinus, PiTrash } from "react-icons/pi";
import ProductStatus from "../../components/ProductStatus";
import useCartOperationsHooks from "../../hooks/useCartOperationsHooks";
import useWishListOperationsHooks from "../../hooks/useWishListOperationsHooks";
function ProductDetail() {
  const { category, name } = useParams();

  console.log("category, name ",category, name )
  const cart = useSelector((state) => state?.cart?.items);
  const exchangeRate = useSelector((state)=> state?.auth?.exchangeRate);
  // const {isLoading, userProduct} = useProduct();
  const {isLoading, userProduct, preferredCountry} = useItem({category});
               

  const [Items, setItems] = useState([])
  const { handleAddToCart, handleIncrement, handleDecrement } =
    useCartOperationsHooks();
    const {
      handleAddToWishList,
      handleRemoveFromWishList,
    } = useWishListOperationsHooks();
    useEffect(()=>{
      if (userProduct.length > 0) {
        setItems(userProduct)
      }else{
        setItems([])
      }
    }, [userProduct]);
  const productInfo = Items.find((item) => item?.itemName.toLowerCase() === name.toLowerCase()); // Adjust based on actual data structure
  const relatedItems = Items.filter((item) => item?.itemName.toLowerCase() !== name.toLowerCase()); // Adjust based on actual data structure
  
  const cartItem = cart.find(
    (cartItem) => cartItem?.itemID === productInfo?.itemID
  );


  const description = `
    <p> Our Organic Mediterranean Olive Oil is a premium blend sourced from the finest olives grown in the Mediterranean region. This extra virgin olive oil is cold-pressed to retain its natural flavor and nutritional benefits, making it a perfect addition to any culinary creation.</p>
    `;

    const wishList = useSelector((state) => state?.user.wishList);
    const wishListItem = wishList.find(
      (item) => item.itemID === productInfo?.itemID
    );
  return (
    <div>
      <main className="flex flex-row items-center justify-between">
        <nav className="flex text-gray-700 " aria-label="Breadcrumb">
          <div className="inline-flex items-center space-x-1 md:space-x-2">
            <Link
              to="/"
              className="text-regal-black text-xs md:text-sm font-[600] inline-flex items-center"
            >
              Home
            </Link>
            <SlArrowRight className="text-xs md:text-sm" />
            <span className="text-regal-black text-xs md:text-sm font-[600] inline-flex items-center max-w-36 md:max-w-[200px]  truncate whitespace-nowrap">
              {category}
            </span>
            <SlArrowRight className="text-xs md:text-sm" />
            <span className="text-regal-crum-gray text-xs md:text-sm font-[600] max-w-36 md:max-w-[400px] truncate whitespace-nowrap">
              {name}
            </span>
          </div>
        </nav>
      </main>
      <SidebarMobile />
      {productInfo ? (
        <main className="my-4 mb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full h-80 relative">
            <img
              src={productInfo?.images ? `${productInfo?.images}`:ReplaceImage}
              alt={productInfo?.itemName}
              className="w-full h-full object-contain"
            />
               <ProductStatus item={productInfo}/>
            <span className="text-xs absolute bottom-0 right-0 font-semibold text-regal-black py-2 px-4 bg-regal-light-item-color">
              {productInfo.quantity} pieces left
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-[500] text-regal-black">
              {productInfo?.itemName}
            </h4>
            <h5 className="text-lg font-[700] flex items-center gap-2 text-regal-blue">
            {exchangeRate?.currency}{' '}{ numberWithCommas((productInfo?.price * exchangeRate?.rate).toFixed(2))}{" "}
            {productInfo?.percentageOFF  !== null ?
          <s className="font-[400] text-xs text-regal-light-gray ">
            {exchangeRate?.currency}{' '}{ numberWithCommas((productInfo?.oldPrice ? productInfo?.oldPrice -productInfo?.price : 0 * exchangeRate?.rate).toFixed(2))}
          </s>
           : ''}
        </h5>
          {productInfo?.quantity  &&  <div className="max-w-[300px] flex items-center gap-2">
              {cartItem?.itemID ? (
                <div className="w-full px-4 py-3 flex flex-row items-center justify-between text-white bg-regal-sky-blue rounded-md">
                  <button onClick={() => handleDecrement(cartItem)}>
                    {cartItem?.quantity > 1 ? (
                      <PiMinus className="w-4 h-4 text-white text-xs" />
                    ) : (
                      <PiTrash className="w-4 h-4 text-white text-xs" />
                    )}
                  </button>

                  <span className="text-sm font-[600]">
                    {cartItem?.quantity} in Cart
                  </span>

                  <button onClick={() => handleIncrement(cartItem)}>
                    <IoAddOutline className="w-4 h-4 text-white text-xs" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleAddToCart(productInfo);
                  }}
                  className="w-full p-3 flex flex-row items-center justify-center text-white bg-regal-sky-blue rounded-md"
                >
                  <BsCart3 className="mr-2" /> Add to Cart
                </button>
              )}

              {wishListItem ? (
          <button
         className="w-16 h-full rounded-full border flex flex-col items-center justify-center bg-white"
            onClick={() => {
              handleRemoveFromWishList(productInfo);
            }}
          >
              <GoHeartFill className="text-2xl text-red-600" />
          </button>
        ) : (
          <div
            className="w-16 h-full rounded-full border flex flex-col items-center justify-center bg-white"
            onClick={() => {
              handleAddToWishList(productInfo);
            }}
          >
              <GoHeart className="text-2xl" />
          </div>
        )}
            </div>}
            <div>
              <h1 className="text-sm font-[600] text-regal-light-gray mb-2">
                Product description
              </h1>
              <ProductDescription description={description} />
            </div>
          </div>
        </main>
      ) : (
  
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
                </h1>
              </div>
              <h5 className="text-2xl font-bold text-gray-800 mb-2">
            This Product Can't be Found
          </h5>

          <p className="text-gray-600 text-center mb-4">
            Unfortunately, the product "<span className="font-bold">{name}</span>" is either out of stock or no
            longer available.
          </p>

          <Link
            to="/products"
            className="bg-regal-sky-blue text-white px-6 py-3 rounded-md hover:bg-blue-900 transition font-[600] text-sm"
          >
            Start Shopping
          </Link>
            </div>
          </div>
      )}

      <RelatedProduct Items={relatedItems} category />
    </div>
  );
}

export default ProductDetail;
