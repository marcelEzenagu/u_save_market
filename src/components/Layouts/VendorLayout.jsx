import React from 'react'
import { Outlet } from 'react-router-dom'
import VendorNavigation from '../Navigation/VendorNavigation'
import LoadingScreen from '../Loading/LoadingScreen'
import { useVendorAuth } from '../../hooks/useVendorAuth'
function VendorLayout() {

  const { isLoading, isAuthenticated } = useVendorAuth();

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