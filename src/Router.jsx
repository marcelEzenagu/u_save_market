import { createBrowserRouter } from "react-router-dom";
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
        path: '*',
        element: <Notfound />
    }
]);

export default Router