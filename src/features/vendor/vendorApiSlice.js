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
                return  {url: `vendors/orders?status=${status}&daysDifference=${daysDifference}`,
                };
            },
            invalidatesTags:['vendor'],
        }),
        getVendorStats: builder.query({
            query: (data) => {
                const { daysDifference = '' } = data;
                return    {url: `vendors/dashboard?daysDifference=${data}`,
                };
            },
            invalidatesTags:['vendor'],

        }),
        completeOrder: builder.mutation({
            // query: (data) => ({
            //         url: `vendors/complete-order`,
            //         method: 'PATCH',
            //         body: {...data},
            //     }
            // ),

            
            query: (data) => {
                const {orderID} = data
                
                return {
                url: `vendors/complete-order?orderID=${orderID}`,
                method: 'PATCH',
                body: { ...data },
              }
            },
            invalidatesTags:['vendor'],
        })
    })
})

export const {
    useViewVendorQuery,
    useGetVendorStatsQuery,
    useCompleteOrderMutation,
    useGetVendorOrdersQuery, 
    useUpdateVendorProfileMutation, 
    useUpdateVendorProfilePictureMutation} = vendorApiSlice