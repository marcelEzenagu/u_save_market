import React, {useState} from 'react'
import RelatedProduct from '../../components/RelatedProduct'
import {Items as ITemsDiv } from '../../data/mockData'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { PiMinus, PiTrash } from "react-icons/pi";
import {numberWithCommas} from '../../utils'
import { IoAddOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import CartImage from '../../assets/images/cart/Empty-cart.webp'
import { useDispatch, useSelector } from 'react-redux';
import { incrementItemInCart, decrementItemInCart, removeItemInCart } from '../../features/cart/cartSlice'; // Adjust import path as needed
import { useUpdateUserCartMutation, useDeleteUserCartItemMutation } from '../../features/cart/cartApiSlice'; // Adjust import path as needed

function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Items = useSelector(state => state.cart.items); // Assuming you're using Redux to manage cart state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserCart] = useUpdateUserCartMutation();
  const [deleteUserCartItem] = useDeleteUserCartItemMutation();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleIncrement = async (item) => {
    dispatch(incrementItemInCart(item.id));
    try {
      await updateUserCart(Items.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )).unwrap();
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleDecrement = async (item) => {
    if (item.quantity > 1) {
      dispatch(decrementItemInCart(item.id));
      try {
        await updateUserCart(Items.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )).unwrap();
      } catch (error) {
        console.error('Failed to update cart:', error);
      }
    } else {
      handleRemove(item.id);
    }
  };

  const handleRemove = async (itemId) => {
    dispatch(removeItemInCart(itemId));
    try {
      await deleteUserCartItem(itemId).unwrap();
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
  };

  return (
    <div className='w-full md:p-4'>
      {Items?.length > 0 && (
        <nav>
          <Link to="/" className='flex items-center gap-2 font-[600] text-regal-sky-blue  text-xs md:text-sm'>
            <IoIosArrowRoundBack className='text-regal-black text-sm md:text-xl' />Back to categories
          </Link>
        </nav>
      )}

      <div className='flex flex-row items-center justify-between my-4'>
        <h5 className='text-xl font-[700]'>Cart</h5>
        {Items?.length > 0 && (
          <button
            onClick={toggleModal}
            className='flex flex-row items-center justify-between gap-2 text-xs md:text-sm p-3 font-[600] text-regal-sky-blue bg-regal-secondary-light rounded-md'
          >
            <PiTrash />
            Empty Cart
          </button>
        )}
      </div>

      {Items?.length > 0 ? (
        <div className='mb-5'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-8'>
            <div className="border shadow-sm bg-white md:p-4 rounded-md col-span-2">
              {Items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between md:gap-4 py-8 px-1 md:px-2"
                >
                  <div className='flex items-center gap-3'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="font-[500] max-w-[150px] md:max-w-[300px] text-xs md:text-sm">
                        {item.name}
                      </span>
                      <div className="flex flex-row items-center gap-2 md:gap-4 mt-3 md:mt-5">
                        <h1
                          className='text-regal-light-gray border-b-2 custom-text-line text-xs md:text-sm cursor-pointer'
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </h1>
                        <span className='flex items-center gap-1 text-xs md:text-sm'>
                          <GoHeart className='text-sm md:text-xl text-regal-light-gray' />
                          <h1 className='text-regal-light-gray border-b-2 custom-text-line cursor-pointer'>
                            Save for later
                          </h1>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <button className='active:scale-95' onClick={() => handleDecrement(item)}>
                      {item.quantity > 1 ? <PiMinus /> : <PiTrash />}
                    </button>
                    <span className="text-gray-600">{item.quantity}</span>
                    <button className='active:scale-95' onClick={() => handleIncrement(item)}>
                      <IoAddOutline />
                    </button>
                  </div>
                  <span className="text-regal-black font-[600] text-xs md:text-sm">
                    ₦{numberWithCommas(item.price)}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <div className='flex items-center gap-2 font-[500]  text-xs mb-2 p-4'>
                <Link className='text-regal-sky-blue'>Sign in</Link>
                to proceed to checkout
              </div>
              <div className="border shadow-sm bg-white py-4 rounded-md">
                <h5 className="text-sm text-regal-blue font-[700] px-4">Order Summary</h5>
                <div className='flex flex-row justify-between items-start m-4'>
                  <div>
                    <h6 className='text-sm font-[500] text-regal-black'>Subtotal</h6>
                    <p className='text-xs font-[500] text-regal-light-gray'>{Items.length} items</p>
                  </div>
                  <p className='text-sm font-[600] text-regal-black'>₦{numberWithCommas(Items.reduce((acc, item) => acc + item.price * item.quantity, 0))}</p>
                </div>
                <div className='flex flex-row justify-between items-start m-4'>
                  <div>
                    <h6 className='text-sm font-[500] text-regal-black'>Estimated Shipping</h6>
                    <p className='text-xs font-[500] text-regal-light-gray'>4 items</p>
                  </div>
                  <p className='text-sm font-[600] text-regal-black'>₦22,000.00</p>
                </div>
                <div className='flex flex-row justify-between items-start py-4 border-t'>
                  <div className='px-4'>
                    <h6 className='text-sm font-[500] text-regal-black'>Est.Total</h6>
                  </div>
                  <p className='text-lg font-[600] text-regal-black px-4'>₦{numberWithCommas(Items.reduce((acc, item) => acc + item.price * item.quantity, 22000))}</p>
                </div>
                <div className='p-4 w-full'>
                  <button
                    onClick={() => { navigate('/checkout'); }}
                    className="text-xs md:text-sm bg-regal-sky-blue text-white px-4 py-3 font-semibold w-full rounded-md hover:bg-blue-600"
                  >
                    Go to payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="max-w-[400px] w-full p-8 rounded-lg text-center">
            <img
              src={CartImage}
              alt="Empty Cart"
              className="mx-auto mb-6 h-[150px] object-contain"
            />
            <h2 className="text-sm md:text-lg font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6 text-xs md:text-sm">
              Products you order will appear here.
            </p>
            <button
              onClick={() => { navigate('/'); }}
              className="text-xs md:text-sm bg-blue-600 text-white px-6 py-3 w-full rounded-sm hover:bg-blue-900 transition"
            >
              Back to home
            </button>
          </div>
        </div>
      )}

      <RelatedProduct Items={ITemsDiv} className='mt-10' cols={'5'} />
    </div>
  );
}


export default Cart