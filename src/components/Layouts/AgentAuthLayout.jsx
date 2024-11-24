import React, { useLayoutEffect } from 'react';
import { getSecureCookie, validateToken } from '../../utils'; 
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AgentAuthLayout() {
  const userToken = getSecureCookie("accessToken");
  const user = useSelector((state) => state.auth?.user);

  if (user?.isVerified && userToken && validateToken(userToken)) {
  return  <Navigate to='/agent/overview'/>
  }
  return (
    <div>
     
      {/* {!userToken || !validateToken(userToken) ? 
      : ''} */}
      <Outlet /> 
    </div>
  );
}

export default AgentAuthLayout;
