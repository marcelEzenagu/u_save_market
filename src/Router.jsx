import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Product from "./views/Product/Product";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Notfound from './views/Notfound'
import ProductDetail from "./views/Product/ProductDetail";
import GuestLayout from "./components/Layouts/GuestLayout";
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
import BusinessVerification from "./views/Vendor/profile/Components/Verifications/BusinessVerification";
import GovernmentIssued from "./views/Vendor/profile/Components/Verifications/GovernmentIssued";
import InterviewMeeting from "./views/Vendor/profile/Components/Verifications/InterviewMeeting";
import PasswordAndSecurity from "./views/Vendor/profile/Components/PasswordAndSecurity";
import SettingsVendor from "./views/Vendor/profile/Components/Settings";
import Performance from "./views/Vendor/profile/Components/Performance";
import PaymentVendor from "./views/Vendor/PaymentVendor";
import Analytics from "./views/Vendor/Analytics";
import RegistrationSuccessful from "./views/Auth/vendor/RegistrationSuccessful";
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
        path:'/payment',
        element: <Payment/>
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children : [
            {
                path:'/cart',
                element:<Cart/>,  
            },
        ]
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
                    path:'/vendor/dashboard/home',
                    element: <VendorHome/>
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
                               children: [
                                {   
                                    path:'/vendor/dashboard/profile/identification/business-verification',
                                       element: <BusinessVerification/>,
                                   },

                                   {   
                                    path:'/vendor/dashboard/profile/identification/government-issued-id',
                                       element: <GovernmentIssued/>,
                                   },
                                   {   
                                    path:'/vendor/dashboard/profile/identification/interview-meeting',
                                       element: <InterviewMeeting/>,
                                   },
                               ]
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
        path: '*',
        element: <Notfound />
    }
]);

export default Router