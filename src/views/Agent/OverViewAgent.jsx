import React, { useMemo, useState, useEffect, useRef } from "react";
import { Items } from "../../data/mockData";
import { PiDotsThreeOutline } from "react-icons/pi";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import Bag from "../../assets/images/admin/bag.png";
import Success from "../../assets/images/payment/success.png";
import OrderVendorStatus from "../../components/order/OrderVendorStatus";
import OrderViewComponents from "../../components/OrderViewComponents/OrderViewComponents";
import { SlArrowDown } from "react-icons/sl";
import { Menu } from "@headlessui/react";
import { FiBarChart } from "react-icons/fi";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// Register the necessary components for the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function OverViewAgent() {
    const [dropdownOption, setDropdownOption] = useState("This Month");
    const [isOpenSelect, setIsOpenSelect] = useState(false);
  const tab = useMemo(
    () => [
      {
        name: "Total Shipments",
        icon: <FiBarChart />,
        total: "500",
        color: "text-red-600",
        bgColor: "bg-red-100",
      },
      {
        name: "In Transit",
        icon: <FiBarChart />,
        total: "22",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      },
      {
        name: "Delivered",
        icon: <FiBarChart />,
        total: "40K",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
      },
      {
        name: "Completed",
        icon: <FiBarChart />,
        total: "40K",
        color: "text-green-600",
        bgColor: "bg-green-100",
      },
    ],
    []
  );

  const user = useSelector((state) => state.auth?.user);

  console.log("OverViewAgent===",user)
  const handleOptionChange = (option) => {
    setDropdownOption(option);
    setIsOpenSelect(false);
  };

  return (
    <div>
      {!user.isVerified ?
          <main className="bg-regal-auth-bg-color h-screen mt-4 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-orange-600 bg-regal-auth-bg-color">
              <span className="py-3">
                Your approval is pending, 
              </span>
              <br/>
              <span>
              we would email you once the process is completed.
              </span>
            </div>
          </main>
          :
          <>
            <main className=" bg-regal-auth-bg-color my-auto">
              <div className="bg-white p-4 md:p-6">
                <div className="flex flex-row items-center justify-between">
                  <h5 className="text-regal-black text-xl md:text-2xl font-[700]">
                    Overview
                  </h5>
                </div>
              </div>
            </main>
            <main className="p-4 ">
              <section>
                <div className="grid grid-cols-2 md:grid-cols-4  gap-4  relative   mt-8">
                  {tab?.map((item) => (
                    <div
                      key={item.name}
                      className="flex bg-white flex-row items-center gap-4 p-4 border rounded-xl"
                    >
                      <div
                        className={`w-12 h-12 rounded-md ${item.color} ${item?.bgColor} flex items-center justify-center text-sm`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-xs font-[600] text-regal-crum-gray">
                          {item.name}
                        </div>
                        <div className="text-lg  font-bold text-regal-black">
                          {item.total}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-4 mt-8 bg-white" >

                      <div className="flex flex-row justify-between">
                      <h6 className="text-sm md:text-lg text-regal-black font-[500] ">Shipments</h6>
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

                      <SlimBarChart />

              </section>

              <section className="rounded-2xl border animate-fade-in mt-8 bg-white">
                  <h6 className="text-sm md:text-lg text-regal-black font-[500] mt-4 px-4">Shipments</h6>
                <ProductTableTab
                  setActiveOrder={() =>
                    setActiveOrder({
                      orderID: "1892423",
                      products: [],
                    })
                  }
                />
              </section>
            </main>
          
          </>
      }

    </div>
  );
}

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
                ORDER ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                DATE OF LOADING
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                DESTINATION
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                EST DELIVERY DATE
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                NO OF ITEMS
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems?.map((product) => (
              <tr key={product.productID}>
                <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                  099084057
                </td>
                <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                  2nd Aug, 2023
                </td>
                <td className="px-6 py-2 max-w-[200px] truncate whitespace-nowrap text-xs text-regal-black font-[600]">
                  Kabul, Afghanistan
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black font-[600]">
                  22nd Aug, 2023
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black font-[600]">
                  12 Items
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-price-dark font-[600]">
                  <OrderVendorStatus />
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

const SlimBarChart = () => {
    // Data for the chart
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Total',
          data: [50, 60, 70, 85, 90, 95, 100, 110, 120, 130, 140, 150], // Example data for total
          backgroundColor: 'rgba(157, 223, 245, 1)',
          borderRadius: 10, // Rounded edges
          barPercentage: 0.5, // Slim bars
          categoryPercentage: 0.5, // Slim bars
        },
        {
          label: 'Completed',
          data: [30, 45, 55, 75, 80, 85, 90, 95, 100, 105, 110, 120], // Example data for completed
          backgroundColor: 'rgba(2, 152, 202, 1)',
          borderRadius: 10, // Rounded edges
          barPercentage: 0.5, // Slim bars
          categoryPercentage: 0.5, // Slim bars
        },
      ],
    };
  
    // Options for the chart
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true, // Makes the legend icon circular
            pointStyle: 'circle',
            padding: 20, // Adds padding between legend items
            font: {
              size: 12, // Adjust font size if needed
            },
            boxWidth: 10, // Adjust size of the legend box
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false, // Hides grid lines for the x-axis
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false, // Hides horizontal grid lines
          },
        },
      },
    };
  
    return (
      <div className="w-full">
        <Bar data={data} options={options} />
      </div>
    );
  };
  

export default OverViewAgent;
