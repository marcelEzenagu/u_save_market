import React, { useState, useMemo, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import InterviewMeeting from "../Identification/Verifications/InterviewMeeting";
import GovernmentIssued from "../Identification/Verifications/GovernmentIssued";
import BusinessVerification from "../Identification/Verifications/BusinessVerification";

function IdentifyComponent({scheduleInterview, handleSet}) {
  const [activeTab, setActiveTab] = useState("");
  useEffect(()=>{
    if (scheduleInterview) {
      setActiveTab('3')
    }else{
      setActiveTab('')
    }
  },[scheduleInterview]);

  useEffect(()=> {
    if (handleSet, scheduleInterview, activeTab !== '3') {
      handleSet();
    }
  }, [activeTab]);
  // Memoize the Tab data
  const Tab = useMemo(
    () => [
      {
        id: "1",
        header: "Government-issued photo ID",
        description:
          "Verify your business to keep the marketplace safe for everyone",
        component: GovernmentIssued,
        props: { userId: "12345", status: "Pending" },
      },
      {
        id: "2",
        header: "Business verification",
        description:
          "Verify your business to keep the marketplace safe for everyone",
        component: BusinessVerification,
        props: { userId: "12345", company: "TechCorp" },
      },
      {
        id: "3",
        header: "Interview meeting",
        description:
          "Verify your business to keep the marketplace safe for everyone",
        component: InterviewMeeting,
        props: { interviewDate: "2024-09-15", interviewer: "John Doe" },
        status: "pending",
      },
    ],
    []
  );

  // Memoize the active tab component and its props
  const activeTabData = useMemo(
    () => Tab.find((tab) => tab.id === activeTab),
    [Tab, activeTab]
  );
  const ActiveComponent = activeTabData?.component;
  const activeProps = activeTabData?.props; 
  const onClose = () =>{
    setActiveTab("")
  }
  return ActiveComponent ? (
    <main>{ActiveComponent && <ActiveComponent {...activeProps} onClose={onClose}/>}</main>
  ) : (
    <main className="p-4 md:p-8 max-w-[800px] animate-fade-in">
      <div>
        {Tab?.map((tab) => (
          <div className="flex flex-row items-start gap-4 mt-2" key={tab.id}>
            <div className="flex flex-col items-center gap-2 mt-2">
              <div
                className={`w-7 h-7 rounded-full border ${
                  tab.status === "pending" ? "bg-yellow-600" : "bg-green-600"
                } flex items-center justify-center text-white`}
              >
                <FaCheck className="text-sm" />
              </div>
              {Tab[Tab.length - 1]?.id !== tab?.id && (
                <span className="h-10 bg-regal-track-gray w-[1px]"></span>
              )}
            </div>
            <div
              className="w-full flex flex-row items-center justify-between cursor-pointer"
              onClick={() => setActiveTab(tab.id)}
            >
              <div>
                <h5 className="text-regal-black text-[12px] md:text-sm font-[600] flex flex-row items-center gap-2">
                  {tab.header}
                  {tab.status === "pending" && (
                    <span className="font-bold text-yellow-600 bg-yellow-100 py-1 px-2 text-[10px] md:text-xs rounded-sm">
                      Pending
                    </span>
                  )}
                </h5>
                <h6 className="text-regal-light-gray text-[10px] md:text-xs mt-1">
                  {tab.description}
                </h6>
              </div>
              <IoIosArrowForward className="text-regal-light-gray text-lg" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default IdentifyComponent;
