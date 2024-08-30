import {createSlice}  from "@reduxjs/toolkit"
import {removeCookie} from "../../utils";
const authSlice = createSlice({
    name : "auth",
    initialState: {user:null, token:null},
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken, role} = action.payload
            state.user = user
            state.token = accessToken
            state.role = role        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.role = null
            removeCookie('accessToken')
        }
    },
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token

