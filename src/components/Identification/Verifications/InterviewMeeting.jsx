import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaCalendarAlt, FaClock, FaLink } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { useScheduleVendorMeetingMutation } from "../../../features/admin/adminApiSlice";

const baseUrl = import.meta.env.VITE_APP_API_URL;

function InterviewMeeting({ onClose, data }) {
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState({
    description: "",
    startTime: "",
    endTime: "",
    date: "",
    link: "",
    title: "",
    vendorID: data.vendorID,
  });

  const [errMsg, setErrMsg] = useState("");

  const [scheduleInterview, { isLoading }] = useScheduleVendorMeetingMutation();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setMeetingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyVendor = async () => {
    console.log("MESSAGE DATA", meetingData);

    try {
      setErrMsg("");

      const resp = await scheduleInterview(meetingData).unwrap();
      console.log("MESSAGE resp===", resp);
    } catch (e) {
      console.log("MESSAGE error===", e);
      setErrMsg(e.data.message);
    }
    navigate("/admin/vendors");
  };

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <button
        className=" flex items-center gap-2 text-regal-sky-blue text-sm  mb-4"
        onClick={() => {
          onClose();
        }}
      >
        <IoIosArrowRoundBack className="text-lg" />
        Back
      </button>

      {
        data?.vendorID &&
      <>
      <div className="flex flex-row items-start gap-4 mt-2">
        <div className="flex flex-col items-center gap-2 mt-2">
          <div
            className={`w-7 h-7 rounded-full border ${
              false && "bg-green-600"
            }  flex flex-col items-center justify-center text-white`}
          >
            <FaCheck className="text-sm" />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between ">
          <div>
            <h5 className="text-regal-black text-[12px] md:text-sm   font-[600] flex flex-row items-center gap-2">
              Production Process Video
              {!data.isVerified && data.processVideo ? (
                <span className="font-bold text-yellow-600 bg-yellow-100 py-1 px-2 text-xs rounded-sm">
                  Pending
                </span>
              ) : !data.isVerified && !data.processVideo ? (
                <span className="font-bold text-red-600 bg-yellow-100 py-1 px-2 text-xs rounded-sm">
                  vendor yet to upload processing video
                </span>
              ) : null}
            </h5>
            <h6 className="text-regal-light-gray text-[10px] md:text-xs mt-1">
              Verify vendors to keep the marketplace safe for everyone
            </h6>
          </div>
        </div>
      </div>

      <section className=" mt-4">
        {data.isVerified && (
          <div className="text-xs p-4 mt-4 border border-green-600 rounded bg-green-50 flex flex-row items-center gap-2">
            <IoCheckmarkCircleOutline className="text-green-600 text-lg" /> This
            vendor has been approved
          </div>
        )}
        {/* <div className="text-xs p-4 border border-yellow-600 rounded bg-yellow-50 flex flex-row items-center gap-2">
                <FiInfo className="text-yellow-600 text-lg"/>  We’re currently reviewing your details. An interview section will be scheduled <span className="font-bold">2 weeks after submitting details </span>
                </div> */}
        {data.processVideo && (
          <div>
            Video for vendor {data.vendorID}
            <video
              controls
              // src={`${baseUrl}public/videos/videoVerification/${data.vendorID}.pm4`}

              src={`${baseUrl+data.processVideo}`}
            ></video>
          </div>
        )}
      </section>

      {data.processVideo && !data.isVerified && (
        <div className="col-span-2 flex justify-start gap-4 mt-4">
          <button
            type="submit"
            onClick={verifyVendor}
            disabled={isLoading}
            className="py-2 px-6 text-xs font-semibold rounded-sm text-white bg-regal-sky-blue hover:bg-regal-blue transition"
          >
            {isLoading ? "Loading..." : "Verify Vendor"}
          </button>
        </div>
      )}
      </>

      }
    </div>
  );
}

export default InterviewMeeting;
