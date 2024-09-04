import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentToken, selectCurrentUser, setCredentials, logOut , setLoginModal} from '../features/auth/authSlice'
import { useViewUserQuery } from '../features/user/userApiSlice'
import { getSecureCookie, validateToken }  from '../utils' 

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const userData = useSelector(selectCurrentUser);
  const userToken = getSecureCookie("accessToken");

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useViewUserQuery(userToken, {
    skip: !userToken || !validateToken(userToken) || (token && userData),
  });

  useEffect(() => {
    if (userToken && validateToken(userToken)) {
      if (!token && !userData) {
        if (isSuccess) {
          if (validateToken(userToken)) {
            dispatch(setCredentials({ accessToken: userToken, role: 'user', user }));
          } else {
              navigate('/', { state: { loginModel: true } }); // Redirect to login if token is invalid
          }
        } else if (isError) {
          console.error("Error fetching user data:", error);
          if (error?.status === 401) {
            dispatch(logOut());
            navigate('/', { state: { loginModel: true } }); // Redirect to login
          }
        }
      }
    } else {
        navigate('/', { state: { loginModel: true } }); // Redirect to login
    }
  }, [token, userData, isSuccess, isError, dispatch, user, error]);

  return {
    isLoading,
    isAuthenticated: !!token,
  };
};
