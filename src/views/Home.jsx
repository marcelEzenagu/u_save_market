import React from "react";
import GridBox from "../components/cards/GridBox";
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
    <h5 className=" md:text-responsive font-[700] text-regal-black">
      African Online Grocery Store for <span className="text-regal-blue">Africans</span> in <span className="text-regal-blue">Diaspora</span>
    </h5>

    <div className="grid md:grid-cols-5 grid-cols-2 gap-3 my-4">
        {list.map((e, i)=> (
           <div
           key={i}
           className={`my-3 relative md:max-w-xs 
           overflow-hidden rounded-[2rem] shadow-lg group h-[150px] animate-fade-in ${list[list.length - 1] === e ? 'col-span-2': ''}  md:col-span-1`}
         >
           <img
             src={e}
             alt=""
             className="transition-transform w-full h-full object-cover group-hover:scale-110 duration-200"
           />
         </div>                                                                                                     
        ))}
    </div>

        <main>
            <GridBox/>
        </main>
    </div>
    </div>
  );
}

export default Home;
