import { apiSlice } from "../../app/api/apiSlice";

export const categoryApiSlice =  apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Categories Endpoints
    getCategories: builder.query({
      query: () => 'product-categories',
      providesTags: ['category'],
    }),


    getAdminCategories: builder.query({
      query: () => 'admin/categories',
      providesTags: ['category'],
    }),

    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: 'admin/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['category'],
    }),
    
    updateCategory: builder.mutation({
      query: ({ id, ...updatedCategory }) => ({
        url: `admin/categories/${id}`,
        method: 'PATCH',
        body: updatedCategory,
      }),
      invalidatesTags: ['category'],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `admin/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['category'],
    }),

    // Subcategories Endpoints
    getSubcategories: builder.query({
      query: () => 'admin/sub-categories',
      providesTags: ['subcategory'],
    }),

    addSubcategory: builder.mutation({
      query: (newSubcategory) => ({
        url: 'admin/sub-categories',
        method: 'POST',
        body: newSubcategory,
      }),
      invalidatesTags: ['subcategory'],
    }),
    updateSubcategory: builder.mutation({
      query: ({ id, ...updatedSubcategory }) => ({
        url: `admin/sub-categories/${id}`,
        method: 'PATCH',
        body: updatedSubcategory,
      }),
      invalidatesTags: ['subcategory'],
    }),
    deleteSubcategory: builder.mutation({
      query: (id) => ({
        url: `admin/sub-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['subcategory'],
    }),

    // Get Subcategories by Category ID
    getSubcategoriesByCategory: builder.query({
      query: (categoryId) => `admin/sub-categories?category=${categoryId}`,
      providesTags: ['subcategory'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAdminCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetSubcategoriesQuery,
  useAddSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetSubcategoriesByCategoryQuery,
} = categoryApiSlice;
