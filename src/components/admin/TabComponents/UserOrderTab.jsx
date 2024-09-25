import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import ReactPaginate from "react-paginate";
import { Items } from "../../../data/mockData";
import { Link } from "react-router-dom";
import OrderVendorStatus from "../../../components/order/OrderVendorStatus";
import OrderViewComponents from "../../../components/OrderViewComponents/OrderViewComponents";

function UserOrderTab() {
  const [dropdownOption, setDropdownOption] = useState("This Month");
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const tabOptions = useMemo(
    () => [
      { id: "1", name: "Ongoing" },
      { id: "2", name: "Past" },
      { id: "3", name: "Cancelled" },
    ],
    []
  );

  const handleOptionChange = (option) => {
    setDropdownOption(option);
    setIsOpenSelect(false);
  };

  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className="p-4 md:px-8 md:pt-8 pb-4 animate-fade-in">
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
        <div className="flex flex-row items-center gap-8">
          <div className="relative">
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
          <div className="flex items-center border border-gray-300 max-w-[400px] rounded-lg overflow-hidden">
            <span className="pl-2 text-regal-light-gray">
              <FiSearch />
            </span>
            <input
              type="text"
              className="w-full p-2 outline-none text-xs"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      <section className="rounded-2xl border  bg-white mt-8 ">
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

export default UserOrderTab;
