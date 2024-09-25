import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice =  apiSlice.injectEndpoints({
    endpoints:builder => ({
        viewUser: builder.query({
            query: () => 'users/details',
           keepUnusedDataFor:5,
            providesTags:['user']
        }),
        updateUserProfilePicture: builder.mutation({
            query: (credentials) => ({
                url: 'users/details',
                method: 'PATCH',
                body: {...credentials},
            }),
            invalidatesTags:['user']
        }),
        updateUserProfile: builder.mutation({
            query: (credentials) => ({
                url: 'users/details',
                method: 'PATCH',
                body: {...credentials},
            }),
            invalidatesTags:['user']
        }),
        userWishList : builder.query({
            query: () => 'saved-items',
            keepUnusedDataFor:5,
            providesTags:['savedItems']
        }),
        addItemToWishList: builder.mutation({
            query :(product) => ({
                url: 'saved-items',
                method: 'POST',
                body: product 
            }),
            invalidatesTags:['savedItems']
        }),
        removeItemFromWishList : builder.mutation({
            query : (itemId) => ({
                url: `saved-items/${itemId}`,
                method:'DELETE',
            }),
            InvalidatesTags:['savedItems']
        }),

    }),
})

export const { 
    useViewUserQuery,
    useAddItemToWishListMutation,
    useRemoveItemFromWishListMutation,
    useUserWishListQuery,
    useUpdateUserProfileMutation,
    useUpdateUserProfilePictureMutation
    } = userApiSlice