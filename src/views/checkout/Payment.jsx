import React from "react";
import Footer from "../../components/Footer/Footer";
import CategoryList from "../../components/cards/CategoryList";
import Navigation from "../../components/Navigation/Navigation";
import PaymentSuccess from '../../assets/images/payment/success.png'
function Payment() {
  return (
    <div>
      <Navigation />
      <div className=" p-14   rounded-lg mx-auto max-w-[400px] text-center">
        <img src={PaymentSuccess} alt=""  className="text-center my-3 mx-auto"/>
            <h2 className="text-xl font-bold mb-2">Payment Successful</h2>
            <p className="text-regal-black text-sm mt-4 mb-1">Thank you for making a purchase with Usavemarket.</p>
            
            <h6 className="text-regal-black text-sm mt-4 mb-6"> 
                Order ID <span className="font-[700]">90785608</span>
            </h6>
            {/* Buttons in flex-col with gap */}
            <div className="flex flex-col gap-4  mx-auto">
              <button
                className="bg-regal-sky-blue text-white py-3 rounded-md hover:bg-blue-900 transition font-[600]  text-xs md:text-sm"
              >
                Back to Home
              </button>
              <button
               
                className=" text-regal-sky-blue py-3 border-2 border-body-color-gray  rounded-md hover:border-regal-sky-blue transition font-[600] text-xs md:text-sm"
              >
                Track Order
              </button>
            </div>
          </div>
      <CategoryList />
      <Footer />
    </div>
  );
}

export default Payment;
