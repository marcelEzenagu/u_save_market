import React, {useEffect, useState} from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, Outlet } from 'react-router-dom'
import IdentifyComponent from '../../../../components/Identification/IdentifyComponent';
function Identification() {
  const handleSet = () => {

  }
  return (
    <div>
      <div className="p-4 md:p-8 border-b animate-fade-in">
        <h6 className="text-regal-black text-[12px] md:text-lg font-[600]">
          Identity Verification
        </h6>
        <p className="text-regal-light-gray text-[10px] md:text-sm font-[400] mt-1">
          Verify your business to keep the marketplace safe for everyone
        </p>
      </div>

    <IdentifyComponent scheduleInterview={''} handleSet={handleSet}/>
    </div>
  );
}

export default Identification;
