import { useEffect,useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentToken,selectCurrentRole, selectCurrentUser, setCredentials, logOut , setLoginModal} from '../features/auth/authSlice'
import { getSecureCookie, validateToken }  from '../utils' 
import { useViewAdminQuery } from '../features/admin/adminApiSlice';
export const useAdminAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const userData = useSelector(selectCurrentUser);
  const userToken = getSecureCookie("accessToken");
  const role =getSecureCookie("role");

  const {
    data: admin,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useViewAdminQuery(userToken, {
    skip: !userToken || !validateToken(userToken) || (token && userData),
  });

  useEffect(() => {
    if (userToken && validateToken(userToken)&& role == "admin") {
      if (!token && !userData) {
        if (isSuccess) {
          if (validateToken(userToken)) {
            dispatch(setCredentials({ accessToken: userToken, role: 'admin', user: admin }));
          } else {
              navigate('/admin/login'); // Redirect to login if token is invalid
          }
        } else if (isError) {
          console.error("Error fetching admin data:", error);
          if (error?.status === 401) {
            dispatch(logOut());
            navigate('/admin/login'); // Redirect to login
          }
        }
      }
    } else {
        navigate('/admin/login'); // Redirect to login
    }

  }, [token, userData, userToken, isSuccess, isError, dispatch, admin, error]);

  return {
    isLoading,
    isAuthenticated: !!token,
  };
};
