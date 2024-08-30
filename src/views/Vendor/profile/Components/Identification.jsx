import React, {useEffect, useState} from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, Outlet } from 'react-router-dom'
function Identification() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(false);
  useEffect(() => {
    if (location?.pathname !== "/vendor/dashboard/profile/identification") {
      setActiveTab(true);
    } else {
      setActiveTab(false);
    }
  }, [location]);
  const Links = [
    {
      id: "1",
      header: "Government-issued photo ID",
      description:
        "Verify your business to keep the marketplace safe for everyone",
      url: "/vendor/dashboard/profile/identification/government-issued-id",
    },
    {
      id: "2",
      header: "Business verification",
      description:
        "Verify your business to keep the marketplace safe for everyone",
      url: "/vendor/dashboard/profile/identification/business-verification",
    },
    {
      id: "3",
      header: "Interview meeting",
      description:
        "Verify your business to keep the marketplace safe for everyone",
      url: "/vendor/dashboard/profile/identification/interview-meeting",
    },
  ];
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

      {activeTab ? (
        <Outlet />
      ) : (
        <main className="p-4 md:p-8 max-w-[800px] animate-fade-in">
          {Links?.map((e) => (
            <div className="flex flex-row items-start gap-4 mt-2" key={e?.id}>
              <div className="flex flex-col items-center gap-2 mt-2">
                <div
                  className={`w-7 h-7 rounded-full border ${
                    Links[Links.length - 1]?.id !== e?.id && "bg-green-600"
                  }  flex flex-col items-center justify-center text-white`}
                >
                  <FaCheck className="text-sm" />
                </div>
                {Links[Links.length - 1]?.id !== e?.id && (
                  <span className="h-10 bg-regal-track-gray w-[1px]"></span>
                )}
              </div>
              <Link
                to={e?.url}
                className="w-full flex flex-row items-center justify-between "
              >
                <div>
                  <h5 className="text-regal-black text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
                    {e?.header}{" "}
                    {Links[Links.length - 1]?.id === e?.id && (
                      <span className="font-bold text-yellow-600 bg-yellow-100 py-1 px-2  text-[10px] md:text-xs rounded-sm">
                        Pending
                      </span>
                    )}{" "}
                  </h5>
                  <h6 className="text-regal-light-gray text-[10px] md:text-xs  mt-1">
                    {e?.description}
                  </h6>
                </div>
                <IoIosArrowForward className="text-regal-light-gray text-lg" />
              </Link>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

export default Identification;
