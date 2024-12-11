import React,{useState,useMemo} from "react";
import AmountSelector from "./AmountSelector";
import DonationSteps from "./DonationSteps";

export default function DonationForm() {


  const steps = useMemo(()=> [
    { id: "amount", label: "Amount",
      component: <AmountForm/> 
      
    },
    { id: "personal", label: "Personal Info" ,
      
      component: <UserForm/> 
      
    },
    { id: "payment", label: "Payments",
      component: <PaymentForm/> 


     }
  ])

  return (
    <div className="flex flex-col items-start mt-1.5 w-full text-sm font-semibold max-md:mt-10 max-md:max-w-full">
      <DonationSteps steps={steps} />
      <div className="flex shrink-0 self-stretch w-full h-1 bg-gray-200 rounded" />
      
    
    </div>
  );

  function AmountForm(){
    return (
      <div className="flex flex-col mt-11 max-w-full leading-none w-[670px] max-md:mt-10">
        <AmountSelector />

      <div className="flex flex-col mt-6 w-full whitespace-nowrap max-md:max-w-full">
            <label htmlFor="customAmount" className="self-start text-black">Amount</label>
            <div className="overflow-hidden gap-2.5 self-stretch px-4 py-5 mt-2.5 rounded-lg border border-gray-200 border-solid shadow-lg min-h-[56px]">
              <input
                type="number"
                id="customAmount"
                placeholder="$"
                className="w-full text-neutral-300 bg-transparent border-none outline-none"
                aria-label="Enter custom donation amount"
              />
            </div>
          </div>
          <div className="flex flex-col pb-4 mt-6 w-full max-md:max-w-full">
            <label htmlFor="frequency" className="self-start text-black">Donation Frequency</label>
            <select
              id="frequency"
              className="overflow-hidden gap-2.5 self-stretch px-4 py-5 mt-2.5 whitespace-nowrap rounded-lg border border-gray-200 border-solid shadow-lg min-h-[56px] text-zinc-500"
              aria-label="Select donation frequency"
            >
              <option value="">Select</option>
              <option value="one-off">One-Off</option>
              <option value="weekly">Weekly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
      </div>
    )
  }
}





function UserForm() {
  return (
    <div className="flex flex-col mt-11 max-w-full leading-none w-[670px] max-md:mt-10">

    <form className="flex flex-col text-sm leading-none max-w-[625px]">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-7 w-full max-md:max-w-full">
            <FormInput label="First Name" placeholder="Enter first name" />
            <FormInput 
              label="Last Name" 
              placeholder="Enter last name" 
              className="z-10 max-md:mr-0"
            />
          </div>
          
          <FormInput 
            label="Email" 
            placeholder="Enter Email"
            className="mt-6 w-full max-md:max-w-full" 
          />
          
          <FormInput 
            label="Address" 
            placeholder="Enter address"
            className="mt-6 w-full max-md:max-w-full" 
          />

          <div className="flex flex-wrap gap-7 mt-6 w-full whitespace-nowrap max-md:max-w-full">
            <SelectInput label="City" />
            <SelectInput label="State/Region" className="z-10 max-md:mr-0" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center self-start mt-8 text-black">
        <input
          type="checkbox"
          id="anonymous"
          className="w-6 h-6"
          aria-label="Make donation anonymous"
        />
        <label htmlFor="anonymous" className="self-stretch my-auto rounded-none w-[222px]">
          Make this donation anonymous
        </label>
      </div>
    </form>
    </div>
  );
}


 function SelectInput({ label, className = "" }) {
  return (
    <div className={`flex flex-col flex-1 grow shrink-0 basis-0 w-fit ${className}`}>
      <label className="self-start text-black">{label}</label>
      <div className="flex overflow-hidden gap-10 justify-between items-center p-4 mt-2.5 rounded-lg border border-gray-200 border-solid shadow-lg min-h-[56px] text-zinc-500">
        <select 
          className="w-full bg-transparent border-none outline-none"
          aria-label={label}
        >
          <option value="">Select</option>
        </select>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/b53670262f1d4935bfecfb9f234abb33/f8ca57a426f289fcc3c6421b0976a50a9ca20983df8bb5a2d76bd430e5991e7b?apiKey=b53670262f1d4935bfecfb9f234abb33&"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
      </div>
    </div>
  );
}


 function FormInput({ label, placeholder, className = "" }) {
  return (
    <div className={`flex flex-col flex-1 grow shrink-0 basis-0 w-fit ${className}`}>
      <label className="self-start text-black">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="overflow-hidden gap-2.5 self-stretch px-4 py-5 mt-2.5 rounded-lg border border-gray-200 border-solid shadow-lg min-h-[56px] text-neutral-300"
        aria-label={label}
      />
    </div>
  );
}


function PaymentForm() {
  const fields = [
    {
      label: "Card Number",
      placeholder: "0000 0000 0000 0000",
      type: "text",
      id: "cardNumber",
      inputMode: "numeric",
      pattern: "[0-9\s]{13,19}",
      maxLength: 19,
      autoComplete: "cc-number"
    },
    {
      label: "Expiry Date",
      placeholder: "MM/YY",
      type: "text",
      id: "expiryDate",
      inputMode: "numeric",
      pattern: "(0[1-9]|1[0-2])\/([0-9]{2})",
      maxLength: 5,
      autoComplete: "cc-exp"
    },
    {
      label: "CVC",
      placeholder: "CVC",
      type: "text",
      id: "cvc",
      inputMode: "numeric",
      pattern: "[0-9]{3,4}",
      maxLength: 4,
      autoComplete: "cc-csc"
    }
  ];

  return (
    <div className="flex flex-col mt-11 max-w-full leading-none w-[670px] max-md:mt-10">
      <form className="flex flex-col text-sm leading-none max-w-[625px]">
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <CardField {...fields[0]} />
          </div>
          <div className="flex flex-wrap gap-7 mt-6 w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
              <CardField {...fields[1]} />
            </div>
            <div className="flex flex-col flex-1 grow shrink-0 whitespace-nowrap basis-0 w-fit">
              <CardField {...fields[2]} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


 function CardField({ label, placeholder, type, id, inputMode, pattern, maxLength, autoComplete }) {
  return (
    <>
      <label htmlFor={id} className="self-start text-black">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className="overflow-hidden gap-2.5 self-stretch px-4 py-5 mt-2.5 rounded-lg border border-gray-200 border-solid shadow-lg min-h-[56px] text-neutral-300"
        aria-label={label}
      />
    </>
  );
}
