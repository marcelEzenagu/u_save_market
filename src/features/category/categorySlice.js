import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryApiSlice } from './categoryApiSlice';

// Initial state
const initialState = {
  categories: [],
  subcategories: [],
  loading: false,
  error: null,
};

// Thunks for async actions
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryApiSlice.endpoints.getCategories.initiate();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSubcategories = createAsyncThunk(
  'category/fetchSubcategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryApiSlice.endpoints.getSubcategories.initiate();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSubcategoriesByCategory = createAsyncThunk(
  'category/fetchSubcategoriesByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await categoryApiSlice.endpoints.getSubcategoriesByCategory.initiate(categoryId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (newCategory, { rejectWithValue }) => {
    try {
      const response = await categoryApiSlice.endpoints.addCategory.initiate(newCategory);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, updatedCategory }, { rejectWithValue }) => {
    try {
      const response = await categoryApiSlice.endpoints.updateCategory.initiate({ id, ...updatedCategory });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await categoryApiSlice.endpoints.deleteCategory.initiate(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Subcategory actions
export const addSubcategory = createAsyncThunk(
  'subcategory/addSubcategory',
  async (newSubcategory, { rejectWithValue }) => {
    try {
      const response = await categoryApiSlice.endpoints.addSubcategory.initiate(newSubcategory);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateSubcategory = createAsyncThunk(
  'subcategory/updateSubcategory',
  async ({ id, updatedSubcategory }, { rejectWithValue }) => {
    try {
      const response = await categoryApiSlice.endpoints.updateSubcategory.initiate({ id, ...updatedSubcategory });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteSubcategory = createAsyncThunk(
  'subcategory/deleteSubcategory',
  async (id, { rejectWithValue }) => {
    try {
      await categoryApiSlice.endpoints.deleteSubcategory.initiate(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create the slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Subcategories
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Subcategories by Category
    builder
      .addCase(fetchSubcategoriesByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcategoriesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategoriesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Category
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Subcategory
    builder
      .addCase(addSubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories.push(action.payload);
      })
      .addCase(addSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Subcategory
    builder
      .addCase(updateSubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subcategories.findIndex((subcat) => subcat.id === action.payload.id);
        if (index !== -1) {
          state.subcategories[index] = action.payload;
        }
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Subcategory
    builder
      .addCase(deleteSubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = state.subcategories.filter((subcat) => subcat.id !== action.payload);
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearErrors } = categorySlice.actions;
export default categorySlice.reducer;
