import { apiSlice } from "../../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserCart: builder.mutation({
      query: (cart) => ({
        url: 'carts',
        method: 'PATCH',
        body: cart,
        keepUnusedDataFor:5,
        providesTags:['cart']
      }),
    }),
    addUserCart: builder.mutation({
        query: (cart) => ({
          url: 'carts',
          method: 'POST',
          body: cart,
          keepUnusedDataFor:5,
          providesTags:['cart']
        }),
      }),
    deleteUserCartItem: builder.mutation({
      query: (itemId) => ({
        url: `carts`,
        method: 'DELETE',
        body: itemId,
        keepUnusedDataFor:5,
        providesTags:['cart']
      }),
    }),

    getUserCart: builder.query({
        query: () => '/carts',
       keepUnusedDataFor:5,
        providesTags:['cart']
    }),
  }),
});

export const { useGetUserCartQuery, useUpdateUserCartMutation, useAddUserCartMutation, useDeleteUserCartItemMutation } = cartApiSlice;
