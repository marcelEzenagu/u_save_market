import React from 'react'
import PaymentSuccess from '../../../assets/images/payment/success.png'
import Logo from "../../../assets/images/nav/logo.webp";
import {  Link, useNavigate } from 'react-router-dom'

function RegistrationSuccessful() {
   const navigate = useNavigate()
  return (
    <div className=''>
        <nav className='p-4'>
        <Link to="/">
              <img
                src={Logo}
                alt=""
                className=" w-[100px] md:w-[140px] lg:w-[150px]"
              />
            </Link>
        </nav>
    {/* <Navigation /> */}
    <section className='border  rounded-lg  mt-14 max-w-[1200px] mx-auto h-[600px] flex flex-col  items-center justify-center'>
    <div className=" flex flex-col  items-center justify-center  px-4  rounded-lg mx-auto max-w-[420px] text-center ">
      <img src={PaymentSuccess} alt=""  className="text-center my-3 mx-auto"/>
          <h2 className="text-xl font-bold mb-2">Verification Pending!</h2>
          <h6 className="text-regal-black text-sm mt-4 mb-6"> 
          Your documents have been received successfully!
          </h6>
          {/* Buttons in flex-col with gap */}
          <div className="flex flex-col gap-4   mx-auto bg-regal-sky-blue text-white py-2 px-14 rounded-md hover:bg-blue-900 transition font-[600]  text-xs md:text-sm"
            onClick={()=>navigate("/vendor/home")}
           >
             Proceed
            {/* </Link> */}

          </div>
        </div>
        </section>
  </div>
  )
}

export default RegistrationSuccessful