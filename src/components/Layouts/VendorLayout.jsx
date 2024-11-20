import React, { useLayoutEffect,useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import VendorNavigation from '../Navigation/VendorNavigation'
import LoadingScreen from '../Loading/LoadingScreen'
import { useVendorAuth } from '../../hooks/useVendorAuth'
import { useSelector } from 'react-redux'
function VendorLayout() {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useVendorAuth();

  
  const user = useSelector((state) => state.auth?.user);

  // useEffect(()=>{
    
    // },[])
  useLayoutEffect(()=>{
    if(user ){
      if(!user.hasAcknowleged){
        return navigate("/vendor/registration")
      }
      if(!user.isVerified){
      return  navigate("/vendor/home")
      }
     
    }
  },[user,navigate])


  if (isLoading || !isAuthenticated) {
    return <LoadingScreen />;
  }
  return (
    <div>
        <VendorNavigation/>
        <div className='max-w-[1366px] mx-auto'>
        <Outlet/>
        </div>
    </div>
  )
}

export default VendorLayout