import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice =  apiSlice.injectEndpoints({
    endpoints:builder => ({
        viewUser: builder.query({
            query: () => 'users/details',
           keepUnusedDataFor:5,
            providesTags:['user']
        }),

    })
})

export const { 
    useViewUserQuery
    } = userApiSlice