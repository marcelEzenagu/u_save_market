import { apiSlice } from "../../app/api/apiSlice";

export const vendorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        viewVendor : builder.query({
            query: () => 'vendors/details',
            keepUnusedDataFor:5,
            providesTags: ['vendor']
        }),

        updateVendorProfilePicture: builder.mutation({
            query: (credentials) => ({
                url: 'vendors',
                method: 'PATCH',
                body: {...credentials},
                
            }),
            invalidatesTags:['vendor']
        }),

        updateVendorProfile: builder.mutation({
            query: (credentials) => ({
                url: 'vendors/',
                method: 'PATCH',
                body: {...credentials},
            }),
            invalidatesTags:['vendor']
        }),
    })
})

export const {useViewVendorQuery, useUpdateVendorProfileMutation, useUpdateVendorProfilePictureMutation} = vendorApiSlice