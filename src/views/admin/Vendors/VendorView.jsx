import React, {useMemo} from "react";
import TabsView from "../../../components/admin/TabsView";
import VendorProfileDetails from "../../../components/admin/TabComponents/UserAccountTab";
import VendorIdentification from  "../../../components/admin/TabComponents/UserIdentificationTab";
import VendorPasswordTab from "../../../components/admin/TabComponents/UserPasswordTab";
import VendorProducts from  "../../../components/admin/TabComponents/UserProductTab";
import NewVendorProducts from  "../../../components/admin/TabComponents/UserProductTab";
import VendorBankDetails from  "../../../components/admin/TabComponents/UserBankDetails";
import VendorReport from "../../../components/admin/TabComponents/UserPasswordTab";
import { useParams } from "react-router-dom";
import { useAdminGetVendorQuery } from "../../../features/admin/adminApiSlice";

const VendorView = () => {
    const {id:vendorID} = useParams()
    const {data: vendorDetails,isLoading,error}=useAdminGetVendorQuery({vendorID})

    const vendorTabs = useMemo(()=> [
        { id: '1', name: 'Profile Details', 
            component: <VendorProfileDetails 
                            data={vendorDetails}
                            /> 
                        },
        {   id: '2', 
            name: 'Identification', 
            component: <VendorIdentification 
                            data={vendorDetails}
                        /> 
        },
        { id: '3', name: 'Password', component: <VendorPasswordTab /> },
        { id: '4', name: 'NewProducts', component: <NewVendorProducts /> },
        { id: '5', name: 'Products', component: <VendorProducts 
            vendorID={vendorDetails?.vendorID}

        /> },
        { id: '6', name: 'Bank Details', component: <VendorBankDetails /> },
        { id: '7', name: 'Report', component: <VendorReport /> }
    ]);
    const vendorInfo = { name: "Vendor Name", profileImage: "https://via.placeholder.com/40" };

    console.log("vendorDetails:: ",vendorDetails)
    return <TabsView tabs={vendorTabs} userInfo={vendorDetails} url={'/admin/vendors'} />;
};

export default VendorView;