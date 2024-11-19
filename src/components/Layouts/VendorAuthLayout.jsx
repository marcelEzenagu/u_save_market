import React, { useLayoutEffect } from 'react';
import { getSecureCookie, validateToken } from '../../utils'; 
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function VendorAuthLayout() {
  const userToken = getSecureCookie("accessToken");
  const user = useSelector((state) => state.auth?.user);
console.log("user====",user)
  // if (userToken && validateToken(userToken) && user != null && user.isEmailVerified) {
  if (user != null && userToken && validateToken(userToken))  {
  return  <Navigate to='/vendor/home'/>
}
// else if(!user?.isEmailVerified){
//     return  <Navigate to='/vendor/registration'/>
//   }
  return (
    <div>
     
      { <Outlet /> }
      {/* {!userToken || !validateToken(userToken) ? <Outlet /> : ''} */}
    </div>
  );
}

export default VendorAuthLayout;
