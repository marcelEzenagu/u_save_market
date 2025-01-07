import React, {useEffect, useState} from 'react'
import AddressIcon from '../../../assets/images/settings/address.png'
import DeleteIcon from '../../../assets/images/settings/delete.png'
import NotificationIcon from '../../../assets/images/settings/notification.png'
import PasswordIcons from '../../../assets/images/settings/password.png'
import PaymentIcon from '../../../assets/images/settings/payment.png'
import { Link, useLocation, Outlet } from 'react-router-dom'
function Settings() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(false);
    useEffect(()=>{
        if (location?.pathname !== '/settings') {
            setActiveTab(true);
        }else{
            setActiveTab(false);
        }
    }, [location]);
  return  activeTab ?  <Outlet/> : <DefaultPage/>;
  
}

function DefaultPage () {
    const Links = [
        {
            id:1,
            name:'Address Book',
            image:AddressIcon,
            url:'/settings/address'
        },
        {
            id:2,
            name:'Payment methods',
            image:PaymentIcon,
              url:'/settings/payment-method'
        },
        {
            id:3,
            name:'Notifications',
            image:NotificationIcon,
              url:'/settings/notification'
        }
        ,    {
            id:4,
            name:'change password',
            image:PasswordIcons,
             url:'/settings/change-password'
        }
        ,    {
            id:5,
            name:'Delete Account',
            image:DeleteIcon,
             url:'/settings/delete-account'
        }
    ]
    return  <div className='p-4'>
        <h6 className='text-regal-black text-sm md:text-xl font-bold'>Settings</h6>
         <section className='grid md:grid-cols-2 gap-4'>
             {Links?.map((e,i) => (
                    <div className="rounded-md border p-5 mt-3 flex flex-row items-center justify-between animate-fade-in" key={i}
                   
                    >
                     <div className='flex flex-col gap-8'>
                         <h6 className='font-[500] text-regal-black text-xs md:text-sm'>{e.name}</h6>
                         <Link to={`${e.url}`} className='font-[500] text-regal-sky-blue text-xs md:text-sm'>more</Link>
                     </div>
 
                     <img src={e.image} alt="" />
 
                    </div>
             ))}
         </section>
     </div>
}

export default Settings