import React from "react";
import { numberWithCommas } from "../../utils";
import { FaTrashAlt } from "react-icons/fa";
function SaveCard({ item}) {
  return (
    <div key={item.id} className="text-sm font-[500] animate-fade-in w-[170px] mt-4">
      <div className="relative bg-white  rounded-lg  overflow-hidden h-[200px]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />

<div className="absolute top-2 right-4 flex space-x-2">
        <button className="p-2  rounded-full shadow-md bg-regal-wishlist-gray">
          <FaTrashAlt className="w-4 h-4 text-white" />
        </button>
        </div>
      </div>

      <div className="">
        <h4
          className="text-sm font-[500] "
          
        >
          {item.name}
        </h4>
     
        <p className="text-regal-black font-[600] text-sm md:text-[16px]  mt-2">
          ₦{numberWithCommas(item.price)}
        </p>

            <button className="w-full py-2 rounded-md  text-white bg-regal-sky-blue mt-2">
                Buy
            </button>
      </div>
    </div>
  );
}

export default SaveCard;
