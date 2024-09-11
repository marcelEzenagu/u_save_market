import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentToken, selectCurrentUser, setCredentials, logOut , setLoginModal} from '../features/auth/authSlice'
import { getSecureCookie, validateToken }  from '../utils' 
import { useViewVendorQuery } from '../features/vendor/vendorApiSlice';
export const useVendorAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const userData = useSelector(selectCurrentUser);
  const userToken = getSecureCookie("accessToken");

  const {
    data: vendor,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useViewVendorQuery(userToken, {
    skip: !userToken || !validateToken(userToken) || (token && userData),
  });

  useEffect(() => {
    if (userToken && validateToken(userToken)) {
      if (!token && !userData) {
        if (isSuccess) {
          if (validateToken(userToken)) {
            dispatch(setCredentials({ accessToken: userToken, role: 'vendor', vendor }));
          } else {
              navigate('/vendor/auth/login'); // Redirect to login if token is invalid
          }
        } else if (isError) {
          console.error("Error fetching vendor data:", error);
          if (error?.status === 401) {
            dispatch(logOut());
            navigate('/vendor/auth/login'); // Redirect to login
          }
        }
      }
    } else {
        navigate('/vendor/auth/login'); // Redirect to login
    }
  }, [token, userData, isSuccess, isError, dispatch, vendor, error]);

  return {
    isLoading,
    isAuthenticated: !!token,
  };
};
