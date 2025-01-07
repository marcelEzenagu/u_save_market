import React, { useState, useRef, useEffect } from "react";
import { TbMapPinFilled } from "react-icons/tb";
import { HiOutlineArrowLeft } from "react-icons/hi2";

const orderTracking = [
    {
      id: "1",
      name: "Order Accepted",
    },
    {
      id: "2",
      name: "Processing",
    },
    {
      id: "4",
      name: "Shopping",
    },
    {
      id: "5",
      name: "Pickup",
    },
    {
      id: "6",
      name: "Delivered",
    },
  ];
function TrackOrder(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
    const trackingDetails = [
      {
        id:'1',
        info:'On Board - Your package is on board with the courier vehicle',
        address:'Ikeja, Lagos',
        time:'16th Aug,2024, 2:25pm'
      },
      {
        id:'2',
        info:'Your package is currently in transit between Lagos and Abuja ',
        address:'Ikeja, Lagos',
        time:'16th Aug,2024, 2:25pm'
      },
      {
        id:'3',
        info:'Custom Clearance cleared',
        address:'',
        time:'16th Aug,2024, 2:25pm'
      },
      {
        id:'4',
        info:'Being checked at customs',
        address:'',
        time:'16th Aug,2024, 2:25pm'
      },
      {
        id:'5',
        info:'Package arrived at airport',
        address:'',
        time:'16th Aug,2024, 2:25pm'
      },
      {
        id:'6',
        info:'Flight departure',
        address:'',
        time:'16th Aug,2024, 2:25pm'
      },
      {
        id:'7',
        info:'Package arrived at airport',
        address:'',
        time:'16th Aug,2024, 2:25pm'
      },
      {
        id:'8',
        info:'Package at pickup location',
        address:'Ikeja, Lagos',
        time:'16th Aug,2024, 2:25pm'
      },
      {
        id:'9',
        info:'Package delivered to you',
        address:'Auston, London',
        time:'16th Aug,2024, 2:25pm'
      }
    ]
    const dropdownRef = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsModalOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    return <div>
           <div className="p-4 ">
            <div className="flex flex-row items-center justify-between">
            <h6 className="text-regal-black text-sm md:text-lg flex items-center gap-2 font-[600] cursor-pointer" 
              onClick={() => {
                props.setTrackOrderDetails(false);
              }}
            >
            <HiOutlineArrowLeft/> Track History </h6>
             <button
                  className="font-[600] text-regal-sky-blue text-xs md:text-sm "
                  onClick={toggleModal}
                >
                 View on Map
                </button>
            </div>  
            <div className="rounded-md border p-5 mt-4">
            <div className="flex my-4 overflow-x-scroll ">
                {orderTracking?.map((e) => (
                  <div key={e.id} className="mt-3">
                    <div className="flex flex-row items-center ">
                      <div
                        className={`w-7 h-7 rounded-full ${
                          e.id === "1" ? "bg-regal-light-blue" : "bg-white"
                        }  flex flex-col items-center justify-center`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full ${
                            e.id === "1" ? "bg-regal-blue" : "border bg-white"
                          } z-10`}
                        ></span>
                      </div>
                      <span className=" w-[100px] md:w-[160px] border-b border-dotted"></span>
                    </div>
                    <p
                      className={`text-xs md:text-sm items-center  gap-2 ${
                        e.id === "1"
                          ? "text-regal-black"
                          : "text-regal-track-gray"
                      } font-[500]  capitalize  mt-7`}
                    >
                      {e.name}
                    </p>
                    {e.id === "1" && (
                        <p className="text-xs md:text-sm text-regal-track-gray  mt-2">
                          16th Aug,2024
                        </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
  
            <div className="border-t mt-5 pb-5">
                <h5 className="text-xs md:text-sm font-[600] text-regal-blue mt-4">
                Tracking details
                </h5>
  
                  <main className="flex flex-col mt-5">
                    {trackingDetails?.map((e,i)=> (
                    <div key={i} className="flex flex-row items-start gap-3">
                        <div className="flex flex-col items-center">
                          {trackingDetails.length - 1 !== i ? <TbMapPinFilled /> : <span className="w-4 h-4 bg-green-500 rounded-full flex flex-col items-center justify-center"> 
                            <span className="w-3 h-3 bg-white rounded-full">
                            </span></span> }
                          <span className=" border-r border-dotted h-[100px]">
                          </span>
                        </div>
                        <div className="">
                          <h4 className="font-[600] text-regal-black text-xs md:text-sm">{e.info}</h4>
                          <h5 className="font-[400] text-regal-track-gray text-xs md:text-sm my-2">{e.address}</h5>
                          <h5 className="font-[400] text-regal-track-gray text-xs md:text-sm ">{e.time}</h5>
                        </div>
                    </div>
                    ))}
                  </main>
            </div>
  
            </div>
            {isModalOpen && (
            <div className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown ">
              <div className="bg-white py-2 md:p-5 rounded-lg shadow-lg w-[350px] md:w-[700px] "  ref={dropdownRef}>
              <h1 className="text-sm md:text-lg font-[600] text-regal-black">Order Tracking</h1>
                <div className="mt-4">
                          <h4 className="font-[400] text-regal-black text-xs md:text-sm">Your package is currently in transit between Lagos and Abuja.</h4>
                          <h5 className="font-[400] text-regal-track-gray text-xs md:text-sm my-2">Ikeja, Lagos</h5>
                          <h5 className="font-[400] text-regal-track-gray text-xs md:text-sm ">16th Aug,2024, 2:25pm</h5>
                        </div>
  
                        <div className="bg-gray-50 h-72 my-5">
  
                        </div>
              </div>
            </div>
          )}
          </div>;
  }

  export default TrackOrder;