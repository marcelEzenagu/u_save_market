import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { getSecureCookie } from "../../utils";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  // Using the Credentials :"include", we are Attaching the Credentials to the Cookie with every request
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    //We are attaching the AccessToken to every Request that we make to the api
    const token = getState().auth.token === null ? getSecureCookie("accessToken") : getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

//We want to wrap our baseQuery so if it fails we can re-attempt after
// sending the refresh Token and getting a new AccessToken

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    console.log("sending refresh Token");
    //send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      //store the new Token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      //retry the original query with new access Token
      result = await baseQuery(args, api, extraOptions);
    } else {
      //getting a 401 unauthorized error
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  //for the builder we are going to use extended api slices so we can specify
  //what belongs to the auth and other features of our application
  endpoints: (builder) => ({}),
});
