import React, { useState, useRef, useEffect } from "react";
import { Menu } from "@headlessui/react";
import EmptyList from "../../../dashboard/settings/components/EmptyList";
import NoCardicon from "../../../../assets/images/settings/nocard.png";
import MasterCard from "../../../../assets/images/settings/mastercard.png";
import Cancelicon from "../../../../assets/images/order/cancel.png";
import { countries } from "../../../../data/mockData";
import Card from '../../../../assets/images/checkout/card.png'
import { SlArrowDown } from "react-icons/sl";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
function UserPaymentMethod() {
  const [isModalOpenEditCard, setIsModalOpenEditCard] = useState(false);
  const [isModalOpenAddCard, setIsModalOpenAddCard] = useState(false);
  const [isModalOpenDeleteCard, setIsModalOpenDeleteCard] = useState(false);
  const Card = [1, 2, 3, 4];
  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-between mb-4">
        <Link to="/settings" className="text-regal-black text-sm md:text-xl  gap-2 flex items-center font-bold cursor-pointer">  <HiOutlineArrowLeft/>  Card</Link>
        <button
          onClick={() => {
            setIsModalOpenAddCard(true);
          }}
          className="py-2 px-6 f text-xs  active:scale-95 font-[500] text-white rounded-md bg-regal-sky-blue"
        >
          Add Card
        </button>
      </div>
      {Card.length > 0 && (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Card.map((e, i) => (
            <div
              className="rounded-md border p-5 mt-3 flex flex-row items-start justify-between animate-fade-in"
              key={i}
            >
              <div className="flex flex-col gap-4 ">
                <img src={MasterCard} alt="" className="w-8" />
                <h6 className="font-[700] text-regal-black text-xs md:text-sm max-w-72">
                  **** **** **** 1357
                </h6>
                <p className="font-[400] text-regal-black text-xs md:text-sm">
                  Expires 23/22
                </p>
              </div>
              <div className="flex flex-col h-full justify-between">
                <Menu as="button" className="relative inline-block text-right">
                  <div>
                    <Menu.Button className=" rounded-full text-sm md:text-lg  focus:outline-none">
                      •••
                    </Menu.Button>
                  </div>

                  <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`flex items-center w-full px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : ""
                            }`}
                            onClick={() => {
                              setIsModalOpenDeleteCard(true);
                            }}
                          >
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`flex items-center w-full px-4 py-2 text-sm text-red-600 ${
                              active ? "bg-gray-100" : ""
                            }`}
                            onClick={() => {
                              setIsModalOpenDeleteCard(true);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>

                <button className="text-blue-800 bg-blue-100 text-xs font-[500] md:text-sm  py-1 px-2 rounded-sm">
                  Default
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {Card.length <= 0 && (
        <EmptyList
          image={NoCardicon}
          header={"No purchase history yet"}
          description={
            "Your purchase history will be saved here to make it easy to browse and repurchase."
          }
        />
      )}

      <EditCard
        isModalOpen={isModalOpenEditCard}
        setIsModalOpen={(e) => {
          setIsModalOpenEditCard(e);
        }}
      />
      <AddCard
        isModalOpen={isModalOpenAddCard}
        setIsModalOpen={(e) => {
          setIsModalOpenAddCard(e);
        }}
      />
      <DeleteCard
        isModalOpen={isModalOpenDeleteCard}
        setIsModalOpen={(e) => {
          setIsModalOpenDeleteCard(e);
        }}
      />
    </div>
  );
}
function EditCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpenSelect(false); // Close dropdown after selection
  };
  useEffect(() => {
    setIsModalOpen(props?.isModalOpen);
  }, [props?.isModalOpen]);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        props.setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown ">
          <div
            className="bg-white py-2 px-2  md:p-6 rounded-lg shadow-lg w-[350px] md:w-[700px] "
            ref={dropdownRef}
          >
            <h1 className="text-sm md:text-lg font-[700] text-regal-black">
              Edit Card
            </h1>

            <div>
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

                <div className="mb-1  col-span-2 ">
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
                          <SlArrowDown className="ml-1" />
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
                    className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                  >
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
                    className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                  >
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
                    className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                  >
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
                    className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
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
              <div className="w-full mb-14 mt-9">
                <button className="py-3 px-10 float-start text-xs md:text-sm active:scale-95 font-[500] text-white rounded-md bg-regal-sky-blue">
                  Confirm Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function AddCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  }, [props.isModalOpen]);

  const dropdownaddRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownaddRef.current &&
        !dropdownaddRef.current.contains(event.target)
      ) {
        props.setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown ">
          <div
            className="bg-white py-3 px-4  md:p-6 rounded-lg shadow-lg w-[350px] md:w-[700px] "
            ref={dropdownaddRef}
          >
            <h1 className="text-sm md:text-lg  font-[700] text-regal-black">
              Add Card
            </h1>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-3">
                <div className="mb-1 col-span-2 ">
                  <label
                    htmlFor="CardholderName"
                    className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                  >
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="CardholderName"
                    id="text"
                    placeholder="Enter name"
                    className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                  />
                </div>
                <div className="mb-1  col-span-2 ">
                  <label
                    htmlFor="CardNumber"
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
                      name="CardNumber"
                      id="card"
                      className="w-full p-3 text-xs md:text-sm border rounded-sm bg-transparent text-regal-crum-gray focus:outline-none"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                </div>
                <div className="mb-1 ">
                  <label
                    htmlFor="Expiry"
                    className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                  >
                    Expiry
                  </label>
                  <input
                    type="text"
                    name="Expiry"
                    id="Expiry"
                    placeholder="MM/YY"
                    className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                  />
                </div>
                <div className="mb-1 ">
                  <label
                    htmlFor="CVV"
                    className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    name="CVV"
                    id="CVV"
                    placeholder="123"
                    className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
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
              <div className="w-full mb-14 mt-9">
                <button className="py-3 px-10 float-start text-xs md:text-sm active:scale-95 font-[500] text-white rounded-md bg-regal-sky-blue">
                  Save Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function DeleteCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
  }, [props.isModalOpen]);

  const dropdownaddRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownaddRef.current &&
        !dropdownaddRef.current.contains(event.target)
      ) {
        props.setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    isModalOpen && (
      <div className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown" ref={dropdownaddRef}>
        <div className="bg-white p-5 md:p-14 rounded-lg shadow-lg w-[350px] md:w-[450px] text-center ">
          <img src={Cancelicon} alt="" className="w-32 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-2">Delete Card</h2>
          <p className="text-regal-black text-sm mt-4 mb-6">
          Are you sure you want to delete this card? 
          You can add it back anytime
          </p>

          {/* Buttons in flex-col with gap */}
          <div className="flex flex-col gap-4 w-[200px] mx-auto">
            <button
              onClick={() => {
                // Handle delete action here
                props.setIsModalOpen(false);
              }}
              className="bg-regal-sky-blue text-white py-2 rounded-md hover:bg-blue-900 transition active:scale-95"
            >
              Delete
            </button>
            <button
              onClick={() => {
                // Handle delete action here
                props.setIsModalOpen(false);
              }}
              className=" text-regal-sky-blue py-2 border-2 border-white rounded-md hover:border-regal-sky-blue transition font-[500] active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}
export default UserPaymentMethod;
