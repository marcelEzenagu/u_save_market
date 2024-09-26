import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Product from "./views/Product/Product";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Notfound from './views/Notfound'
import ProductDetail from "./views/Product/ProductDetail";
import Cart from "./views/cart/Cart";
import Checkout from "./views/checkout/Checkout";
import Payment from "./views/checkout/Payment";
import Account from "./views/dashboard/account/Account";
import AuthLayout from "./components/Layouts/AuthLayout";
import Order from "./views/dashboard/order/Order";
import SavedItems from "./views/dashboard/saved/SavedItems";
import BuyAgain from "./views/dashboard/buyagain/BuyAgain";
import OrderView from "./views/dashboard/order/OrderView";
import Address from "./views/dashboard/settings/components/Address";
import Settings from "./views/dashboard/settings/Settings";
import PaymentMethod from "./views/dashboard/settings/components/PaymentMethod";
import DeleteAccount from "./views/dashboard/settings/components/DeleteAccount";
import ChangePassword from "./views/dashboard/settings/components/ChangePassword";
import Notification from "./views/dashboard/settings/components/Notification";
import VendorAuthLayout from "./components/Layouts/VendorAuthLayout";
import RegisterVendor from "./views/Auth/vendor/RegisterVendor";
import LoginVendor from "./views/Auth/vendor/LoginVendor";
import VendorDetails from "./views/Auth/vendor/VendorDetails";
import VendorLayout from "./components/Layouts/VendorLayout";
import VendorHome from "./views/Vendor/Home";
import ProductHome from "./views/Vendor/product/ProductHome";
import ProductView from "./views/Vendor/product/ProductView";
import OrderHome from "./views/Vendor/order/OrderHome";
import VendorOrderview from "./views/Vendor/order/OrderView";
import ForgotPasswordVendor from "./views/Auth/vendor/ForgotPasswordVendor";
import OtpVendor from "./views/Auth/vendor/OtpVendor";
import ResetPasswordVendor from "./views/Auth/vendor/ResetPasswordVendor";
import Profile from "./views/Vendor/profile/Profile";
import ProfileDetails from "./views/Vendor/profile/Components/ProfileDetails";
import Identification from "./views/Vendor/profile/Components/Identification";
// import BusinessVerification from "./views/Vendor/profile/Components/Verifications/BusinessVerification";
// import GovernmentIssued from "./views/Vendor/profile/Components/Verifications/GovernmentIssued";
// import InterviewMeeting from "./views/Vendor/profile/Components/Verifications/InterviewMeeting";
import PasswordAndSecurity from "./views/Vendor/profile/Components/PasswordAndSecurity";
import SettingsVendor from "./views/Vendor/profile/Components/Settings";
import Performance from "./views/Vendor/profile/Components/Performance";
import PaymentVendor from "./views/Vendor/PaymentVendor";
import Analytics from "./views/Vendor/Analytics";
import RegistrationSuccessful from "./views/Auth/vendor/RegistrationSuccessful";
import SearchVendor from "./views/Vendor/SearchVendor";
import AdminLayout from "./components/Layouts/AdminLayout";
import VendorList from "./views/admin/Vendors/VendorList";
import Overview from "./views/admin/Overview";
import UsersList from "./views/admin/Users/UsersList";
import UserView from "./views/admin/Users/UserView";
import VendorView from "./views/admin/Vendors/VendorView";
import OrderList from "./views/admin/OrderList";
import PaymentList from "./views/admin/PaymentList";
import AnalyticsList from "./views/admin/Analytics/AnalyticsList";
import AgentsList from "./views/admin/Agents/AgentsList";
import AgentView from "./views/admin/Agents/AgentView";
import ProductList from "./views/admin/ProductList";
import AgentAuthLayout from "./components/Layouts/AgentAuthLayout";
import AgentOnboarding from "./views/Auth/Agent/AgentOnboarding";
import AgentLayout from "./components/Layouts/AgentLayout";
import OverViewAgent from "./views/Agent/OverViewAgent";
import ShipmentList from "./views/Agent/Shipment/ShipmentList";
import ShipmentView from "./views/Agent/Shipment/ShipmentView";
import AgentOrderList from "./views/Agent/Order/OrderList"
import AgentOrderView from "./views/Agent/Order/OrderView"
import WarehousingList from "./views/Agent/Warehousing/WarehousingList";
import WarehousingView from "./views/Agent/Warehousing/WarehousingView";
import ReportAndAnalytics from "./views/Agent/ReportsAndAnalytics";
import PaymentListAgent from "./views/Agent/Payments/PaymentListAgent";
import PaymentOverview from "./views/Agent/Payments/PaymentOverview";
import PaymentError from "./views/checkout/PaymentError";
const Router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children : [
            {
                path:'/',
                element:<Home/>,  
            },
            {
                path:'/products',
                element:<Product/>,  
            },
            {
                path:'/cart',
                element:<Cart/>,  
            },
            {
                path:'/products/:name/:product',
                element:<ProductDetail/>,  
            },
        ]
    },
    {
        path:'/checkout',
        element:<Checkout/>,
    },
    {
        path:'/payment-success',
        element: <Payment/>
    },
    {
        path:'/payment-error',
        element: <PaymentError/>
    },
    {
        path:'/',
        element: <AuthLayout/>,
        children : [
            {
                path:'/account',
                element: <Account />
            },
            {
                path:'/orders',
                element: <Order />
            },
            {
                path:'/orders/view/:id',
                element: <OrderView />
            },
            {
                path:'/saved-items',
                element: <SavedItems />
            }
            ,
            {
                path:'/buy-again',
                element: <BuyAgain />
            },
            {
                path:'/settings',
                element: <Settings />,
                children : [
                    {
                        path:'/settings/address',
                        element: <Address />
                    },
                    {
                        path:'/settings/payment-method',
                        element: <PaymentMethod />
                    },
                    {
                        path:'/settings/notification',
                        element: <Notification />
                    },
                    {
                        path:'/settings/delete-account',
                        element : <DeleteAccount/>
                    },
                    {
                        path:'/settings/change-password',
                        element: <ChangePassword />
                    }
                ]
            }
        ]
    },
    {
        path:'/vendor/auth',
        element: <VendorAuthLayout/>,
        children: [
            {
                path: '/vendor/auth/',
                element : <Navigate to='/vendor/auth/login'/>
            },
                {
                    path:'/vendor/auth/register',
                    element: <RegisterVendor/>
                },
                {
                    path:'/vendor/auth/login',
                    element: <LoginVendor/>
                },
                {
                    path:'/vendor/auth/forgot-password',
                    element: <ForgotPasswordVendor/>
                },
                {
                    path:'/vendor/auth/otp',
                    element: <OtpVendor/>
                },
                {
                    path:'/vendor/auth/reset-password',
                    element: <ResetPasswordVendor/>
                },
                {
                    path:'/vendor/auth/registration',
                    element: <VendorDetails/>
                },
                {
                    path:'/vendor/auth/registration/successful',
                    element: <RegistrationSuccessful/>
                }
        ]
    },
    {
        path:'/vendor/dashboard',
        element: <VendorLayout/>,
        children: [
            {
                path: '/vendor/dashboard',
                element : <Navigate to='/vendor/dashboard/home'/>
            },
                {
                    path:'/vendor/dashboard/home',
                    element: <VendorHome/>
                },
                {
                    path:'/vendor/dashboard/search',
                    element: <SearchVendor/>
                },
                {
                    path:'/vendor/dashboard/products',
                    element: <ProductHome/>
                },
                {
                    path:'/vendor/dashboard/payment',
                    element: <PaymentVendor/>
                },
                {
                    path:'/vendor/dashboard/products/:name',
                    element: <ProductView/>
                },
                {
                    path:'/vendor/dashboard/orders',
                    element: <OrderHome/>
                },
                {
                    path:'/vendor/dashboard/analytics',
                    element: <Analytics/>
                },
                {
                    path:'/vendor/dashboard/profile',
                    element: <Profile/>,
                    children: [
                        {
                            path: '/vendor/dashboard/profile',
                            element : <Navigate to="/vendor/dashboard/profile/profile-details"/>
                        },
                        {   
                         path:'/vendor/dashboard/profile/profile-details',
                            element: <ProfileDetails/>,
                        },
                        {   
                            path:'/vendor/dashboard/profile/password-security',
                               element: <PasswordAndSecurity/>,
                           },
                           {   
                            path:'/vendor/dashboard/profile/performance',
                               element: <Performance/>,
                           },
                           {   
                            path:'/vendor/dashboard/profile/settings',
                               element: <SettingsVendor/>,
                           },
                        {   
                            path:'/vendor/dashboard/profile/identification',
                               element: <Identification/>,
                            //    children: [
                            //     {   
                            //         path:'/vendor/dashboard/profile/identification/business-verification',
                            //            element: <BusinessVerification/>,
                            //        },

                            //        {   
                            //         path:'/vendor/dashboard/profile/identification/government-issued-id',
                            //            element: <GovernmentIssued/>,
                            //        },
                            //        {   
                            //         path:'/vendor/dashboard/profile/identification/interview-meeting',
                            //            element: <InterviewMeeting/>,
                            //        },
                            //    ]
                           }
                    ]
                },
                {
                    path:'/vendor/dashboard/orders/:name',
                    element: <VendorOrderview/>
                },

        ]
    },
    {
        path:'/agent/onboarding',
        element:<AgentAuthLayout/>,
        children: [
            {
                path: '/agent/onboarding',
                element :  <AgentOnboarding/>
            },
        ]
    },
    {
        path:'/agent/',
        element:<AgentLayout/>,
        children: [
            {
                path: '/agent/',
                element : <Navigate to='/agent/overview'/>
            },
            {
                path: '/agent/overview',
                element :  <OverViewAgent/>
            },
            {
                path: '/agent/shipments',
                element :  <ShipmentList/>
            },
            {
                path: '/agent/shipments/:id',
                element :  <ShipmentView/>
            },
            {
                path: '/agent/orders',
                element :  <AgentOrderList/>
            },
            {
                path: '/agent/orders/:id',
                element :  <AgentOrderView/>
            },
            {
                path: '/agent/warehousing',
                element :  <WarehousingList/>
            },
            {
                path: '/agent/warehousing/:id',
                element :  <WarehousingView/>
            },

            {
                path: '/agent/reports-and-analytics',
                element :  <ReportAndAnalytics/>
            },
            {
                path: '/agent/payments',
                element : <PaymentListAgent/>
            },
            {
                path: '/agent/payments/:id',
                element : <PaymentOverview/>
            }
        ]
    },
    {
        path:'/admin/',
        element:<AdminLayout/>,
        children: [
            {
                path: '/admin/',
                element : <Navigate to='/admin/overview'/>
            },
            {
                path:'/admin/vendors',
                element : <VendorList/>
            },
            {
                path:'/admin/vendors/:id',
                element:<VendorView/>
            },
            {
                path:'/admin/overview',
                element : <Overview/>
            },
            {
                path:'/admin/users',
                element : <UsersList/>,
            },
            {
                path:'/admin/users/:id',
                element:<UserView/>
            },
            {
                path:'/admin/agents',
                element : <AgentsList/>,
            },
            {
                path:'/admin/products',
                element : <ProductList/>,
            },
            {
                path:'/admin/agents/:id',
                element:<AgentView/>
            },
            {
                path:'/admin/orders',
                element:<OrderList/>
            },
            {
                path:'/admin/payments',
                element:<PaymentList/>
            },
            {
                path:'/admin/analytics',
                element:<AnalyticsList/>
            }
        
        ]
    },
    {
        path: '*',
        element: <Notfound />
    }
]);

export default Router