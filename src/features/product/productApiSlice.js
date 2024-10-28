import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Products Endpoints
    getProducts: builder.query({
      query: () => 'products',
      providesTags: ['product'],
    }),

    getProductsAdmin: builder.query({
      query: () => 'admin/products',
      providesTags: ['product'],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: updatedProduct,
      }),
      invalidatesTags: ['product'],
    }),
    
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsAdminQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
