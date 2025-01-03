import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";

function Card({ data }) {
  return (
    <div className="p-2">
      <div className="flex">
        <p className="flex flex-col">
          <p className="flex items-center text-xs">
            <span>
                <MdOutlineCalendarMonth/>
            </span>
            <span className="px-2">{data.createdAt}</span>
          </p>
          <span className="font-bold text-lg">{data.title}</span>
          <span>{data.content}</span>
          <span className="text-blue-500">Read More</span>
          </p >

        <div className="px-3">
          <img src={`${data.image}`} alt={data.title.toLowerCase()} />
        </div>
      </div>
    </div>
  );
}

export default Card;
