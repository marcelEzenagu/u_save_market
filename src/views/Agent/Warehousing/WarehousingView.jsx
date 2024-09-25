import React, { useMemo, useState, useEffect, useRef } from "react";
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { PiMapPin } from "react-icons/pi";
import { RiUserLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";
import { IoInformationCircle } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { Items } from "../../../data/mockData";
import AgentItemCard from "../../../components/cards/AgentItemCard";
function WarehousingView() {

  const orderTracking = [
    { id: "1", name: "Order Accepted" },
    { id: "2", name: "Processing" },
    { id: "4", name: "Warehouse" },
    { id: "5", name: "Shipping" },
    { id: "6", name: "Delivered" },
    { id: "6", name: "completed" },
  ];
  const trackingDetails = useMemo(
    () =>
      orderTracking.map((stage) => ({
        ...stage,
        isActive: stage.id === "1", // Example: logic to highlight active stage
      })),
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPackage, setIsModalOpenPackage] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleModalPackageToggle = () => {
    setIsModalOpenPackage(!isModalOpenPackage);
  };
  return (
    <div>   <main className=" bg-regal-auth-bg-color">
    <div className="bg-white p-4 md:p-6">
        <div className="flex flex-row items-center justify-between">
          <h5 className="text-regal-black text-xs md:text-2xl font-[700] flex flex-row items-center gap-2">
            <span className='text-regal-crum-gray'>Warehousing</span> <IoIosArrowForward className='text-regal-crum-gray'/> <span>ID: 099084057</span> 
          </h5>
          <div className='flex flex-row items-center gap-2'>
          <div className="flex flex-row items-center gap-2">
                        <IoIosArrowBack className="text-regal-crum-gray text-sm" />
                        <span className="text-regal-black text-xs">
                            <span className="text-regal-crum-gray text-xs">1 of</span> 350
                        </span>
                        <IoIosArrowForward className="text-regal-black text-sm" />
                    </div>

                    <button
                    onClick={handleModalPackageToggle}
                    className='py-2 px-2 md:px-6 text-xs md:text-sm rounded-md text-white bg-regal-sky-blue'> 
                          Accept
                    </button>
          </div>
        </div>
      </div>
    </main>
    
    <main className="grid grid-cols-1 md:grid-cols-4">
    <section className='bg-white m-4 rounded-lg md:col-span-3'>
        
      <div className=" flex items-center gap-4 p-3 rounded-md text-orange-400 bg-orange-100 text-xs font-semibold">
        <IoInformationCircle className="text-2xl md:text-lg" /> Accept orders which shipment you’ll like to carry out
      </div>
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
      <main className='p-4 pb-8  mt-4  border-b'>
      <div className="flex justify-between">
        <p className="text-xs md:text-sm font-bold text-regal-black">
        Item List ({Items?.length})
      </p>
        <button
          onClick={handleModalToggle}
          className="font-semibold text-regal-sky-blue text-xs md:text-sm flex items-center gap-2"
        >
          View
        </button>
        </div>
   

      <ProductTableTab
                setActiveOrder={() =>
                  setActiveOrder({
                    orderID: "1892423",
                    products: [],
                  })
                }
              />
      </main>

      <main className='p-4 pb-8  mt-4  border-b'>
      <p className="text-xs md:text-sm font-bold text-regal-black">
        Order Summary 
      </p>
      <div className="flex flex-row items-end justify-between border-b pb-5">
    <div className="">
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
       Delivery Free
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

      </main>

    </section>

    <section className="bg-white m-4 rounded-lg">
    <div className='grid grid-cols-1 '>
            <div className='flex flex-col items-start gap-4 p-4 pb-8  mt-4  border-b'>
            <div className=' text-sm md:text-sm gap-2 font-bold'>
              <h3>Customer Details</h3>
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

            <div className='flex flex-col items-start gap-4 p-4 pb-8  mt-4  border-b'>
              <div className='flex items-center  text-sm md:text-sm gap-2 font-bold'>
      
              <h3>Vendor Details</h3>
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
              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>STORE LOCATION</h5>
                <h6 className=' text-xs font-[500] mt-1'>Abuja, Nigeria</h6>
              </div>
              
            </div>
            <div className='flex flex-col items-start gap-4 p-4 pb-8  mt-4  '>
              <div className='flex items-center  text-sm md:text-sm gap-2 font-bold'>
              <h3>Shipping Details</h3>
              </div>

              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>ADDRESS</h5>
                <h6 className=' text-xs font-[500] mt-1'>Idugboe Estate, off Elf Road, Ogunu,
                Lagos, Nigeria</h6>
              </div>

              <div>
                <h5 className='uppercase  text-regal-light-gray  text-xs  font-[500]'>EXPECTED DELIVERY TIME</h5>
                <h6 className=' text-xs font-[500] mt-1'>2 weeks</h6>
              </div>
              
            </div>
        </div>
    </section>


    </main>

    {isModalOpenPackage && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg max-w-[500px] w-full">
                <div className="max-w-[350px] px-2  py-8 mx-auto">
               
                  <h3 className="text-xl font-bold text-center mb-2">
                  Accept Package
                  </h3>
                  <p className="text-center text-xs max-w-[300px] mx-auto mb-4">
                  Are you sure you’ll ike to carry out this shipment? Once accepted, it can’t be rejected
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleModalPackageToggle}
                      className="bg-regal-sky-blue text-white py-2 px-4 text-sm rounded-md w-full font-[600]"
                    >
                        Yes, Accept
                    </button>
                    <button
                      onClick={handleModalPackageToggle}
                      className="bg-white text-sm border border-regal-sky-blue text-regal-sky-blue py-2 px-4 font-[600] rounded-md w-full"
                    >
                      No, Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

    {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Items in this order ({Items?.length})</h2>
              <button onClick={handleModalToggle} className="text-red-500 text-xl">&times;</button>
            </div>

            <div className="max-h-[500px] md:max-h-[700px] grid grid-cols-1 overflow-y-auto">
              {Items?.map((item, index) => (
                <div className="mb-4" key={index}>
                  <AgentItemCard item={item} />
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
    </div>
  )
} 

const ProductTableTab = React.memo(({ setActiveOrder }) => {
  const itemsPerPage = 8;
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
            {currentItems.map((product, index) => (
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


    </div>
  );
});
const GetStatus = ({status}) => {
  switch (status) {
      case 'accepted':
           return   <span className='text-green-600 border text-xs border-green-100 bg-green-100 p-2 rounded-full'>ACCEPTED</span>        
      default:
         return <span className='text-red-600 border text-xs border-red-600 bg-red-100 p-2 rounded-full'>FAILED</span>
  }
}

export default WarehousingView 