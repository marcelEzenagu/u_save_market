import React, {useMemo} from "react";
import TabsView from "../../../components/admin/TabsView";
import VendorProfileDetails from "../../../components/admin/TabComponents/UserAccountTab";
import VendorIdentification from  "../../../components/admin/TabComponents/UserIdentificationTab";
import VendorPasswordTab from "../../../components/admin/TabComponents/UserPasswordTab";
import VendorProducts from  "../../../components/admin/TabComponents/UserProductTab";
import VendorBankDetails from  "../../../components/admin/TabComponents/UserBankDetails";
import VendorReport from "../../../components/admin/TabComponents/UserPasswordTab";

const VendorView = () => {
    const vendorTabs = useMemo(()=> [
        { id: '1', name: 'Profile Details', component: <VendorProfileDetails /> },
        { id: '2', name: 'Identification', component: <VendorIdentification /> },
        { id: '3', name: 'Password', component: <VendorPasswordTab /> },
        { id: '4', name: 'Products', component: <VendorProducts /> },
        { id: '5', name: 'Bank Details', component: <VendorBankDetails /> },
        { id: '6', name: 'Report', component: <VendorReport /> }
    ]);

    const vendorInfo = { name: "Vendor Name", profileImage: "https://via.placeholder.com/40" };

    return <TabsView tabs={vendorTabs} userInfo={vendorInfo} url={'/admin/vendors'} />;
};

export default VendorView;
