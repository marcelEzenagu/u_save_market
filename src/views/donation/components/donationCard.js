import * as React from "react";

export default function DonationCard() {
  return (
    <div className="flex overflow-hidden flex-col grow pt-7 w-full text-lg leading-7 text-sky-600 bg-white rounded-3xl border border-gray-200 border-solid max-md:mt-10 max-md:max-w-full">
      <div className="mx-11 max-md:mr-2.5 max-md:max-w-full">
        Usavemarket will collect and use your personal information in accordance with our
        <span className="text-sky-600"> Terms and conditions</span>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/b53670262f1d4935bfecfb9f234abb33/df2f4621b749c96cd297bcd5e20b2c132611cb7487b847190c7d5f02c7db34a3?apiKey=b53670262f1d4935bfecfb9f234abb33&"
        alt="Donation Information Graphic"
        className="object-contain mt-28 w-full aspect-[0.87] max-md:mt-10 max-md:max-w-full"
      />
    </div>
  );
}
