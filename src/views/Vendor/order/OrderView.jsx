import React, { useState } from "react";
import Status from "../../../components/order/OrderStatus";
import ItemsCard from "../../../components/cards/ItemsCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useParams } from 'react-router-dom';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCompleteOrderMutation } from "../../../features/vendor/vendorApiSlice";

function OrderView() {
  const { orderID } = useParams();

  const location = useLocation();
  const { orderData } = location.state || {};  
  const [itemList, setItemList] = useState([])


  const [completeOrder,{isLoading}] = useCompleteOrderMutation()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleItemListing = (e) => {
      const { name, value } = e.target;

      setItemList(
        (prevList) =>
          e.target.checked
            ? [...prevList, value] // Add value to the list if checked
            : prevList.filter((id) => id !== value) // Remove itemID if unchecked
      );
    };

    const handleCompleteOrder = async ()=>{      
      try{
        const resp = await completeOrder({itemIDs:itemList,orderID}).unwrap();
      console.log("RESP::; ",resp)
        // if(resp.data != undefined && resp.data.status === "ACCEPTED"){
        navigate("/vendor/orders")
      // }
    } catch (error) {
      console.error('Failed to complete order:', error);
    }
    }
  return (
    <div className="px-4 py-8">
            <Link
          className=" flex items-center gap-2 text-regal-dark text-sm font-[600] mb-4"
          to="/vendor/orders"
        >
          <IoIosArrowRoundBack />
         Back
        </Link>
      <div className="flex flex-row items-center justify-between ">
        <h5 className="text-regal-black text-lg md:text-2xl font-[700]">
        Orders Details
        </h5>
       
      </div>

        <div className="border round-md py-8 bg-white  my-8">
            <div className="max-w-4xl mx-auto">
            <div className="rounded-md border p-5 mt-4">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div className="">
                <p className="text-sm text-start flex flex-row items-center  gap-2 text-regal-black font-[700]  capitalize ">
                  ID: {orderID} <Status key={""} />
                </p>
                <p className="text-xs text-regal-light-gray text-start mt-1">
                  Order on: 3rd Aug, 2024
                </p>
                <p className="text-xs text-regal-black font-[700] text-start mt-1">
                  Total: ${orderData.totalCost}
                </p>
              </div>
              <button
                className={`font-[600] p-2 rounded text-white text-xs md:text-sm ${itemList.length ? "bg-green-500" : "bg-green-100"}`}
                onClick={handleCompleteOrder}
                disabled={!itemList.length}
              >
                Complete Order
              </button>
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
                  Items in this order ({orderData.items.length})
                </p>
              </div>
              <button className="flex items-center gap-2 font-[600] text-regal-sky-blue text-xs md:text-sm ">
                View <IoIosArrowBack className="text-regal-black text-sm" />{" "}
                <IoIosArrowForward className="text-regal-black text-sm" />
              </button>
            </div>
            <div className="mt-5  flex flex-row gap-4 overflow-x-scroll">
              {orderData.items &&
                orderData.items?.map((e) => (
                  <div className="w-[170px]" key={e.id}>
                    <input type="checkbox" 
                      name="itemCheck"
                      value={e.itemID}
                      onChange={handleItemListing}
                    />

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
