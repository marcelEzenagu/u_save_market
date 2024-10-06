import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Products Endpoints
    getProducts: builder.query({
      query: () => 'product',
      providesTags: ['product'],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'product',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `product/${id}`,
        method: 'PATCH',
        body: updatedProduct,
      }),
      invalidatesTags: ['product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
