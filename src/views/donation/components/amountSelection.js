import * as React from "react";

const amounts = [20, 50, 100, 200, 500];

export default function AmountSelector() {
  return (
    <div className="flex gap-5 items-start self-start text-white whitespace-nowrap">
      {amounts.map((amount) => (
        <div key={amount} className="flex flex-col w-[60px]">
          <button 
            className="overflow-hidden gap-2.5 self-stretch p-4 rounded-lg bg-neutral-400"
            aria-label={`Donate $${amount}`}
          >
            ${amount}
          </button>
        </div>
      ))}
    </div>
  );
}