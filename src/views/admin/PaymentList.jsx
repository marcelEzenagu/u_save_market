import React, { useMemo, useState } from "react";
import { Items } from "../../data/mockData";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { PiDotsThreeOutline } from "react-icons/pi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import { Menu } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
function PaymentList() {
  const tab = useMemo(
    () => [
      {
        name: "Wallet",
        bgcolor: "bg-regal-blue",
        color: "#7895FF",
        textHeader:'text-white',
        text:'text-white',
        subColor: "#7CF8E1",
        total: "₦15,048,894",
      },
      {
        name: "Incoming Payment",
        bgcolor: "bg-white",
        color: "white",
        textHeader:'text-regal-crum-gray',
        text:'text-regal-blue',
        subColor: "#DE8208",
        total: "₦3,509,849.00",
      },
      {
        name: "Successful Payment",
        bgcolor: "bg-white",
        color: "white",
        textHeader:'text-regal-crum-gray',
        text:'text-regal-blue',
        subColor: "#527F22",
        total: "₦3,509,849.00",
      },
      {
        name: "Failed Payment",
        bgcolor: "bg-white",
        color: "white",
        textHeader:'text-regal-crum-gray',
        text:'text-regal-blue',
        subColor: "#D83832",
        total: "₦3,509,849.00",
      },
    ],
    []
  );

  const [dropdownOption, setDropdownOption] = useState("This Month");
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const tabOptions = useMemo(
    () => [
      { id: "1", name: "All Payments" },
      { id: "2", name: "Incoming" },
      { id: "3", name: "Successful" },
      { id: "4", name: "Failed" },
      { id: "5", name: "Refunds" },
    ],
    []
  );

  const handleOptionChange = (option) => {
    setDropdownOption(option);
    setIsOpenSelect(false);
  };

  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className="">
      <main className="flex flex-row items-center justify-between mt-4">
        <div className="flex flex-row items-center gap-4 ">
          <div className="flex flex-row items-center gap-2">
            <h6 className="text-sm text-regal-light-gray">Form:</h6>
            <input
              type="date"
              className="text-xs text-regal-light-gray border rounded-[4px] px-2 py-1"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <h6 className="text-sm text-regal-light-gray">To:</h6>
            <input
              type="date"
              className="text-xs text-regal-light-gray border rounded-[4px] px-2 py-1"
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-3">
          <button
            type="button"
            className="py-2 px-6 text-xs font-semibold rounded-[4px] border border-regal-sky-blue text-regal-sky-blue bg-white hover:bg-regal-sky-blue hover:text-white transition"
          >
            Withdraw
          </button>
          <button
            type="submit"
            className="py-2 px-6 text-xs font-semibold  rounded-[4px]  border border-regal-sky-blue text-white bg-regal-sky-blue hover:bg-regal-blue transition"
          >
            Make Payment
          </button>
        </div>
      </main>

      <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative bg-white mt-8">
  {tab?.map((item) => (
    <div
      key={item.name}
      className={`flex flex-row items-center gap-4 p-8 border rounded-3xl relative overflow-hidden ${item.bgcolor}`} // Added overflow-hidden and relative for positioning
    >
      <div className="flex flex-col gap-1 z-10"> {/* Added z-10 to keep text above SVGs */}
        <div className={`text-xs font-[600] ${item.textHeader}`}>
          {item.name}
        </div>
        <div className={`text-lg font-bold ${item.text}`}>
          {item.total}
        </div>
      </div>

      {/* First SVG */}
      <svg
        width="54"
        height="67"
        viewBox="0 0 54 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 bottom-0 z-0 " // Positioned at the right end
        style={{ fill: item.subColor }} // You can dynamically control this color
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.2265 87.6932C1.56212 72.2576 -3.33984 53.1052 3.70885 36.3068C10.3076 20.5807 28.1036 15.0877 44.1355 9.26474C60.1168 3.46015 77.2353 -3.67879 92.3403 4.11485C108.438 12.4207 117.477 30.0901 119.405 48.101C121.288 65.6953 114.148 82.5263 102.124 95.5163C89.6515 108.99 73.085 119.474 54.795 117.899C36.2669 116.305 21.0924 103.451 11.2265 87.6932Z"
          style={{ fill: item.subColor }}  // Set SVG fill color here
        />
      </svg>

      {/* Second SVG */}
      <svg
        width="72"
        height="97"
        viewBox="0 0 72 97"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 bottom-0 z-0 opacity-10" // Positioned at the right end
        style={{ fill: item.color }} // You can dynamically control this color
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.1199 111.004C15.3354 101.921 2.00799 87.3187 0.335697 69.1782C-1.22985 52.1958 11.8973 38.9842 23.3123 26.3103C34.6912 13.6764 46.4469 -0.669748 63.4426 -0.888706C81.5553 -1.12205 97.8376 10.2269 108.003 25.2192C117.934 39.8648 119.541 58.0769 115.031 75.1939C110.354 92.9484 100.657 109.987 83.7728 117.193C66.6686 124.492 47.2334 120.277 31.1199 111.004Z"
          style={{ fill: item.color }} // Set SVG fill color here
        />
      </svg>
    </div>
  ))}
</div>

      </section>

      <section className="rounded-2xl border animate-fade-in mt-8 bg-white">
        <div className="p-4 md:px-8 md:pt-8 pb-4 ">
          <div className="flex flex-row items-center justify-between">
            <div>
              {tabOptions?.map((tab) => (
                <button
                  key={tab.id}
                  className={`shadow-sm rounded-full py-2 px-4 mr-3 hover:text-white hover:bg-regal-black text-xs md:text-xs font-[600] ${
                    activeTab === tab.id
                      ? "bg-regal-black text-white"
                      : "text-regal-black bg-regal-dashboard-active-tab-gray"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="relative md:pr-5">
              <button
                type="button"
                onClick={() => setIsOpenSelect(!isOpenSelect)}
                className="w-full text-xs flex justify-between items-center border rounded-sm py-2 px-3 ml-4 bg-transparent text-gray-700"
              >
                {dropdownOption}
                <SlArrowDown className="text-xs" />
              </button>

              {isOpenSelect && (
                <ul className="absolute left-0 pl-4 pr-8 bg-white border text-nowrap shadow-sm rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
                  <li className="py-2">
                    <button
                      type="button"
                      className={`text-xs ${
                        dropdownOption === "This Month"
                          ? "text-regal-blue font-[600]"
                          : ""
                      }`}
                      onClick={() => handleOptionChange("This Month")}
                    >
                      This Month
                    </button>
                  </li>
                  <li className="py-2">
                    <button
                      type="button"
                      className={`text-xs ${
                        dropdownOption === "Disabled Users"
                          ? "text-regal-blue font-[600]"
                          : ""
                      }`}
                      onClick={() => handleOptionChange("Disabled Users")}
                    >
                      Disabled Users
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <section className=" mt-8 ">
            {activeOrder !== null ? (
              <ViewPayment
                order={activeOrder}
                setActiveOrder={() => setActiveOrder(null)}
              />
            ) : (
              <ProductTableTab
                setActiveOrder={() =>
                  setActiveOrder({
                    orderID: "1892423",
                    products: [],
                  })
                }
              />
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
const ViewPayment = React.memo(({ order, setActiveOrder }) => {
  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <button
        className=" flex items-center gap-2 text-regal-sky-blue text-sm  mb-4"
        onClick={() => {
          setActiveOrder();
        }}
      >
        <IoIosArrowRoundBack className="text-lg" />
        Back
      </button>
      <main className="max-w-[450px]">
        <div className="flex flex-row items-start gap-3 mt-2 border rounded-xl p-4">
          <div className="flex flex-col items-center ">
            <div
              className={`w-10 h-10 rounded-full  bg-gray-100
                  flex flex-col items-center justify-center text-white `}
            >
              <div
                className={`w-7 h-7 rounded-full border bg-green-600
                  flex flex-col items-center justify-center text-white `}
              >
                <FaCheck className="text-sm" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-between">
            <div>
              <h6 className="text-regal-light-gray text-[10px] md:text-xs mt-1">
                Payment Successful
              </h6>
              <h5 className="text-regal-black  text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
                ₦3,849.00
              </h5>
            </div>
          </div>
        </div>
        <div className="mt-8">
            <h6 className="text-regal-black text-sm font-[600]">Transaction Details</h6>  

              <div className=" ">
  <div className="flex flex-row items-end justify-between border-b pb-3 mt-4">
    <div className="">
      <p className="text-xs md:text-sm   items-center  gap-2 text-regal-light-gray font-[400]  capitalize ">
      Venf=dor
      </p>
    </div>
    <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700]  ">
    Darrell Steward
    </p>
  </div>
  <div className="flex flex-row items-end justify-between border-b pb-3 mt-4">
    <div className="">
      <p className="text-xs md:text-sm   items-center  gap-2 text-regal-light-gray font-[400]  capitalize ">
      Reference ID
      </p>
    </div>
    <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700]  ">
    099084057
    </p>
  </div>
  <div className="flex flex-row items-end justify-between border-b pb-3 mt-4">
    <div className="">
      <p className="text-xs md:text-sm   items-center  gap-2 text-regal-light-gray font-[400]  capitalize ">
      Amount
      </p>
    </div>
    <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700]  ">
    ₦1,585.0
    </p>
  </div>
  <div className="flex flex-row items-end justify-between border-b pb-3 mt-4">
    <div className="">
      <p className="text-xs md:text-sm   items-center  gap-2 text-regal-light-gray font-[400]  capitalize ">
      Payment Method
      </p>
    </div>
    <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700]  ">
    Card
    </p>
  </div>
</div>      
        </div>
        <button className="inline-block px-8  py-2 md:py-3 mt-24 mb-8  text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-sm cursor-pointer">
          Make Payment
        </button>
      </main>

    </div>
  );
});
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
                <input type="checkbox" />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                REF ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                VENDOR
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                ITEMS
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                DATE
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                AMOUNT
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems?.map((product) => (
              <tr key={product.productID}>
                <td className="px-6 py-4 text-xs font-medium text-regal-black">
                  <input type="checkbox" />
                </td>
                <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                  <button
                    onClick={() => {
                      setActiveOrder();
                    }}
                  >
                    099084057
                  </button>
                </td>
                <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://via.placeholder.com/40"
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <Link to="#">Theresa Webb</Link>
                  </div>
                </td>
                <td className="px-6 py-2 max-w-[200px] truncate whitespace-nowrap text-xs text-regal-black font-[600]">
                  {product.name}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black font-[600]">
                  2nd Aug, 2023
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-price-dark font-[600]">
                  ₦1,585.00
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  <Menu
                    as="button"
                    className="relative inline-block text-right"
                  >
                    <div>
                      <Menu.Button className=" rounded-full text-sm md:text-lg   focus:outline-none">
                        <PiDotsThreeOutline />
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right z-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
  <div className="py-1">
    {/* Delete Product Menu Item */}
    <Menu.Item>
      {({ active }) => (
        <button
          className={`flex items-center w-full px-4 py-2 text-xs gap-2 text-regal-black ${
            active ? "bg-gray-100" : ""
          }`}
          onClick={() => handleDeleteClick(item)} // Ensure handleDeleteClick is defined
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
              stroke="#0F0F0F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
              stroke="#0F0F0F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.8504 9.14014L18.2004 19.2101C18.0904 20.7801 18.0004 22.0001 15.2104 22.0001H8.79039C6.00039 22.0001 5.91039 20.7801 5.80039 19.2101L5.15039 9.14014"
              stroke="#171717"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.3301 16.5H13.6601"
              stroke="#171717"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 12.5H14.5"
              stroke="#171717"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Delete Product
        </button>
      )}
    </Menu.Item>
  </div>
  
  {/* Download Menu Item */}
  <div className="py-1">
    <Menu.Item>
      {({ active }) => (
        <button
          className={`flex items-center w-full px-4 py-2 text-xs gap-2 text-regal-black ${
            active ? "bg-gray-100" : ""
          }`}
          onClick={() => handleDownloadClick(item)} // Define handleDownloadClick if needed
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 11V17L11 15"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 17L7 15"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download
        </button>
      )}
    </Menu.Item>
  </div>
</Menu.Items>

                  </Menu>
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

export default PaymentList;
