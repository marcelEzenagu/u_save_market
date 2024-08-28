import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Like from '../../assets/images/Default/icons/like.webp'
import New from '../../assets/images/Default/icons/new.webp'
import Price from '../../assets/images/Default/icons/price.webp'
import Best from '../../assets/images/Default/icons/best.webp'
import Footer from "../Footer/Footer";
import { dataCategory } from "../../data/mockData";
import { selectCurrentToken, selectCurrentUser } from '../../features/auth/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { setCredentials, logOut } from '../../features/auth/authSlice'
import { getCookie, getSecureCookie, validateToken } from '../../utils'
import { useViewUserQuery } from '../../features/user/userApiSlice'
import LoadingScreen from '../Loading/LoadingScreen'


function DefaultLayout() {
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
        } else if (isError) {
          console.error("Error fetching user data:", error);
          if (error?.status === 401) {
            dispatch(logOut()); // Clear user data and token
            navigate('/'); // Redirect to login page
          } else {
            // Handle other errors or redirect
            navigate('/'); // Redirect to an appropriate route
          }
        }
      }
    } else {
      // Handle case where userToken is invalid or missing
      // console.error("Invalid or missing user token.");
      // navigate('/'); // Redirect to login or another appropriate route
    }
  }, [userToken, token, userData, isSuccess, isError, dispatch, user, error, navigate]);

  // Only show LoadingScreen if the userToken is valid and not empty, and the token is null or empty
  if (userToken && validateToken(userToken) && isLoading) {
    return <LoadingScreen />;
  }

  const dataCategory = [
    { id: '1', name: 'Recommended', image: Like },
    { id: '2', name: 'Bestsellers', image: Best },
    { id: '3', name: 'New arrivals', image: New },
    { id: '4', name: 'Deals', image: Price }
  ];

  return (
    <div>
      <Navigation />
      <div className="w-full py-3 px-1 md:px-4 hidden lg:block border-b-[1px] bg-white">
        <div className="max-w-[1200px] flex flex-row items-center gap-2 md:gap-8 mx-auto md:px-4">
          {dataCategory.map((e, i) => (
            <Link to={`/products?name=${e.name?.toLowerCase()}`} className="flex flex-row items-center gap-1 md:gap-2 cursor-pointer" key={i}>
              <img src={e.image} alt="" className="w-5" />
              <span className="text-regal-black text-[10px] xs:text-xs md:text-sm capitalize font-[500]">
                {e.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <section className="container mx-auto flex-grow max-w-[1200px] py-5 px-2 md:flex md:flex-row md:py-10">
        <section className="hidden w-[300px] flex-shrink-0 px-4 lg:block">
          <Sidebar />
        </section>
        <section className="max-w-[1200px] sm:px-4 w-full">
          <Outlet />
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
