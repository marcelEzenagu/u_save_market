import React from "react";
import Navigation from "../Navigation/Navigation";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Like from '../../assets/images/Default/icons/like.webp'
import New from '../../assets/images/Default/icons/new.webp'
import Price from '../../assets/images/Default/icons/price.webp'
import Best from '../../assets/images/Default/icons/best.webp'
import Footer from "../Footer/Footer";
function DefaultLayout() {

  const data = [
    {
      id:'1',
      name:'Recommended',
      image: Like
    },
    {
      id:'2',
      name:'Bestsellers',
      image: Best
    },
    {
      id:'3',
      name:'New arrivals',
      image: New
    },
    {
      id:'4',
      name:'  Deals ',
      image: Price
    }
  ]
  return (
    <div>
      <Navigation />
      <div className="w-full py-3 px-1 md:px-4 border-b-[1px] bg-white">
        <div className="max-w-[1200px] flex flex-row items-center gap-2 md:gap-8 mx-auto  md:px-4 ">
          {data && data.map((e,i)=> (
                     <Link  to={`/products?name=${e.name?.toLowerCase()}`} className="flex flex-row items-center gap-1 md:gap-2 cursor-pointer" key={i}>
                     <img src={e.image} alt="" className="w-5"/>
                     <span className="text-regal-black text-[10px] xs:text-xs md:text-sm capitalize font-[500]  ">
                      {e.name}
                    </span>
                     </Link>
          ))}
        </div>
      </div>
      <section  className="container mx-auto flex-grow max-w-[1200px]  py-5 px-2 md:flex md:flex-row md:py-10">
        <section className="hidden w-[300px] flex-shrink-0 px-4 lg:block">
        <Sidebar />
        </section>
        <section  className="max-w-[1200px]  w-full">
          <Outlet />
        </section>
      </section>
      <Footer/>
    </div>
  );
}

export default DefaultLayout;
