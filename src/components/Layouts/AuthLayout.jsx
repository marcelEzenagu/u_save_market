import React from 'react'
import { Outlet} from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import AuthSidebar from '../Sidebar/AuthSidebar'
import Footer from '../Footer/Footer'
import LoadingScreen from '../Loading/LoadingScreen'
import { useAuth } from '../../hooks/useAuth'
function AuthLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading || !isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Navigation />
      <div className="container mx-auto max-w-[1200px] py-5 md:flex md:flex-row px-2 md:px-0 md:py-10">
        <div className="w-full bg-white rounded-sm shadow-sm flex flex-col md:flex-row md:p-4">
          <div>
            <AuthSidebar />
          </div>
          <div className="w-full col-span-2 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default AuthLayout