import React from 'react'
import { PiMinus } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { IoAddOutline } from "react-icons/io5";
import {numberWithCommas} from '../../utils'
import { Link } from 'react-router-dom';
function ProductCard({item, category}) {
  return (
    <div key={item.id} className="text-sm font-[500] animate-fade-in">
    <div className="relative bg-white  rounded-lg  overflow-hidden h-[200px]">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-contain"
      />

      <div className="absolute top-2 right-4 flex space-x-2">
        <button className="p-2  rounded-full shadow-md bg-regal-wishlist-gray">
          <GoHeart className="w-4 h-4 text-white" />
        </button>
        </div>
        <div className="absolute bottom-2 right-4 flex flex-row items-center bg-white rounded-full space-x-2 shadow-sm">
        <button className="p-2 active:scale-95 rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue">
          <PiMinus  className="w-4 h-4 text-white text-xs " />
        </button>
        <span>1</span>
        <button className="p-2 active:scale-95  rounded-full bg-regal-blue border-l-4 border-l-regal-sky-blue ">
          <IoAddOutline className="w-4 h-4 text-white text-xs " />
        </button>
      </div>
    </div>

    <div className="py-4">
      <Link className="text-sm font-[400] mb-8" to={`/products/${category}/${item.name}`}>{item.name}</Link>
      <p className="text-regal-sky-blue font-[600] text-sm md:text-[16px] mt-3">
        ₦{numberWithCommas(item.price)}
      </p>
    </div>
  </div>
  )
}

export default ProductCard