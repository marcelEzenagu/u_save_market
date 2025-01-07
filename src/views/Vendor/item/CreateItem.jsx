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
import Shopping from "./Components/Shipping";
import { FaRegCheckCircle } from "react-icons/fa";
import { numberWithCommas } from "../../../utils";
import Cancelicon from "../../../assets/images/order/cancel.png";
import ProductDescription from "../../../components/ProductDescription";
import { useErrorMessageHooks } from "../../../hooks/useErrorMessageHooks";
import { useAddItemMutation } from "../../../features/item/itemApiSlice";
import { useToaster } from "../../../components/ToasterContext";
import ViewProduct from "./Components/ViewProduct";
function CreateItem() {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState("1");
  const [active, setActive] = useState("1");
  const [selectedStatus, setSelectedStatus] = useState("Select Status");
  const [isModalOpenAddProduct, setisModalOpenAddProduct] = useState(false);
  const {
    handleError,
    setErrMsg,
    handleChange,
    data,
    setData,
    setErrorMessagesList,
    handleErrorMessagesList,
    errMsg,
  } = useErrorMessageHooks();
  const [addItem, { isLoading }] = useAddItemMutation();
  const { showToast } = useToaster();
  useEffect(() => {
    defaultValue();
  }, []);

  const defaultValue = () => {
    setData({
      itemName: "",
      images: [],
      itemCategory: "",
      itemSubCategory: "",
      productID: "",
      quantity: 0,
      salesPrice: 0,
      originalPrice: 0,
      oldPrice: 0,
      profit: 0,
      discount: 0,
      fee: "3%",
      price: 0,
      weight: 0,
      stock:'',
      weight_unit: "kg",
      status: "",
      description: "",
      itemSupportedCountries: [],
    });
  };

  const handleSubmit = async () => {
    setErrMsg("");
    setErrorMessagesList([]);
    console.log(data);
    try {
      const { response } = await addItem(data).unwrap();
      console.log(response);
      showToast(
        "Item created successfully",
        "success"
      );
      defaultValue();
    } catch (err) {
      console.log(err);
      handleError(err, "Create Item");
    }
  };

  const statusOptions = [
    {
      label: "active",
      value: "active",
      color:  "text-green-600 bg-green-100 border-green-600",
      icon: "",

    },
    
    {
      label: "inactive",
      value: "inactive",
      color: "text-red-600 bg-red-100 border-red-600",
    },
    {
        label: "draft",
        value: "draft",
        color:  "text-gray-600 bg-gray-100 border-gray-600",
  
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

  const handleChangeOption = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = statusOptions.find(
      (option) => option.value === selectedValue
    );
    setSelectedStatus(selectedOption.label);
    setData({...data, status : selectedOption.value.toLocaleUpperCase()});
  };

  const selectedOption = statusOptions.find(
    (option) => option.label === selectedStatus
  );

  return (
    <div className="px-4 py-8">
      <div className="flex flex-row items-center justify-between ">
        <Link
          className=" flex items-center gap-2 text-regal-dark text-lg md:text-2xl font-[500]"
          to="/vendor/products"
        >
          <IoIosArrowRoundBack />

        </Link>
        <div className="flex flex-row items-center gap-6">
          {/* <Menu as="button" className="relative inline-block text-right">
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
          </Menu> */}
          <button
            className="flex flex-row items-center justify-center gap-2 font-[500] text-regal-black text-xs border rounded-md border-regal-black py-2 px-3"
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
              {tabs?.map((e, i) => (
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
                        {/* <TfiAngleDown /> */}
                      </button>
                    </div>
                  </div>
                  {/* {e.id === activeTab &&  } */}
                  <div className="px-4">
                    <e.component
                      handleChange={handleChange}
                      data={data}
                      setData={setData}
                      handleErrorMessagesList={handleErrorMessagesList}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className=" border shadow-sm bg-white py-2 rounded-md ">
            <h5 className="text-lg text-regal-black font-[700] px-4 pt-4">
              Item Status
            </h5>

            <div className="flex flex-col items-start gap-8 pb-4 mt-4  border-b ">
             <div className="w-full "> 

              <div className="w-full px-4 relative">
                <select
                  value={selectedOption ? selectedOption.value : ""}
                  onChange={handleChangeOption}
                  className={`w-full p-2 pr-10  px-4 py-3 text-xs border-[1.2px] rounded-md font-[500] focus:outline-none appearance-none ${
                    selectedOption
                      ? selectedOption.color
                      : "text-gray-800 border-gray-300"
                  }`}
                >
                  <option disabled value="">
                    Select Status
                  </option>
                  {statusOptions?.map((option) => (
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
              <div className="px-4">
              {handleErrorMessagesList("status")}
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
           
            <p className="text-red-600 text-xs">{errMsg}</p>
            <div className="px-5 pt-4 pb-3 w-full">
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="text-sm bg-regal-sky-blue text-white px-4  py-2  w-full rounded-md hover:bg-blue-600 "
              >
                {isLoading ? "loading..." : "Save and publish"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <ViewProduct
        isModalOpen={isModalOpenAddProduct}
        setIsModalOpen={(e) => {
          setisModalOpenAddProduct(e);
        }}
        data={data}
      />
    </div>
  );
}
export default CreateItem;

