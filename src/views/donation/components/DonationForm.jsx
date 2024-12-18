import React,{useState,useMemo} from "react";
import DonationSteps from "./DonationSteps";

export default function DonationForm() {
  const [data,setData] = useState({
    amount:0,
    isAnonymous:false
  })
  const amounts = [20, 50, 100, 200, 500]
  
  const handleChange =(e)=>{
    const {name, value} = e.target
    console.log("NAME===",name)

    setData(prev => ({
      ...prev,
      [name]:name === "isAnonymous" ? !data.isAnonymous :value
    }))
  }

  const confirm =()=>{
    console.log("DATA===",data)
    let {isAnonymous,firstName,lastName} = data

    if(isAnonymous){
      data.firstName= undefined
      data.lastName = undefined
    }
console.log("lastData",data)
   
  }


  const steps = useMemo(()=> [
    { id: "amount", label: "Amount",
      component: <AmountForm
                  handleChange ={handleChange}
                  data={data}
                  setData={setData}
                  amounts={amounts}
                /> 
      
    },
    { id: "personal", label: "Personal Info" ,
      
      component: <UserForm
      handleChange={handleChange}
      data={data}
      
      /> 
      
    },
    { id: "payment", label: "Payments",
      component: <PaymentForm
      
      /> 


     }
  ])

  return (
    <div className="flex flex-col items-start mt-1.5 w-full text-sm font-semibold max-md:mt-10 max-md:max-w-full">
      <DonationSteps steps={steps}       
        confirm={confirm}
      />
      <div className="flex shrink-0 self-stretch w-full h-1 bg-gray-200 rounded" />
      
    
    </div>
  );

  function AmountForm({ handleChange,amounts,setData,data}){
   const [active, setActive] = useState(false)

    const setAmount =(dataAmount)=>{
      setData({amount:dataAmount},()=>setActive(true))
    }

    return (
      <div className="flex flex-col mt-11 max-w-full leading-none w-[670px] max-md:mt-10">
        <div className="flex gap-5 items-start self-start text-white whitespace-nowrap">
          {amounts?.map((amt) => (
            <div key={amt} className="flex flex-col w-[60px]">
              <button 
                className={`overflow-hidden gap-2.5 self-stretch p-4 hover:bg-gray-300 rounded-lg bg-neutral-400 ${amt==data.amount ?  "bg-gray-700 text-white":"text-gray-700 bg-gray-100 "}`}
                // aria-label={`Donate $${amount}`}
                onClick={()=>setAmount(amt)}
              >
                ${amt}
              </button>
            </div>
          ))}
        </div>
      <div className="flex flex-col mt-6 w-full whitespace-nowrap max-md:max-w-full">
            <label htmlFor="customAmount" className="self-start text-black">Amount($)</label>
            <div className="overflow-hidden gap-2.5 self-stretch px-4 py-5 mt-2.5 rounded-lg border border-gray-200 border-solid shadow-lg min-h-[56px]">
              <input
                type="number"
                name ="amount"
                value = {data.amount}
                onChange={handleChange}
              
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
              name="frequency"
              className="overflow-hidden gap-2.5 self-stretch px-4 py-5 mt-2.5 whitespace-nowrap rounded-lg border border-gray-200 border-solid shadow-lg min-h-[56px] text-zinc-500"
              aria-label="Select donation frequency"
              onChange={handleChange}
              value={data.frequency}

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





function UserForm({handleChange,data}) {
  return (
    <div className="flex flex-col mt-11 max-w-full leading-none w-[670px] max-md:mt-10">
      <form className="flex flex-col text-sm leading-none max-w-[625px]">
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-7 w-full max-md:max-w-full">
              <FormInput
                label="First Name"
                placeholder="Enter first name"
                name="firstName"
                handleChange={handleChange}
                value={data.firstName}
              />

              <FormInput
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                className="z-10 max-md:mr-0"
                handleChange={handleChange}
                value={data.lastName}

              />
            </div>

            <FormInput
              label="Email"
              name="email"
              placeholder="Enter Email"
              className="mt-6 w-full max-md:max-w-full"
              handleChange={handleChange}
              value={data.email}
            />

            <FormInput
              label="Address"
              name="address"
              placeholder="Enter address"
              className="mt-6 w-full max-md:max-w-full"
              handleChange={handleChange}
              value={data.address}

            />

            <div className="flex flex-wrap gap-7 mt-6 w-full whitespace-nowrap max-md:max-w-full">
             
                <div
                 className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit "
                >
                <FormInput
                  label="City"
                  name="city"
                  placeholder="Enter City"
                  className="mt-6 w-full max-md:max-w-full"
                  handleChange={handleChange}
                  value={data.city}

                />
                  
                  </div>
                <div
                  className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit "
               >
                <FormInput
                  label="State/Region"
                  name="state"
                  placeholder="Enter State/Region"
                  className="mt-6 w-full max-md:max-w-full"
                  handleChange={handleChange}
                  value={data.state}

                />

                </div>
             

            
              </div>

          </div>
        </div>

        <div className="flex gap-2 items-center self-start mt-8 text-black">
          <input
            type="checkbox"
            id="anonymous"
            name="isAnonymous"
            className="w-6 h-6"
            onChange={handleChange}
            aria-label="Make donation anonymous"
            value={data.isAnonymous}

          />
          <label
            htmlFor="anonymous"
            className="self-stretch my-auto rounded-none w-[222px]"
          >
            Make this donation anonymous
          </label>
        </div>
      </form>
    </div>
  );
}


 


 function FormInput({ label, placeholder,name,handleChange, className = "" }) {
  return (
    <div className={`flex flex-col flex-1 grow shrink-0 basis-0 w-fit ${className}`}>
      <label className="self-start text-black">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={handleChange}

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
