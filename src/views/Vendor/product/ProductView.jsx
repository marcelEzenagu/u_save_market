import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Menu } from "@headlessui/react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { TfiAngleDown } from "react-icons/tfi";
import GeneralInformation from "./Components/GeneralInformation";
import Media from "./Components/Media";
import Pricing from "./Components/Pricing";
import Shopping from "./Components/Shopping";
import { Items } from "../../../data/mockData";
import { FaRegCheckCircle } from "react-icons/fa";
import {numberWithCommas} from '../../../utils'
import Cancelicon from "../../../assets/images/order/cancel.png";
import ProductDescription from "../../../components/ProductDescription";
function ProductView() {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState("1");
  const [active, setActive] = useState("1");
  const [selectedStatus, setSelectedStatus] = useState("Select Status");
  const [isModalOpenAddProduct, setisModalOpenAddProduct] = useState(false);
  const [isModalOpenDeleteProduct, setisModalOpenDeleteProduct] =
    useState(false);

  const statusOptions = [
    {
      label: "Active",
      value: "active",
      color: "text-blue-600 bg-blue-100 border-blue-600",
      icon: "",
    },
    {
      label: "New",
      value: "new",
      color: "text-green-600 bg-green-100 border-green-600",
    },
    {
      label: "Processing",
      value: "processing",
      color: "text-yellow-600 bg-yellow-100 border-yellow-600",
    },
    {
      label: "Completed",
      value: "completed",
      color: "text-gray-600 bg-gray-100 border-gray-600",
    },
    {
      label: "Cancelled",
      value: "cancelled",
      color: "text-red-600 bg-red-100 border-red-600",
    },
  ];

  const tabs = [
    {
      id: "1",
      name: "General information",
      component: GeneralInformation,
    },
    {
      id: "2",
      name: "Media",
      component: Media,
    },
    {
      id: "3",
      name: "Pricing",
      details: "Make Payments for your order",
      component: Pricing,
    },
    {
      id: "4",
      name: "Shipping",
      component: Shopping,
    },
  ];
  const [isDateInputVisible, setIsDateInputVisible] = useState(false);

  const toggleDateInput = () => {
    setIsDateInputVisible(!isDateInputVisible);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = statusOptions.find(
      (option) => option.value === selectedValue
    );
    setSelectedStatus(selectedOption.label);
  };

  const selectedOption = statusOptions.find(
    (option) => option.label === selectedStatus
  );

  return (
    <div className="px-4 py-8">
      <div className="flex flex-row items-center justify-between ">
        <Link
          className=" flex items-center gap-2 text-regal-dark text-lg md:text-2xl font-[500]"
          to="/vendor/dashboard/products"
        >
          <IoIosArrowRoundBack />
          {name}
        </Link>
        <div className="flex flex-row items-center gap-6">
          <Menu as="button" className="relative inline-block text-right">
            <div>
              <Menu.Button className=" rounded-full text-lg text-regal-dark focus:outline-none">
                •••
              </Menu.Button>
            </div>

            <Menu.Items className="absolute right-0 mt-2 w-40 z-50 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        active ? "bg-gray-100" : ""
                      }`}
              
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
                        setisModalOpenDeleteProduct(true);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
          <button className="flex flex-row items-center justify-center gap-2 font-[500] text-regal-black text-xs border rounded-md border-regal-black py-2 px-3"
             onClick={() => {
                setisModalOpenAddProduct(true);
              }}
          >
            <AiOutlineEye className="text-sm" />
            Preview
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 ">
        <div className="md:col-span-3 border shadow-sm bg-white py-2 rounded-md ">
          <div className="grid rid-cols-2 md:grid-cols-4 ">
            <div className="">
              <ul className="flex flex-col items-start space-y-4 px-8 py-4 animate-fade-in ">
                {tabs?.map((e, index) => (
         <li key={index} className="relative w-full">
         <h6
           className={`text-regal-light-gray text-xs py-2 font-[400] after:scale-y-0 cursor-pointer ${
             active === e?.id
               ? "text-regal-blue after:scale-y-100 font-[600]"
               : "hover:text-regal-blue hover:after:scale-y-100"
           } flex flex-row items-center gap-2 relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:transform after:translate-y-[-50%] after:h-full after:w-[4px] after:bg-regal-blue after:rounded-full after:origin-top after:transition-transform after:duration-300 after:ease-in-out`}
         >
           <FaRegCheckCircle className="text-lg font-[500]" />
           {e?.name}
         </h6>
       </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3 flex flex-col px-4 py-4 gap-4">
              {tabs.map((e, i) => (
                <div
                  className=" border shadow-sm bg-white py-4 md:py-6  rounded-md "
                  key={i}
                >
                  <div className="px-4  md:px-4">
                    <div className="flex flex-row items-center justify-between">
                      <h6 className="text-regal-dark text-[16px]  mb-4 font-[600]">
                        {e.name}
                      </h6>
                      <button
                        className="text-regal-light-gray text-lg  mb-4 font-[700] active:scale-95"
                        onClick={() => {
                          setActiveTab(e.id);
                        }}
                      >
                        <TfiAngleDown />
                      </button>
                    </div>
                  </div>
                  {/* {e.id === activeTab &&  } */}
                  <div className="px-4">
                    <e.component />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className=" border shadow-sm bg-white py-2 rounded-md ">
            <h5 className="text-lg text-regal-black font-[700] px-4 pt-4">
              Product Status
            </h5>

            <div className="flex flex-col items-start gap-8 pb-4 mt-4  border-b ">
              <div className="w-full px-4 relative">
                <select
                  value={selectedOption ? selectedOption.value : ""}
                  onChange={handleChange}
                  className={`w-full p-2 pr-10  px-4 py-3 text-xs border-[1.2px] rounded-md font-[500] focus:outline-none appearance-none ${
                    selectedOption
                      ? selectedOption.color
                      : "text-gray-800 border-gray-300"
                  }`}
                >
                  <option disabled value="">
                    Select Status
                  </option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-[30px] flex items-center pointer-events-none">
                  <TfiAngleDown
                    className={
                      selectedOption ? selectedOption.color : "text-gray-300"
                    }
                  />
                </div>
              </div>
              <div className="w-64">
                <button
                  onClick={toggleDateInput}
                  className="flex items-center justify-center px-8 text-xs text-blue-600"
                >
                  <FaCalendarAlt className="mr-2" />
                  Schedule availability
                </button>
                {/* 
      {isDateInputVisible && (
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full p-2 border rounded-md text-gray-800 mb-2"
          />
          {selectedDate && (
            <button
              onClick={clearDate}
              className="absolute right-2 top-2 text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          )}
        </div>
      )}

      {selectedDate && (
        <div className="mt-2 text-gray-700">
          Selected Date: {selectedDate}
        </div>
      )} */}
              </div>
            </div>
            <div className="px-5 pt-4 pb-3 w-full">
              <button className="text-sm bg-regal-sky-blue text-white px-4  py-2  w-full rounded-md hover:bg-blue-600 ">
                Save and publish
              </button>
            </div>
          </div>
        </div>
      </section>
      <DeleteProduct
        isModalOpen={isModalOpenDeleteProduct}
        setIsModalOpen={(e) => {
          setisModalOpenDeleteProduct(e);
        }}
      />
         <ViewProduct
        isModalOpen={isModalOpenAddProduct}
        setIsModalOpen={(e) => {
          setisModalOpenAddProduct(e);
        }}
      />
    </div>
  );
}

export default ProductView;
function ViewProduct(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const productinfo = Items[0];
    const description = `
  <p> Our Organic Mediterranean Olive Oil is a premium blend sourced from the finest olives grown in the Mediterranean region. This extra virgin olive oil is cold-pressed to retain its natural flavor and nutritional benefits, making it a perfect addition to any culinary creation.</p>
  <ul>
    <li><strong>Origin:</strong> 100% organically grown olives from the Mediterranean basin.</li>
    <li><strong>Flavor Profile:</strong> Rich, fruity taste with a hint of pepper and a smooth finish.</li>
    <li><strong>Health Benefits:</strong> High in monounsaturated fats and  health.</li>
    <li><strong>Uses:</strong> Ideal for dressing salads, drizzling over vegetables, or enhancing the flavor of meats and fish.</li>
    <li><strong>Packaging:</strong> Available in 500ml and 1L bottles.</li>
    <li><strong>Certification:</strong> USDA Organic and Non-GMO verified.</li>
  </ul>
  `;
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
              className="bg-white py-3 px-4   md:p-6 rounded-lg shadow-lg w-[350px] md:w-[700px] "
              ref={dropdownaddRef}
            >
                   <main className="my-4 mb-20 grid grid-cols-1 md:grid-cols-2  gap-4">
            <div className="w-full h-80 my-auto relative">
                <img src={productinfo?.image} alt={productinfo?.name} className="w-full h-full object-contain" />
            <span className=" text-xs absolute bottom-0 right-0 font-semibold text-regal-black py-2 px-4 bg-regal-light-item-color">2 pieces left</span>
            </div>
            <div className="flex flex-col gap-3">
                <h4 className="text-xs font-[500] text-regal-black">{productinfo?.name}</h4>
                <h5 className="text-sm font-[700] text-regal-blue" >₦{numberWithCommas(productinfo?.price)}</h5>
                <div className="max-w-[250px] flex items-center gap-2">
                    <button className="w-full p-3 text-sm flex flex-row items-center justify-center text-white bg-regal-sky-blue rounded-full ">
                    <BsCart3 className="mr-2 text-sm" />  Add to Cart
                    </button>
                    <div className="w-14 h-full rounded-full border flex flex-col items-center justify-center bg-white  ">
                        <GoHeart className="text-xl"/>
                    </div>
                </div>
                <div>
                <h1 className="text-sm  font-[600] text-regal-light-gray mb-2">
                    Product description
                </h1>
                <ProductDescription description={description}/>
                </div>
                </div>
      </main>
            </div>
          </div>
        )}
      </>
    );
  }

function DeleteProduct(props) {
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
          <div className="bg-white p-5 md:p-14 rounded-lg shadow-lg w-[300px] md:w-[450px] text-center ">
            <img src={Cancelicon} alt="" className="w-32 mx-auto mb-2" />
            <h2 className="text-xl font-bold mb-2">Delete Item</h2>
            <p className="text-regal-black text-sm mt-4 mb-6">
            Are you sure you want to delete this product? the product would stop being displayed on the website
            </p>
  
            {/* Buttons in flex-col with gap */}
            <div className="flex flex-col gap-4 w-[200px] mx-auto">
              <button
                onClick={() => {
                  // Handle delete action here
                  props.setIsModalOpen(false);
                }}
                className="bg-regal-sky-blue text-white py-2 text-sm rounded-md hover:bg-blue-900 transition active:scale-95"
              >
                Save as Draft
              </button>
              <button
                onClick={() => {
                  // Handle delete action here
                  props.setIsModalOpen(false);
                }}
                className=" text-regal-sky-blue text-sm py-2 border-2 border-white rounded-md hover:border-regal-sky-blue transition font-[500] active:scale-95"
              >
               Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )
    );
  }