import React from 'react'

function OrderViewSkeleton() {
  return (
    <div className="p-4 animate-pulse">
 <div className="my-5 h-10 bg-gray-200 rounded mb-5"></div> 
    <div className="rounded-md border p-5 mt-4 space-y-2">
    <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-2/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/6"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-24  mb-2"></div>
 
    </div>

    <div className="rounded-md border p-5 mt-4 space-y-4">

    <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-2/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/6"></div>
      </div>

    <div className="h-4 bg-gray-200 rounded w-full"></div>
      {/* <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div> */}
    </div>

    <div className="rounded-md border p-5 mt-4 space-y-4">
    <div className="mt-5  pt-4 flex flex-row gap-4 overflow-x-scroll">
    {[1, 2, 3, 4, 5]?.map((e) => (
          <div className="w-[170px]">
            <div className="w-[170px]">
              {" "}
              <div className="h-32 bg-gray-300 rounded"></div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="h-4 bg-gray-300 rounded w-2/3 "></div>
                <div className="h-3 bg-gray-300 rounded w-2/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
             </div>
    </div>

    <div className="rounded-md border p-5 mt-4 space-y-4">
    {[1,2,3,4,5,6]?.map((e)=>(
            <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-1/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/4"></div>
          </div>
    ))}
    </div>

  </div>
  )
}

export default OrderViewSkeleton