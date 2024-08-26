import React from "react";
import { numberWithCommas } from "../../utils";
import { FaTrashAlt } from "react-icons/fa";
function SaveCard({ item}) {
  return (
    <div key={item.id} className="text-xs font-[500] animate-fade-in w-[150px] mt-4 mx-auto">
      <div className="relative bg-white  rounded-lg  overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />

<div className="absolute top-2 right-4 flex space-x-2">
        <button className="p-2  rounded-full shadow-md bg-regal-wishlist-gray">
          <FaTrashAlt className=" text-white text-xs" />
        </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4
          className="text-xs font-[500] "
          
        >
          {item.name}
        </h4>
     
        <p className="text-regal-black font-[600] text-xs md:text-[14px] ">
          ₦{numberWithCommas(item.price)}
        </p>

            <button className="w-full py-2 rounded-md  text-white bg-regal-sky-blue ">
                Buy
            </button>
      </div>
    </div>
  );
}

export default SaveCard;
