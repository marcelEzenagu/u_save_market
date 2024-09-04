import {createSlice}  from "@reduxjs/toolkit"
import {removeCookie} from "../../utils";
const authSlice = createSlice({
    name : "auth",
    initialState: {user:null, token:null, role:null, loginModal:false},
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken, role} = action.payload
            state.user = user
            state.token = accessToken
            state.role = role        },
        setLoginModal:(state, action) => {
            state.loginModal = action.payload; 
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.role = null
            removeCookie('accessToken')
        }
    },
})

export const {setCredentials, logOut, setLoginModal} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token

