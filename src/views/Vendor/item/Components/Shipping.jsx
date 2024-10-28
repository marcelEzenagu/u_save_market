import React from 'react'
import { TfiAngleDown } from "react-icons/tfi";
function Shipping({handleChange, data, setData, handleErrorMessagesList}) {
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

     <div className="mb-2 col-span-2 md:col-span-1">
       <label
         htmlFor="FirstName"
         className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
       >
        Shipping Weight
       </label>
       <input
       type="text"
       name="weight"
       id="weight"
       value={data?.weight}
       onChange={handleChange}
       placeholder="Enter name"
       className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
     />
      {handleErrorMessagesList("weight")}
     </div>
     <div className="mb-2 col-span-2 md:col-span-1">
       <label
         htmlFor="LastName"
         className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
       >
        Unit
       </label>
       <div className="relative ">
       <input
       type="text"
       name="weight_unit"
       id="weight_unit"
       value={data?.weight_unit}
       onChange={handleChange}
       placeholder="Enter weight unit"
       className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
     />
     </div>
     {handleErrorMessagesList("weight_unit")}
     </div>

    <h6 className='text-xs text-regal-sky-blue  flex items-center gap-4  font-[500]'>
      Customs Shipping Information   <TfiAngleDown />
    </h6>
   </div>
</div>
  )
}

export default Shipping