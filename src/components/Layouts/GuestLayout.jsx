import React from "react";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
function GuestLayout() {

      return (
        <div>
          <Navigation />
          <section  className="container mx-auto  max-w-[1200px]  py-5   md:flex md:flex-row px-2 md:px-0 md:py-10">
          <Outlet />
          </section>
          <Footer/>
        </div>
      );
}

export default GuestLayout