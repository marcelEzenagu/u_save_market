import React, { useState, useMemo } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ItemsCard from "../../components/cards/ItemsCard";
import Status from "../../components/order/OrderStatus";
import Cancelicon from "../../assets/images/order/cancel.png";
import moment from "moment";
import { numberWithCommas } from "../../utils";
import { useDeleteUserOrderMutation } from "../../features/order/orderApiSlice";
import { useToaster } from "../../components/ToasterContext";
import { Link, useNavigate } from "react-router-dom";
import { Items } from "../../data/mockData";

const orderTracking = [
  { id: "1", name: "Order Accepted" },
  { id: "2", name: "Processing" },
  { id: "4", name: "Shipping" },
  { id: "5", name: "Pickup" },
  { id: "6", name: "Delivered" },
];

const CancelOrderModal = ({ isModalOpen, toggleModal, id }) => {
  const [deleteUserOrder, { isLoading }] = useDeleteUserOrderMutation();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  const handleCancelOrder = async () => {
    try {
      await deleteUserOrder(id).unwrap();
      showToast("Order cancelled successfully", "success");
      navigate("/orders");
    } catch (err) {
      if (err?.status >= 400 && err?.status <= 404) {
        showToast(err?.data?.message || "Order cancellation failed", "error");
      } else {
        showToast("Order cancellation failed", "error");
      }
    }
  };

  return (
    <>
      {isModalOpen && id && (
        <div className="fixed inset-0 bg-black w-full bg-opacity-75 z-50 flex justify-center items-center animated fadeInDown">
          <div className="bg-white p-14 rounded-lg shadow-lg w-[350px] md:w-[500px] text-center">
            <img
              src={Cancelicon}
              alt="Cancel Order"
              className="w-32 mx-auto mb-2"
            />
            <h2 className="text-xl font-bold mb-2">Cancel Order</h2>
            <p className="text-regal-black text-sm mt-4 mb-6">
              Are you sure you want to cancel this order?
            </p>
            <div className="flex flex-col gap-4 w-[200px] mx-auto">
              <button
                onClick={handleCancelOrder}
                className="bg-regal-sky-blue text-white py-2 rounded-md hover:bg-blue-900 transition active:scale-95"
                disabled={isLoading}
                aria-busy={isLoading}
                aria-label="Cancel Order"
              >
                {isLoading ? "Cancelling..." : "Proceed"}
              </button>
              <button
                onClick={toggleModal}
                className="text-regal-sky-blue py-2 border-2 border-white rounded-md hover:border-regal-sky-blue transition font-medium active:scale-95"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function OrderViewComponents({ order, setTrackOrderDetails,setActiveOrder }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const trackingDetails = useMemo(
    () =>
      orderTracking?.map((stage) => ({
        ...stage,
        isActive: stage.id === "1", // Example: logic to highlight active stage
      })),
    []
  );

  const { orderID, createdAt, totalCost, products } = order;

  return (
    <div className=" overflow-hidden max-w-screen-2xl">
   

      <div className="border-b p-5 mt-4 ">
      <button className="flex flex-row gap-2 items-center text-xs font-[600] mb-4"
        onClick={()=>{
          setActiveOrder()
        }}
      >
                    <AiOutlineArrowLeft className="font-[400]" />
                    Go Back
                </button>
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div>
            <p className="text-xs md:text-sm text-start flex gap-2 text-regal-black font-bold">
              ID: {orderID} <Status />
            </p>
            <p className="text-xs text-regal-light-gray text-start mt-1">
              Order on: {moment(createdAt).format("DD MMM, YYYY : HH:mm")}
            </p>
            <p className="text-xs text-regal-black font-bold text-start mt-1">
              Total: ₦{numberWithCommas(totalCost)}
            </p>
          </div>
          <button
            onClick={toggleModal}
            className="py-2 px-6 active:scale-95 mt-3 w-full md:w-auto font-semibold gap-1 rounded-md border border-regal-sky-blue text-regal-sky-blue text-xs"
          >
            Cancel Order
          </button>
        </div>
      </div>

      <TrackingComponent
        trackingDetails={trackingDetails}
        setTrackOrderDetails={(e) => {
          setTrackOrderDetails(e);
        }}
      />

      <div className="border-b p-5 ">
        <OrderItems products={Items} />
      </div>

      <CheckoutDetails />

      <CancelOrderModal
        id={orderID}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </div>
  );
}

const TrackingComponent = ({ trackingDetails, setTrackOrderDetails }) => (
  <div className="border-b p-5 ">
    <div className="flex flex-row items-start justify-between">
      <p className="text-xs md:text-sm font-bold text-regal-black">
        Order Tracking
      </p>
      <button
        className="font-[600] text-regal-sky-blue text-xs md:text-sm "
        onClick={() => {
          setTrackOrderDetails(true);
        }}
      >
        View History
      </button>
    </div>
    <div className="flex my-4 overflow-x-scroll">
      {trackingDetails?.map(({ id, name, isActive }) => (
        <div key={id} className="mt-3">
          <div className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full ${
                isActive ? "bg-regal-light-blue" : "bg-white"
              } flex items-center justify-center`}
            >
              <span
                className={`w-4 h-4 rounded-full ${
                  isActive ? "bg-regal-blue" : "border bg-white"
                } z-10`}
              ></span>
            </div>
            <span className="w-[100px] md:w-[160px] border-b border-dotted"></span>
          </div>
          <p
            className={`text-xs md:text-sm font-medium capitalize mt-7 ${
              isActive ? "text-regal-black" : "text-regal-track-gray"
            }`}
          >
            {name}
          </p>
          {isActive && (
            <p className="text-xs md:text-sm text-regal-black mt-2">
              16th Aug,2024
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);


const OrderItems = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-xs md:text-sm font-bold text-regal-black">
          Items in this order ({products?.length})
        </p>
        <button
          onClick={handleModalToggle}
          className="font-semibold text-regal-sky-blue text-xs md:text-sm flex items-center gap-2"
        >
          View
        </button>
      </div>

      <div className="mt-5 flex gap-4 overflow-x-scroll">
        {products?.map((item, index) => (
          <div className="w-[170px]" key={index}>
            <ItemsCard item={item} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Items in this order ({products?.length})</h2>
              <button onClick={handleModalToggle} className="text-red-500 text-xl">&times;</button>
            </div>

            <div className="max-h-[500px] md:max-h-[700px] grid grid-cols-2 overflow-y-auto">
              {products?.map((item, index) => (
                <div className="mb-4" key={index}>
                  <ItemsCard item={item} />
                </div>
              ))}
            </div>

            <button
              onClick={handleModalToggle}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};


const CheckoutDetails = () => (
  <div className="border-b p-5 ">
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
);

export default OrderViewComponents;