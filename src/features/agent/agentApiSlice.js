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
    })
})

export const {useViewAgentQuery, useUpdateAgentProfileMutation, useUpdateAgentProfilePictureMutation} = agentApiSlice