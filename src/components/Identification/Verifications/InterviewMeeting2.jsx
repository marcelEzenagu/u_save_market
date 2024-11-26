import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaCalendarAlt, FaClock, FaLink } from 'react-icons/fa';
import { LuCalendarDays } from "react-icons/lu";
import { useScheduleVendorMeetingMutation } from "../../../features/admin/adminApiSlice";
function InterviewMeeting({onClose,data}) {
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

  const [scheduleInterview,{isLoading}] =useScheduleVendorMeetingMutation()

  const handleChange = (e)=>{
    const {value, name} = e.target
    setMeetingData(prev => ({
      ...prev,
      [name]:value
    }))
  }

  const verifyVendor = async()=>{
    console.log("MESSAGE DATA",meetingData)
    
    try{
      setErrMsg("")

      const resp = await scheduleInterview(meetingData).unwrap()
      console.log("MESSAGE resp===",resp)
    }catch(e){
      console.log("MESSAGE error===",e)
      setErrMsg(e.data.message)
    }
    navigate("/admin/vendors")
  }

 
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
                        className={`w-7 h-7 rounded-full border ${
                           false && "bg-green-600"
                          }  flex flex-col items-center justify-center text-white`}
                    >
                      <FaCheck className="text-sm" />
                    </div>
                  </div>
                  <div
                
                    className="w-full flex flex-row items-center justify-between "
                  >
                    <div>
                      <h5 className="text-regal-black text-[12px] md:text-sm   font-[600] flex flex-row items-center gap-2">
                      Production Process Video
                          {
                            (!data.isVerified && data.interviewDate)
                            
                            &&
                            <span className="font-bold text-yellow-600 bg-yellow-100 py-1 px-2 text-xs rounded-sm">
                              Pending
                            </span>
                          }
                      </h5>
                      <h6 className="text-regal-light-gray text-[10px] md:text-xs mt-1">
                      Verify your business to keep the marketplace safe for everyone
                      </h6>
                    </div>
                  
                  </div>
                </div>
    
              <section className=" mt-4">
                {
                        data.isVerified &&

                <div className="text-xs p-4 mt-4 border border-green-600 rounded bg-green-50 flex flex-row items-center gap-2">
                <IoCheckmarkCircleOutline  className="text-green-600 text-lg"/> Your business has been approved
                </div>
                }
                {/* <div className="text-xs p-4 border border-yellow-600 rounded bg-yellow-50 flex flex-row items-center gap-2">
                <FiInfo className="text-yellow-600 text-lg"/>  We’re currently reviewing your details. An interview section will be scheduled <span className="font-bold">2 weeks after submitting details </span>
                </div> */}

<div>
  Video
</div>
              </section>
              {
        !data.interviewDate &&

        <div className="mt-6 bg-white  w-full max-w-md">
          {/* Form Header */}
          {/* <div className="flex items-center mb-6">
            <LuCalendarDays className="text-regal-black text-lg mr-2" />
            <h2 className="text-regal-black text-xs font-bold">Schedule Meeting</h2>
          </div> */}


          <form className="grid grid-cols-2 gap-6">
            {/* Title Input */}
            <div className="col-span-2">
              <label
                htmlFor="Title"
                className="block text-xs md:text-[12px] font-[600] leading-6 mb-2 text-regal-black"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                onChange={handleChange}
                value={meetingData.title}

                placeholder="Enter meeting title"
                className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              />
            </div>

            {/* Link Input with Icon */}
            <div className="col-span-2">
              <label
                htmlFor="Link"
                className="block text-xs md:text-[12px] font-[600] leading-6 mb-2 text-regal-black"
              >
                Meeting Link
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-regal-black">
                  <FaLink />
                </span>
                <input
                  type="url"
                  id="link"
                  name="link"
                required

                  onChange={handleChange}
                  value={meetingData.link}

                  placeholder="Enter meeting link"
                  className="w-full p-3 md:p-4 pl-24 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
              </div>
            </div>

            {/* Date & Time Input */}
            <div className="col-span-2">
              <label
                htmlFor="DateTime"
                className="block text-xs md:text-[12px] font-[600] leading-6 mb-2 text-regal-black"
              >
                Date & Time
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required

                onChange={handleChange}
                value={meetingData.date}

                className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              />
            </div>

            {/* Start Time Input with Clock Icon */}
            <div className="col-span-1">
              <label
                htmlFor="StartTime"
                className="block text-xs md:text-[12px] font-[600] leading-6 mb-2 text-regal-black"
              >
                Start Time
              </label>
              <div className="relative">
                {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-regal-black">
                  <FaClock />
                </span> */}
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  onChange={handleChange}
                  value={meetingData.startTime}
                  className="w-full p-3 md:p-4 pl-10 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
              </div>
            </div>

            {/* End Time Input */}
            <div className="col-span-1">
              <label
                htmlFor="EndTime"
                className="block text-xs md:text-[12px] font-[600] leading-6 mb-2 text-regal-black"
              >
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                onChange={handleChange}
                value={meetingData.endTime}

                className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              />
            </div>

            {/* Description Textarea */}
            <div className="col-span-2">
              <label
                htmlFor="Description"
                className="block text-xs md:text-[12px] font-[600] leading-6 mb-2 text-regal-black"
              >
                Description
              </label>
              <textarea
                id="Description"
                onChange={handleChange}
                name="description"
                value={meetingData.description}
                placeholder="Enter meeting description"
                rows="5"
                className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black min-h-[120px]"
              ></textarea>
            </div>

    { errMsg &&
                  <p className="text-red-600 text-xs">{ errMsg}</p>

    }
            {/* Buttons */}
            <div className="col-span-2 flex justify-start gap-4 mt-4">
            <button
                type="submit"
                onClick={verifyVendor}
                disabled={isLoading}
                className="py-2 px-6 text-xs font-semibold rounded-sm text-white bg-regal-sky-blue hover:bg-regal-blue transition"
              >
              {isLoading ?
              "Loading..." :  
            "Verify Vendor"
            } 
              </button>
              {/* <button
                type="button"
                className="py-2 px-6 text-xs font-semibold rounded-sm border border-regal-sky-blue text-regal-sky-blue bg-white hover:bg-regal-sky-blue hover:text-white transition"
              >
                Cancel
              </button> */}

            </div>
          </form>
        </div>                
      }

        </div>
      )
}

export default InterviewMeeting