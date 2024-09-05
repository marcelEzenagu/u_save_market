import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { selectCurrentToken, selectCurrentUser, setCredentials, logOut, setLoginModal } from '../features/auth/authSlice'
import { useViewUserQuery } from '../features/user/userApiSlice'
import { getSecureCookie, validateToken }  from '../utils' 
import { countries } from '../data/mockData';
import { setCountry, setCurrency } from '../features/auth/authSlice';
export function useGuestAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    const userData = useSelector(selectCurrentUser);
    const userToken = getSecureCookie("accessToken");
  
    // Use `skip` to conditionally fetch user data
    const { data: user, isLoading, isSuccess, isError, error } = useViewUserQuery(userToken, {
      skip: !userToken || !validateToken(userToken) || (token && userData), // Skip query if conditions are met
    });
  
    useEffect(() => {
      if (userToken && validateToken(userToken)) {
        if (!token && !userData) {
          if (isSuccess) {
            dispatch(setCredentials({ accessToken: userToken, role: 'user', user }));
            if (user?.preferredCountry){
              const country = countries.find((i)=> i.name.toLowerCase() === user?.preferredCountry.toLowerCase());
              if (country) {
                dispatch(setCountry(country))
                dispatch(setCurrency(country))
              }
            }
          } else if (isError) {
            console.error("Error fetching user data:", error);
            if (error?.status === 401) {
              dispatch(logOut()); // Clear user data and token
              navigate('/', { state: { loginModel: true } }); // Redirect to login 
            } else {
              // Handle other errors or redirect
              // navigate('/', { state: { loginModel: true } }); // Redirect to an appropriate route
            }
          }
        }
      } else {
        // dispatch(setLoginModal());
        // Handle case where userToken is invalid or missing
        // console.error("Invalid or missing user token.");
        // navigate('/'); // Redirect to login or another appropriate route
      }
    }, [userToken, token, userData, isSuccess, isError, dispatch, user, error, navigate]);
  
    return {
        isLoading,
        userToken : (userToken && validateToken(userToken))
    }
}

export default useGuestAuth