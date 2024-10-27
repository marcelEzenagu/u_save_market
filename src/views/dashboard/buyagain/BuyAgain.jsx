import React from 'react'
import EmptyBag from '../../../assets/images/account/emptybag.png'
import { Link, useNavigate } from 'react-router-dom'
import { Items} from '../../../data/mockData'
import ItemsCard from '../../../components/cards/ItemsCard'

function BuyAgain() {
  const Items=[]
    return (
        <div className='p-4'>
           <h6 className='text-regal-black text-sm md:text-xl font-bold'>Buy Again</h6>
                {Items.length > 0 ? 
                (
                    <div >
                        {[1,2,3].map((e)=> (
                            <OrderCard key={e}/>
                        ))}
                    </div>
                ): 
                (
                    <div className=" p-14   rounded-lg mx-auto max-w-[500px] text-center">
                    <img src={EmptyBag} alt=""  className="text-center my-3 mx-auto"/>
            
                        <h6 className="text-regal-black text-sm mt-4 mb-6 font-[700]"> 
                        No purchase history yet
                        </h6>
                        <p className="text-regal-black text-sm mt-4 mb-6">Your purchase history will be saved here to make it easy to browse and repurchase.</p>
                        {/* Buttons in flex-col with gap */}
                        <div className="flex flex-col gap-4 max-w-[250px] mx-auto">
                          <Link
                          to="/products"
                            className="bg-regal-sky-blue text-white py-3 rounded-md hover:bg-blue-900 transition font-[600] text-xs md:text-sm"
                          >
                            Continue Shopping
                          </Link>
                      
                        </div>
                      </div>
                )}
        </div>
      )
}


function OrderCard() {
    const navigate = useNavigate();
    return (
      <>
        <div className="rounded-md border p-5 mt-4">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="">
              <p
                className="text-sm md:text-[16px] text-start flex flex-row items-center  gap-2 text-regal-black font-[700]  capitalize cursor-pointer"
                onClick={() => {
                  navigate(`/orders/view/${"1"}`);
                }}
              >
                ID: 9065379 
              </p>
              <p className="text-xs text-regal-light-gray text-start mt-1">
                No of Items : 8
              </p>
            </div>
            <span className="text-xs md:text-sm text-regal-light-gray">
              Order on: 3rd Aug, 2024
            </span>
          </div>
  
          <div className="mt-5 border-t flex flex-row gap-4 overflow-x-scroll">
            {Items &&
              Items.map((e,indx) => (
                <div className="w-[170px]" key={indx}>
                  <ItemsCard item={e} />
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }

export default BuyAgain