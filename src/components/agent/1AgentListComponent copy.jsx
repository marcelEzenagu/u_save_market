import React, { useMemo, useState } from "react";
import { PiDotsThreeOutline } from "react-icons/pi";
import ReactPaginate from "react-paginate";
import { SlArrowDown } from "react-icons/sl";
import { Menu } from "@headlessui/react";
import { FiBarChart, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import OrderVendorStatus from "../../components/order/OrderVendorStatus";
import { FiInfo } from "react-icons/fi";
import { useFindAllOpenShipmentQuery } from "../../features/agent/agentApiSlice";


function AgentListComponent({
    header,
  tabs,            
  tabOptions,      
  data,            
  filterKeys, // Keys to search in the table (e.g., ['orderID', 'destination'])
  columns,    
  note 
}) {
  const [fields, setFields] = useState({
    status:"PROCESSING",
    perPage:50,
    page:1,
    countries:["nigeria","ghana"]
  })

  const {data:shipments,isloading, error}=useFindAllOpenShipmentQuery(fields)

  const [dropdownOption, setDropdownOption] = useState("This Month");
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [activeTab, setActiveTab] = useState(tabOptions[0].id);  
  const [searchQuery, setSearchQuery] = useState("");
  const [itemOffset, setItemOffset] = useState(0);



  const filteredData = useMemo(() => {
    if (!searchQuery) return shipments?.data;

    return shipments?.data?.filter(item =>
      filterKeys.some(key =>
        item[key]?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, shipments?.data]);
  console.log("filteredData::::",filteredData)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * fields.perPage) % filteredData?.length;
    setItemOffset(newOffset);
  };

  const currentItems = filteredData?.slice(itemOffset, itemOffset + fields.perPage);
  const pageCount = Math.ceil(data?.total/ fields.perPage);

  return (
    <div>
      <main className="bg-regal-auth-bg-color">
        <div className="bg-white p-4 md:p-6">
          <div className="flex flex-row items-center justify-between">
          <h5 className="text-regal-black text-xs md:text-2xl font-[700] flex flex-row items-center gap-2">
              {header}
            </h5>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-white rounded-md text-sm pl-11 pr-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-[370px] font-[400]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-regal-crum-gray text-xl" />
            </div>
          </div>
        </div>
      </main>

      <main className="p-4">
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative mt-8">
            {tabs.map((item) => (
              <div
                key={item.name}
                className="flex bg-white flex-row items-center gap-4 p-4 border rounded-xl"
              >
                <div className={`w-12 h-12 rounded-md ${item.color} ${item?.bgColor} flex items-center justify-center text-sm`}>
                  {item.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-[600] text-regal-crum-gray">
                    {item.name}
                  </div>
                  <div className="text-lg font-bold text-regal-black">
                    {item.total}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 mt-8 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  className={`shadow-sm rounded-full py-2 px-4 mr-3 hover:text-white hover:bg-regal-black text-xs md:text-xs font-[600] ${
                    activeTab === tab.id ? "bg-regal-black text-white" : "text-regal-black bg-regal-dashboard-active-tab-gray"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Dropdown */}
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
                      className={`text-xs ${dropdownOption === "This Month" ? "text-regal-blue font-[600]" : ""}`}
                      onClick={() => setDropdownOption("This Month")}
                    >
                      This Month
                    </button>
                  </li>
                  <li className="py-2">
                    <button
                      type="button"
                      className={`text-xs ${dropdownOption === "Disabled Users" ? "text-regal-blue font-[600]" : ""}`}
                      onClick={() => setDropdownOption("Disabled Users")}
                    >
                      Disabled Users
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className=" p-4 text-regal-crum-gray">
            {note ? (<span className="flex items-center gap-2 text-sm"> <FiInfo /> {note} </span>) : '' }
          </div>

          {/* Table */}
          <ProductTableTab
            data={currentItems} // Pass filtered items
            setActiveOrder={() =>
              setActiveOrder({
                orderID: "1892423",
                products: [],
              })
            }
            header={header}
            columns={columns}
          />
        </section>

        <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between mt-4">
          <h6 className="text-xs text-regal-crum-gray">
            Showing {currentItems?.length} items out of {shipments?.total} results found
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
      </main>
    </div>
  );
}

const ProductTableTab = React.memo(({ data, columns, header }) => (
    <div className="w-full overflow-x-scroll animate-fade-in">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, rowIndex) => (
            <tr key={rowIndex} className="bg-white">
              <Link  to={{
                pathname:`/agent/${header.toLowerCase()}/${item.shippingID}`,
              state:{data:item}
            }}>
             {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black truncate max-w-[150px]">
                  {/* Special rendering logic for "status" or any custom field */}
               
                  {col.key === "status" ? (
                    <OrderVendorStatus status={item[col.key]} />
                  ) : col.key === "action" ? (
                    <Menu>
                      <Menu.Button>
                        <div className="cursor-pointer flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-md">
                          <PiDotsThreeOutline className="text-xl" />
                        </div>
                      </Menu.Button>
                      <Menu.Items>
                        <Menu.Item>
                          <Link className="py-2 px-3 block text-sm text-gray-700" to={`/view-order/${item.orderID}`}>
                            View Details
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  ) : (
                    <HandleCol item={item} col={col.key} header={header}/>
                   
                   
                     // Default case: render data directly from the item
                  )}
                </td>
              ))}

              <td>
                {item.vendorID}
              </td>
              </Link>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  ));
  
export default AgentListComponent;

const HandleCol =({item, col, header}) => {
  console.log(col)
    switch (col) {
        case "name":
            return <Link to={`/agent/${header.toLowerCase()}/123`}>{item[col.key] || '290902'}</Link>
        case "orderID":
            return <>{item.orderID}</>
        // case "vendorID":
        //     return <>{item.vendorID}</>
        // case "phone":
        //     return <>{item.phone}</>
        // case "noOfItems":
        //   return <>{item.items.length}</>
        // case "destination":
        //     return <>{item.destination}</>
        default:
            break;
    }
}
