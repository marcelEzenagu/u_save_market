import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'order',
    initialState:{
        orders : [],
        ongoingOrders : [],
        pastOrders : [],
        cancelledOrders : [],
    },
    reducers : {
        setOrders: (state, action) => {
            state.orders = action.payload;
            state.pastOrder = action.payload.filter(
              (order) => order.status === 'ORDER_DELIVERED'  
            );
      
            state.ongoingOrders = action.payload.filter(
              (order) => order.status !== 'ORDER_DELIVERED' && order.status.toLowerCase() !== 'cancelled' 
            );
            state.cancelledOrders = action.payload.filter(
              (order) => order.status.toLowerCase() === 'cancelled' 
            );
          },
    }


})
export const {setOrders} = orderSlice.actions;
export default orderSlice.reducer