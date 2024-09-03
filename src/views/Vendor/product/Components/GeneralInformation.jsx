import React from 'react'
import { TfiAngleDown } from "react-icons/tfi";
function GeneralInformation() {
  return (
    <div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
             <div className="mb-2 col-span-2">
              <label
                htmlFor="ProductName"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Product Name
              </label>
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Enter name"
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              />
            </div>
              <div className="mb-2 col-span-2 md:col-span-1">
                <label
                  htmlFor="FirstName"
                  className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
                >
                 Category
                </label>
                <div className="relative ">
                <select
                  className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                >
                  <option value="status1">Active</option>
                  <option value="status2">New</option>
                  <option value="status3">In Process</option>
                  <option value="status4">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-[-3px] flex items-center px-2 pointer-events-none">
                  <TfiAngleDown className="text-gray-500 bg-white w-9 z-50" />
                </div>
              </div>
              </div>
              <div className="mb-2 col-span-2 md:col-span-1">
                <label
                  htmlFor="LastName"
                  className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
                >
                 Sub Category
                </label>
                <div className="relative ">
                <select
                  className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                >
                  <option value="status1">Active</option>
                  <option value="status2">New</option>
                  <option value="status3">In Process</option>
                  <option value="status4">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-[-3px] flex items-center px-2 pointer-events-none">
                  <TfiAngleDown className="text-gray-500 bg-white w-9 z-50" />
                </div>
              </div>
              </div>

              <div className="mb-2 col-span-2">
              <label
                htmlFor="ProductDescription"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Product Description
              </label>
              <textarea name="" id=""  rows={'10'} className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black">
              Write something to describe your product 
              </textarea>
            </div>
            </div>
    </div>
  )
}

export default GeneralInformation