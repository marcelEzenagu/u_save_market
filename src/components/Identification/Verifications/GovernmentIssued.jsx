import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
const   baseUrl = import.meta.env.VITE_APP_API_URL

function GovernmentIssued({onClose,data}) {
  return (
    <div className="p-4 md:p-8 animate-fade-in">
     <button
        className=" flex items-center gap-2 text-regal-sky-blue text-sm  mb-4"
       
        onClick={()=>{
          onClose()
        }}
      >
        <IoIosArrowRoundBack className="text-lg" />
        Back
      </button>
      <div className="flex flex-row items-start gap-4 mt-2" >
              <div className="flex flex-col items-center gap-2 mt-2">
                <div
                  className={`w-7 h-7 rounded-full border bg-green-600
                  flex flex-col items-center justify-center text-white`}
                >
                  <FaCheck className="text-sm" />
                </div>
              </div>
              <div
            
                className="w-full flex flex-row items-center justify-between "
              >
                <div>
                  <h5 className="text-regal-black  text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
                  Government-issued photo ID
                  </h5>
                  <h6 className="text-regal-light-gray text-[10px] md:text-xs mt-1">
                  Verify your business to keep the marketplace safe for everyone
                  </h6>
                </div>
              
              </div>
            </div>

      <section className="max-w-[450px] mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-4">
          <div className="mb-1 col-span-2">
            <label
              htmlFor="IDNumber"
              className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
            >
             ID Type
            </label>
            <input
              type="text"
              name="text"
              id="IdType"
              placeholder={data?.idDocumentType?.toUpperCase()}
              className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
            />
          </div>

          <div className="mb-1 col-span-2">
            <label
              htmlFor=" IDImage"
              className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
            >
             ID Image
            </label>
            
              <div className="flex  items-center justify-between mt-4 pr-3">
                <div className="flex flex-col items-center justify-between mt-4">
                  <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                    ID Image (Front)
                  </label>
                  <img src={`${baseUrl}${data.idDocumentFront}`}alt={`${data.idDocumentType?.toUpperCase()} front`}className="w-72 h-44 object-contain bg-gray-100" />
                </div>
                <div className="flex flex-col items-center justify-between mt-4">
                  <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                    ID Image (Back)
                  </label>
                  <img src={`${baseUrl}${data.idDocumentBack}`}alt={`${data.idDocumentType?.toUpperCase()} back`}className="w-72 h-44 object-contain bg-gray-100" />
                </div>
              </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default GovernmentIssued;
