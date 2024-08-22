import React from 'react'

function EmptyList({image, header, description}) {
  return (
    <div>  <div className=" p-14  rounded-lg  mx-auto max-w-[500px] text-center">
    <img src={image} alt=""  className="text-center my-3 mx-auto"/>

        <h6 className="text-regal-black text-sm mt-4 mb-6 font-[700]"> 
           {header}
        </h6>
        <p className="text-regal-black text-sm mt-4 mb-6">{description}</p>
      </div></div>
  )
}

export default EmptyList