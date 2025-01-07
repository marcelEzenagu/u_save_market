import React, { useMemo, useState, useEffect, useRef } from "react";
import { FiBarChart, FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { PiDotsThreeOutline } from "react-icons/pi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import { Items } from "../../../data/mockData";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import Success from "../../../assets/images/payment/success.png";
import Card from '../../../assets/images/agent/mastercard.png'
function PaymentListAgent() {
    const [withdrawModel, setWithdrawModel] = useState(false);
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
          { id: "1", name: "All" },
          { id: "2", name: "Payments" },
          { id: "3", name: "Withdrawals" },
        ],
        []
      );
    
      const handleOptionChange = (option) => {
        setDropdownOption(option);
        setIsOpenSelect(false);
      };
    
      const [activeTab, setActiveTab] = useState("1");
  return (
    <div>
      <main className=" bg-regal-auth-bg-color">
        <div className="bg-white p-4 md:p-6">
          <div className="flex flex-row items-center justify-between">
            <h5 className="text-regal-black text-xs md:text-2xl font-[700] flex flex-row items-center gap-2">
              Payments
            </h5>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-white rounded-md text-sm pl-11 pr-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-[370px] font-[400]"
              />
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-regal-crum-gray text-xl" />
            </div>
          </div>
        </div>
      </main>
      <section className="rounded-2xl p-4 m-4 animate-fade-in mt-8 bg-white">

      <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative bg-white  ">
        <div className=" relative overflow-hidden flex flex-row items-start justify-between shadow-md rounded-2xl p-6 bg-regal-wallet-blue">
            <div className="flex flex-col items-start gap-3">
                <h5 className="text-sm md:text-sm text-white">Wallet Balance</h5>
                <h6 className="text-lg md:text-3xl font-bold text-white">$20K</h6>

                <button className="text-regal-black py-2 px-4 font-semibold text-xs bg-white rounded-lg"
                 onClick={()=>{
                    setWithdrawModel(!withdrawModel)
                  }}
                >
                    Withdraw
                </button>
            </div>

            <svg width="62" className="z-20" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="31" cy="31" r="31" fill="white" fill-opacity="0.25"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3335 26.7363L28.9473 34.0189C29.0831 34.0973 29.2256 34.154 29.3705 34.1899V48.3142L17.2331 41.1312C16.6755 40.8012 16.3335 40.2014 16.3335 39.5535V26.7363ZM45.6669 26.543V39.5537C45.6669 40.2016 45.3248 40.8015 44.7672 41.1315L32.6298 48.3144V34.0664C32.6594 34.0517 32.6887 34.0359 32.7177 34.0192L45.6669 26.543Z" fill="white"/>
            <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M16.7295 23.2022C16.8836 23.0076 17.078 22.8432 17.3048 22.7224L30.1381 15.8871C30.6768 15.6001 31.323 15.6001 31.8618 15.8871L44.6951 22.7224C44.8699 22.8155 45.0255 22.9345 45.1582 23.0733L31.0878 31.1969C30.9953 31.2503 30.91 31.3114 30.8323 31.3789C30.7545 31.3114 30.6692 31.2503 30.5767 31.1969L16.7295 23.2022Z" fill="white"/>
            </svg>

            <svg className="absolute right-0 bottom-[-5px] z-0 " width="175" height="173" viewBox="0 0 175 153" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M62.5175 214.792C30.8535 196.57 4.11854 167.278 0.763884 130.888C-2.37663 96.821 23.9567 70.3183 46.8553 44.8943C69.6816 19.5504 93.2638 -9.22821 127.358 -9.66744C163.692 -10.1355 196.355 12.6307 216.747 42.7055C236.668 72.0847 239.891 108.619 230.845 142.956C221.462 178.571 202.01 212.752 168.14 227.206C133.829 241.849 94.8416 233.393 62.5175 214.792Z" fill="#7895FF"/>
                </svg>

                <svg   className="absolute right-0 bottom-0 z-0 opacity-1"  width="99" height="83" viewBox="0 0 99 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8935 174.68C2.50651 143.715 -7.32692 105.295 6.81289 71.5974C20.0501 40.0506 55.7492 29.0315 87.9094 17.3506C119.968 5.70648 154.308 -8.61436 184.609 7.01982C216.902 23.6814 235.034 59.1266 238.902 95.2568C242.679 130.551 228.356 164.315 204.235 190.373C179.215 217.402 145.983 238.431 109.293 235.274C72.1249 232.075 41.6846 206.289 21.8935 174.68Z" fill="#7CF8E1"/>
                </svg>

                <svg   className="absolute right-0 bottom-0 z-0" width="106" height="33" viewBox="0 0 106 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.61002 135.256C-3.41738 100.127 -2.19665 60.4868 20.7436 32.0398C42.2195 5.40867 79.5743 4.73492 113.713 2.44269C147.745 0.157698 184.711 -4.06539 209.479 19.3673C235.876 44.3399 243.454 83.426 237.138 119.209C230.967 154.165 207.833 182.624 177.425 200.96C145.884 219.979 108.119 230.955 73.7485 217.734C38.9303 204.342 16.8464 171.118 6.61002 135.256Z" fill="#FF92AE"/>
                </svg>





        </div>

        <div className=" relative overflow-hidden flex flex-row items-start justify-between shadow-md rounded-2xl p-6 bg-white border">
            <div className="flex flex-col items-start gap-3">
                <h5 className="text-sm md:text-sm text-regal-black font-semibold">Weekly Balance</h5>
                <h6 className="text-lg md:text-3xl font-bold text-black">$16k</h6>
            </div>






        </div>

        <div className=" relative overflow-hidden flex flex-row items-start justify-between shadow-md rounded-2xl p-6 bg-white border">
            <div className="flex flex-col items-start gap-3">
                <h5 className="text-sm md:text-sm text-regal-black font-semibold">Payment method</h5>

                <div className="flex flex-row items-start gap-4 mt-3">
                    <img src={Card} alt="" />

                <div className="flex flex-col items-start justify-between gap-4">
                <h5 className="text-sm md:text-sm text-regal-black">Bank : <span className="font-semibold">Gtbank</span></h5>
                <h5 className="text-sm md:text-sm text-regal-black">Account: : <span className="font-semibold">902****80</span></h5>

                </div>

                </div>
            </div>

            <h4 className="text-sm text-regal-blue">Edit</h4>






        </div>
    </div>

      </section>
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
    
              <ProductTableTab
                setActiveOrder={() =>
                  setActiveOrder({
                    orderID: "1892423",
                    products: [],
                  })
                }
              />
        
          </section>
        </div>
      </section>

      {withdrawModel && (
            <AddWithdrawModal
              setWithdrawModel={() => {
                setWithdrawModel(!withdrawModel);
              }}
            />
          )}
    </div>
  );
}

function AddWithdrawModal({ setWithdrawModel }) {
    const [agentCreated, setAgentCreated] = useState(false);
    const dropdownRef = useRef(null);
    const handleWithdraw = () => {
      // Logic to create agent goes here
      setAgentCreated(true);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setWithdrawModel();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div
          className={`bg-white rounded-2xl shadow-lg w-full  ${
            !agentCreated ? "max-w-xl" : "max-w-md"
          } relative overflow-hidden`}
          ref={dropdownRef}
        >
          {!agentCreated ? (
            <>
              <div className="p-8 mt-5">
        
                <h2 className="text-2xl font-bold  mb-1">Withdraw</h2>

                <div className="mb-4">
                  <label className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black">
                    Amount
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                    placeholder="Enter  Amount"
                  />
                </div>
  
                <div className="mb-4">
                  <label className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                    placeholder="Enter   Bank Name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black">
                   Account Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                    placeholder="Enter Account Name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black">
                   Account Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                    placeholder="Enter Account Number"
                  />
                </div>
  
                {/* Create product Button */}
                <button
                  onClick={handleWithdraw}
                  className=" bg-regal-sky-blue text-xs text-white py-3 px-4 rounded-md hover:bg-regal-sky-blue transition-colors mb-4"
                >
                 Widthdraw
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 py-14 justify-center">
              {/* Success Image */}
              <img src={Success} alt="Success" className="w-20 h-20 mb-4" />
  
              {/* Success Text */}
              <h2 className="text-2xl  font-bold text-regal-black ">
                Withdrawal Successful
              </h2>

                <h5 className="text-xs ">Thank you for using Usavemarket</h5>
                <h5 className="text-xs ">Amount: <span className="font-semibold">₦1,585.00</span></h5>
              {/* Close Button */}
              <button
                onClick={() => setWithdrawModel()}
                className=" bg-regal-sky-blue text-xs text-white py-3 mt-4 px-20 rounded-md hover:bg-regal-sky-blue transition-colors mb-4"
              >
                Ok, Thanks
              </button>
            </div>
          )}
        </div>
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
                  SHIPMENT ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                  DATE
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                  AMOUNT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems?.map((product) => (
                <tr key={product.productID}>
                  <td className="px-6 py-4 text-xs text-regal-black whitespace-nowrap font-[600]">
                    <Link
                    to="/agent/payments/893293"
                    >
                      099084057
                    </Link>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black font-[600]">
                    2nd Aug, 2023
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-price-dark font-[600]">
                    ₦1,585.00
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                      SUCCESSFUL
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

export default PaymentListAgent;
