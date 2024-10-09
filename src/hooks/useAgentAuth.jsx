import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentToken, selectCurrentUser, setCredentials, logOut , setLoginModal} from '../features/auth/authSlice'
import { getSecureCookie, validateToken }  from '../utils' 
import { useViewAgentQuery } from '../features/agent/agentApiSlice';
export const useAgentAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const userData = useSelector(selectCurrentUser);
  const userToken = getSecureCookie("accessToken");

  const {
    data: agent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useViewAgentQuery(userToken, {
    skip: !userToken || !validateToken(userToken) || (token && userData),
  });

  useEffect(() => {
    if (userToken && validateToken(userToken)) {
      if (!token && !userData) {
        if (isSuccess) {
          if (validateToken(userToken)) {
            dispatch(setCredentials({ accessToken: userToken, role: 'agent', user: agent }));
          } else {
              navigate('/agent/login'); // Redirect to login if token is invalid
          }
        } else if (isError) {
          console.error("Error fetching agent data:", error);
          if (error?.status === 401) {
            dispatch(logOut());
            navigate('/agent/login'); // Redirect to login
          }
        }
      }
    } else {
        navigate('/agent/login'); // Redirect to login
    }

  }, [token, userData, userToken, isSuccess, isError, dispatch, agent, error]);

  return {
    isLoading,
    isAuthenticated: !!token,
  };
};
