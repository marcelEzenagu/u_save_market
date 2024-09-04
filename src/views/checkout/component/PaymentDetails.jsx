import React from "react";
import Card from '../../../assets/images/checkout/card.png'
function PaymentDetails(props) {
  return (
    <div>
      <hr className="mt-5" />
      <div className="px-4  md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-3">
        <h1 className="text-[16px] font-[600] text-regal-black">
          Pay with card
        </h1>
        <div className="mb-1 col-span-2 ">
          <label
            htmlFor="cardHolderName"
            className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
          >
            Cardholder Name
          </label>
          <input
            type="text"
            name="cardHolderName"
            value={props.data?.cardHolderName}
            onChange={props.handleChange}
            id="text"
            placeholder="Enter name"
            className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
          required
          />
        </div>
        <div className="mb-1  col-span-2 ">
          <label
            htmlFor="cardNumber"
            className="block text-xs md:text-sm  font-[600]  leading-6 mb-2 text-regal-black"
          >
            Card Number
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* <spanclassName="text-gray-500 sm:text-sm">$</span> */}
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
                <img src={Card} alt="" className="w-28" />
            </div>
            <input
              type="text"
              name="cardNumber"
              id="card"
              value={props.data?.cardNumber}
              onChange={props.handleChange}
              className="w-full p-3 text-xs md:text-sm border rounded-sm bg-transparent text-regal-crum-gray focus:outline-none"
              placeholder="0000 0000 0000 0000"
              required
            />
          </div>
        </div>
        <div className="mb-1 ">
          <label
            htmlFor="expiry"
            className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
          >
            Expiry
          </label>
          <input
            type="text"
            name="expiry"
            id="expiry"
            value={props.data?.expiry}
            onChange={props.handleChange}
            placeholder="MM/YY"
            className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
            required
          />
        </div>
        <div className="mb-1 ">
          <label
            htmlFor="cvv"
            className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
          >
            CVV
          </label>
          <input
            type="text"
            name="cvv"
            value={props.data?.cvv}
            onChange={props.handleChange}
            id="cvv"
            placeholder="123"
            className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
            required
         />
        </div>
      </div>
      <div className="flex items-center my-4">
        <input type="checkbox" id="checkbox" name="checkbox" />
        <label
          htmlFor="checkbox"
          className=" text-xs  font-[500]  leading-6 mx-2 text-regal-black"
        >
          Set as default
        </label>
      </div>
      <div className="w-full mb-14">
        <button
        type="button"
        className="py-3 px-10 float-end text-xs md:text-sm active:scale-95 font-[500] text-white rounded-md bg-regal-sky-blue">
          Save and Continue
        </button>
      </div>
    </div>
    </div>
  );
}

export default PaymentDetails;
