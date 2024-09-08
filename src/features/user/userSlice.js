import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState : {
        categories : [],
        products:[],
        wishList : []
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
          },
          setWishList: (state, action) => {
            state.wishList = action.payload;
          },
          addToWishList: (state, action) => {
            const product = action.payload;
            const findProduct = state.wishList.find((i) => i?.productID === product?.productID);
            if (findProduct) {
                return 
            }else{
               state.wishList.push(product);
            }
          },
          removeFromWishList: (state, action) => {
            const productID = action.payload;
            state.wishList = state.wishList.filter((i) => i?.productID !== productID )
          }
    }
});

export const {setProducts, setWishList, addToWishList,removeFromWishList } = userSlice.actions;
export default userSlice.reducer