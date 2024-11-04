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
       

        getVendorOrders: builder.query({
            query: (data) => {
                const { status = '', daysDifference = '' } = data;
                return    {url: `vendors/orders?status=${status}&daysDifference=${daysDifference}`,
                };
            },
            invalidatesTags:['vendor'],

        }),
    })
})

export const {useViewVendorQuery,useGetVendorOrdersQuery, useUpdateVendorProfileMutation, useUpdateVendorProfilePictureMutation} = vendorApiSlice