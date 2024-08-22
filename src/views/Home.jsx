import React from "react";
import GridBox from "../components/cards/GridBox";
import { MockData } from "../data/mockData";
function Home() {
  const list = [
    'https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5709271/pexels-photo-5709271.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3987217/pexels-photo-3987217.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];
 
  return (
    <div >
    <div className="w-full">
    <h5 className=" text-responsive font-[700] text-regal-black">
      African Online Grocery Store for <span className="text-regal-blue">Africans</span> in <span className="text-regal-blue">Diaspora</span>
    </h5>
    <div className="">
    <div className="flex flex-row items-center justify-between md:my-4 overflow-x-scroll w-full">
        {list.map((e, i)=> (
          <div>
           <div
           key={i}
           className={`my-3 relative w-[140px] lg:w-[10rem] mr-5 lg:mr-0
           overflow-hidden rounded-[2rem] shadow-lg group h-[150px] animate-fade-in   `}
         >
           <img
             src={e}
             alt=""
             className="transition-transform w-full h-full object-cover group-hover:scale-110 duration-200"
           />
         </div> 
         </div>                                                                                                    
        ))}
    </div>

    <div className="">
      <div className="flex flex-wrap gap-2">
        {MockData.map(category => (
          <Link
          to={`/products?name=${category.name.toLowerCase()}`}
            key={category.id}
            className="flex flex-row items-center p-1 hover:bg-gray-200"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-6 object-cover rounded"
            />
            <span className=" mx-2 text-center text-xs font-bold">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>

    </div>
        <main>
            <GridBox/>
        </main>
    </div>
    </div>
  );
}

export default Home;
