import React from 'react';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/auth/authSlice';
const VendorDropdown = () => {
  const dispatch = useDispatch();
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center">
        <img
          src="https://via.placeholder.com/150" // Replace with your image URL
          alt="User Avatar"
          className="w-9 h-9 rounded-full object-cover bg-gray-200"
        />
        {/* <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-600" /> */}
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 z-50 bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-1">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/vendor/dashboard/profile/profile-details"
                className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
              >
                Profile Details
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/vendor/dashboard/profile/identification"
                className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
              >
                Identification
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/vendor/dashboard/profile/change-password"
                className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
              >
                Change Password
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/vendor/dashboard/profile/payments"
                className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
              >
                Payments
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/vendor/dashboard/profile/settings"
                className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
              >
                Settings
              </Link>
            )}
          </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  className={`block w-full px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                  onClick={()=>{
                    dispatch(logOut());
                  }}
                  >
                  Logout
                </button>
              )}
            </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default VendorDropdown;
