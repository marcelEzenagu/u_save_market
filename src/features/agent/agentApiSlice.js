import { apiSlice } from "../../app/api/apiSlice";

export const agentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        viewAgent : builder.query({
            query: () => 'agents/details',
            keepUnusedDataFor:5,
            providesTags: ['agent']
        }),

        updateAgentProfilePicture: builder.mutation({
            query: (credentials) => ({
                url: 'agents',
                method: 'PATCH',
                body: {...credentials},
                
            }),
            invalidatesTags:['agent']
        }),

        updateAgentProfile: builder.mutation({
            query: (credentials) => ({
                url: 'agents/',
                method: 'PATCH',
                body: {...credentials},
            }),
            invalidatesTags:['agent']
        }),
        
        acceptShipment: builder.mutation({
            query: (credentials) => ({
                url: 'agents/warehouse',
                method: 'PATCH',
                body: {...credentials},
            }),
            invalidatesTags:['agent']
        }),

        findAllOpenShipment: builder.query({
            query: (data) => {
                const { status = '',perPage,page, daysDifference = '',countries,orderID="" } = data;
                // console.log("DATA",data.countries)
                const queryString = countries?.map(country => `countries=${encodeURIComponent(country)}`).join('&');

                return {url:`agents/warehouse?${queryString}&status=${status}&orderID=${orderID}&limit=${perPage}&page=${page}&daysDiff=${daysDifference}`}
            } ,
            providesTags: ['agent']
        }),


    })
})

export const {useViewAgentQuery,
    useAcceptShipmentMutation,
    useFindAllOpenShipmentQuery, useUpdateAgentProfileMutation, useUpdateAgentProfilePictureMutation} = agentApiSlice