import { apiSlice } from "../../app/api/apiSlice";

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Items Endpoints
    getItems: builder.query({
      query: ({category,subCategory,country}) => `items?category=${category}&subCategory=${subCategory}&country=${country}`,
      providesTags: ['item'],
    }),
    addItem: builder.mutation({
      query: (newItem) => ({
        url: 'items',
        method: 'POST',
        body: newItem,
      }),
      invalidatesTags: ['item'],
    }),

    updateItem: builder.mutation({
      query: ({ id, ...updatedItem }) => ({
        url: `items/${id}`,
        method: 'PATCH',
        body: updatedItem,
      }),
      invalidatesTags: ['item'],
    }),

    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['item'],
    }),
    
    getItemById : builder.query({
        query : (id) => `items/${id}`,
    }),
    searchItems: builder.query({
      query: ({searchTerm, country, filter}) => `items/search?query=${searchTerm}&country=${country}&filter=${filter}`,
      providesTags: ['item'],
    }),
  }),
});


export const {
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useSearchItemsQuery,
  useGetItemByIdQuery
} = itemApiSlice;
