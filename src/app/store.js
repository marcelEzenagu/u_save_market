import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import { apiSlice } from "./api/apiSlice"
import cartSlice from "../features/cart/cartSlice"
import orderSlice from "../features/order/orderSlice"
import userSlice from "../features/user/userSlice"
import vendorSlice from "../features/vendor/vendorSlice"
import categorySlice from "../features/category/categorySlice"
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authSlice,
        cart : cartSlice,
        order: orderSlice,
        user: userSlice,
        vendor:vendorSlice,
        category: categorySlice,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    //change it to false in production mode
    devTools:true
})
