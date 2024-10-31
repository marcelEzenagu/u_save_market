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
                url: `admin/`,
                method: 'PATCH',
                body: {...credentials},
            }),
            invalidatesTags:['admin']
        }),
        approveItem: builder.mutation({
            query: (itemID) => ({
                url: `admin/items/approve/${itemID}`,
                method: 'PATCH',
                // body: {credentials},
            }),
            invalidatesTags:['admin']
        }),

        // items
        adminListNewItems: builder.query({
            query: ({vendorID,limit,page}) => ({
              url: `admin/new-items?vendorID=${vendorID}&limit=${limit}&page=${page}`,
              method: 'GET',
            }),
            providesTags: ['items'],
          }),

        adminListItemsByVendors: builder.query({
        query: ({vendorID,limit,page,status}) => 
            
            
            ({
            url: `admin/items/${vendorID}?limit=${limit &&limit}&page=${page && page}&status=${status && status}`,
            method: 'GET',
        }),
        providesTags: ['items'],
       
        }),

        adminApproveItem: builder.query({
            query: (itemID) => ({
              url: `admin/items/approve/${itemID}`,
              method: 'PATCH',
            }),
            providesTags: ['items'],
        }),

        //   vendors
        adminListVendors: builder.query({
            query: ({limit,page,status,query,isDisabled}) =>  `admin/vendors?query=${query}&limit=${limit}&page=${page}&status=${status}&isDisabled=${isDisabled}`,
            providesTags: ['vendors'],
            onQueryStarted(){

                console.log("STARTED")
                }
          }),

        adminGetVendor: builder.query({
        query: ({vendorID}) =>  `admin/vendors/${vendorID}`,
        providesTags: ['vendors'],
        onQueryStarted(){
            console.log("STARTED")
            }
        }),
    })
})

export const {useViewAdminQuery,
    useAdminApproveItemQuery, 
    useAdminListNewItemsQuery,
    useAdminListItemsByVendorsQuery,
    useAdminListVendorsQuery,
    useAdminGetVendorQuery,
    useApproveItemMutation,
    useUpdateAdminProfileMutation, 
    useUpdateAdminProfilePictureMutation} = adminApiSlice