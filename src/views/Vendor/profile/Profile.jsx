import React, { useState, useEffect } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import { HiOutlineIdentification } from "react-icons/hi2";
import { SlLock } from "react-icons/sl";
import Identification from './Components/Identification'
import ProfileDetails from './Components/ProfileDetails'
import { Outlet, Link, useLocation} from 'react-router-dom';
import Settings from './Components/Settings';
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import PasswordAndSecurity from './Components/PasswordAndSecurity';
const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile-details');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const location = useLocation();
  useEffect(()=>{
    const activeLink = Tabs.filter((e)=> e?.url === location?.pathname)
            if (activeLink.length > 0) {
                setActiveTab(activeLink[0].id)
            }
        }, [location]);

  const Tabs = [
    {
        id: '1',
        name:'profile-details',
        url:'/vendor/profile/profile-details',
        component : <ProfileDetails />,
        icon: <RiUserLine className="text-xl " />
    },
    {
        id: '2',
        name:'identification',
        url:'/vendor/profile/identification',
        component : <Identification />,
        icon: <HiOutlineIdentification  className="text-2xl "/>
    },
    {
        id: '3',
        name:'Password & Security',
        url:'/vendor/profile/password-security',
        component : <PasswordAndSecurity />,
        icon: <SlLock className="text-xl " />
    },
    {
        id: '4',
        name:'performance',
        url:'/vendor/profile/performance',
        component : <Performance />,
        icon: <HiOutlineChartBarSquare  className="text-2xl "/>
    },
    {
        id: '5',
        name:'settings',
        url:'/vendor/profile/settings',
        component : <Settings />,
        icon: <IoSettingsOutline  className="text-xl"/>
    },

  ]

  return (
    <div className="px-4 py-8">
      <h5 className="text-regal-black text-lg md:text-2xl font-[700]">
        Profile
      </h5>

    <div className=" bg-white rounded-lg shadow-sm mt-8 border">
    <div className="flex flex-col md:flex-row">
      <div className="border-b md:border-r border-gray-300 pr-4">
        <ul className="md:space-y-5 flex flex-row md:flex-col  items-center md:items-start overflow-x-scroll md:w-70  p-4 md:p-10 md:min-h-[700px]">
            {Tabs?.map((e) => (
                       <li key={e?.id}>
                       <Link
                       to={e?.url}
                         onClick={() => handleTabClick(e?.id)}
                         className={`flex items-center space-x-3 p-2 text-sm text-left capitalize w-full whitespace-nowrap  ${
                           activeTab === e?.id ? 'text-regal-sky-blue font-semibold' : 'text-regal-light-gray font-[500]'
                         }`}
                       >
                        <div className={`${  activeTab === e?.id ? 'text-regal-sky-blue font-semibold' : 'text-regal-black'}`}>{e?.icon}</div>
                         <span>{e?.name}</span>
                       </Link>
                     </li>
            ))}
   

        </ul>
      </div>
      <div className="w-full col-span-2">
      <Outlet />
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;