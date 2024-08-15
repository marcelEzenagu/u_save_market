import React, {useState} from "react";
import { Link } from "react-router-dom";
import { countries } from "../../data/mockData";
import Logo from "../../assets/images/nav/logo.webp";
import Footer from "../../components/Footer/Footer";
import { SlArrowDown } from "react-icons/sl";
function Checkout() {
    const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const handleSelect = (country) => {
        setSelectedCountry(country);
        setIsOpenSelect(false); // Close dropdown after selection
      };
  return (
    <div>
      <header>
        <nav className="border-b-[1px] bg-white ">
          <div className=" py-3 px-4 flex max-w-[1366px] mx-auto flex-row justify-between items-center lg:container-fluid  ">
            <div className="flex flex-row justify-between items-center">
              <Link to="/">
                <img src={Logo} alt="" className="w-[150px]" />
              </Link>
            </div>

            <Link to="/cart" className="font-[700] text-sm text-regal-sky-blue">
              Back to Cart
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto  max-w-[1200px]  py-5 px-2  md:px-0  md:flex md:flex-row md:py-10">
        <div className="mb-5 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
            <div className="flex flex-col gap-4 md:col-span-2">
              <div className=" border shadow-sm bg-white p-4 md:p-8 rounded-xl ">
                <div className="flex flex-row items-center justify-between">
                  <h6 className="text-regal-blue text-sm mb-4 font-[700]">
                    1. Shipping Info
                  </h6>
                  <button className="text-regal-sky-blue text-xs md:text-sm mb-4 font-[700]">
                    Show more
                  </button>
                </div>
                <h6 className="text-regal-footer-gray text-xs ">
                  Add address to complete your purchase
                </h6>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-5">
                <div className="mb-1 col-span-2 md:col-span-1">
                <label
                  htmlFor="FirstName"
                 className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="FirstName"
                  id="text"
                  placeholder="Enter First Name"
                  className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                />
              </div>
              <div className="mb-1 col-span-2 md:col-span-1">
                <label
                  htmlFor="LastName"
                 className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="LastName"
                  id="text"
                  placeholder="Enter Last Name"
                  className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                />
              </div>
            
                <div className="mb-1  col-span-2 md:col-span-1">
                <label
                  htmlFor="phone"
                 className="block text-xs md:text-sm  font-[700]  leading-6 mb-2 text-regal-black"
                >
                  Phone
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* <spanclassName="text-gray-500 sm:text-sm">$</span> */}
                  </div>
                  <div className="absolute inset-y-0 left-0 flex items-center">
        
                    <div className="relative">
                      {/* Dropdown button */}
                      <button
                        onClick={() => setIsOpenSelect(!isOpenSelect)}
                        className="w-full flex justify-between items-center border-none  rounded-md px-4 py-2 bg-transparent text-gray-700"
                      >
                        {selectedCountry ? (
                          <div className="flex items-center text-sm">
                            <img
                              src={selectedCountry.flag}
                              alt="flag"
                              className="w-6 h-4 mr-2"
                            />
                            {selectedCountry.number}
                          </div>
                        ) : (
                          "Select a country"
                        )}
                      <SlArrowDown className="ml-1"/>
                      </button>

                      {/* Dropdown menu */}
                      {isOpenSelect && (
                        <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
                          {countries.map((country, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelect(country)}
                              className="flex items-center text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <img
                                src={country.flag}
                                alt={country.name}
                                className="w-6 h-4  mr-2"
                              />
                              {country.number}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="w-full py-3 pl-28 text-xs md:text-sm border rounded-sm bg-transparent text-regal-crum-gray focus:outline-none"
                    placeholder="Phone"
                  />
                </div>
              </div>
                <div className="mb-1 col-span-2 md:col-span-1">
                <label
                  htmlFor="email"
                 className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                />
              </div>
              <div className="mb-1 col-span-2">
                <label
                  htmlFor="StreetName"
                 className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                 Street Name
                </label>
                <input
                  type="text"
                  name="StreetName"
                  id="text"
                  placeholder="Enter Street Name"
                  className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                />
              </div>
              <div className="mb-1">
                <label
                  htmlFor="Country"
                 className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                  Country
                </label>
                <select   
                name="Country"
                  id="Country"
                  placeholder="Enter Country"
                  className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray">
                    <option value="">Enter Country</option>
                </select>
  
              </div>
              <div className="mb-1">
                <label
                  htmlFor="City"
                 className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                  City
                </label>
                <select   
                name="City"
                  id="City"
                  placeholder="Enter City"
                  className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray">
                    <option value="">Enter City</option>
                </select>
  
              </div>
              <div className="mb-1">
                <label
                  htmlFor="State/Region"
                 className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                  State/Region
                </label>
                <select   
                name="State/Region"
                  id="State/Region"
                  placeholder="Enter State/Region"
                  className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray">
                    <option value="">Enter State</option>
                </select>
  
              </div>
              <div className="mb-1">
                <label
                  htmlFor="Zip Code"
                 className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                >
                 Zip Code
                </label>
                <input   
                name="Zip Code"
                  id=" Zip Code"
                  placeholder="Enter Zip Code"
                  className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"/>
  
              </div>
                </div>
                <div className="flex items-center my-4">
                    <input type="checkbox" id="checkbox" name="checkbox" />
                    <label htmlFor="checkbox"  class=" text-xs  font-[500]  leading-6 mx-2 text-regal-black">Set as default</label>
                </div>
                      <div className="w-full">
                <button className="py-2 px-10 float-end text-xs md:text-sm active:scale-95 font-[500] text-white rounded-md bg-regal-sky-blue">Save and Continue</button>
                      </div>
              </div>
              <div className=" border shadow-sm bg-white p-4 md:p-8 rounded-xl ">
                <div className="flex flex-row items-center justify-between">
                  <h6 className="text-regal-blue text-sm mb-4 font-[700]">
                    2. Billing Details
                  </h6>
                  <button className="text-regal-sky-blue text-xs md:text-sm mb-4 font-[700]">
                    Show more
                  </button>
                </div>
                <h6 className="text-regal-footer-gray text-xs ">
                  This is to verify you’re an authorized user of the purchasing
                  credit card you intend to use
                </h6>
              </div>
              <div className=" border shadow-sm bg-white  p-4 md:p-8 rounded-xl">
                <div className="flex flex-row items-center justify-between">
                  <h6 className="text-regal-blue text-sm mb-4 font-[700]">
                    3. Payments
                  </h6>
                  <button className="text-regal-sky-blue text-xs md:text-sm mb-4 font-[700]">
                    Show more
                  </button>
                </div>
                <h6 className="text-regal-footer-gray text-xs ">
                  Add address to complete your purchase
                </h6>
              </div>
            </div>

            <div>
              <div className=" border shadow-sm bg-white py-4 rounded-xl ">
                <h5 className="text-sm text-regal-blue font-[700] px-4">
                  Order Summary
                </h5>
                <div className="flex flex-row justify-between items-start m-4">
                  <div className="">
                    <h6 className="text-sm font-[500] text-regal-black">
                      Subtotal
                    </h6>
                    <p className="text-xs font-[500] text-regal-footer-gray">
                      4 items
                    </p>
                  </div>
                  <p className="text-sm font-[600] text-regal-black">
                    ₦1,585.00
                  </p>
                </div>
                <div className="flex flex-row justify-between items-start m-4">
                  <div className="">
                    <h6 className="text-sm font-[500] text-regal-black">
                      Estimated Shipping
                    </h6>
                    <p className="text-xs font-[500] text-regal-footer-gray">
                      4 items
                    </p>
                  </div>
                  <p className="text-sm font-[600] text-regal-black">
                    ₦22,000.00
                  </p>
                </div>
                <div className="flex flex-row justify-between items-start py-4 border-t">
                  <div className="px-4">
                    <h6 className="text-sm font-[500] text-regal-black">
                      Est.Total
                    </h6>
                  </div>
                  <p className="text-lg font-[600] text-regal-black px-4">
                    ₦23,585.00
                  </p>
                </div>
                <div className="p-4">
                  <Link
                    to="/checkout"
                    className="bg-regal-sky-blue text-white px-4  py-2 font-semibold w-full rounded-md hover:bg-blue-600 "
                  >
                    Pay now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Checkout;
