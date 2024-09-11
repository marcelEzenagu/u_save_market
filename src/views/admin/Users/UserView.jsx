import React, { useMemo } from "react";

import UserAccountTab from "../../../components/admin/TabComponents/UserAccountTab";
import UserAddressTab from "../../../components/admin/TabComponents/UserAddressTab";
import UserPasswordTab from "../../../components/admin/TabComponents/UserPasswordTab";
import UserOrderTab from "../../../components/admin/TabComponents/UserOrderTab";
import UserPaymentMethod from "../../../components/admin/TabComponents/UserPaymentMethod";
import UserSavedItemsTab from "../../../components/admin/TabComponents/UserSavedItemsTab";
import TabsView from "../../../components/admin/TabsView";

function UserView() {

    const tabs = useMemo(()=> [
        {
            id: '1',
            name: 'Account',
            component: <UserAccountTab />
        },
        {
            id: '2',
            name: 'Address',
            component: <UserAddressTab />
        },
        {
            id: '3',
            name: 'Password',
            component: <UserPasswordTab />
        },
        {
            id: '4',
            name: 'Orders',
            component: <UserOrderTab />
        },
        {
            id: '5',
            name: 'Saved Items',
            component: <UserSavedItemsTab />
        },
        {
            id: '6',
            name: 'Payment Methods',
            component: <UserPaymentMethod />
        },

    ]);


    const userInfo = { name: "Theresa Webb", profileImage: "https://via.placeholder.com/40" };

    return <TabsView tabs={tabs} userInfo={userInfo} url={'/admin/users'}  />;
}

export default UserView;
