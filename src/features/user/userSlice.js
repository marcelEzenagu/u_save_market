import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState : {
        categories : [],
        products:[],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
          },
    }
});

export const {setProducts } = userSlice.actions;
export default userSlice.reducer