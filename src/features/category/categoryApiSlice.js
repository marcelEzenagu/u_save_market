import { createApi } from '@reduxjs/toolkit/query/react';

export const categoryApiSlice = createApi({
  tagTypes: ['Category', 'Subcategory'],
  endpoints: (builder) => ({
    // Categories Endpoints
    getCategories: builder.query({
      query: () => 'admin/categories',
      providesTags: ['Category'],
    }),
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: 'admin/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...updatedCategory }) => ({
        url: `admin/categories/${id}`,
        method: 'PATCH',
        body: updatedCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `admin/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),

    // Subcategories Endpoints
    getSubcategories: builder.query({
      query: () => 'admin/sub-categories',
      providesTags: ['Subcategory'],
    }),
    addSubcategory: builder.mutation({
      query: (newSubcategory) => ({
        url: 'admin/sub-categories',
        method: 'POST',
        body: newSubcategory,
      }),
      invalidatesTags: ['Subcategory'],
    }),
    updateSubcategory: builder.mutation({
      query: ({ id, ...updatedSubcategory }) => ({
        url: `admin/sub-categories/${id}`,
        method: 'PATCH',
        body: updatedSubcategory,
      }),
      invalidatesTags: ['Subcategory'],
    }),
    deleteSubcategory: builder.mutation({
      query: (id) => ({
        url: `admin/sub-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subcategory'],
    }),

    // Get Subcategories by Category ID
    getSubcategoriesByCategory: builder.query({
      query: (categoryId) => `admin/sub-categories?category=${categoryId}`,
      providesTags: ['Subcategory'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetSubcategoriesQuery,
  useAddSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetSubcategoriesByCategoryQuery,
} = categoryApiSlice;
