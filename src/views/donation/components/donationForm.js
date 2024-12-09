import * as React from "react";
import AmountSelector from "./AmountSelector";
import DonationSteps from "./DonationSteps";

export default function DonationForm() {
  return (
    <form className="flex flex-col items-start mt-1.5 w-full text-sm font-semibold max-md:mt-10 max-md:max-w-full">
      <DonationSteps activeStep="amount" />
      <div className="flex shrink-0 self-stretch w-full h-1 bg-gray-200 rounded" />
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
      <button 
        type="submit"
        className="flex overflow-hidden flex-col justify-center items-center px-20 py-3 mt-8 max-w-full text-base text-center text-white whitespace-nowrap bg-sky-600 rounded-lg min-h-[48px] w-[670px] max-md:px-5"
        aria-label="Proceed to next step"
      >
        Next
      </button>
    </form>
  );
}