import React from "react";
import { numberWithCommas, ReplaceImage } from "../../utils";
import ProductStatus from "../ProductStatus";
const UserSavedCard = ({ item, category }) => {

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
      </div>

      <div className="py-4">
        <h4
          className="text-sm font-[400] mb-3 line-clamp-2 "
        >
          {item?.name}
        </h4>
        <span className="text-xs text-regal-light-gray mb-3">{item?.country}</span> 
        <p className="text-regal-sky-blue font-[600] text-sm md:text-[16px] flex items-center gap-2 ">
          ₦{numberWithCommas(item?.price)}{" "}
            {item?.percentageOFF  !== null ?
          <s className="font-[400] text-xs text-regal-light-gray ">
            ₦ { numberWithCommas(item?.old_price) }
          </s>
           : ''}
        </p>
      </div>
    </div>
  );
};

export default UserSavedCard;
