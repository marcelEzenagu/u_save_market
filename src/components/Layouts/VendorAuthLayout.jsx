import React from 'react'
import { Outlet } from 'react-router-dom'
function VendorAuthLayout() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default VendorAuthLayout