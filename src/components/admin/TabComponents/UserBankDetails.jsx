import React, { useState } from 'react';
import { PiTrash } from "react-icons/pi";
import { SlArrowDown } from "react-icons/sl";
import { countries } from '../../../data/mockData';
import { PiCopy } from "react-icons/pi";
function UserBankDetails() {
    return (
      <div className='p-4 md:px-8 md:pt-8 pb-4 animate-fade-in'>

  
      <section className='max-w-[800px] overflow-hidden'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-4">
      <div className="mb-1 col-span-2">
                <label
                  htmlFor="Bank"
                  className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                 Bank
                </label>
                <input
                  type="text"
                  name="text"
                  id="Bank"
                  placeholder="First Bank"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
              </div>
              <div className="mb-1 col-span-2">
                <label
                  htmlFor=" Account Number"
                  className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                 Account Number
                </label>
                <input
                  type="text"
                  name="text"
                  id=" Account Number"
                  placeholder=" Account Number"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
              </div>
              <div className="mb-1 col-span-2">
                <label
                  htmlFor=" Account Number"
                  className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                 Account Name
                </label>
                <input
                  type="text"
                  name="text"
                  id=" Account Number"
                  placeholder=" Account Number"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
              </div>
        </div>
            <button
            className="inline-block px-8  py-2 md:py-3 mt-8 mb-8  text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-sm cursor-pointer">
                Update Details 
                
            </button>
      </section>
      </div>
    )
  }

export default UserBankDetails