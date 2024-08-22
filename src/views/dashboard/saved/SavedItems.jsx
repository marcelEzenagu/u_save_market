import React from 'react'
import EmptyBag from '../../../assets/images/account/empty.png'
import { Items } from '../../../data/mockData'
import SaveCard from '../../../components/cards/SavedCard'
function SavedItems() {
  return (
    <div className='p-4'>
       <h6 className='text-regal-black text-sm md:text-xl font-bold'>Saved Items</h6>
            {Items.length > 0 ? 
            (
                <div className='grid grid-cols-2 md:grid-cols-5'>
                    {Items.map((e)=> (
                        <SaveCard item={e}/>
                    ))}
                </div>
            ): 
            (
                <div className=" p-14   rounded-lg mx-auto max-w-[400px] text-center">
                <img src={EmptyBag} alt=""  className="text-center my-3 mx-auto"/>
        
                    <h6 className="text-regal-black text-sm mt-4 mb-6 font-[700]"> 
                      No saved items yet
                    </h6>
                    {/* Buttons in flex-col with gap */}
                    <div className="flex flex-col gap-4  mx-auto">
                      <Link
                      to="/products"
                        className="bg-regal-sky-blue text-white py-3 rounded-md hover:bg-blue-900 transition font-[600]  text-xs md:text-sm"
                      >
                        Start Shopping
                      </Link>
                      <Link
                       to="/saved-items"
                        className=" text-regal-sky-blue py-3 border-2 border-body-color-gray  rounded-md hover:border-regal-sky-blue transition font-[600] text-xs md:text-sm"
                      >
                        Go To Saved Items
                      </Link>
                    </div>
                  </div>
            )}
    </div>
  )
}

export default SavedItems