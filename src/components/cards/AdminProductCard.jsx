import React from "react";
import { numberWithCommas, ReplaceImage } from "../../utils";
import { Menu } from "@headlessui/react";
import ProductStatus from "../ProductStatus";
const AdminProductCard = ({ item, handleDeleteClick, handleProductClick }) => {
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
        <div className="flex flex-row items-center gap-4 pr-4">
        <button className="text-sm font-[400] mb-3 line-clamp-2 "
           onClick={() => handleProductClick(item)} 
        >
          {item?.name}{" "}
       
        </button>
        <Menu as="button" className="relative inline-block text-right">
            <div>
              <Menu.Button className=" rounded-full text-sm md:text-lg  focus:outline-none">
                •••
              </Menu.Button>
            </div>

            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`flex items-center w-full px-4 py-2 text-xs gap-2 text-regal-black ${
                        active ? "bg-gray-100" : ""
                      }`}
                      onClick={() => handleDeleteClick(item)}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                          stroke="#0F0F0F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.8504 9.14014L18.2004 19.2101C18.0904 20.7801 18.0004 22.0001 15.2104 22.0001H8.79039C6.00039 22.0001 5.91039 20.7801 5.80039 19.2101L5.15039 9.14014"
                          stroke="#171717"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.3301 16.5H13.6601"
                          stroke="#171717"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.5 12.5H14.5"
                          stroke="#171717"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Delete Product
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>

        <span className="text-xs text-regal-light-gray mb-3">
          {item?.country}
        </span>
        <p className="text-regal-sky-blue font-[600] text-sm md:text-[16px] flex items-center gap-2 ">
          ₦{numberWithCommas(item?.price)}{" "}
          {item?.percentageOFF !== null ? (
            <s className="font-[400] text-xs text-regal-light-gray ">
              ₦ {numberWithCommas(item?.old_price)}
            </s>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default AdminProductCard;
