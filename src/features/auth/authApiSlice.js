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
        register: builder.mutation({
            query: credentials => ({
                url:'auth/vendors/register',
                method:'POST',
                body: {...credentials},
            })
        }),
        forgotPassword: builder.mutation({
            query: credentials => ({
                url:'/auth/forgot-password',
                method:'POST',
                body: {...credentials},
            })
        }),
        getUser: builder.mutation({
            query: credentials => ({
                url:'/auth/forgot-password',
                method:'POST',
                body: {...credentials},
            })
        }),
        resetPassword: builder.mutation({
            query: credentials => ({
                url:'/auth/reset-password',
                method:'POST',
                body: {...credentials},
            })
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
     useResetPasswordMutation
    } = authApiSlice