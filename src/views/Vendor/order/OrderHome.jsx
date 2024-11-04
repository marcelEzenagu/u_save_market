import React, { useEffect, useState } from "react";
import { LuListFilter } from "react-icons/lu";
import { numberWithCommas } from "../../../utils";
import { FaShoppingCart, FaUserPlus } from "react-icons/fa";
import { LiaBoxSolid } from "react-icons/lia";
import { Items } from "../../../data/mockData";
import { useNavigate } from 'react-router-dom';

import ReactPaginate from "react-paginate";
import { Menu } from "@headlessui/react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import OrderVendorStatus from "../../../components/order/OrderVendorStatus";
import { useGetVendorOrdersQuery } from "../../../features/vendor/vendorApiSlice";
import DateFilter from "../../../components/DateFilter";
import PaymentStatus from "../../../components/order/PaymentStatus";
function OrderHome() {
  const [active, setActive] = useState("");
  const [daysDifference, setDaysDifference] = useState("");
  const [orderCounts, setOrderCounts] = useState({
    shipped: 0,
    delivered: 0,
    returned: 0,
    processing: 0
  });
  const [activeFilter, setActiveFilter] = useState(true);
  let {data:orderList = [],loading,error }=useGetVendorOrdersQuery({status,daysDifference})

  let orders = orderList[0]
  
  console.log("orders: ", orders);
  console.log("orders.paginatedResults: ", orders?.paginatedResults);
  console.log("orders.statusCounts: ", orders?.statusCounts);

useEffect(()=>{
  setOrderCounts(getOrderCounts(orders?.statusCounts));
},[orders])

const totalOrders = Object.values(orderCounts).reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0)

  const tabs = [
    {
      id: "1",
      name: "All Orders",
      count: "50",
    },
    {
      id: "2",
      name: "Processing",
      count: "30",
    },
    {
      id: "3",
      name: "Shipped",
      count: "10",
    },
    {
      id: "4",
      name: "Delivered",
      count: "10",
    },
  ];

  const getOrderCounts = (statusCountsArray) => {
    const counts = {
      shipped: 0,
      delivered: 0,
      returned: 0,
      processing: 0
    };

    statusCountsArray?.forEach((status) => {
      const statusID = status._id.toLowerCase()
      switch (statusID) {
        case 'shipped':
          counts.shipped = status.count;
          break;
        case 'completed': // Assuming 'completed' means delivered
          counts.delivered = status.count;
          break;
        case 'returned':
          counts.returned = status.count;
          break;
        case 'processing':
          counts.processing = status.count;
          break;
        default:
          break;
      }
    });

    return counts;
  };
  const handleDateRangeChange = (selectedRange) => {
    console.log("Selected Range:", selectedRange);
    
    selectedRange = selectedRange.toLowerCase().trim
    // Fetch or filter data based on selectedRange
    if(selectedRange != "custom"){
      setDaysDifference(selectedRange)
    }

  };

  const handleCustomDateChange = (customDates) => {
    console.log("Custom Dates:", customDates);
    // Fetch or filter data based on custom start and end dates
  };
 
  return (
    <div className="px-4 py-8">
      <div className="flex flex-row items-center justify-between ">
        <h5 className="text-regal-black text-lg md:text-2xl font-[700]">
          Orders
        </h5>
        <div className=" px-2 py-2 bg-white text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black">
          <DateFilter
            onDateRangeChange={handleDateRangeChange}
            onCustomDateChange={handleCustomDateChange}
          />{" "}
        </div>
      </div>

      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4 md:px-4 relative border rounded-md bg-white mt-8">
          {[
            {
              name: "Total Orders",
              icon: <FaShoppingCart />,
              total:  totalOrders
            ,
              percentage: "+12%",
            },
            {
              name: "Processing Orders",
              icon: <FaUserPlus />,
              total: orderCounts?.processing,
              percentage: "+5%",
            },
            {
              name: "Shipped Orders",
              icon: <LiaBoxSolid />,
              total: orderCounts?.shipped,
              percentage: "+3%",
            },
            {
              name: "Delivered Orders",
              icon: <LiaBoxSolid />,
              total: orderCounts?.delivered,
              percentage: "+3%",
            },
            {
              name: "Return Orders",
              icon: <LiaBoxSolid />,
              total: orderCounts?.returned,
              percentage: "+3%",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex flex-row items-start justify-between p-4"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs md:text-sm font-[400]">{item.name}</div>
                <div className="text-lg md:text-xl font-bold">{item.total}</div>
              </div>
              <div className="w-10 h-10 rounded-full text-white bg-regal-sky-blue flex items-center justify-center text-sm">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className=" bg-white rounded-lg shadow-sm mt-8 pb-4">
        <nav className="flex flex-row items-center justify-between px-4  py-2 border-b mb-2">
          <ul className="hidden lg:flex flex-row items-center space-x-1  animate-fade-in ">
            {tabs?.map((e, index) => {
              console.log("e.", e);
              return (
                <li key={index} className="relative w-full">
                  <button
                    onClick={() => {
                      setActive(e?.name.toLowerCase().trim());
                    }}
                    className={`text-regal-light-gray  text-nowrap text-xs md:px-6  after:scale-x-0 ${
                      active === e?.name.toLowerCase().trim()
                        ? "text-regal-sky-blue  after:scale-x-100 font-[500]"
                        : "hover:text-regal-sky-blue  hover:after:scale-x-100 font-[500]"
                    }  relative after:content-[''] after:absolute after:left-0 after:bottom-[-15px] after:w-full after:h-[4px] after:bg-regal-sky-blue after:rounded-full  after:origin-left after:transition-transform after:duration-300 after:ease-in-out`}
                  >
                    {e?.name} ({e?.count})
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-row items-center gap-4 ">
            <button
              className="flex flex-row items-center justify-center gap-1 text-xs  py-2 px-3 font-[400]
         text-regal-black  bg-gray-200 rounded-md
        "
              onClick={() => {
                setActiveFilter(!activeFilter);
              }}
            >
              <LuListFilter className="text-sm" />
              Filter
            </button>
          </div>
        </nav>

        <section>
          {activeFilter ? 
          <ProductTableTab 
          items={orders}
          total={totalOrders}
          /> : 
          <ProductItemTab 
          />}
        </section>
      </div>

      <main className="flex flex-row items-center justify-between border rounded-md border-regal-blue px-4 py-2 my-8">
        <span className="flex flex-row items-center gap-2 text-xs font-[400] ">
          <FiInfo className="text-regal-blue text-sm" />
          Learn more about product
        </span>
        <div className="flex flex-row items-center gap-4 ">
          <Link className="text-xs text-regal-blue leading-9 ">
            How to create a new product ?
          </Link>
          <Link className="text-xs text-regal-blue leading-9 ">
            How to manage product ?
          </Link>
        </div>
      </main>
    </div>
  );
}
function ProductTableTab({items,total}) {
  const navigate = useNavigate()

  const itemsPerPage = 7;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items?.paginatedResults.slice(itemOffset, endOffset);
  

  // const total = 50
  const pageCount = Math.ceil(total/ itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleOrderClick = (order) => {
    navigate(`/vendor/orders/${order._id}`, {
      state: {
        orderData: order  // Pass additional order data via state
      }
    });
  };

  return (
    <div>
      <div className="w-full overflow-x-scroll mt-4 animate-fade-in">
        <table className=" min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
                Orders
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {currentItems?.map((product) => (
              <tr key={product.itemID}>
                <td className="px-6 py-2 text-xs font-medium text-regal-black ">
                  <input type="checkbox" />
                </td>
                <td className="px-6 py-2 text-regal-black  whitespace-nowrap">
                  <div className="flex flex-col gap-2 text-xs font-[500] cursor-pointer "
                  onClick={()=>handleOrderClick(product)}
                    >
                    <span className="text-regal-sky-blue ">{product._id}</span>
                  </div>
                </td>
                <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap">
                  {product?.userDetails?.firstName}{" "}{product?.userDetails?.lastName}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  Aug, 2024
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  <PaymentStatus 
                    status={product.paymentStatus}
                  />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  ${product.totalCost}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  <OrderVendorStatus 
                    status={product.status}
                  />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  <Menu
                    as="button"
                    className="relative inline-block text-right"
                  >
                    <div>
                      <Menu.Button className=" rounded-full text-sm  text-regal-light-gray focus:outline-none">
                        •••
                      </Menu.Button>
                    </div>

                    <Menu.Items className="absolute right-0 mt-2 w-40 z-50 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`flex items-center w-full px-4 py-2 text-sm ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`flex items-center w-full px-4 py-2 text-sm text-red-600 ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              Delete
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
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        pageClassName="py-1 px-2 rounded-md text-xs md:text-sm mx-2  border border-gray-200 text-regal-paginate-color"
        pageLinkClassName=" "
        previousClassName="page-item"
        previousLinkClassName="py-1 px-2  text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
        nextClassName=""
        nextLinkClassName="py-1 px-2  text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
        breakClassName="page-item"
        breakLinkClassName="text-xs md:text-sm mx-2 py-1 px-2"
        containerClassName="flex flex-row items-center  justify-end "
        activeClassName=" border border-regal-sky-blue text-white bg-regal-sky-blue font-[500]"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
function ProductItemTab() {
  const itemsPerPage = 18;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = Items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(Items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div>
      <div className="grid grid-col-2 sm:grid-cols-4 md:grid-cols-6 px-4">
        {currentItems &&
          currentItems.map((e) => (
            <div className=" " key={e.id}>
              <ItemsCard item={e} />
            </div>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        pageClassName="py-1 px-2 rounded-md text-xs md:text-sm mx-2  border border-gray-200 text-regal-paginate-color"
        pageLinkClassName=" "
        previousClassName="page-item"
        previousLinkClassName="py-1 px-2  text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
        nextClassName=""
        nextLinkClassName="py-1 px-2  text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
        breakClassName="page-item"
        breakLinkClassName="text-xs md:text-sm mx-2 py-1 px-2"
        containerClassName="flex flex-row items-center  justify-end "
        activeClassName=" border border-regal-sky-blue text-white bg-regal-sky-blue font-[500]"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

function ItemsCard(props) {
  return (
    <div
      key={props.item.id}
      className="text-sm font-[500] animate-fade-in w-[150px] mt-4 mb-8 mx-auto"
    >
      <div className="relative bg-white  rounded-lg  overflow-hidden">
        <img
          src={props.item.image}
          alt={props.item.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Link
          to={`/vendor/products/${props.item.name}`}
          className="text-xs font-[500] "
        >
          {props.item?.name}
        </Link>
        <p className="text-regal-sky-blue font-[600] text-sm md:text-[14px] ">
          ₦{numberWithCommas(props.item?.price)}
        </p>
        <div className="">
          <OrderVendorStatus />
        </div>
      </div>
    </div>
  );
}
export default OrderHome;
