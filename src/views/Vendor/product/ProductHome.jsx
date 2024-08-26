import React, { useState } from "react";
import { PiExport } from "react-icons/pi";
import { BiImport, BiEdit } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { LuListFilter } from "react-icons/lu";
import { numberWithCommas } from "../../../utils";
import { BsTrash3 } from "react-icons/bs";
import { Items } from "../../../data/mockData";
import ReactPaginate from "react-paginate";
import { Menu } from "@headlessui/react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import OrderVendorStatus from "../../../components/order/OrderVendorStatus";
function ProductHome() {
  const [active, setActive] = useState("1");
  const [activeFilter, setActiveFilter ] = useState(true)
  const tabs = [
    {
      id: "1",
      name: "All Product",
      count: "50",
    },
    {
      id: "2",
      name: "Active",
      count: "30",
    },
    {
      id: "3",
      name: "Daft",
      count: "10",
    },
    {
      id: "4",
      name: "Inactive",
      count: "10",
    },
  ];
  return (
    <div className="px-4 py-8">
      <div className="flex flex-row items-center justify-between ">
        <h5 className="text-regal-black text-lg md:text-2xl font-[700]">
          Products
        </h5>
        <div className="flex flex-row items-center gap-6">
          <button className="flex flex-row items-center justify-center gap-2 font-[500] text-regal-black text-xs">
            <PiExport className="text-sm" />
            Export
          </button>
          <button className="flex flex-row items-center justify-center gap-2 font-[500] text-regal-black text-xs">
            <BiImport className="text-sm" />
            Import
          </button>

          <button className="flex flex-row items-center justify-center gap-2 font-[500] text-white bg-regal-sky-blue hover:bg-blue-700 px-4 py-2 rounded-md text-xs">
            <FaPlus />
            Create Product
          </button>
        </div>
      </div>

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
          <div className="flex flex-row items-center gap-4 ">
            <div className="flex items-center gap-2 border-r px-2">
                <input type="checkbox" className="font-[400] text-regal-black text-xs" />
                <span className="font-[400] text-regal-black text-xs">
                    0 Selected
                </span>
            </div>
          <button className="flex flex-row items-center justify-center gap-2 font-[400] text-regal-black text-xs">
            Unpublish
            <BiEdit className="text-sm text-regal-light-gray" />
          </button>
          <button className="flex flex-row items-center justify-center gap-2 font-[400] text-regal-black text-xs">
            Delete
            <BsTrash3   className="text-sm text-regal-light-gray" />
          </button>
            <button
              className="flex flex-row items-center justify-center gap-1 text-xs  py-2 px-3 font-[400]
         text-regal-black  bg-gray-200 rounded-md
        "
        onClick={()=> {
            setActiveFilter(!activeFilter)
        }}
            >
              <LuListFilter className="text-sm" />
              Filter
            </button>
          </div>
        </nav>

        <section>
                {activeFilter ? <ProductTableTab/> : <ProductItemTab />}
        </section>
      </div>

        <main className="flex flex-row items-center justify-between border rounded-md border-regal-blue px-4 py-2 my-8">
          <span className="flex flex-row items-center gap-2 text-xs font-[400] ">
          <FiInfo className="text-regal-blue text-sm"/>
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
function ProductTableTab () {
    const itemsPerPage = 7;
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
           <div className="w-full overflow-x-scroll mt-4 animate-fade-in">
      <table className=" min-w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
          <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
            <input type="checkbox" />
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
              Product
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              Inventory
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
             Price
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
             Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
          
            </th>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {currentItems.map((product) => (
            <tr key={product.id}>
                  <td className="px-6 py-2 text-xs font-medium text-regal-black ">
                  <input type="checkbox" />
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-14 object-cover rounded"
                />
              </td>
              <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap">
              <Link
              to={`/vendor/dashboard/products/${product.name}`} >
                {product.name}
                </Link>
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
              Staples
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
              15 in stock for 2 variants
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
              $1000
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
              <OrderVendorStatus />
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
              <Menu as="button" className="relative inline-block text-right">
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
function ProductItemTab () {
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
    <div key={props.item.id} className="text-sm font-[500] animate-fade-in w-[150px] mt-4 mb-8 mx-auto">
      <div className="relative bg-white  rounded-lg  overflow-hidden">
        <img
          src={props.item.image}
          alt={props.item.name}
          className="w-full h-full object-contain"
        />

      </div>

      <div className="flex flex-col gap-2">
        <Link
        to={`/vendor/dashboard/products/${props.item.name}`}
          className="text-xs font-[500] "
        >
          {props.item?.name}
        </Link>
        <p className="text-regal-sky-blue font-[600] text-sm md:text-[14px] ">
          ₦{numberWithCommas(props.item?.price)}
        </p>
        <div className="">
        <OrderVendorStatus/>
        </div>
      </div>
    </div>
  );
}
export default ProductHome;
