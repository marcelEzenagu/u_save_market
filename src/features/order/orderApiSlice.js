import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserOrder: builder.mutation({
      query: (order) => ({
        url: 'orders',
        method: 'PATCH',
        body: order,
        keepUnusedDataFor:5,
        providesTags:['order']
      }),
    }),
    createUserOrder: builder.mutation({
        query: (order) => ({
          url: 'orders',
          method: 'POST',
          body: order,
          keepUnusedDataFor:5,
          providesTags:['order']
        }),
      }),
    deleteUserOrder: builder.mutation({
      query: (order) => ({
        url: `orders`,
        method: 'DELETE',
        body: order,
        keepUnusedDataFor:5,
        providesTags:['order']
      }),
    }),

    getUserOrder: builder.query({
        query: () => '/orders/user',
       keepUnusedDataFor:5,
        providesTags:['order']
    }),
    getOrderById: builder.query({
        query: (id) => `orders/${id}`,
       keepUnusedDataFor:5,
        providesTags:['order']
    }),
  }),
});

export const { useGetUserOrderQuery,useGetOrderByIdQuery, useUpdateUserOrderMutation, useCreateUserOrderMutation, useDeleteUserOrderMutation } = orderApiSlice;
