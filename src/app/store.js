import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import { apiSlice } from "./api/apiSlice"
import cartSlice from "../features/cart/cartSlice"
import orderSlice from "../features/order/orderSlice"
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authSlice,
        cart : cartSlice,
        order: orderSlice,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    //change it to false in production mode
    devTools:true
})
