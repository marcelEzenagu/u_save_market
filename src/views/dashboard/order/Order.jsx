import React, { useState, useEffect } from "react";
import Status from "../../../components/order/OrderStatus";
import ItemsCard from "../../../components/cards/ItemsCard";
import { useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import EmptyBag from "../../../assets/images/order/empty.png";
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "../../../features/order/orderSlice";
import { useGetUserOrderQuery } from "../../../features/order/orderApiSlice";
import SkeletonOrderCard from "../../../components/Loading/SkeletonOrderCard";
import moment from "moment";
function Order() {
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const { orders, ongoingOrders, pastOrders, cancelledOrders } = useSelector((state) => state.order);
  const { data: allOrders, isLoading, isSuccess, error } = useGetUserOrderQuery(user, {
    skip: user === null ? true : false
  });
  
  const itemsPerPage = 5;

  const tab = [
    { id: "1", name: "All" },
    { id: "2", name: "Ongoing" },
    { id: "3", name: "Past" },
    { id: "4", name: "Cancelled" },
  ];

  useEffect(() => {
    console.log(allOrders);
    if (isSuccess && allOrders) {
      dispatch(setOrders(allOrders));
    }
  }, [allOrders, user]);

  // Determine which orders to show based on activeTab
  const getOrdersByTab = () => {
    switch (activeTab) {
      case "2":
        return ongoingOrders;
      case "3":
        return pastOrders;
      case "4":
        return cancelledOrders;
      default:
        return orders;
    }
  };

  const currentOrders = getOrdersByTab();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = currentOrders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(currentOrders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentOrders.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <h6 className="text-regal-black text-sm md:text-xl font-bold">My Orders</h6>
      <div className="mt-2 flex flex-row gap-4">
        {tab.map((e) => (
          <button
            className={`shadow-sm rounded-full py-2 px-4 hover:text-white hover:bg-regal-black text-xs md:text-sm font-[600] ${
              activeTab === e.id
                ? "bg-regal-black text-white"
                : "text-regal-black bg-regal-dashboard-active-tab-gray"
            }`}
            key={e.id}
            onClick={() => setActiveTab(e.id)}
          >
            {e.name}
          </button>
        ))}
      </div>
      {isLoading ? (
        <>
        <SkeletonOrderCard />
        <SkeletonOrderCard />
        <SkeletonOrderCard />
      </>
      ) : currentItems.length > 0 ? (
        <>
        {currentItems.reverse().map((order, i) => (
            <OrderCard key={i} order={order} />
          ))}
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< "
            pageClassName="py-1 px-2 rounded-md text-xs md:text-sm mx-2  border border-regal-paginate-color text-regal-paginate-color"
            previousClassName="py-1 px-2 border border-regal-paginate-color text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
            nextClassName="py-1 px-2 border border-regal-paginate-color text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
            breakClassName="page-item"
            containerClassName="flex flex-row items-center text-center justify-center my-10"
            activeClassName="border border-regal-sky-blue text-white bg-regal-sky-blue font-[500]"
            renderOnZeroPageCount={null}
          />
        </>
      ) : (
        <div className="p-14 rounded-lg mx-auto max-w-[400px] text-center">
          <img src={EmptyBag} alt="Empty Bag" className="text-center my-3 mx-auto" />
          <h6 className="text-regal-black text-sm mt-4 mb-6 font-[700]">No Orders yet</h6>
          <div className="flex flex-col gap-4 mx-auto">
            <Link
              to="/products"
              className="bg-regal-sky-blue text-white py-3 rounded-sm hover:bg-blue-900 transition font-[600] text-xs md:text-sm"
            >
              Start Shopping
            </Link>
            <Link
              to="/saved-items"
              className="text-regal-sky-blue py-3 border-2 border-body-color-gray rounded-sm hover:border-regal-sky-blue transition font-[600] text-xs md:text-sm"
            >
              Go To Saved Items
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-md border p-5 mt-4">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div>
          <p
            className="text-sm md:text-[16px] text-start flex flex-row items-center gap-2 text-regal-black font-[700] capitalize cursor-pointer"
            onClick={() => navigate(`/orders/view/${order?.orderID}`)}
          >
            ID: {order?.orderID} <Status key={order?.status} />
          </p>
          <p className="text-xs text-regal-light-gray text-start mt-1">
            No of Items: {order?.products?.length}
          </p>
        </div>
        <span className="text-xs md:text-sm text-regal-light-gray">
          Order on: {moment(order?.createdAt).format("DD MMM, YYYY : HH:mm")}
        </span>
      </div>

      <div className="mt-5 border-t flex flex-row gap-4 overflow-x-scroll">
        {order?.products?.map((item) => (
          <div className="w-[170px]" key={item?.productID}>
            <ItemsCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}



export default Order;
