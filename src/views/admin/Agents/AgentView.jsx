import React, { useMemo } from "react";

import UserAccountTab from "../../../components/admin/TabComponents/UserAccountTab";
import UserAddressTab from "../../../components/admin/TabComponents/UserAddressTab";
import UserPasswordTab from "../../../components/admin/TabComponents/UserPasswordTab";
import UserOrderTab from "../../../components/admin/TabComponents/UserOrderTab";
import UserPaymentMethod from "../../../components/admin/TabComponents/UserPaymentMethod";
import UserSavedItemsTab from "../../../components/admin/TabComponents/UserSavedItemsTab";
import TabsView from "../../../components/admin/TabsView";
import AgentIdentification from  "../../../components/admin/TabComponents/UserIdentificationTab";
import { useLocation } from "react-router-dom";
function AgentView() {
    const {state} = useLocation()

    const tabs = useMemo(()=> [
        {
            id: '1',
            name: 'Profile Details',
            component: <UserAccountTab
            data={state}

            />
        },
        {
            id: '2', name: 'Identification', component: <AgentIdentification 
            data={state}

            /> 
        },
        {
            id: '4',
            name: 'Deliveries',
            component: <UserOrderTab />
        },


    ]);


    const userInfo = { name: "Theresa Webb", profileImage: "https://via.placeholder.com/40" };

    return <TabsView tabs={tabs} userInfo={state} url={'/admin/agents'}  />;
}

export default AgentView;
