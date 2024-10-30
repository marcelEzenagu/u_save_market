import { createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "../../utils";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    role: null,
    loginModal: false,
    countries: [],
    exchangeRate: null,
    preferredCountry: null,
    preferredCurrency: null,
    verifiedDetails: {},
  },
  
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, role } = action.payload;
      state.user = {
        ...user,
        profilePicture: import.meta.env.VITE_APP_API_URL + user?.profilePicture,
      };
      state.token = accessToken;
      state.role = role;
    },
    setUserCredentails: (state, action) => {
      const { user } = action.payload;
      state.user = {
        ...user,
        profilePicture: import.meta.env.VITE_APP_API_URL + user?.profilePicture,
      };
    },

    setCountry: (state, action) => {
      state.preferredCountry = action.payload;
    },

    setCurrency: (state, action) => {
      state.preferredCurrency = action.payload;
    },

    setLoginModal: (state, action) => {
      state.loginModal = action.payload;
    },

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.preferredCountry = null;
      state.preferredCurrency = null;
      removeCookie("accessToken");
      removeCookie("role");
    },

    setCountries: (state, action) => {
      state.countries = action.payload;
    },

    setExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    },

    setVerifiedDetails: (state, action) => {
      state.verifiedDetails = action.payload;
    },

    clearVerifiedDetails: (state) => {
      state.verifiedDetails = null;
    },
  },
});

export const {
  setCredentials,
  logOut,
  setUserCredentails,
  setLoginModal,
  setCountries,
  setExchangeRate,
  setCountry,
  setCurrency,
  setVerifiedDetails,
  clearVerifiedDetails,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
