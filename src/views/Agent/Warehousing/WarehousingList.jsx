import React, { useEffect, useMemo, useState } from "react";
import { Items } from "../../../data/mockData";
import { FiBarChart } from "react-icons/fi";
import AgentListComponent from "../../../components/agent/AgentListComponent";
import Notifications from "./new";
import { useFindAllOpenShipmentQuery } from "../../../features/agent/agentApiSlice";

function WarehousingList() {
  const [fields, setFields] = useState({
    status:"PROCESSING",
    perPage:50,
    page:1,
    countries:["nigeria","ghana"]
  })
      const tabOptions = useMemo(
        () => [
          { id: "1", name: "Processing",status:"PROCESSING"},
          { id: "2", name: "Accepted",status:"ACCEPTED"},
          { id: "3", name: "In Transit",status:"IN_TRANSIT"},
          { id: "4", name: "Warehouse",status:"WAREHOUSE"},
          { id: "5", name: "For Shipments",status:"SHIPPED"}
        ],
        []
      );
      
      const {data:shipments,isloading,query, error}=useFindAllOpenShipmentQuery(fields)

    
      const columns = [
        { header: "ORDER ID", key: "orderID" },
        { header: "VENDOR", key: "vendorID" },
        { header: "PHONE NUMBER", key: "phone" },
        { header: "NO OF ITEMS", key: "noOfItems" },
        { header: "DESTINATION", key: "destination" }, // action for buttons/menus
      ];

     const handleChange =(name,value)=>{
        setFields(prev=>({
          ...prev,
          [name]:value
        }))
      }

      useEffect(()=>{
        query
      },[fields])
    
      return (
        <div>
          {/* <Notifications/> */}
           {/* <AgentListComponent note={'Accept orders which shipment you’ll like to carry out. Order processing takes 4-5 days to reach your location for shipment.'} columns={columns} header={'Warehousing'} tabs={[]} tabOptions={tabOptions} data={shipments}  filterKeys={['name']}  /> */}
           <AgentListComponent 
              note={'Accept orders which shipment you’ll like to carry out. Order processing takes 4-5 days to reach your location for shipment.'} columns={columns} header={'Warehousing'} tabs={[]} 
              tabOptions={tabOptions} 
              data={shipments?.data}  
              filterKeys={['name']}  
              total={shipments?.total}
              handleChange={handleChange}
            />
        </div>
      );
}

export default WarehousingList