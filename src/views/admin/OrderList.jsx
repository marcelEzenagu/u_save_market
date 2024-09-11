import React, { useMemo, useState } from "react";
import { Items } from "../../data/mockData";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import OrderVendorStatus from "../../components/order/OrderVendorStatus";
import OrderViewComponents from "../../components/OrderViewComponents/OrderViewComponents";
import { SlArrowDown } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";
function OrderList() {
  const tab = useMemo(
    () => [
      {
        name: "Total Order",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.49 7.51996C20.4843 7.49359 20.4843 7.46632 20.49 7.43996C20.4852 7.41688 20.4852 7.39304 20.49 7.36996V7.27996L20.43 7.12996C20.4056 7.08903 20.3753 7.05196 20.34 7.01996L20.25 6.93996H20.2L16.26 4.44996L12.54 2.14996C12.4539 2.08169 12.3555 2.03075 12.25 1.99996H12.17C12.0806 1.98504 11.9894 1.98504 11.9 1.99996H11.8C11.6838 2.02565 11.5725 2.06952 11.47 2.12996L4.00001 6.77996L3.91001 6.84996L3.82001 6.92996L3.72001 6.99996L3.67001 7.05996L3.61001 7.20996V7.29996V7.35996C3.60029 7.42627 3.60029 7.49365 3.61001 7.55996V16.29C3.60967 16.4599 3.65264 16.6271 3.73488 16.7759C3.81711 16.9246 3.93589 17.0499 4.08001 17.14L11.58 21.78L11.73 21.84H11.81C11.9792 21.8936 12.1608 21.8936 12.33 21.84H12.41L12.56 21.78L20 17.21C20.1441 17.1199 20.2629 16.9946 20.3451 16.8459C20.4274 16.6971 20.4703 16.5299 20.47 16.36V7.62996C20.47 7.62996 20.49 7.55996 20.49 7.51996ZM12 4.16996L13.78 5.26996L8.19001 8.72996L6.40001 7.62996L12 4.16996ZM11 19.17L5.50001 15.81V9.41996L11 12.82V19.17ZM12 11.06L10.09 9.90996L15.68 6.43996L17.6 7.62996L12 11.06ZM18.5 15.78L13 19.2V12.82L18.5 9.41996V15.78Z" fill="#21367F"/>
            </svg>
            
        ),
        total: "₦15k",
       
      },
      {
        name: "Processed Orders",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
              fill="#21367F"
            />
            <path
              d="M14.08 14.15C11.29 12.29 6.74001 12.29 3.93001 14.15C2.66001 15 1.96001 16.15 1.96001 17.38C1.96001 18.61 2.66001 19.75 3.92001 20.59C5.32001 21.53 7.16001 22 9.00001 22C10.84 22 12.68 21.53 14.08 20.59C15.34 19.74 16.04 18.6 16.04 17.36C16.03 16.13 15.34 14.99 14.08 14.15Z"
              fill="#21367F"
            />
            <path
              d="M19.9904 7.3401C20.1504 9.2801 18.7704 10.9801 16.8604 11.2101C16.8504 11.2101 16.8504 11.2101 16.8404 11.2101H16.8104C16.7504 11.2101 16.6904 11.2101 16.6404 11.2301C15.6704 11.2801 14.7804 10.9701 14.1104 10.4001C15.1404 9.4801 15.7304 8.1001 15.6104 6.6001C15.5404 5.7901 15.2604 5.0501 14.8404 4.4201C15.2204 4.2301 15.6604 4.1101 16.1104 4.0701C18.0704 3.9001 19.8204 5.3601 19.9904 7.3401Z"
              fill="#21367F"
            />
            <path
              d="M21.99 16.59C21.91 17.56 21.29 18.4 20.25 18.97C19.25 19.52 17.99 19.78 16.74 19.75C17.46 19.1 17.88 18.29 17.96 17.43C18.06 16.19 17.47 15 16.29 14.05C15.62 13.52 14.84 13.1 13.99 12.79C16.2 12.15 18.98 12.58 20.69 13.96C21.61 14.7 22.08 15.63 21.99 16.59Z"
              fill="#21367F"
            />
          </svg>
        ),
        total: "350",
      
      },
      {
        name: "Shipped Orders",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.8603 6.36997L11.9303 0.829971C10.8603 -0.0300287 9.13026 -0.0300287 8.07026 0.819971L1.14027 6.36997C0.360265 6.98997 -0.139735 8.29997 0.0302651 9.27997L1.36027 17.24C1.60027 18.66 2.96027 19.81 4.40027 19.81H15.6003C17.0303 19.81 18.4003 18.65 18.6403 17.24L19.9703 9.27997C20.1303 8.29997 19.6303 6.98997 18.8603 6.36997ZM10.0003 13.5C8.62027 13.5 7.50027 12.38 7.50027 11C7.50027 9.61997 8.62027 8.49997 10.0003 8.49997C11.3803 8.49997 12.5003 9.61997 12.5003 11C12.5003 12.38 11.3803 13.5 10.0003 13.5Z"
              fill="#21367F"
            />
          </svg>
        ),
        total: "642",
        
      },
      {
        name: "Delivered Orders",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 19 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0002 0H2.00018C0.900183 0 0.000183105 0.9 0.000183105 2V15C0.000183105 15.55 0.450183 16 1.00018 16C1.55018 16 2.00018 15.55 2.00018 15V3C2.00018 2.45 2.45018 2 3.00018 2H13.0002C13.5502 2 14.0002 1.55 14.0002 1C14.0002 0.45 13.5502 0 13.0002 0ZM13.5902 4.59L18.4202 9.42C18.7902 9.79 19.0002 10.3 19.0002 10.83V20C19.0002 21.1 18.1002 22 17.0002 22H5.99018C4.89018 22 4.00018 21.1 4.00018 20L4.01018 6C4.01018 4.9 4.90018 4 6.00018 4H12.1702C12.7002 4 13.2102 4.21 13.5902 4.59ZM13.0002 11H17.5002L12.0002 5.5V10C12.0002 10.55 12.4502 11 13.0002 11Z"
              fill="#21367F"
            />
          </svg>
        ),
        total: "2935",
      
      },
    ],
    []
  );

  const [dropdownOption, setDropdownOption] = useState("This Month");
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const tabOptions = useMemo(
    () => [
      { id: "1", name: "Accepted" },
      { id: "2", name: "Processing" },
      { id: "3", name: "Shipped" },
      { id: "4", name: "Delivered" },
      { id: "5", name: "Returned" },
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
      <div className="flex flex-row items-center gap-4 mt-4">
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

      <section>
        <div className="grid grid-cols-2 md:grid-cols-4  gap-4  relative  bg-white mt-8">
          {tab.map((item) => (
            <div
              key={item.name}
              className="flex flex-row items-center gap-4 p-4 border rounded-3xl"
            >
              <div className="w-12 h-12 rounded-full text-white bg-regal-auth-bg-color flex items-center justify-center text-sm">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs font-[600] text-regal-crum-gray">
                  {item.name}
                </div>
                <div className="text-lg  font-bold text-regal-blue">
                  {item.total}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="rounded-2xl border animate-fade-in mt-8 bg-white">
      <div className="p-4 md:px-8 md:pt-8 pb-4 ">
      <div className="flex flex-row items-center justify-between">
        <div>
          {tabOptions.map((tab) => (
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
          <OrderViewComponents
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


const ProductTableTab = React.memo(({setActiveOrder}) => {
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
                  ORDER ID
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
                  PRICE
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((product) => (
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
                    <OrderVendorStatus />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="flex flex-row items-center justify-between mt-4">
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


export default OrderList;
