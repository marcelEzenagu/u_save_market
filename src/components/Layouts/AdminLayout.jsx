import React, { useLayoutEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../../assets/images/nav/logo.webp";
import "../../assets/css/admin.css";
import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";

function AdminLayout() {
    const sidebarLinks = [
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
                d="M20.49 7.52002C20.4843 7.49366 20.4843 7.46638 20.49 7.44002C20.4852 7.41694 20.4852 7.3931 20.49 7.37002V7.28002L20.43 7.13002C20.4056 7.08909 20.3753 7.05202 20.34 7.02002L20.25 6.94002H20.2L16.26 4.45002L12.54 2.15002C12.4539 2.08175 12.3555 2.03081 12.25 2.00002H12.17C12.0806 1.9851 11.9894 1.9851 11.9 2.00002H11.8C11.6838 2.02571 11.5725 2.06959 11.47 2.13002L4.00001 6.78002L3.91001 6.85002L3.82001 6.93002L3.72001 7.00002L3.67001 7.06002L3.61001 7.21002V7.30002V7.36002C3.60029 7.42633 3.60029 7.49371 3.61001 7.56002V16.29C3.60967 16.46 3.65264 16.6272 3.73488 16.7759C3.81711 16.9246 3.93589 17.0499 4.08001 17.14L11.58 21.78L11.73 21.84H11.81C11.9792 21.8937 12.1608 21.8937 12.33 21.84H12.41L12.56 21.78L20 17.21C20.1441 17.1199 20.2629 16.9946 20.3451 16.8459C20.4274 16.6972 20.4703 16.53 20.47 16.36V7.63002C20.47 7.63002 20.49 7.56002 20.49 7.52002ZM12 4.17002L13.78 5.27002L8.19001 8.73002L6.40001 7.63002L12 4.17002ZM11 19.17L5.50001 15.81V9.42002L11 12.82V19.17ZM12 11.06L10.09 9.91002L15.68 6.44002L17.6 7.63002L12 11.06ZM18.5 15.78L13 19.2V12.82L18.5 9.42002V15.78Z"
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
    const [activeTab, setActiveTab] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
    const location = useLocation();

    useLayoutEffect(()=>{
      getActiveTabName();
    }, [location]);
  
    // Function to get the active tab name based on the URL
    const getActiveTabName = () => {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      let activePathSegment ;
      if (pathSegments.length > 2) {
        activePathSegment = pathSegments[1];
      }else{
        activePathSegment = pathSegments[pathSegments.length - 1];
      }
      console.log(pathSegments.length)
      const activeLink = sidebarLinks.find(link =>
        link.url.includes(activePathSegment)
      );
      setActiveTab(activeLink)
      return activeLink ? activeLink.name : 'Overview';
    };
  
    return (
      <div className="flex h-screen p-4">
        {/* Sidebar */}
        <aside
          className={`bg-regal-auth-bg-color text-white w-52 flex-shrink-0 md:block ${
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
                {sidebarLinks.map((link) => (
                  <li key={link.id} className="relative">
                    <Link
                      to={link.url}
                      className={`flex items-center text-xs gap-4 py-2 pr-2 transition-colors relative group ${
                        activeTab?.name.toLowerCase() === link?.name.toLowerCase()
                          ? "text-black font-bold " // Active styles
                          : "text-gray-400 hover:text-black hover:font-bold" // Inactive styles
                      }`}
                    >
                      <span className={`text-xl group-hover:text-blue-400`}>
                        {/* Update the SVG icon color based on the active state */}
                        {React.cloneElement(link.icon, {
                          stroke:
                          activeTab?.name.toLowerCase() === link.name.toLowerCase()
                              ? "#3b82f6"
                              : "#8A8C94", // Change color dynamically
                        })}
                      </span>
                      <span>{link.name}</span>
                    </Link>
  
                    {/* Active Indicator using ::after */}
                    { activeTab?.name.toLowerCase() === link?.name.toLowerCase() && (
                      <span className="absolute right-0 top-0 bottom-0 w-1 rounded bg-blue-500 after:block after:h-full after:content-['']"></span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
  
        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
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
            <div className='bg-white p-4 rounded-xl'>
              <div className='flex flex-row items-center justify-between'>
                <h5 className='text-regal-blue text-xl md:text-3xl font-[700]'>
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
              className="bg-regal-auth-bg-color  rounded-full text-sm pl-11 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px] font-[500]"
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
                      onClick={() => console.log("Logout")}
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
