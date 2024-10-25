import React from 'react';
import { getSecureCookie, validateToken } from '../../utils'; 
import { Outlet, Navigate } from 'react-router-dom';

function AdminAuthLayout() {
  const userToken = getSecureCookie("accessToken")
  const role = getSecureCookie("role")

  if (userToken && validateToken(userToken) && role=== "admin") {
      return  <Navigate to='/admin/overview'/>
    }

  return (
    <div>
      {(!userToken || !validateToken(userToken) || role !== "admin"  )? <Outlet /> : ''}
    </div>
  );
}

export default AdminAuthLayout;
