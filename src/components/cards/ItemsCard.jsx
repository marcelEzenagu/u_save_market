import React from "react";
import { numberWithCommas } from "../../utils";
import { Link } from "react-router-dom";
function ItemsCard({ item, category }) {
  return (
    <div key={item.id} className="text-sm font-[500] animate-fade-in w-[170px] ">
      <div className="relative bg-white  rounded-lg  overflow-hidden h-[200px]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />

      </div>

      <div className="">
        <Link
          className="text-sm font-[500] "
          to={`/products/${category}/${item.name}`}
        >
          {item.name}
        </Link>
        <p  className="text-sm font-[400] mt-2 mb-2">
            Quantity : 1
        </p>
        <p className="text-regal-sky-blue font-[600] text-sm md:text-[16px] ">
          ₦{numberWithCommas(item.price)}
        </p>
      </div>
    </div>
  );
}

export default ItemsCard;
