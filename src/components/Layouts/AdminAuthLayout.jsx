import React, { useLayoutEffect } from 'react';
import { getSecureCookie, validateToken } from '../../utils'; 
import { Outlet, Navigate } from 'react-router-dom';

function AdminAuthLayout() {
  const userToken = getSecureCookie("accessToken");
  if (userToken && validateToken(userToken)) {
  return  <Navigate to='/admin/overview'/>
  }
  return (
    <div>
     
      {!userToken || !validateToken(userToken) ? <Outlet /> : ''}
    </div>
  );
}

export default AdminAuthLayout;
