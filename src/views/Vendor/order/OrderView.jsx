import React, { useState } from "react";
import { Items } from "../../../data/mockData";
import Status from "../../../components/order/OrderStatus";
import ItemsCard from "../../../components/cards/ItemsCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
function OrderView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  return (
    <div className="px-4 py-8">
            <Link
          className=" flex items-center gap-2 text-regal-dark text-sm font-[600] mb-4"
          to="/vendor/dashboard/orders"
        >
          <IoIosArrowRoundBack />
         Back
        </Link>
      <div className="flex flex-row items-center justify-between ">
        <h5 className="text-regal-black text-lg md:text-2xl font-[700]">
        Orders Details
        </h5>
        <input
          type="date"
          className=" px-2 py-2 bg-white text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
        />
      </div>

        <div className="border round-md py-8 bg-white  my-8">
            <div className="max-w-4xl mx-auto">
            <div className="rounded-md border p-5 mt-4">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div className="">
                <p className="text-sm text-start flex flex-row items-center  gap-2 text-regal-black font-[700]  capitalize cursor-pointer">
                  ID: 9065379 <Status key={""} />
                </p>
                <p className="text-xs text-regal-light-gray text-start mt-1">
                  Order on: 3rd Aug, 2024
                </p>
                <p className="text-xs text-regal-black font-[700] text-start mt-1">
                  Total: ₦1,585.00
                </p>
              </div>
            </div>
          </div>
{/* 
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
          </div> */}

          <div className="rounded-md border p-5 mt-4">
            <div className="flex flex-row items-start justify-between">
              <div className="">
                <p className="text-sm  text-start flex flex-row items-center  gap-2 text-regal-black font-[700]  capitalize cursor-pointer">
                  Items in this order (5)
                </p>
              </div>
              <button className="flex items-center gap-2 font-[600] text-regal-sky-blue text-xs md:text-sm ">
                View <IoIosArrowBack className="text-regal-black text-sm" />{" "}
                <IoIosArrowForward className="text-regal-black text-sm" />
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

        </div>

    </div>
  );
}

export default OrderView;
