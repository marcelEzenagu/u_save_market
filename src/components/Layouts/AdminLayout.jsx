import React, { Children, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../../assets/images/nav/logo.webp";
import "../../assets/css/admin.css";
import { FiSearch, FiBell, FiChevronRight } from "react-icons/fi";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import LoadingScreen from '../Loading/LoadingScreen'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { logOut } from "../../features/auth/authSlice";
import useFetchCountries from "../../hooks/useFetchCountries";
import useErrorMessageHooks from "../../hooks/useErrorMessageHooks";
function AdminLayout() {
  const sidebarLinks = useMemo(() => {
    const sidebar = [
      {
        id: 1,
        url: "/admin/overview",
        name: "Overview",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 20V10"
              stroke="#8A8C94"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 20V4"
              stroke="#8A8C94"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 20V14"
              stroke="#8A8C94"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        id: 8,
        url: null,
        name: "Catalogue",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.49 7.52002C20.4843 7.49366 20.4843 7.46638 20.49 7.44002C20.4852 7.41694 20.4852 7.3931 20.49 7.37002V7.28002L20.43 7.13002C20.4056 7.08909 20.3753 7.05202 20.34 7.02002L20.25 6.94002H20.2L16.26 4.45002L12.54 2.15002C12.4539 2.08175 12.3555 2.03081 12.25 2.00002H12.17C12.0806 1.9851 11.9894 1.9851 11.9 2.00002H11.8C11.6838 2.02571 11.5725 2.06959 11.47 2.13002L4.00001 6.78002L3.91001 6.85002L3.82001 6.93002L3.72001 7.00002L3.67001 7.06002L3.61001 7.21002V7.30002V7.36002C3.60029 7.42633 3.60029 7.49371 3.61001 7.56002V16.29C3.60967 16.46 3.65264 16.6272 3.73488 16.7759C3.81711 16.9246 3.93589 17.0499 4.08001 17.14L11.58 21.78L11.73 21.84H11.81C11.9792 21.8937 12.1608 21.8937 12.33 21.84H12.41L12.56 21.78L20 17.21C20.1441 17.1199 20.2629 16.9946 20.3451 16.8459C20.4274 16.6972 20.4703 16.53 20.47 16.36V7.63002C20.47 7.63002 20.49 7.56002 20.49 7.52002ZM12 4.17002L13.78 5.27002L8.19001 8.73002L6.40001 7.63002L12 4.17002ZM11 19.17L5.50001 15.81V9.42002L11 12.82V19.17ZM12 11.06L10.09 9.91002L15.68 6.44002L17.6 7.63002L12 11.06ZM18.5 15.78L13 19.2V12.82L18.5 9.42002V15.78Z"
              fill="#8A8C94"
            />
          </svg>
        ),
        children: [
          {
            id: "catalogue-2",
            url: "/admin/categories/",
            name: "Categories",
          },
          {
            id: "catalogue-3",
            url: "/admin/subcategories",
            name: "SubCategories",
          },
          {
            id: "catalogue-1",
            url: "/admin/products",
            name: "Products",
          },
          {
            id: "catalogue-1",
            url: "/admin/items",
            name: "Items",
          },
        ],
      },
      {
        id: 2,
        url: "/admin/users",
        name: "Users",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.15957 10.87C9.05957 10.86 8.93957 10.86 8.82957 10.87C6.44957 10.79 4.55957 8.84 4.55957 6.44C4.55957 3.99 6.53957 2 8.99957 2C11.4496 2 13.4396 3.99 13.4396 6.44C13.4296 8.84 11.5396 10.79 9.15957 10.87Z"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.4103 4C18.3503 4 19.9103 5.57 19.9103 7.5C19.9103 9.39 18.4103 10.93 16.5403 11C16.4603 10.99 16.3703 10.99 16.2803 11"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.15973 14.56C1.73973 16.18 1.73973 18.82 4.15973 20.43C6.90973 22.27 11.4197 22.27 14.1697 20.43C16.5897 18.81 16.5897 16.17 14.1697 14.56C11.4297 12.73 6.91973 12.73 4.15973 14.56Z"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        id: 3,
        url: "/admin/vendors",
        name: "Vendors",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5999 22.5601H6.39985C4.57984 22.5601 2.91985 21.1601 2.61985 19.3601L1.28984 11.4001C1.07984 10.1601 1.67985 8.57011 2.66985 7.78011L9.59986 2.23006C10.9399 1.15006 13.0498 1.16007 14.3998 2.24007L21.3299 7.78011C22.3099 8.57011 22.9099 10.1601 22.7099 11.4001L21.3799 19.3601C21.0799 21.1301 19.3899 22.5601 17.5999 22.5601ZM11.9899 2.94008C11.4599 2.94008 10.9298 3.10005 10.5398 3.41005L3.60985 8.9601C3.03985 9.4201 2.64986 10.4401 2.76986 11.1601L4.09986 19.1201C4.27986 20.1701 5.32984 21.0601 6.39985 21.0601H17.5999C18.6699 21.0601 19.7198 20.1701 19.8998 19.1101L21.2298 11.1501C21.3498 10.4301 20.9499 9.40009 20.3899 8.95009L13.4599 3.41005C13.0599 3.10005 12.5299 2.94008 11.9899 2.94008Z"
              fill="#8A8C94"
            />
            <path
              d="M12 16.25C10.21 16.25 8.75 14.79 8.75 13C8.75 11.21 10.21 9.75 12 9.75C13.79 9.75 15.25 11.21 15.25 13C15.25 14.79 13.79 16.25 12 16.25ZM12 11.25C11.04 11.25 10.25 12.04 10.25 13C10.25 13.96 11.04 14.75 12 14.75C12.96 14.75 13.75 13.96 13.75 13C13.75 12.04 12.96 11.25 12 11.25Z"
              fill="#8A8C94"
            />
          </svg>
        ),
      },
      {
        id: 7,
        url: "/admin/agents",
        name: "Agents",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9998 14.75H11.9998C11.5898 14.75 11.2498 14.41 11.2498 14C11.2498 13.59 11.5898 13.25 11.9998 13.25H12.9998C13.6898 13.25 14.2498 12.69 14.2498 12V2.75H5.99978C4.81978 2.75 3.73975 3.38998 3.15975 4.41998C2.95975 4.77998 2.49979 4.91002 2.13979 4.71002C1.77979 4.51002 1.64975 4.05 1.84975 3.69C2.68975 2.19 4.27978 1.25 5.99978 1.25H14.9998C15.4098 1.25 15.7498 1.59 15.7498 2V12C15.7498 13.52 14.5198 14.75 12.9998 14.75Z"
              fill="#686B75"
            />
            <path
              d="M19 20.75H18C17.59 20.75 17.25 20.41 17.25 20C17.25 19.31 16.69 18.75 16 18.75C15.31 18.75 14.75 19.31 14.75 20C14.75 20.41 14.41 20.75 14 20.75H10C9.59 20.75 9.25 20.41 9.25 20C9.25 19.31 8.69 18.75 8 18.75C7.31 18.75 6.75 19.31 6.75 20C6.75 20.41 6.41 20.75 6 20.75H5C2.93 20.75 1.25 19.07 1.25 17C1.25 16.59 1.59 16.25 2 16.25C2.41 16.25 2.75 16.59 2.75 17C2.75 18.24 3.76 19.25 5 19.25H5.34998C5.67998 18.1 6.74 17.25 8 17.25C9.26 17.25 10.32 18.1 10.65 19.25H13.36C13.69 18.1 14.75 17.25 16.01 17.25C17.27 17.25 18.33 18.1 18.66 19.25H19C20.24 19.25 21.25 18.24 21.25 17V14.75H19C18.04 14.75 17.25 13.96 17.25 13V10C17.25 9.04 18.03 8.25 19 8.25L17.93 6.38C17.71 5.99 17.29 5.75 16.84 5.75H15.75V12C15.75 13.52 14.52 14.75 13 14.75H12C11.59 14.75 11.25 14.41 11.25 14C11.25 13.59 11.59 13.25 12 13.25H13C13.69 13.25 14.25 12.69 14.25 12V5C14.25 4.59 14.59 4.25 15 4.25H16.84C17.83 4.25 18.74 4.78001 19.23 5.64001L20.94 8.63C21.07 8.86 21.07 9.15 20.94 9.38C20.81 9.61 20.56 9.75 20.29 9.75H19C18.86 9.75 18.75 9.86 18.75 10V13C18.75 13.14 18.86 13.25 19 13.25H22C22.41 13.25 22.75 13.59 22.75 14V17C22.75 19.07 21.07 20.75 19 20.75Z"
              fill="#686B75"
            />
            <path
              d="M8 22.75C6.48 22.75 5.25 21.52 5.25 20C5.25 18.48 6.48 17.25 8 17.25C9.52 17.25 10.75 18.48 10.75 20C10.75 21.52 9.52 22.75 8 22.75ZM8 18.75C7.31 18.75 6.75 19.31 6.75 20C6.75 20.69 7.31 21.25 8 21.25C8.69 21.25 9.25 20.69 9.25 20C9.25 19.31 8.69 18.75 8 18.75Z"
              fill="#686B75"
            />
            <path
              d="M16 22.75C14.48 22.75 13.25 21.52 13.25 20C13.25 18.48 14.48 17.25 16 17.25C17.52 17.25 18.75 18.48 18.75 20C18.75 21.52 17.52 22.75 16 22.75ZM16 18.75C15.31 18.75 14.75 19.31 14.75 20C14.75 20.69 15.31 21.25 16 21.25C16.69 21.25 17.25 20.69 17.25 20C17.25 19.31 16.69 18.75 16 18.75Z"
              fill="#686B75"
            />
            <path
              d="M22 14.75H19C18.04 14.75 17.25 13.96 17.25 13V10C17.25 9.04 18.04 8.25 19 8.25H20.29C20.56 8.25 20.81 8.39 20.94 8.63L22.65 11.63C22.71 11.74 22.75 11.87 22.75 12V14C22.75 14.41 22.41 14.75 22 14.75ZM19 9.75C18.86 9.75 18.75 9.86 18.75 10V13C18.75 13.14 18.86 13.25 19 13.25H21.25V12.2L19.85 9.75H19Z"
              fill="#686B75"
            />
            <path
              d="M8 8.75H2C1.59 8.75 1.25 8.41 1.25 8C1.25 7.59 1.59 7.25 2 7.25H8C8.41 7.25 8.75 7.59 8.75 8C8.75 8.41 8.41 8.75 8 8.75Z"
              fill="#686B75"
            />
            <path
              d="M6 11.75H2C1.59 11.75 1.25 11.41 1.25 11C1.25 10.59 1.59 10.25 2 10.25H6C6.41 10.25 6.75 10.59 6.75 11C6.75 11.41 6.41 11.75 6 11.75Z"
              fill="#686B75"
            />
            <path
              d="M4 14.75H2C1.59 14.75 1.25 14.41 1.25 14C1.25 13.59 1.59 13.25 2 13.25H4C4.41 13.25 4.75 13.59 4.75 14C4.75 14.41 4.41 14.75 4 14.75Z"
              fill="#686B75"
            />
          </svg>
        ),
      },

      {
        id: 4,
        url: "/admin/orders",
        name: "Orders",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.19 17.75H7.53999C6.54999 17.75 5.59999 17.33 4.92999 16.6C4.25999 15.87 3.92 14.89 4 13.9L4.83 3.94C4.86 3.63 4.74999 3.33001 4.53999 3.10001C4.32999 2.87001 4.04 2.75 3.73 2.75H2C1.59 2.75 1.25 2.41 1.25 2C1.25 1.59 1.59 1.25 2 1.25H3.74001C4.47001 1.25 5.15999 1.56 5.64999 2.09C5.91999 2.39 6.12 2.74 6.23 3.13H18.72C19.73 3.13 20.66 3.53 21.34 4.25C22.01 4.98 22.35 5.93 22.27 6.94L21.73 14.44C21.62 16.27 20.02 17.75 18.19 17.75ZM6.28 4.62L5.5 14.02C5.45 14.6 5.64 15.15 6.03 15.58C6.42 16.01 6.95999 16.24 7.53999 16.24H18.19C19.23 16.24 20.17 15.36 20.25 14.32L20.79 6.82001C20.83 6.23001 20.64 5.67001 20.25 5.26001C19.86 4.84001 19.32 4.60999 18.73 4.60999H6.28V4.62Z"
              fill="#8A8C94"
            />
            <path
              d="M16.25 22.75C15.15 22.75 14.25 21.85 14.25 20.75C14.25 19.65 15.15 18.75 16.25 18.75C17.35 18.75 18.25 19.65 18.25 20.75C18.25 21.85 17.35 22.75 16.25 22.75ZM16.25 20.25C15.97 20.25 15.75 20.47 15.75 20.75C15.75 21.03 15.97 21.25 16.25 21.25C16.53 21.25 16.75 21.03 16.75 20.75C16.75 20.47 16.53 20.25 16.25 20.25Z"
              fill="#8A8C94"
            />
            <path
              d="M8.25 22.75C7.15 22.75 6.25 21.85 6.25 20.75C6.25 19.65 7.15 18.75 8.25 18.75C9.35 18.75 10.25 19.65 10.25 20.75C10.25 21.85 9.35 22.75 8.25 22.75ZM8.25 20.25C7.97 20.25 7.75 20.47 7.75 20.75C7.75 21.03 7.97 21.25 8.25 21.25C8.53 21.25 8.75 21.03 8.75 20.75C8.75 20.47 8.53 20.25 8.25 20.25Z"
              fill="#8A8C94"
            />
            <path
              d="M21 8.75H9C8.59 8.75 8.25 8.41 8.25 8C8.25 7.59 8.59 7.25 9 7.25H21C21.41 7.25 21.75 7.59 21.75 8C21.75 8.41 21.41 8.75 21 8.75Z"
              fill="#8A8C94"
            />
          </svg>
        ),
      },
      {
        id: 5,
        url: "/admin/payments",
        name: "Payments",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 15H10C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13H7C6.73478 13 6.48043 13.1054 6.29289 13.2929C6.10536 13.4804 6 13.7348 6 14C6 14.2652 6.10536 14.5196 6.29289 14.7071C6.48043 14.8946 6.73478 15 7 15ZM19 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V8C22 7.20435 21.6839 6.44129 21.1213 5.87868C20.5587 5.31607 19.7956 5 19 5ZM20 17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V11H20V17ZM20 9H4V8C4 7.73478 4.10536 7.48043 4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7H19C19.2652 7 19.5196 7.10536 19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V9Z"
              fill="#8A8C94"
            />
          </svg>
        ),
      },
      {
        id: 6,
        url: "/admin/analytics",
        name: "Analytics",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.02 5.97C2.75 7.65 2 9.74 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8"
              stroke="#8A8C94"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    ];

    return sidebar;
  }, []);
  const [activeTab, setActiveTab] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const location = useLocation();
  const [isActive, setisActive] = useState(null);
  const { countriesWithCurrency } = useFetchCountries();
 
  const{navigate} = useErrorMessageHooks()
  useEffect(()=>{
    countriesWithCurrency;
  }, []);
  // const role = useSelector((state) => state.auth?.role);

 

  useLayoutEffect(() => {
    setisActive(null)
    getActiveTabName();
    setIsOpen(false);
  }, [location]);

  // Function to get the active tab name based on the URL
  const getActiveTabName = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let activePathSegment;
    if (pathSegments.length >= 2) {
      activePathSegment = pathSegments[1];
    } else {
      activePathSegment = pathSegments[pathSegments.length - 1];
    }
    let activeLink = sidebarLinks.find((link) =>
      link?.url?.includes(activePathSegment)
    );
   
    if (!activeLink) {
      const activeParent = sidebarLinks.find((link) =>
        link?.children?.length > 0 && link?.children?.find((i) => i?.url?.includes(activePathSegment))
      );
      setisActive(activeParent);
      activeLink = activeParent?.children.find((link) =>
        link?.url?.includes(activePathSegment)
      );


    }
    setActiveTab(activeLink);
    return activeLink ? activeLink.name : "Overview";
  };

  const checkIfChildIsActive = (link) => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let activePathSegment;
    if (pathSegments.length >= 2) {
      activePathSegment = pathSegments[1];
    } else {
      activePathSegment = pathSegments[pathSegments.length - 1];
    }
   return link?.children.find((link) =>
      link?.url?.includes(activePathSegment)
    );
  }

  
  const { isLoading, isAuthenticated } = useAdminAuth();


  if (isLoading || !isAuthenticated) {
   
      return <LoadingScreen />;
    }else if(!isAuthenticated){
        navigate("/admin/login")

  }

    // useEffect(()=>{
    //   //   // console
    //   if(role && role !== "admin"){
    //     navigate("/admin/login")
    //   }
    // }, []);

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <aside
        className={`bg-regal-auth-bg-color h-screen text-white w-52 flex-shrink-0 md:block ${
          isOpen ? "block" : "hidden"
        } md:block fixed md:relative z-30`}
      >
        {/* Sidebar content */}
        <div className="flex flex-col h-full ">
          {/* Logo Section */}
          <div className="p-4 text-center text-xl font-bold ">
            <Link to="/admin">
              <img
                src={Logo}
                alt="Admin Logo"
                className=" w-[100px] md:w-[140px] lg:w-[140px]"
              />
            </Link>
          </div>

          {/* Links Section */}
          <nav className="flex-1 mt-5 mb-8 ">
            <ul className="space-y-4 text-sm ml-3">
              {sidebarLinks?.map((link) => (
                <li key={link.id}>
                  <div className="relative">
                    {link?.children?.length > 0 ? (
                      <div
                        className={`flex items-center cursor-pointer text-xs gap-4 py-2 pr-2 transition-colors relative group ${
                          isActive?.name.toLowerCase() ===
                          link?.name.toLowerCase()
                            ? "text-black font-bold "
                            : "text-gray-400 hover:text-black hover:font-bold"
                        }`}
                        onClick={() => {
                          setisActive(link);
                        }}
                      >
                        <span className={`text-xl group-hover:text-blue-400`}>
                          {React.cloneElement(link?.icon, {
                            stroke:
                              isActive?.name.toLowerCase() ===
                              link?.name.toLowerCase()
                                ? "#3b82f6"
                                : "#8A8C94",
                          })}
                        </span>
                        <span className="flex items-center gap-2">
                          {link.name}
                          {link?.children?.length > 0 && (
                            <FiChevronRight
                              className={`text-lg transition-transform duration-300 ease-in-out ${
                                isActive ? "rotate-90" : ""
                              }`}
                            />
                          )}
                        </span>
                      </div>
                    ) : (
                      <Link
                        to={link?.url}
                        className={`flex items-center text-xs gap-4 py-2 pr-2 transition-colors relative group ${
                          activeTab?.name.toLowerCase() ===
                          link?.name.toLowerCase()
                            ? "text-black font-bold "
                            : "text-gray-400 hover:text-black hover:font-bold"
                        }`}
                      >
                        <span className={`text-xl group-hover:text-blue-400`}>
                          {React.cloneElement(link.icon, {
                            stroke:
                              activeTab?.name.toLowerCase() ===
                              link.name.toLowerCase()
                                ? "#3b82f6"
                                : "#8A8C94",
                          })}
                        </span>
                        <span className="flex items-center gap-2">
                          {link.name}
                          {link?.children?.length > 0 && (
                            <FiChevronRight
                              className={`text-lg transition-transform duration-300 ease-in-out ${
                                isActive ? "rotate-90" : ""
                              }`}
                            />
                          )}
                        </span>
                      </Link>
                    )}
                    {
                      link?.children?.length > 0 ? (
                        checkIfChildIsActive(link) && (
                          <span className="absolute right-0 top-0 bottom-0 w-1 rounded bg-blue-500 after:block after:h-full after:content-['']"></span>
                        )
                      )  :   activeTab?.name.toLowerCase() ===
                        link?.name.toLowerCase() && (
                        <span className="absolute right-0 top-0 bottom-0 w-1 rounded bg-blue-500 after:block after:h-full after:content-['']"></span>
                      )
                    }
                
                  </div>

                  {isActive?.name.toLowerCase() === link?.name.toLowerCase() &&
                  link?.children?.length > 0 ? (
                    <ul className="flex flex-col mt-2 gap-2 pl-9  justify-center">
                      {link?.children?.map((i) => (
                        <li className="text-regal-black " key={i?.id}>
                          <Link
                            to={i.url}
                            className={`flex items-center text-xs gap-4 py-2 pr-2 transition-colors relative group ${
                              activeTab?.name.toLowerCase() ===
                              i?.name.toLowerCase()
                                ? "text-black font-[500] "
                                : "text-gray-400 hover:text-black hover:font-bold"
                            }`}
                          >
                            {i?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1  overflow-y-scroll bg-gray-100">
        {/* Mobile Header */}
        <header className="md:hidden bg-white p-4 shadow-sm flex justify-between items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="py-4 bg-regal-auth-bg-color">
          <div className="bg-white p-4 rounded-xl">
            <div className="flex flex-row items-center justify-between">
              <h5 className="text-regal-blue text-xl md:text-3xl font-[700]">
                {activeTab?.name}
              </h5>
              <Header />
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex justify-between items-center gap-6 rounded-full px-2 py-2 bg-white admin-input-shadow">
      {/* Search Bar */}
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-regal-auth-bg-color  rounded-full text-sm pl-11 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-[300px] font-[500]"
          />
          <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-regal-blue" />
        </div>
      </div>
      <div className="relative">
        <FiBell className="text-gray-600 text-xl cursor-pointer" />
        <span className="absolute bottom-3 left-2 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          3
        </span>
      </div>
      {/* Notification and Profile Section */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}

        {/* User Profile */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => dispatch(logOut())}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
