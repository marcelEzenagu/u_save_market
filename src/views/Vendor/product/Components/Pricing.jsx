import React from 'react'
import { TfiAngleDown } from "react-icons/tfi";
import { FiInfo } from "react-icons/fi";
function Pricing({handleChange, data, setData, handleErrorMessagesList}) {
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div className="mb-2 col-span-2 md:col-span-1">
       <label
         htmlFor=" Original Price"
         className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
       >
       Original Price
       </label>
       <input
       type='number'
       name="originalPrice"
       id="originalPrice"
       placeholder="0.00"
       value={data?.originalPrice}
       onChange={handleChange}
       className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
     />
     {handleErrorMessagesList("originalPrice")}
     </div>
     <div className="mb-2 col-span-2 md:col-span-1">
       <label
         htmlFor=" Sales Price"
         className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
       >
        Sales Price
       </label>
       <input
      type='number'
       name="salesPrice"
       id="salesPrice"
       value={data?.salesPrice}
       onChange={handleChange}
       placeholder="Enter name"
       className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
     />
       {handleErrorMessagesList("salesPrice")}
     </div>
      
     <div className="mb-2 col-span-2 md:col-span-1">
       <label
         htmlFor="FirstName"
         className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
       >
       Profile (%)
       </label>
       <input
       type="number"
       name="profit"
       id="profit"
       value={data?.profit}
       onChange={handleChange}
       placeholder="Enter Profile"
       className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
     />
       {handleErrorMessagesList("profit")}
     </div>
     <div className="mb-2 col-span-2 md:col-span-1">
       <label
         htmlFor="LastName"
         className="flex items-center  text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
       >
        Tax <FiInfo className="text-regal-blue text-sm mx-2"/>
       </label>
       <input
       type="number"
       name="discount"
       id="discount"
       value={data?.discount}
       onChange={handleChange}
       placeholder="Enter name"
       className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
     />
       {handleErrorMessagesList("discount")}
     </div>
     <div className="mb-2 col-span-2 md:col-span-1">
       <label
         htmlFor="FirstName"
         className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
       >
        Stock
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
        Quantity left
       </label>
       <div className="relative ">
       <input
       type="number"
       name="quantity"
       id="quantity"
       value={data?.quantity}
       onChange={handleChange}
       placeholder="Enter Profile"
       className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
     />
       {handleErrorMessagesList("quantity")}
     </div>
     </div>

    <h6 className='text-xs text-regal-sky-blue  flex items-center gap-4 font-[500]'>
      Additional Settings   <TfiAngleDown />
    </h6>
   </div>
</div>
  )
}

export default Pricing