import React, { useState, useRef, useEffect } from "react";
import Status from "../../../components/order/OrderStatus";
import { IoInformationCircle } from "react-icons/io5";
import { Items } from "../../../data/mockData";
import ItemsCard from "../../../components/cards/ItemsCard";
import Cancelicon from "../../../assets/images/order/cancel.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbMapPinFilled } from "react-icons/tb";
import { HiOutlineArrowLeft } from "react-icons/hi2";
function OrderView() {
  const [TrackOrderDetails, setTrackOrderDetails] = useState(false);
  return TrackOrderDetails ? (
    <TrackOrder
    setTrackOrderDetails={(e) => {
      setTrackOrderDetails(e)
    }}
    />
  ) : (
    <OrderDetails
      setTrackOrderDetails={(e) => {
        setTrackOrderDetails(e)
      }}
    />
  );
}
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

function OrderDetails(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
      <div>
        <div className="p-4 ">
          <h6 className="text-regal-black text-sm md:text-lg flex items-center gap-2">
            All Orders{" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4142 18.0102L10.9992 16.5972L15.5992 11.9972L10.9992 7.39723L12.4142 5.99023L18.4242 12.0002L12.4152 18.0102H12.4142ZM6.9892 18.0102L5.5752 16.5972L10.1752 11.9972L5.5752 7.40423L6.9892 5.99023L13.0002 12.0002L6.9902 18.0102H6.9892Z"
                fill="#262729"
              />
            </svg>
            <span className="font-bold">Order Details</span>
          </h6>

          <div className="my-5 flex items-center gap-4 p-4 rounded-md text-orange-400 bg-orange-100 text-xs md:text-sm font-[600]">
            <IoInformationCircle className="text-2xl md:text-lg" /> You are
            eligible to cancel an order within 24 hours after placing order
          </div>
          <div className="rounded-md border p-5 mt-4">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div className="">
                <p className="text-xs md:text-sm text-start flex flex-row items-center  gap-2 text-regal-black font-[700]  capitalize cursor-pointer">
                  ID: 9065379 <Status key={""} />
                </p>
                <p className="text-xs text-regal-light-gray text-start mt-1">
                  Order on: 3rd Aug, 2024
                </p>
                <p className="text-xs text-regal-black font-[700] text-start mt-1">
                  Total: ₦1,585.00
                </p>
              </div>
              <button
                onClick={toggleModal}
                className=" py-2 px-6 active:scale-95  md:mt-0 mt-3 w-full md:w-auto items-center font-[600] gap-1 rounded-md border border-regal-sky-blue text-regal-sky-blue text-xs md:text-sm "
              >
                Cancel Order
              </button>
            </div>
          </div>

          <div className="rounded-md border p-5 mt-4">
            <div className="flex flex-row items-start justify-between">
              <div className="">
                <p className="text-xs md:text-sm text-start flex flex-row items-center  gap-2 text-regal-black font-[700]  capitalize cursor-pointer">
                  Order Tracking
                </p>
              </div>
              <button
                className="font-[600] text-regal-sky-blue text-xs md:text-sm "
                onClick={() => {
                  props.setTrackOrderDetails(true);
                }}
              >
                View History
              </button>
            </div>

            <div className="flex my-4 overflow-x-scroll ">
              {orderTracking.map((e) => (
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
                    <>
                      <p className="text-xs md:text-sm text-regal-black  mt-2">
                        16th Aug,2024
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border p-5 mt-4">
            <div className="flex flex-row items-start justify-between">
              <div className="">
                <p className="text-xs md:text-sm text-start flex flex-row items-center  gap-2 text-regal-black font-[700]  capitalize cursor-pointer">
                  Items in this order (5)
                </p>
              </div>
              <button className="flex items-center gap-2 font-[600] text-regal-sky-blue text-xs md:text-sm ">
                View <IoIosArrowBack className="text-regal-black text-lg" />{" "}
                <IoIosArrowForward className="text-regal-black text-lg" />
              </button>
            </div>
            <div className="mt-5  flex flex-row gap-4 overflow-x-scroll">
              {Items &&
                Items.map((e) => (
                  <div className="w-[170px]" key={e.id}>
                    <ItemsCard item={e} />
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-md border p-5 mt-4">
            <div className="flex flex-row items-end justify-between border-b pb-5">
              <div className="">
                <p className="text-xs md:text-sm   items-center  gap-2 text-regal-black font-[700]  capitalize ">
                  Checkout details
                </p>
                <p className="text-xs md:text-sm text-regal-black  mt-5">
                  Card Payment
                </p>
              </div>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700]  ">
                5067 **** **** **** 1235
              </p>
            </div>
            <div className="flex flex-row items-end justify-between border-b pb-5 mt-4">
              <div className="">
                <p className="text-xs md:text-sm   items-center  gap-2 text-regal-black font-[700]  capitalize ">
                  Payment details
                </p>
                <p className="text-xs md:text-sm text-regal-black  mt-5">
                  Items Amount
                </p>
              </div>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700]  ">
                ₦1,585.00
              </p>
            </div>

            <div className="flex flex-row items-end justify-between border-b pb-5">
              <div className="">
                <p className="text-xs md:text-sm text-regal-black  mt-5">
                  Delivery Fee
                </p>
              </div>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700]  ">
                ₦1,585.00
              </p>
            </div>

            <div className="flex flex-row items-end justify-between border-b pb-5">
              <div className="">
                <p className="text-xs md:text-sm text-regal-black  mt-5">
                  Total
                </p>
              </div>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700]  ">
                ₦1,585.00
              </p>
            </div>

            <div className="flex flex-row items-end justify-between border-b mt-4 pb-5">
              <div className="">
                <p className="text-xs md:text-sm   items-center  gap-2 text-regal-black font-[700]  capitalize ">
                  Shipping Info
                </p>
                <p className="text-xs md:text-sm text-regal-black  mt-5">
                  Address
                </p>
              </div>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700] w-[200px]  truncate whitespace-nowrap ">
                Idugboe Estate, off Elf Road, Ogunu
              </p>
            </div>

            <div className="flex flex-row items-end justify-between border-b pb-5">
              <div className="">
                <p className="text-xs md:text-sm text-regal-black  mt-5">
                  Country
                </p>
              </div>
              <p className="text-xs md:text-sm flex items-center  gap-2 text-regal-black font-[700]  ">
                <img src="" alt="" /> Sweden
              </p>
            </div>

            <div className="flex flex-row items-end justify-between  ">
              <div className="">
                <p className="text-xs md:text-sm text-regal-black  mt-5">
                  ZIP Code
                </p>
              </div>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700]  ">
                932724
              </p>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown">
            <div className="bg-white p-14 rounded-lg shadow-lg w-[350px] md:w-[500px] text-center ">
              <img src={Cancelicon} alt=""  className="w-32 mx-auto mb-2" />
              <h2 className="text-xl font-bold mb-2">Cancel Order</h2>
              <p className="text-regal-black text-sm mt-4 mb-6">
                Are you sure you want to cancel order?
              </p>

              {/* Buttons in flex-col with gap */}
              <div className="flex flex-col gap-4 w-[200px] mx-auto">
                <button
                  onClick={() => {
                    // Handle delete action here
                    setIsModalOpen(false);
                  }}
                  className="bg-regal-sky-blue text-white py-2 rounded-md hover:bg-blue-900 transition active:scale-95"
                >
                  Proceed
                </button>
                <button
                  onClick={toggleModal}
                  className=" text-regal-sky-blue py-2 border-2 border-white rounded-md hover:border-regal-sky-blue transition font-[500] active:scale-95"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
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
              {orderTracking.map((e) => (
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
                  {trackingDetails.map((e,i)=> (
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
export default OrderView;
