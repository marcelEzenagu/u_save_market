import { Menu } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../features/auth/authSlice";
function UserDropdown() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser);
  const handleLogout = () => {
    console.log('emeka')
    dispatch(logOut())
    navigate('/')
  }
  return (
    <Menu as="button" className="relative ">
      <Menu.Button className="flex items-center space-x-3  focus:outline-none ">
        <div className="md:w-8 md:h-8 flex flex-col items-center justify-center rounded-full border border-regal-sky-blue">
          <img
            className="w-7 md:h-7 rounded-full "
            src={user?.profilePicture || 'https://as2.ftcdn.net/jpg/02/15/84/43/160_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'}
            alt="User Profile"
          />
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <span className="hover:text-regal-blue text-sm xl:text-sm text-regal-black cursor-pointer font-[500] w-[50px] truncate whitespace-nowrap capitalize">
            {user?.firstName}
          </span>
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.9996 8.00003C7.41627 8.00003 6.83294 7.77503 6.39127 7.33337L0.957938 1.90003C0.716271 1.65837 0.716271 1.25837 0.957938 1.0167C1.1996 0.775033 1.5996 0.775033 1.84127 1.0167L7.2746 6.45003C7.6746 6.85003 8.3246 6.85003 8.7246 6.45003L14.1579 1.0167C14.3996 0.775033 14.7996 0.775033 15.0413 1.0167C15.2829 1.25837 15.2829 1.65837 15.0413 1.90003L9.60794 7.33337C9.16627 7.77503 8.58294 8.00003 7.9996 8.00003Z"
              fill="#171717"
            />
          </svg>
        </div>
      </Menu.Button>
      <Menu.Items className="absolute right-[-15px] lg:right-0 mt-4 h-[87vh] lg:h-auto w-[100vw] lg:w-80 origin-top-right animated fadeInDown bg-white border lg:rounded-md lg:shadow-lg focus:outline-none">
        <div className="p-4 flex flex-row justify-between items-center space-x-4">
          <div className="text-start">
            <Link to="/account" className="text-xl text-start text-regal-blue font-[700]  w-[150px] truncate whitespace-nowrap capitalize">
              {user?.firstName} {user?.lastName}
            </Link>
            <p className="text-xs text-gray-500 text-start">{user.email}</p>
          </div>

          <div className="md:w-11 md:h-11 flex flex-col items-center justify-center rounded-full border border-regal-sky-blue">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.profilePicture || 'https://as2.ftcdn.net/jpg/02/15/84/43/160_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'}
              alt="User Profile"
            />
          </div>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/orders"
                className={`flex items-center px-4 py-2 text-sm font-[600] ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <div className="mr-2 ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z"
                      fill="#262729"
                    />
                    <path
                      d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19ZM11.5 17.75H7.5C7.09 17.75 6.75 17.41 6.75 17C6.75 16.59 7.09 16.25 7.5 16.25H11.5C11.91 16.25 12.25 16.59 12.25 17C12.25 17.41 11.91 17.75 11.5 17.75ZM13.5 13.75H7.5C7.09 13.75 6.75 13.41 6.75 13C6.75 12.59 7.09 12.25 7.5 12.25H13.5C13.91 12.25 14.25 12.59 14.25 13C14.25 13.41 13.91 13.75 13.5 13.75Z"
                      fill="#262729"
                    />
                  </svg>
                </div>
                My Orders
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/saved-items"
                className={`flex items-center px-4 py-3 text-sm  font-[600] ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <div className="mr-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z"
                      fill="#262729"
                    />
                  </svg>
                </div>
                Saved Items
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/buy-again"
                className={`flex items-center px-4 py-3 text-sm  font-[600] ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <div className="mr-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.43 5.43V6.77C10.81 6.98 9.32 8.66 9.32 11.43V16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10C12.29 2 13.43 3.14 13.43 5.43Z"
                      fill="#262729"
                    />
                    <path
                      d="M18.5699 8H13.9999C11.7099 8 10.5699 9.14 10.5699 11.43V18.57C10.5699 20.86 11.7099 22 13.9999 22H18.5699C20.8599 22 21.9999 20.86 21.9999 18.57V11.43C21.9999 9.14 20.8599 8 18.5699 8ZM18.1299 15.75H17.2499V16.63C17.2499 17.04 16.9099 17.38 16.4999 17.38C16.0899 17.38 15.7499 17.04 15.7499 16.63V15.75H14.8699C14.4599 15.75 14.1199 15.41 14.1199 15C14.1199 14.59 14.4599 14.25 14.8699 14.25H15.7499V13.37C15.7499 12.96 16.0899 12.62 16.4999 12.62C16.9099 12.62 17.2499 12.96 17.2499 13.37V14.25H18.1299C18.5399 14.25 18.8799 14.59 18.8799 15C18.8799 15.41 18.5399 15.75 18.1299 15.75Z"
                      fill="#262729"
                    />
                  </svg>
                </div>
                Buy again
              </Link>
            )}
          </Menu.Item>
        </div>
        <div className=" py-2 border-t border-b border-gray-200">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/settings"
                className={`flex items-center px-4 py-3 text-sm  font-[600] ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <div className="mr-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1 9.21994C18.29 9.21994 17.55 7.93994 18.45 6.36994C18.97 5.45994 18.66 4.29994 17.75 3.77994L16.02 2.78994C15.23 2.31994 14.21 2.59994 13.74 3.38994L13.63 3.57994C12.73 5.14994 11.25 5.14994 10.34 3.57994L10.23 3.38994C9.78 2.59994 8.76 2.31994 7.97 2.78994L6.24 3.77994C5.33 4.29994 5.02 5.46994 5.54 6.37994C6.45 7.93994 5.71 9.21994 3.9 9.21994C2.86 9.21994 2 10.0699 2 11.1199V12.8799C2 13.9199 2.85 14.7799 3.9 14.7799C5.71 14.7799 6.45 16.0599 5.54 17.6299C5.02 18.5399 5.33 19.6999 6.24 20.2199L7.97 21.2099C8.76 21.6799 9.78 21.3999 10.25 20.6099L10.36 20.4199C11.26 18.8499 12.74 18.8499 13.65 20.4199L13.76 20.6099C14.23 21.3999 15.25 21.6799 16.04 21.2099L17.77 20.2199C18.68 19.6999 18.99 18.5299 18.47 17.6299C17.56 16.0599 18.3 14.7799 20.11 14.7799C21.15 14.7799 22.01 13.9299 22.01 12.8799V11.1199C22 10.0799 21.15 9.21994 20.1 9.21994ZM12 15.2499C10.21 15.2499 8.75 13.7899 8.75 11.9999C8.75 10.2099 10.21 8.74994 12 8.74994C13.79 8.74994 15.25 10.2099 15.25 11.9999C15.25 13.7899 13.79 15.2499 12 15.2499Z"
                      fill="#262729"
                    />
                  </svg>
                </div>
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="account"
                className={`flex items-center px-4 py-3 text-sm  font-[600] ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <div className="mr-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 2.43018H7C4 2.43018 2 4.43018 2 7.43018V13.4302C2 16.4302 4 18.4302 7 18.4302V20.5602C7 21.3602 7.89 21.8402 8.55 21.3902L13 18.4302H17C20 18.4302 22 16.4302 22 13.4302V7.43018C22 4.43018 20 2.43018 17 2.43018ZM12 14.6002C11.58 14.6002 11.25 14.2602 11.25 13.8502C11.25 13.4402 11.58 13.1002 12 13.1002C12.42 13.1002 12.75 13.4402 12.75 13.8502C12.75 14.2602 12.42 14.6002 12 14.6002ZM13.26 10.4502C12.87 10.7102 12.75 10.8802 12.75 11.1602V11.3702C12.75 11.7802 12.41 12.1202 12 12.1202C11.59 12.1202 11.25 11.7802 11.25 11.3702V11.1602C11.25 10.0002 12.1 9.43018 12.42 9.21018C12.79 8.96018 12.91 8.79018 12.91 8.53018C12.91 8.03018 12.5 7.62018 12 7.62018C11.5 7.62018 11.09 8.03018 11.09 8.53018C11.09 8.94018 10.75 9.28018 10.34 9.28018C9.93 9.28018 9.59 8.94018 9.59 8.53018C9.59 7.20018 10.67 6.12018 12 6.12018C13.33 6.12018 14.41 7.20018 14.41 8.53018C14.41 9.67018 13.57 10.2402 13.26 10.4502Z"
                      fill="#262729"
                    />
                  </svg>
                </div>
                Help
              </Link>
            )}
          </Menu.Item>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`flex items-center px-4 py-2 text-sm text-red-600`}
                onClick={()=>{
                  handleLogout()
                }}
              >
                <div className="mr-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z"
                      fill="#171717"
                    />
                    <path
                      d="M4.56043 11.2498L6.63043 9.17984C6.78043 9.02984 6.85043 8.83984 6.85043 8.64984C6.85043 8.45984 6.78043 8.25984 6.63043 8.11984C6.34043 7.82984 5.86043 7.82984 5.57043 8.11984L2.22043 11.4698C1.93043 11.7598 1.93043 12.2398 2.22043 12.5298L5.57043 15.8798C5.86043 16.1698 6.34043 16.1698 6.63043 15.8798C6.92043 15.5898 6.92043 15.1098 6.63043 14.8198L4.56043 12.7498H9.00043V11.2498H4.56043Z"
                      fill="#171717"
                    />
                  </svg>
                </div>
                Logout
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default UserDropdown;
