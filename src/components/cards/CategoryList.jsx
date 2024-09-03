import React from "react";
import { Link } from "react-router-dom";
import { MockData } from "../../data/mockData";
function CategoryList() {
  return (
    <div className="mt-14 mb-14 border-t pt-10">
      <div className="mx-auto  max-w-[1200px]">
        <h6 className="font-[700] text-xl mb-4 ">CATEGORIES</h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {MockData &&
            MockData.map((e, index) => (
              <div className="flex items-center gap-2 my-2" key={index}>
                <img src={e.image} alt="" />
                <Link
                  to={`/products?name=${name}`}
                  className="text-sm font-[600]"
                >
                  {" "}
                  {e?.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
