import React, { useMemo, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { PiMapPin } from "react-icons/pi";
import { RiUserLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import { Items } from "../../data/mockData";

// Tracking Component
const Tracking = ({ trackingSteps, activeStep }) => {
  const trackingDetails = useMemo(
    () =>
      trackingSteps?.map((stage) => ({
        ...stage,
        isActive: stage.id === activeStep,
      })),
    [trackingSteps, activeStep]
  );

  return (
    <div className="flex overflow-x-scroll">
      {trackingDetails?.map(({ id, name, isActive, date }) => (
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
              {date}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const ProductTableTab = React.memo(({ setActiveOrder }) => {
    const itemsPerPage = 12;
    const [itemOffset, setItemOffset] = useState(0);
  
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = Items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(Items.length / itemsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % Items.length;
      setItemOffset(newOffset);
    };
  
    return (
      <div>
        <div className="w-full overflow-x-scroll mt-4 animate-fade-in">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                 NO
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                  PRODUCT NAME
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                  CATEGORY
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                  PRICE
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                  QTY
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                  WEIGHT
                </th>
           
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems?.map((product, index) => (
                <tr key={product.productID}>
                  <td className="px-6 py-4 text-xs font-medium text-regal-black">
                  {index+=1}
                  </td>
                  <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                    <div className="flex items-center gap-2">
                      <img
                        src={product?.image}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <h6 className="truncate max-w-[150px]">{product?.name}</h6>
                    </div>
                  </td>
                  <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                    {product?.category || "Staples"}
                  </td>
                  <td className="px-6 py-2 max-w-[200px] truncate whitespace-nowrap text-xs text-regal-black font-[600]">
                    ₦1,585.00
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black font-[600]">
                    2 cartoons
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-price-dark font-[600]">
                    220kg
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
         <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between mt-4">
          <h6 className="text-xs text-regal-crum-gray">
            Showing {currentItems.length} items out of {Items.length} results
            found
          </h6>
  
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< "
            pageClassName="py-1 px-2 rounded-md text-xs md:text-sm mx-2 border border-gray-200 text-regal-paginate-color"
            previousClassName="py-1 px-2 text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
            nextLinkClassName="py-1 px-2 text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
            breakClassName="page-item"
            breakLinkClassName="text-xs md:text-sm mx-2 py-1 px-2"
            containerClassName="flex flex-row items-center justify-end"
            activeClassName="border border-regal-sky-blue text-white bg-regal-sky-blue font-[500]"
          />
        </div>
      </div>
    );
  });
// GetStatus Component
const GetStatus = ({ status }) => {
  switch (status) {
    case "accepted":
      return (
        <span className="text-green-600 border text-xs border-green-100 bg-green-100 p-2 rounded-full">
          ACCEPTED
        </span>
      );
    default:
      return (
        <span className="text-red-600 border text-xs border-red-600 bg-red-100 p-2 rounded-full">
          FAILED
        </span>
      );
  }
};

// ShipmentView Component
const AgentViewComponent = ({
  order,
  trackingSteps,
  activeTrackingStep,
  itemList,
  itemColumns,
  onStatusChange,
}) => {
  return (
    <div>
      <main className=" bg-regal-auth-bg-color">
        <div className="bg-white p-4 md:p-6">
          <div className="flex flex-row items-center justify-between">
          <h5 className="text-regal-black text-xs md:text-2xl font-[700] flex flex-row items-center gap-2">
              <span className="text-regal-crum-gray">Shipment</span>
              <IoIosArrowForward className="text-regal-crum-gray" />
              <span>ID: {order.id}</span>
              <GetStatus status={order.status} />
            </h5>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <IoIosArrowBack className="text-regal-crum-gray text-sm" />
                <span className="text-regal-black text-xs">
                  <span className="text-regal-crum-gray text-xs">1 of</span>{" "}
                  {order.totalOrders}
                </span>
                <IoIosArrowForward className="text-regal-black text-sm" />
              </div>

              <button
                className="py-2  px-2 md:px-4  text-xs md:text-sm rounded-md text-white bg-gray-300"
                onClick={onStatusChange}
              >
                {order.statusAction}
              </button>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-white m-4 rounded-md">
      <main className='p-4 pb-8 mt-4   border-b'>
      <div className="flex flex-col md:flex-row items-start justify-between">
          <div>
            <p className="text-xs md:text-sm text-start flex gap-2 text-regal-black font-bold">
              ID: 9692893
            </p>
            <p className="text-xs text-regal-light-gray text-start mt-1">
            Order placed: 16th Aug
            </p>
            <p className="text-xs text-regal-black font-bold text-start mt-1">
            Total: ₦1,585.00
            </p>
          </div>

        </div>
      </main>
        <main className="p-4 pb-8 mt-4 border-b">
          <div className="flex flex-row items-start justify-between">
            <p className="text-xs md:text-sm font-bold text-regal-black">
              Order Tracking
            </p>
            <button className="font-[600] text-regal-sky-blue text-xs md:text-sm">
              View History
            </button>
          </div>
          <Tracking trackingSteps={trackingSteps} activeStep={activeTrackingStep} />
        </main>
        <main className='p-4 pb-8  mt-4  border-b'>
      <p className="text-xs md:text-sm font-bold text-regal-black">
        Map
      </p>

      <div className='w-full flex flex-col items-center justify-center bg-gray-300 h-80 rounded-md  mt-5'>
          <span className='text-regal-black rounded-md bg-white shadow-md text-lg py-2 px-8 font-semibold'>
            No Tracking Yet
          </span>
      </div>
      </main>
        <main className='p-4 pb-8  mt-4  border-b'>
        <div className='grid grid-cols-2 md:grid-cols-3 max-w-[800px]'>
            <div className='flex flex-col items-start gap-4'>
              <div className='flex items-center  text-sm md:text-sm gap-2 font-bold'>
              <BsBoxSeam />
              <h3>Order info</h3>
              </div>

              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>DATE OF LOADING</h5>
                <h6 className=' text-xs font-[500] mt-1'>09:00:15 AM 2nd Aug, 2023</h6>
              </div>
              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>EST DELIVERY DATE</h5>
                <h6 className=' text-xs font-[500] mt-1'>7 days</h6>
              </div>
              
            </div>

            <div className='flex flex-col items-start gap-4'>
              <div className='flex items-center  text-sm md:text-sm gap-2 font-bold'>
              <PiMapPin />
              <h3>Location</h3>
              </div>

              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>PICK UP LOCATION</h5>
                <h6 className=' text-xs font-[500] mt-1'>Lagos, Nigeria</h6>
              </div>
              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>DESTINATION</h5>
                <h6 className=' text-xs font-[500] mt-1'>Moroni, Comoros</h6>
              </div>
              
            </div>
            <div className='flex flex-col items-start gap-4'>
              <div className='flex items-center  text-sm md:text-sm gap-2 font-bold'>
              <RiUserLine />
              <h3>Customer Information</h3>
              </div>

              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>FULL NAME</h5>
                <h6 className=' text-xs font-[500] mt-1'>Adebayo Samuel</h6>
              </div>
              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>EMAIL</h5>
                <h6 className=' text-xs font-[500] mt-1'>adebayosamuel@gmail.com</h6>
              </div>

              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>PHONE NUMBER</h5>
                <h6 className=' text-xs font-[500] mt-1'>+1 6937 7563 583</h6>
              </div>
              
            </div>
        </div>
      </main>

        <main className="p-4 pb-8 mt-4 border-b">
          <p className="text-xs md:text-sm font-bold text-regal-black">Item List</p>
          <ProductTableTab items={itemList} columns={itemColumns} />
        </main>
      </section>
    </div>
  );
};

export default AgentViewComponent;
