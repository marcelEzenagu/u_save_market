import { apiSlice } from "../../app/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        viewAdmin : builder.query({
            query: () => 'admin/details',
            keepUnusedDataFor:5,
            providesTags: ['agent']
        }),

        updateAdminProfilePicture: builder.mutation({
            query: (credentials) => ({
                url: 'admin',
                method: 'PATCH',
                body: {...credentials},
                
            }),
            invalidatesTags:['admin']
        }),

        updateAdminProfile: builder.mutation({
            query: (credentials) => ({
                url: 'admin/',
                method: 'PATCH',
                body: {...credentials},
            }),
            invalidatesTags:['admin']
        }),
    })
})

export const {useViewAdminQuery, useUpdateAdminProfileMutation, useUpdateAdminProfilePictureMutation} = adminApiSlice