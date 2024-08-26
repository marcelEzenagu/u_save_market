import React, {useState} from 'react'
import RelatedProduct from '../../components/RelatedProduct'
import {Items as ITemsDiv } from '../../data/mockData'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { PiTrash } from 'react-icons/pi'
import {numberWithCommas} from '../../utils'
import { IoAddOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import CartImage from '../../assets/images/cart/Empty-cart.webp'
function Cart() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Items, setItems] = useState(ITemsDiv);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
    const navigate = useNavigate();
  return (
    <div className='w-full'>
        {Items?.length > 0 &&
        <nav>
        <Link to="/" className='flex items-center gap-2 font-[600] text-regal-sky-blue  text-xs md:text-sm'><IoIosArrowRoundBack className='text-regal-black text-sm md:text-xl'/>Back to categories</Link>
    </nav>}

    <div className='flex flex-row items-center justify-between my-4'>
        <h5  className='text-xl font-[700]'>Cart</h5>
        {Items?.length > 0 && 
        <button 
        onClick={toggleModal}
        className='flex flex-row items-center 
        justify-between gap-2 text-xs md:text-sm p-3 font-[600]
         text-regal-sky-blue  bg-regal-secondary-light rounded-md
        '>
            <PiTrash />
            Empty Cart
        </button>}
     
    </div>
    {Items?.length > 0  ?  
     <div className='mb-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-8 '>
            <div className=" border shadow-sm bg-white md:p-4 rounded-md col-span-2">
            {Items.length > 0 ? (
              <div>
                {Items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between md:gap-4 py-8 px-1 md:px-2"
                  >
                    {/* Item Image */}
                    <div className='flex items-center gap-3'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="font-[500] max-w-[150px] md:max-w-[300px] text-xs md:text-sm">{item.name}</span>
                      <div className="flex flex-row items-center gap-2 md:gap-4 mt-3 md:mt-5">
                        <h1 className='text-regal-light-gray border-b-2 custom-text-line text-xs md:text-sm'>
                            Remove
                        </h1>
                        <span className='flex items-center gap-1 text-xs md:text-sm'>
                            <GoHeart className='text-sm md:text-xl text-regal-light-gray'/>
                            <h1 className='text-regal-light-gray border-b-2 custom-text-line'>
                            Save for later
                        </h1>
                        </span>
                      </div>
                    </div>
                    </div>
                 
                    {/* Item Details */}
               
                    <div className="flex flex-row items-center gap-2">
                        <button className='active:scale-95 '>{item.quantity > 1 ?   <PiMinus /> :<PiTrash /> }</button>
                    <span className="text-gray-600">1</span>
                    <button  className='active:scale-95'><IoAddOutline/></button>
                    </div>

                    <span className="text-regal-black font-[600] text-xs md:text-sm">₦{numberWithCommas(item.price)}</span>
                  </div>
                ))}
              </div>
            ) : ''} 
            </div>
        <div>
        <div className='flex items-center gap-2 font-[500]  text-xs mb-2 p-4'>
            <Link className='text-regal-sky-blue'>Sign in</Link>
            to proceed to checkout
            </div>
        <div className=" border shadow-sm bg-white py-4 rounded-md ">
            <h5 className="text-sm text-regal-blue font-[700] px-4">Order Summary</h5>
                <div className='flex flex-row justify-between items-start m-4'>
                    <div className=''>
                        <h6 className='text-sm font-[500] text-regal-black'>Subtotal</h6>
                        <p className='text-xs font-[500] text-regal-light-gray'>4 items</p>
                    </div>
                    <p className='text-sm font-[600] text-regal-black'>₦1,585.00</p>
                </div>
                <div className='flex flex-row justify-between items-start m-4'>
                    <div className=''>
                        <h6 className='text-sm font-[500] text-regal-black'>Estimated Shipping</h6>
                        <p className='text-xs font-[500] text-regal-light-gray'>4 items</p>
                    </div>
                    <p className='text-sm font-[600] text-regal-black'>₦22,000.00</p>
                </div>
                <div className='flex flex-row justify-between items-start py-4 border-t'>
                    <div className='px-4'>
                        <h6 className='text-sm font-[500] text-regal-black'>Est.Total</h6>
                    
                    </div>
                    <p className='text-lg font-[600] text-regal-black px-4'>₦23,585.00</p>
                </div>
                <div className='p-4 w-full'>
                <button 
               onClick={()=> {navigate('/checkout')}}
                 className=" text-xs md:text-sm bg-regal-sky-blue text-white px-4  py-3 font-semibold w-full rounded-md hover:bg-blue-600 "
                >Go to payment</button>
                </div>
    
        </div>
        </div>
        </div>
    </div>: 
      <div className="flex justify-center items-center ">
      <div className="max-w-[400px] w-full  p-8 rounded-lg  text-center">
        {/* Cart Image */}
        <img 
          src={CartImage} 
          alt="Empty Cart" 
          className="mx-auto mb-6 h-[150px] object-contain"
        />
        
        {/* Header Text */}
        <h2 className="text-sm md:text-lg font-semibold mb-2">Your cart is empty</h2>

        {/* Subtext */}
        <p className="text-gray-600 mb-6 text-xs md:text-sm">
          Products you order will appear here.
        </p>

        {/* Back to home button */}
        <button
          onClick={() => {
            // Handle navigation back to home
          }}
          className=" text-xs md:text-sm bg-blue-600 text-white px-6 py-3  w-full rounded-sm hover:bg-blue-900 transition"
        >
          Back to home
        </button>
      </div>
    </div>
    }
   
     <RelatedProduct Items={ITemsDiv} cols={'5'} category={''}/>

   
       {/* Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 animated fadeInDown bg-black w-full bg-opacity-75  z-50 flex justify-center items-center">
          <div className="bg-white p-14 rounded-lg shadow-lg w-[400px] text-center">
            <h2 className="text-xl font-bold mb-2">Empty Cart?</h2>
            <p className="text-regal-black text-sm mt-4 mb-6">We’re just double checking</p>
            
            {/* Buttons in flex-col with gap */}
            <div className="flex flex-col gap-4 w-[200px] mx-auto">
              <button
                onClick={() => {
                  // Handle delete action here
                  setItems([]);
                  setIsModalOpen(false);
                }}
                className="bg-regal-sky-blue text-white py-2 rounded-md hover:bg-blue-900 transition active:scale-95 text-xs md:text-sm"
              >
                Delete
              </button>
              <button
                onClick={toggleModal}
                className=" text-regal-sky-blue py-2 border-2 border-white rounded-md hover:border-regal-sky-blue transition active:scale-95 text-xs md:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
     </div>
  )
}

export default Cart