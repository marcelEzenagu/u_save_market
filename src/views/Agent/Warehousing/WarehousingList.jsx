import React, { useMemo } from "react";
import { Items } from "../../../data/mockData";
import { FiBarChart } from "react-icons/fi";
import AgentListComponent from "../../../components/agent/AgentListComponent";

function WarehousingList() {
  
      const tabOptions = useMemo(
        () => [
          { id: "1", name: "Processing" },
          { id: "2", name: "In Transit" },
          { id: "3", name: "Warehouse" },
          { id: "4", name: "For Shipments" },

        ],
        []
      );
      
    
    
      const columns = [
        { header: "ORDER ID", key: "name" },
        { header: "VENDOR", key: "dateOfLoading" },
        { header: "PHONE NUMBER", key: "destination" },
        { header: "NO OF ITEMS", key: "noOfItems" },
        { header: "DESTINATION", key: "action" }, // action for buttons/menus
      ];
    
      return (
        <div>
           <AgentListComponent note={'Accept orders which shipment you’ll like to carry out. Order processing takes 4-5 days to reach your location for shipment.'} columns={columns} header={'Warehousing'} tabs={[]} tabOptions={tabOptions} data={Items}  filterKeys={['name']}  />
        </div>
      );
}

export default WarehousingList