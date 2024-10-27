import { apiSlice } from "../../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserCart: builder.mutation({
      query: (cart) => ({
        url: 'carts',
        method: 'PATCH',
        body: cart,
      }),
      invalidatesTags: ['Cart'], // Invalidate the 'Cart' tag to refetch queries that use this tag
    }),

    addUserCart: builder.mutation({
      query: (cart) => ({
        url: 'carts',
        method: 'POST',
        body: cart,
      }),
      invalidatesTags: ['Cart'], // Invalidate the 'Cart' tag after adding an item
    }),

    deleteUserCartItem: builder.mutation({
      query: (cart) => ({
        url: `carts`,
        method: 'DELETE',
        body: cart,
      }),
      invalidatesTags: ['Cart'], // Invalidate the 'Cart' tag after deleting an item
    }),
    
    getUserCart: builder.query({
      query: () => '/carts',
      providesTags: ['Cart'], // Provide the 'Cart' tag to this query
    }),
  }),
  overrideExisting: false, // Optional: prevents overwriting existing endpoints
});

export const {
  useGetUserCartQuery,
  useUpdateUserCartMutation,
  useAddUserCartMutation,
  useDeleteUserCartItemMutation,
} = cartApiSlice;
