import React, { useLayoutEffect } from 'react';
import { getSecureCookie, validateToken } from '../../utils'; 
import { Outlet, Navigate } from 'react-router-dom';

function VendorAuthLayout() {
  const userToken = getSecureCookie("accessToken");
  if (userToken && validateToken(userToken)) {
  return  <Navigate to='/vendor/home'/>
  }
  return (
    <div>
     
      {!userToken || !validateToken(userToken) ? <Outlet /> : ''}
    </div>
  );
}

export default VendorAuthLayout;
