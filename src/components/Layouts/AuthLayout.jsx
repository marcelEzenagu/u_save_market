import React, {useEffect} from 'react'
import { Outlet,useNavigate} from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import AuthSidebar from '../Sidebar/AuthSidebar'
import Footer from '../Footer/Footer'
import { selectCurrentToken, selectCurrentUser } from '../../features/auth/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { setCredentials, logOut } from '../../features/auth/authSlice'
import { getSecureCookie, validateToken } from '../../utils'
import { useViewUserQuery } from '../../features/user/userApiSlice'
import LoadingScreen from '../Loading/LoadingScreen'

function AuthLayout() {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const userData = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const userToken = getSecureCookie("accessToken");
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useViewUserQuery(userToken, {
    skip: !userToken || !validateToken(userToken) || (token && userData), // Skip query if conditions are met
  });

  useEffect(() => {
    if (userToken && validateToken(userToken)) {
    if (!token && !userData) {
      if (isSuccess) {
    
        if (validateToken(userToken)) {
          dispatch(setCredentials({ accessToken: userToken, role: 'user', user }));
        } else {
          navigate('/'); // Redirect to login if token is invalid
        }
      } else if (isError) {
        console.error("Error fetching user data:", error);
     // Check if the error is due to unauthorized access (status code 401)
        if (error?.status === 401) {
          // Log the user out
          dispatch(logOut()); // This action should clear the user data and token from the store
          navigate('/'); // Redirect to the login page or another appropriate route
        } else {
          // navigate('/'); // Redirect to the home page or another appropriate route
        }
      }
    }
  } else {
    // Handle case where userToken is invalid or missing
    // console.error("Invalid or missing user token.");
     navigate('/'); // Redirect to login or another appropriate route
  }
  }, [token, userData, isSuccess, isError, dispatch, user, error]);

  if (isLoading || !token) {
    return <LoadingScreen />; // Show loading screen while fetching user data or if token is not set
  }

  return (
    <div>
      <Navigation />
      <div className="container mx-auto max-w-[1200px] py-5 md:flex md:flex-row px-2 md:px-0 md:py-10">
        <div className="w-full bg-white rounded-sm shadow-sm flex flex-col md:flex-row md:p-4">
          <div>
            <AuthSidebar />
          </div>
          <div className="w-full col-span-2 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

{/* <Navigate to="/" state={{ from:location  }} replace />  */}
const redirect =()=> {
  return window.location = '/'
}



export default AuthLayout