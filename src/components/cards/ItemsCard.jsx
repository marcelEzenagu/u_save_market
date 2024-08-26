import React from "react";
import { numberWithCommas } from "../../utils";
import { Link } from "react-router-dom";
function ItemsCard({ item, category }) {
  return (
    <div key={item.id} className="text-sm font-[500] animate-fade-in w-[150px] ">
      <div className="relative bg-white  rounded-lg  overflow-hidden ">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />

      </div>

      <div className="flex flex-col gap-2">
        <Link
          className="text-xs font-[500] "
          to={`/products/${category}/${item.name}`}
        >
          {item.name}
        </Link>
        <p  className="text-xs font-[400] ">
            Quantity : 1
        </p>
        <p className="text-regal-sky-blue font-[600] text-sm md:text-[14px] ">
          ₦{numberWithCommas(item.price)}
        </p>
      </div>
    </div>
  );
}

export default ItemsCard;
