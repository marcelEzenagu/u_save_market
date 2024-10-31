import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  subcategories: [],
  error: null,
};

const adminSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
   
    // addCategory(state, action) {
    //   state.categories.push(action.payload);
    // },
  
    // updateCategory(state, action) {
    //   const { id, updatedCategory } = action.payload;
    //   const index = state.categories.findIndex((cat) => cat.id === id);
    //   if (index !== -1) {
    //     state.categories[index] = updatedCategory;
    //   }
    // },

    // deleteCategory(state, action) {
    //   const id = action.payload;
    //   state.categories = state.categories.filter((cat) => cat.id !== id);
    // },
  
    // addSubcategory(state, action) {
    //   state.subcategories.push(action.payload);
    // },
   
    // updateSubcategory(state, action) {
    //   const { id, updatedSubcategory } = action.payload;
    //   const index = state.subcategories.findIndex((subcat) => subcat.id === id);
    //   if (index !== -1) {
    //     state.subcategories[index] = updatedSubcategory;
    //   }
    // },
  

    approveItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },


    // deleteSubcategory(state, action) {
    //   const id = action.payload;
    //   state.subcategories = state.subcategories.filter((subcat) => subcat.id !== id);
    // },

    clearErrors(state) {
      state.error = null;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
    approveItem,
//   updateCategory,
//   deleteCategory,
//   addSubcategory,
//   updateSubcategory,
//   deleteSubcategory,
  clearErrors,
  setError,
} = adminSlice.actions;

export default adminSlice.reducer;
