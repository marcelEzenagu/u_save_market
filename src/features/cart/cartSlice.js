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
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    incrementItemInCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(i => i.id === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementItemInCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(i => i.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter(i => i.id !== itemId);
      }
    },
    removeItemInCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(i => i.id !== itemId);
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const updateCartOnBackend = createAsyncThunk(
    'cart/updateCartOnBackend',
    async (cartItems, { getState, dispatch }) => {
      const { auth } = getState();
      console.log(auth, 'emeka')
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
      console.log(auth)
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
  

export const { addToCart, incrementItemInCart, decrementItemInCart, removeItemInCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
