import React from "react";
import PaymentCancel from "../../assets/images/order/cancel.png";
function PaymentError() {
  return (
    <div>
      <Navigation />

        <div className="p-14 rounded-lg mx-auto max-w-[400px] text-center">
          <img src={PaymentCancel} alt="Payment Cancelled" className="text-center my-3 mx-auto" />
          <h2 className="text-xl font-bold mb-2">Error Making Payment</h2>
          <p className="text-regal-black text-sm mt-4 mb-1">Something went wrong durring the payment </p>
        </div>
      <CategoryList />
      <Footer />
    </div>
  );
}

export default PaymentError;
