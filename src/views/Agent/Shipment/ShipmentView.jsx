import React, { useMemo, useState, useEffect, useRef } from "react";
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { PiMapPin } from "react-icons/pi";
import { RiUserLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";
import ReactPaginate from "react-paginate";
import { Items } from "../../../data/mockData";
import AgentViewComponent from "../../../components/agent/AgentViewComponent";
function ShipmentView() {

  const orderTracking = [
    { id: "1", name: "Order Accepted", date:'16 Aug, 2023' },
    { id: "2", name: "Processing" , date:'16 Aug, 2023' },
    { id: "4", name: "Warehouse" , date:'16 Aug, 2023'},
    { id: "5", name: "Shipping" , date:'16 Aug, 2023' },
    { id: "6", name: "Delivered" ,  date:'16 Aug, 2023'},
    { id: "6", name: "completed" ,  date:'16 Aug, 2023'},
  ];

  const itemColumns = [
    { header: "Item", key: "name" },
    { header: "Quantity", key: "quantity" },
    { header: "Status", key: "status", render: (status) => <GetStatus status={status} /> },
  ];
  
  const itemList = [
    { id: 1, name: "Product 1", quantity: 3, status: "accepted" },
    { id: 2, name: "Product 2", quantity: 1, status: "failed" },
  ];
  
  const order = {
    id: 12345,
    status: "accepted",
    statusAction: "Move to Warehouse",
    totalOrders: 10,
  };

  return (
    <div>
       <AgentViewComponent
      order={order}
      trackingSteps={orderTracking}
      activeTrackingStep={"1"}
      itemList={itemList}
      itemColumns={itemColumns}
      onStatusChange={() => console.log("Move to Warehouse action triggered")}
    />
    </div>
  )
} 

const GetStatus = ({status}) => {
  switch (status) {
      case 'accepted':
           return   <span className='text-green-600 border text-xs border-green-100 bg-green-100 p-2 rounded-full'>ACCEPTED</span>        
      default:
         return <span className='text-red-600 border text-xs border-red-600 bg-red-100 p-2 rounded-full'>FAILED</span>
  }
}

export default ShipmentView