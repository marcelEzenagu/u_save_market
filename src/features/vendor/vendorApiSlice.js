import { apiSlice } from "../../app/api/apiSlice";

export const vendorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        viewVendor : builder.query({
            query: () => 'vendors/details',
            keepUnusedDataFor:5,
            providesTags: ['vendor']
        }),

        updateVendorProfilePicture: builder.mutation({
            query: (profilePicture) => ({
                url: 'vendors',
                method: 'PATCH',
                body: profilePicture,
            })
        }),
    })
})

export const {useViewVendorQuery, useUpdateVendorProfilePictureMutation} = vendorApiSlice