import * as React from "react";
import Header from "./components/Header";
import DonationCard from "./components/DonationCard";
import DonationForm from "./components/DonationForm";

export default function DonationPage() {
  return (
    <div className="flex overflow-hidden flex-col self-stretch pb-14 my-auto bg-gray-50 max-md:max-w-full">
      <Header isActive="donate" />
      <div className="overflow-hidden mt-6 ml-7 bg-gray-50 rounded-3xl max-md:mr-1.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
            <DonationCard />
          </div>
          <div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
            <DonationForm />
          </div>
        </div>
      </div>
    </div>
  );
}