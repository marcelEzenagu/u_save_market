import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice =  apiSlice.injectEndpoints({
    endpoints:builder => ({
        login: builder.mutation({
            query: credentials => ({
                url:'auth/vendors/',
                method:'POST',
                body: {...credentials},
            }),
            transformResponse: (response, meta) => {
                return {
                    response,
                    authorization:meta.response.headers.get('Authorization')};
              }
        }),

        loginAgent: builder.mutation({
            query: credentials => ({
                url:'auth/agents/',
                method:'POST',
                body: {...credentials},
            }),
            transformResponse: (response, meta) => {
                return {
                    response,
                    authorization:meta.response.headers.get('Authorization')};
              }
        }),
        
        loginAdmin: builder.mutation({
            query: credentials => ({
                url:'auth/admin',
                method:'POST',
                body: {...credentials},
            }),
            transformResponse: (response, meta) => {
                return {
                    response,
                    authorization:meta.response.headers.get('Authorization')};
              }
        }),
        register: builder.mutation({
            query: credentials => ({
                url:'auth/vendors/register',
                method:'POST',
                body: {...credentials},
            })
        }),
        registerAgent: builder.mutation({
            query: credentials => ({
                url:'auth/agents/register',
                method:'POST',
                body: {...credentials},
            })
        }),
        forgotPassword: builder.mutation({
            query: credentials => ({
                url:'/auth/vendors/forgot-password',
                method:'POST',
                body: {...credentials},
            })
        }),
        forgotPasswordAgent: builder.mutation({
            query: credentials => ({
                url:'/auth/agents/forgot-password',
                method:'POST',
                body: {...credentials},
            })
        }),
        resetPassword: builder.mutation({
            query: credentials => ({
                url:'/vendors/reset-password',
                method:'POST',
                body: {...credentials},
                headers: {Authorization: `Bearer ${credentials?.token}`} 
            })
        }),
        resetPasswordAgent: builder.mutation({
            query: credentials => ({
                url:'/agents/reset-password',
                method:'POST',
                body: {...credentials},
                headers: {Authorization: `Bearer ${credentials?.token}`} 
            })
        }),
        verifyOtp: builder.mutation({
            query: credentials => ({
                url:'/auth/vendors/verify-password',
                method:'POST',
                body: {...credentials},
            })
        }),
        verifyOtpAgent: builder.mutation({
            query: credentials => ({
                url:'/auth/agents/verify-password',
                method:'POST',
                body: {...credentials},
            })
        }),
        verifyOtpUser: builder.mutation({
            query: credentials => ({
                url:'/auth/users/verify-password',
                method:'POST',
                body: {...credentials},
            })
        }),
        // verify-email
        verifyVendorEmail: builder.mutation({
            query: credentials => ({
                url:'/auth/vendors/verify-email',
                method:'POST',
                body: {...credentials},
            })
        }),
        forgotPasswordUser: builder.mutation({
            query: credentials => ({
                url:'/auth/users/forgot-password',
                method:'POST',
                body: {...credentials},
            })
        }),
        resetPasswordUser: builder.mutation({
            query: credentials => ({
                url:'/users/reset-password',
                method:'POST',
                body: {...credentials},
                headers: {Authorization: `Bearer ${credentials?.token}`} 
            })
        }),
        getUser: builder.mutation({
            query: credentials => ({
                url:'/auth/forgot-password',
                method:'POST',
                body: {...credentials},
            })
        }),
        getCountries : builder.query({
            query: () => ({
                url : '/country-currency',
                method:'GET',
            }),
        }),
        getExchangeRate : builder.query({
            query: (currency) => ({
                url : `/country-currency/${currency}`,
                method:'GET',
            }),
        }),
     
        
        loginUser: builder.mutation({
            query: credentials => ({
                url:'auth/users/',
                method:'POST',
                body: {...credentials},
            }),
            transformResponse: (response, meta) => {
                return {
                    response,
                    authorization:meta.response.headers.get('Authorization')};
              }
        }),
        updateUser: builder.mutation({
            query: credentials => ({
                url:'users/',
                method:'PATCH',
                body: {...credentials},
            }),
            transformResponse: (response, meta) => {
                return {
                    response,
                    authorization:meta.response.headers.get('Authorization')};
              }
        }),
        registerUser: builder.mutation({
            query: credentials => ({
                url:'auth/users/register',
                method:'POST',
                body: {...credentials},
            })
        }),
    })
})

export const { 
    useLoginMutation,
    useLoginUserMutation,
     useRegisterMutation, 
     useUpdateUserMutation,
     useRegisterUserMutation, 
     useForgotPasswordMutation,
     useResetPasswordMutation,
     useForgotPasswordUserMutation,
     useResetPasswordUserMutation,
     useVerifyOtpMutation,
     useVerifyOtpUserMutation,
     useGetCountriesQuery,
     useGetExchangeRateQuery,
     useLoginAgentMutation,
     useRegisterAgentMutation,
     useLoginAdminMutation,
     useForgotPasswordAgentMutation,
     useResetPasswordAgentMutation,
     useVerifyOtpAgentMutation,
     useVerifyVendorEmailMutation
     
    } = authApiSlice