import React, { useState } from "react";
import Status from "../../../components/order/OrderStatus";
import { Items } from "../../../data/mockData";
import ItemsCard from "../../../components/cards/ItemsCard";
import { useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import EmptyBag from '../../../assets/images/order/empty.png'
function Order() {
  const [activeTab, setActiveTab] = useState("1");
  const itemsPerPage = 5;
  const tab = [
    {
      id: "1",
      name: "All",
    },
    {
      id: "2",
      name: "Ongoing",
    },
    {
      id: "3",
      name: "Past",
    },
    {
      id: "4",
      name: "Cancelled",
    },
  ];
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const items = [1,2,3,4,5,6,7];
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="p-4 ">
      <h6 className="text-regal-black text-sm md:text-xl font-bold">
        My Orders
      </h6>
      <div className="mt-2 flex flex-row gap-4 ">
        {tab.map((e) => (
          <button
            className={` shadow-sm rounded-full py-2 px-4 hover:text-white hover:bg-regal-black    text-xs md:text-sm font-[600] ${
              activeTab == e.id
                ? "bg-regal-black text-white"
                : "text-regal-black bg-regal-dashboard-active-tab-gray"
            }`}
            key={e.id}
            onClick={() => {
              setActiveTab(e.id);
            }}
          >
            {e.name}
          </button>
        ))}
      </div>
      {currentItems.length > 0 ? (
        <>
          {currentItems.map((e, i) => (
            <OrderCard key={i} />
          ))}

          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< "
            pageClassName="py-1 px-2 rounded-md text-xs md:text-sm mx-2  border border-regal-paginate-color text-regal-paginate-color"
            pageLinkClassName=" "
            previousClassName="page-item"
            previousLinkClassName="py-1 px-2 border border-regal-paginate-color text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
            nextClassName=""
            nextLinkClassName="py-1 px-2 border border-regal-paginate-color text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
            breakClassName="page-item"
            breakLinkClassName="text-xs md:text-sm mx-2 py-1 px-2"
            containerClassName="flex flex-row items-center text-center justify-center my-10"
            activeClassName=" border border-regal-sky-blue text-white bg-regal-sky-blue font-[500]"
            renderOnZeroPageCount={null}
          />
        </>
      ) : (
        <div className=" p-14   rounded-lg mx-auto max-w-[400px] text-center">
        <img src={EmptyBag} alt=""  className="text-center my-3 mx-auto"/>

            <h6 className="text-regal-black text-sm mt-4 mb-6 font-[700]"> 
                No Orders yet
            </h6>
            {/* Buttons in flex-col with gap */}
            <div className="flex flex-col gap-4  mx-auto">
              <Link
              to="/products"
                className="bg-regal-sky-blue text-white py-3 rounded-md hover:bg-blue-900 transition font-[600] text-xs md:text-sm"
              >
                Start Shopping
              </Link>
              <Link
               to="/saved-items"
                className=" text-regal-sky-blue py-3 border-2 border-body-color-gray  rounded-md hover:border-regal-sky-blue transition font-[600] text-xs md:text-sm"
              >
                Go To Saved Items
              </Link>
            </div>
          </div>
      )}
    </div>
  );
}

function OrderCard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="rounded-md border p-5 mt-4">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="">
            <p
              className="text-sm md:text-[16px] text-start flex flex-row items-center  gap-2 text-regal-black font-[700]  capitalize cursor-pointer"
              onClick={() => {
                console.log("/emeka");
                navigate(`/orders/view/${"1"}`);
              }}
            >
              ID: 9065379 <Status key={""} />
            </p>
            <p className="text-xs text-regal-footer-gray text-start mt-1">
              No of Items : 8
            </p>
          </div>
          <span className="text-xs md:text-sm text-regal-footer-gray">
            Order on: 3rd Aug, 2024
          </span>
        </div>

        <div className="mt-5 border-t flex flex-row gap-4 overflow-x-scroll">
          {Items &&
            Items.map((e) => (
              <div className="w-[170px]" key={e.id}>
                <ItemsCard item={e} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default Order;
