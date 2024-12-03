import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaCalendarAlt, FaClock, FaLink } from 'react-icons/fa';
import { LuCalendarDays } from "react-icons/lu";
import { useVerifyAgentMutation } from "../../../features/admin/adminApiSlice";
const   baseUrl = import.meta.env.VITE_APP_API_URL

function AgentVerification({onClose,data}) {
  const navigate =useNavigate()
  const [meetingData, setMeetingData] = useState({
    description:"",
    startTime:"",
    endTime:"",
    date:"",
    link:"",
    title:"",
    vendorID:data.vendorID
  })

  const [errMsg, setErrMsg] = useState("")

  const [verifyAgent,{isLoading}] =useVerifyAgentMutation()

  const handleChange = (e)=>{
    const {value, name} = e.target
    setMeetingData(prev => ({
      ...prev,
      [name]:value
    }))
  }


  const handleVerifyAgent = async()=>{
    try{
      setErrMsg("")

      // const resp = 
      await verifyAgent(data).unwrap()
      navigate("/admin/agents")
    }catch(e){
      setErrMsg(e.data.message)
    }
  }
 
  return (
      <div className="p-4 md:p-8 animate-fade-in">
     
  
       
      <section className="max-w-[450px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-4">
          <div className="mb-1 col-span-2">
            <label
              htmlFor="IdType"
              className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
            >
             Country
            </label>
            <div
              className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              >
                {data?.country?.toUpperCase()}

            </div>
          </div>
          <div className="mb-1 col-span-2">
            <label
              htmlFor="IDNumber"
              className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
            >
             ID Number
            </label>
            <div
              className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              >
            {data?.idDocumentNumber?.toUpperCase()}

            </div>
            
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
                  <img src={`${baseUrl}${data.idDocumentBack}`} alt={`${data.idDocumentType?.toUpperCase()} back`}className="w-72 h-44 object-contain bg-gray-100" />
                </div>
              </div>

          </div>


      {
        !data.isVerified &&
        <div className="col-span-2 flex justify-start gap-4 mt-4">
          <button
              type="submit"
              onClick={handleVerifyAgent}
              disabled={isLoading}
              className="py-2 px-6 text-xs font-semibold rounded-sm text-white bg-regal-sky-blue hover:bg-regal-blue transition"
            >
            {isLoading ?
            "Loading..." :  
            "Verify Agent"
          } 
            </button>
            {/* <button
              type="button"
              className="py-2 px-6 text-xs font-semibold rounded-sm border border-regal-sky-blue text-regal-sky-blue bg-white hover:bg-regal-sky-blue hover:text-white transition"
            >
              Cancel
            </button> */}

        </div>
      }
        </div>
      </section>

      </div>
  )
}

export default AgentVerification