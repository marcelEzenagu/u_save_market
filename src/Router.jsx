import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Product from "./views/Product/Product";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Notfound from './views/Notfound'
import ProductDetail from "./views/Product/ProductDetail";
import GuestLayout from "./components/Layouts/GuestLayout";
import Cart from "./views/cart/Cart";
import Checkout from "./views/checkout/Checkout";
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
            }
        ]
    },
    {
        path:'/checkout',
        element:<Checkout/>,
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
        path: '*',
        element: <Notfound />
    }
]);

export default Router