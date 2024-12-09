import * as React from "react";

const steps = [
  { id: "amount", label: "Amount" },
  { id: "personal", label: "Personal Info" },
  { id: "payment", label: "Payments" }
];

export default function DonationSteps({ activeStep }) {
  return (
    <div className="flex z-10 gap-10 items-center text-lg leading-loose text-center text-zinc-500">
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col self-stretch my-auto whitespace-nowrap w-[197px]">
          <div className={`self-center ${activeStep === step.id ? 'text-sky-600' : ''}`}>
            {step.label}
          </div>
          <div className="flex mt-3 w-full bg-sky-600 rounded min-h-[4px]" />
        </div>
      ))}
    </div>
  );
}