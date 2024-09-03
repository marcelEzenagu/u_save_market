import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useUpdateUserCartMutation, useDeleteUserCartItemMutation } from './cartApiSlice';
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.productID === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    incrementItemInCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(i => i.productID === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementItemInCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(i => i.productID === itemId);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter(i => i.productID !== itemId);
      }
    },
    removeItemInCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(i => i.productID !== itemId);
    },
    removeAllItemInCart: (state, action) => {
        state.items = [];
      },
    setCartItems: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const addCartOnBackend = createAsyncThunk(
    'cart/addCartOnBackend',
    async ({ cartItems, addUserCart }, { getState }) => {
      const { auth } = getState();
      if (auth.token && auth.user) {
        try {
          await addUserCart(cartItems).unwrap();
          console.log(true);
        } catch (error) {
          console.log('Failed to add cart:', error);
        }
      }
    }
  );
  
export const updateCartOnBackend = createAsyncThunk(
    'cart/updateCartOnBackend',
    async (cartItems, { getState, dispatch }) => {
      const { auth } = getState();
      if (auth.token && auth.user) {
        const [updateUserCart] = useUpdateUserCartMutation();
        try {
          await updateUserCart(cartItems).unwrap();
        } catch (error) {
          console.error('Failed to update cart:', error);
        }
      }
    }
  );
  
  export const deleteCartItemOnBackend = createAsyncThunk(
    'cart/deleteCartItemOnBackend',
    async (itemId, { getState }) => {
      const { auth } = getState();
      if (auth.token && auth.user) {
        const [deleteUserCartItem] = useDeleteUserCartItemMutation();
        try {
          await deleteUserCartItem(itemId).unwrap();
        } catch (error) {
          console.error('Failed to delete cart item:', error);
        }
      }
    }
  );
  

export const { addToCart, incrementItemInCart, decrementItemInCart, removeItemInCart, setCartItems, removeAllItemInCart } = cartSlice.actions;

export default cartSlice.reducer;
