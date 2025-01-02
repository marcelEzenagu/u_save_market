import React,{ useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ isActive,changeState }) {
  const [active,setActive] = useState(isActive)

  const handleClick =(tab) => {
    setActive(tab)
    changeState(tab)
  }

  return (
    <div className="flex overflow-hidden flex-col pt-4 w-full text-sm font-medium leading-loose text-center text-black bg-white max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between ml-7 max-md:mr-2 max-md:max-w-full">
        <Link to="/">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/b53670262f1d4935bfecfb9f234abb33/e4ac54f97a19e4459e9b4acd771dc03b7ba0c9d1fe3ef3d4d239955e0e34e99f?apiKey=b53670262f1d4935bfecfb9f234abb33&"
            alt="Company Logo"
            className="object-contain shrink-0 max-w-full aspect-[2.92] w-[166px]"
          />
        </Link>


        <div className="flex gap-6 items-center my-auto mr-4">
          <div
            onClick={()=>handleClick("donations")}
            className={`flex gap-2 items-center self-stretch my-auto whitespace-nowrap ${active === 'donations' ? 'text-sky-600' : 'text-gray-600'}`} 
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/b53670262f1d4935bfecfb9f234abb33/c1b592896639c0233c23f7787a41f2d4901ddb065eba7a899605f491330dc50e?apiKey=b53670262f1d4935bfecfb9f234abb33&"
              alt=""
              className={`object-contain shrink-0 self-stretch my-auto w-6 aspect-square `}
            />
            <div className={`self-stretch my-auto `}>Donate</div>
          </div>
        
          <div 
            onClick={()=>handleClick("news")}
            className={`flex gap-2 items-center self-stretch my-auto ${active === 'news' ? 'text-sky-600' : 'text-gray-600'}`}
          >
            <img
              loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/b53670262f1d4935bfecfb9f234abb33/f8d583b06764a0cebe3fafd49d8986dc7db963cca8fa6c9df38053734d846cc9?apiKey=b53670262f1d4935bfecfb9f234abb33&"
              alt=""
              className={`object-contain shrink-0 self-stretch my-auto w-6 aspect-square  ${active === 'news' ? 'text-sky-600' : 'text-gray-600'}`}
            />
            <div className={`self-stretch my-auto `}>News & Feedbacks</div>
          </div>
        </div>
        
      </div>
      <div className="shrink-0 mt-4 h-px bg-gray-200 border border-gray-200 border-solid max-md:max-w-full " />
    </div>
  );
}