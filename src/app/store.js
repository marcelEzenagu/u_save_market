import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import { apiSlice } from "./api/apiSlice"
import cartSlice from "../features/cart/cartSlice"
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authSlice,
        cart : cartSlice,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    //change it to false in production mode
    devTools:true
})
