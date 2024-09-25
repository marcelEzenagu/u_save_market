import React from 'react'
import PaymentSuccess from '../../../../assets/images/payment/success.png'
import Logo from "../../../../assets/images/nav/logo.webp";
import {  Link } from 'react-router-dom'

function RegistrationSuccessfulAgent() {
  
  return (
    <div className="animated fadeInDown md:w-[450px] mx-auto">
    <section className=' flex flex-col  items-center justify-center'>
    <div className=" flex flex-col  items-center justify-center  px-4  rounded-lg mx-auto max-w-[420px] text-center ">
      <img src={PaymentSuccess} alt=""  className="text-center my-3 mx-auto"/>
          <h2 className="text-xl font-bold mb-2">Registration Successful!</h2>
          <h6 className="text-regal-black text-sm mt-4 mb-6"> 
          Your documents have been received successfully! A 
              <span className="font-[700]"> one-on-one interview session will be conducted in 2 weeks to complete your verification</span>
          </h6>
          {/* Buttons in flex-col with gap */}
          <div className="flex flex-col gap-4   mx-auto">
            <Link
            to={'/vendor/dashboard/home'}
              className="bg-regal-sky-blue text-white py-2 px-14 rounded-md hover:bg-blue-900 transition font-[600]  text-xs md:text-sm"
           >
             Proceed
            </Link>

          </div>
        </div>
        </section>
  </div>
  )
}

export default RegistrationSuccessfulAgent