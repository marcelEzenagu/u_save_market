import React, { useMemo,useState } from "react";
import { Items } from "../../../data/mockData";
import { FiBarChart } from "react-icons/fi";
import AgentListComponent from "../../../components/agent/AgentListComponent";

function ShipmentList() {

  const [fields, setFields] = useState({
    status:"PROCESSING",
    perPage:50,
    page:1,
    countries:["nigeria","ghana"]
  }) 
  const tab = useMemo(
    () => [
      {
        name: "Total Shipments",
        icon: <FiBarChart />,
        total: "500",
        color: "text-red-600",
        bgColor: "bg-red-100",
      },
      {
        name: "In Transit",
        icon: <FiBarChart />,
        total: "22",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      },
      {
        name: "Delivered",
        icon: <FiBarChart />,
        total: "40K",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
      },
      {
        name: "Completed",
        icon: <FiBarChart />,
        total: "40K",
        color: "text-green-600",
        bgColor: "bg-green-100",
      },
    ],
    []
  );
  const tabOptions = useMemo(
    () => [
      { id: "1", name: "Accepted" },
      { id: "2", name: "Processing" },
      { id: "3", name: "Shipped" },
      { id: "4", name: "Delivered" },
      { id: "5", name: "Compeleted" },
    ],
    []
  );
  


  const columns = [
    { header: "ORDER ID", key: "name" },
    { header: "DATE OF LOADING", key: "dateOfLoading" },
    { header: "DESTINATION", key: "destination" },
    { header: "EST DELIVERY DATE", key: "estDeliveryDate" },
    { header: "NO OF ITEMS", key: "noOfItems" },
    { header: "STATUS", key: "status" }, // status requires special rendering
    { header: "ACTION", key: "action" }, // action for buttons/menus
  ];

  const handleChange =(name,value)=>{
    setFields(prev=>({
      ...prev,
      [name]:value
    }))
  }
  return (
    <div>
       <AgentListComponent             
         handleChange={handleChange}
  columns={columns} header={'Shipments'} tabs={tab} tabOptions={tabOptions} data={Items}  filterKeys={['name']}  />
    </div>
  );
}





export default ShipmentList;
