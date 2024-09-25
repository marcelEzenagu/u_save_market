import React from "react";
import { numberWithCommas, ReplaceImage } from "../../utils";
import ProductStatus from "../ProductStatus";
import { Link } from "react-router-dom";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
function AgentItemCard({ item, category }) {

  return (
    <div key={item.id} className="text-sm font-[500] animate-fade-in flex flex-row items-center">
      <div className="relative bg-white h-[100px] w-[100px]  rounded-lg  overflow-hidden ">
        <img
          src={item.image || ReplaceImage}
          alt={item.name}
          onError={ReplaceImage}
          className="w-full h-full object-contain"
        />
      <ProductStatus item={item} />
      </div>

      <div className="flex flex-col gap-1  ">
        <h5
          className="text-xs font-[500] mb-2 line-clamp-2"
          // to={`/products/${category}/${item.name}`}
        >
          {item.name}
        </h5>
        <p  className="text-xs font-[400] ">
            Quantity : 1
        </p>
        <p  className="text-xs font-[400] ">
            Weight : 120kg
        </p>
       <div className="text-sm font-bold flex flex-row gap-4 items-center">
        condition: <span className="flex items-center font-semibold gap-2"><GoThumbsup /> Good</span>  <span className="flex items-center font-semibold gap-2"><GoThumbsdown /> Not Good</span> 
       </div>
      </div>
    </div>
  );
}

export default AgentItemCard;
