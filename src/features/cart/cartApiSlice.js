import { apiSlice } from "../../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserCart: builder.mutation({
      query: (cart) => ({
        url: '/updateUserCart',
        method: 'POST',
        body: cart,
      }),
    }),
    deleteUserCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/deleteCartItem/${itemId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useUpdateUserCartMutation, useDeleteUserCartItemMutation } = cartApiSlice;
