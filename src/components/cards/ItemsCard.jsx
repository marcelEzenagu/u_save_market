import React from "react";
import { numberWithCommas, ReplaceImage } from "../../utils";
import ProductStatus from "../ProductStatus";
import { Link } from "react-router-dom";
function ItemsCard({ item, category }) {

  return (
    <div key={item.id} className="text-sm font-[500] animate-fade-in w-[150px] ">
      <div className="relative bg-white h-[200px]  rounded-lg  overflow-hidden ">
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
        <p className="text-regal-sky-blue font-[600] text-sm md:text-[14px] ">
          ₦{numberWithCommas(item?.price)}{" "}
            {item?.percentageOFF  !== null ?
          <s className="font-[400] text-xs text-regal-light-gray ">
            {item?.old_price && '₦'+ numberWithCommas(item?.old_price) }
          </s>
           : ''}
        </p>
      </div>
    </div>
  );
}

export default ItemsCard;
