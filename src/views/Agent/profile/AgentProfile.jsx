import React, { useState, useEffect } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import { HiOutlineIdentification } from "react-icons/hi2";
import { SlLock } from "react-icons/sl";
import Identification from './Components/Identification'
import ProfileDetails from './Components/ProfileDetails'
import { Outlet, Link, useLocation,useNavigate} from 'react-router-dom';
import Settings from './Components/Settings';
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import PasswordAndSecurity from './Components/PasswordAndSecurity';
const AgentProfile = () => {
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

        const navigate = useNavigate();

      const showComponent = (componentPath) => {
        // Load the component dynamically
        navigate(componentPath, { replace: true }); // Change the component without adding to browser history
      };
        
  const Tabs = [
    {
        id: '1',
        name:'profile-details',
        url:'/agent/profile/profile-details',
        component : <ProfileDetails />,
        icon: <RiUserLine className="text-xl " />
    },
    // {
    //     id: '2',
    //     name:'identification',
    //     url:'/agent/profile/identification',
    //     component : <Identification />,
    //     icon: <HiOutlineIdentification  className="text-2xl "/>
    // },
    {
        id: '3',
        name:'Password & Security',
        url:'/agent/profile/password-security',
        component : <PasswordAndSecurity />,
        icon: <SlLock className="text-xl " />
    },
   
    {
        id: '5',
        name:'settings',
        url:'/agent/profile/settings',
        component : <Settings />,
        icon: <IoSettingsOutline  className="text-xl"/>
    },

  ]

  return (
    <div className="px-4 py-8">
      <h5 className="text-regal-black text-lg md:text-2xl font-[700]">
        Profile
      </h5>

      <div className=" bg-white rounded-lg shadow-sm  border">
        <div className="flex flex-col">
          <ul className="flex flex-row  items-center md:items-start overflow-x-scroll md:w-70   md:p-10">
              {Tabs?.map((e) => (
                        <li key={e?.id}>
                        <Link
                        to={e?.url}
                          onClick={() => handleTabClick(e?.name)}
                          className={`flex items-center space-x-3 p-3 text-sm text-left capitalize w-full whitespace-nowrap  ${
                            activeTab === e?.id ? 'text-regal-sky-blue font-semibold' : 'text-regal-light-gray font-[500]'
                          }`}
                        >
                          <div className='flex flex-col items-center'>
                            {/* <div className={`${  activeTab === e?.id ? 'text-regal-sky-blue font-semibold' : 'text-regal-black'}  text-sm`}>{e?.icon}</div> */}
                            <span>{e?.name}</span>
                          </div>
                        </Link>
                      </li>
              ))}
    

          </ul>
        </div>

        {/* {activeTab && */}

          <div className="w-full col-span-2 px-4">
          <Outlet />
          </div>
        </div>
    </div>
  );
};

export default AgentProfile;