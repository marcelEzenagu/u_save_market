import React from 'react'
import { Outlet } from 'react-router-dom'
import VendorNavigation from '../Navigation/VendorNavigation'
function VendorLayout() {
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