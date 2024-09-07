import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserOrder: builder.mutation({
      query: (order) => ({
        url: 'orders',
        method: 'PATCH',
        body: order,
    }),
    invalidatesTags:['order'],
    }),
    createUserOrder: builder.mutation({
        query: (order) => ({
          url: 'orders',
          method: 'POST',
          body: order,
        }),
        invalidatesTags:['order'],
      }),
    deleteUserOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags:['order'],
    }),
    getUserOrder: builder.query({
        query: () => '/orders/user',
       providesTags:['order']
    }),
    getOrderById: builder.query({
        query: (id) => `orders/${id}`,
        providesTags:['order']
    }),
    overrideExisting: false,
  }),
});

export const { useGetUserOrderQuery,useGetOrderByIdQuery, useUpdateUserOrderMutation, useCreateUserOrderMutation, useDeleteUserOrderMutation } = orderApiSlice;
