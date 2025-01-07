import React, { useState, useEffect, useRef } from "react";
import { LuListFilter } from "react-icons/lu";
import { numberWithCommas } from "../../utils";
import { FaShoppingCart, FaUserPlus } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { LiaBoxSolid } from "react-icons/lia";
import { Items } from "../../data/mockData";
import ReactPaginate from "react-paginate";
import { Menu } from "@headlessui/react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import OrderVendorStatus from "../../components/order/OrderVendorStatus";
import { FiSearch } from "react-icons/fi";
function PaymentVendor() {
  const [active, setActive] = useState("1");
  const [activeFilter, setActiveFilter] = useState(true);
  const tabs = [
    {
      id: "1",
      name: "All Payments",
      count: "50",
    },
    {
      id: "2",
      name: "Complete Transactions",
      count: "30",
    },
    {
      id: "3",
      name: "Incomplete Payments",
      count: "3",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(Items);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const results = customers.filter((customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomers(results);
    } else {
      setFilteredCustomers(Items);
    }
  };
  return (
    <div className="px-4 py-8">
      <div className="flex flex-row items-center justify-between ">
        <h5 className="text-regal-black text-lg md:text-2xl font-[700]">
          Payments
        </h5>
        <div className="flex flex-row items-center gap-4">
        <input
          type="date"
          className=" px-2 py-2 bg-white text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
        />
        <button className=" text-regal-sky-blue flex flex-row items-center gap-1 text-xs py-2 px-4 border rounded-md border-regal-sky-blue transition font-[500] active:scale-95">
        <LiaFileDownloadSolid  className="text-sm"/>   Download CSV
        </button>
        </div>

      </div>

      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4 md:px-4 relative  mt-8">
          {[
            {
              name: "Total Payments",
              icon: <FaShoppingCart />,
              total: "10,890.00",
            },
            {
              name: "Complete Payments",
              icon: <FaUserPlus />,
              total: "8,392.00",
            },
            {
              name: "Incomplete Payments",
              icon: <LiaBoxSolid />,
              total: "2,498.00",
            },
          ]?.map((item) => (
            <div
              key={item.name}
              className="flex flex-row items-start justify-between p-4 border rounded-md bg-white"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs md:text-sm font-[400]">{item.name}</div>
                <div className="text-lg md:text-xl font-bold">
                  ${item.total}
                </div>
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
            {tabs?.map((e, index) => (
              <li key={index} className="relative w-full">
                <button
                  onClick={() => {
                    setActive(e?.id);
                  }}
                  className={`text-regal-light-gray  text-nowrap text-xs md:px-6  after:scale-x-0 ${
                    active === e?.id
                      ? "text-regal-sky-blue  after:scale-x-100 font-[500]"
                      : "hover:text-regal-sky-blue  hover:after:scale-x-100 font-[500]"
                  }  relative after:content-[''] after:absolute after:left-0 after:bottom-[-15px] after:w-full after:h-[4px] after:bg-regal-sky-blue after:rounded-full  after:origin-left after:transition-transform after:duration-300 after:ease-in-out`}
                >
                  {e?.name} ({e?.count})
                </button>
              </li>
            ))}
          </ul>
          <div className="">
            <div className="relative md:w-[250px]">
              <div className="flex items-center border border-gray-300  max-w-[400px] rounded-lg overflow-hidden">
                <span className="pl-2 text-regal-light-gray">
                  <FiSearch  />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-2 outline-none text-xs "
                  placeholder="Search customer"
                />
              </div>
              {searchTerm !== '' && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto shadow-lg">
                  {filteredCustomers?.map((customer, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                    >
                      {customer.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </nav>

        <section>
          {activeFilter ? <ProductTableTab Items={filteredCustomers} /> : <ProductItemTab Items={filteredCustomers} />}
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
function ProductTableTab(props) {
    const [isModalOpenPurchaseDetails, setisModalOpenPurchaseDetails] =
    useState(false);
  const itemsPerPage = 7;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = props.Items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(props.Items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.Items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
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
              <tr key={product.id}>
                <td className="px-6 py-2 text-xs font-medium text-regal-black ">
                  <input type="checkbox" />
                </td>
                <td className="px-6 py-2 text-regal-black  whitespace-nowrap">
                  <div className="flex flex-col gap-2">
                    <div
                      className="text-xs font-[500] cursor-pointer"
                      onClick={() => {
                        setisModalOpenPurchaseDetails(true);
                      }}
                    >
                      {product.name}
                    </div>
                    <span className="text-xs font-[500]">#29102937</span>
                  </div>
                </td>
                <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap">
                  William L. Hales 
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  Aug, 2024
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  <OrderVendorStatus />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  $1000
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  <OrderVendorStatus />
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
    <PurchaseDetails
        isModalOpen={isModalOpenPurchaseDetails}
        setIsModalOpen={(e) => {
          setisModalOpenPurchaseDetails(e);
        }}
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
          currentItems?.map((e) => (
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
function PurchaseDetails(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
    useEffect(() => {
      setIsModalOpen(props.isModalOpen);
    }, [props.isModalOpen]);
  
    const dropdownaddRef = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownaddRef.current &&
          !dropdownaddRef.current.contains(event.target)
        ) {
          props.setIsModalOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    return (
      isModalOpen && (
        <div className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown" >
          <div className="bg-white p-5 md:p-8 rounded-lg shadow-lg w-[350px] md:w-[550px]  "ref={dropdownaddRef}>
            <h2 className="text-lg font-bold ">Purchase details</h2>
       
            <div className="p-3">
            <div className="flex flex-row items-end justify-between border-b pb-5">
                <p className="text-xs md:text-xs text-regal-black mt-2  ">
                Order ID
                </p>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700] max-w-[200px]   truncate whitespace-nowrap ">
              1099900918
              </p>
            </div>
            <div className="flex flex-row items-end justify-between border-b pb-5">
                <p className="text-xs md:text-xs text-regal-black mt-5  ">
                Customer
                </p>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700] max-w-[200px]   truncate whitespace-nowrap ">
              William L. Hales
              </p>
            </div>
            <div className="flex flex-row items-end justify-between border-b pb-5">
                <p className="text-xs md:text-xs text-regal-black mt-5  ">
               Purchased date
                </p>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700] max-w-[200px]   truncate whitespace-nowrap ">
              22, Aug, 2024
              </p>
            </div>
            <div className="flex flex-row items-end justify-between border-b pb-5">
                <p className="text-xs md:text-xs text-regal-black mt-5  ">
                Item
                </p>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700] max-w-[200px]   truncate whitespace-nowrap ">
              Black Amala (Yam Flour)
              </p>
            </div>

            <div className="flex flex-row items-end justify-between border-b pb-5">
                <p className="text-xs md:text-xs text-regal-black mt-5  ">
                Payment
                </p>
              <p className="text-xs md:text-sm  items-center  gap-2 text-regal-black font-[700] max-w-[200px]   truncate whitespace-nowrap ">
              <OrderVendorStatus />
              </p>
            </div>
          </div>
          </div>
        </div>
      )
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
export default PaymentVendor;
