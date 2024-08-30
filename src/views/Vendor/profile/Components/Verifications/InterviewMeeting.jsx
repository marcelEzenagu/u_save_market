import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
function InterviewMeeting() {
    return (
        <div className="p-4 md:p-8 animate-fade-in">
          <Link
            className=" flex items-center gap-2 text-regal-sky-blue text-sm  mb-4"
            to="/vendor/dashboard/profile/identification"
          >
            <IoIosArrowRoundBack className="text-lg" />
            Back
          </Link>
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
                      Interview meeting  <span className="font-bold text-yellow-600 bg-yellow-100 py-1 px-2 text-xs rounded-sm">
                        Pending
                      </span>
                      </h5>
                      <h6 className="text-regal-light-gray text-[10px] md:text-xs mt-1">
                      Verify your business to keep the marketplace safe for everyone
                      </h6>
                    </div>
                  
                  </div>
                </div>
    
          <section className=" mt-4">
            <div className="text-xs p-4 border border-yellow-600 rounded bg-yellow-50 flex flex-row items-center gap-2">
            <FiInfo className="text-yellow-600 text-lg"/>  We’re currently reviewing your details. An interview section will be scheduled <span className="font-bold">2 weeks after submitting details </span>
            </div>

            <div className="text-xs p-4 mt-4 border border-green-600 rounded bg-green-50 flex flex-row items-center gap-2">
            <IoCheckmarkCircleOutline  className="text-green-600 text-lg"/> Your business has been approved
            </div>
          </section>
        </div>
      )
}

export default InterviewMeeting