import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
function Notification() {
  return (
    <div>
      <div className="p-4">
        <Link
          to="/settings"
          className="text-regal-black text-sm md:text-xl gap-2 flex items-center font-bold cursor-pointer"
        >
          {" "}
          <HiOutlineArrowLeft /> Notification
        </Link>

        <div className="mt-8">
          <h5 className="text-regal-black text-xs md:text-sm font-[600]">
            Sales & promotions
          </h5>
          <p className="text-regal-black text-xs md:text-sm font-[400] mt-2">
            Our top picks among new arrivals, bestsellers, and limited-time
            deals.
          </p>
          <div className="flex flex-col gap-8 mt-5">
          <label class="inline-flex items-center cursor-pointer gap-4 ">
            <input type="checkbox" value="" class="sr-only peer " />
            <div class="relative w-8 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[-4px] after:start-[0px] peer-checked:after:bg-blue-600 after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-200"></div>
            <span class="text-regal-black text-xs md:text-sm font-[400]">
             Emails
            </span>
          </label>


          <label class="inline-flex items-center cursor-pointer gap-4 ">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-8 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[-4px] after:start-[0px] peer-checked:after:bg-blue-600 after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-200"></div>
            <span class="text-regal-black text-xs md:text-sm font-[400]">
            Push notifications
            </span>
          </label>

          <label class="inline-flex items-center cursor-pointer gap-4 ">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-8 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[-4px] after:start-[0px] peer-checked:after:bg-blue-600 after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-200"></div>
            <span class="text-regal-black text-xs md:text-sm font-[400]">
            SMS
            </span>
          </label>
          </div>
        
            
        </div>


        <div className="mt-8">
          <h5 className="text-regal-black text-xs md:text-sm font-[600]">
          Personalized notifications
          </h5>
          <p className="text-regal-black text-xs md:text-sm font-[400] mt-2">
          Coupon, restock notifications and community messages.
          </p>
          <div className="flex flex-col gap-8 mt-5">
          <label class="inline-flex items-center cursor-pointer gap-4 ">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-8 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[-4px] after:start-[0px] peer-checked:after:bg-blue-600 after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-200"></div>
            <span class="text-regal-black text-xs md:text-sm font-[400]">
             Emails
            </span>
          </label>


          <label class="inline-flex items-center cursor-pointer gap-4 ">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-8 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[-4px] after:start-[0px] peer-checked:after:bg-blue-600 after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-200"></div>
            <span class="text-regal-black text-xs md:text-sm font-[400]">
            Push notifications
            </span>
          </label>

          <label class="inline-flex items-center cursor-pointer gap-4 ">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-8 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[-4px] after:start-[0px] peer-checked:after:bg-blue-600 after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-200"></div>
            <span class="text-regal-black text-xs md:text-sm font-[400]">
            SMS
            </span>
          </label>
          </div>
        
            
        </div>

        <div className="mt-8">
          <h5 className="text-regal-black text-xs md:text-sm font-[600]">
          Order and system notifications
          </h5>
          <p className="text-regal-black text-xs md:text-sm font-[400] mt-2">
          For your convenience, you can't disable email for these notifications.
          </p>
          <div className="flex flex-col gap-8 mt-5">
          <label class="inline-flex items-center cursor-pointer gap-4 ">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-8 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[-4px] after:start-[0px] peer-checked:after:bg-blue-600 after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-200"></div>
            <span class="text-regal-black text-xs md:text-sm font-[400]">
            Push notifications
            </span>
          </label>

          </div>
        
            
        </div>
      </div>
    </div>
  );
}

export default Notification;
