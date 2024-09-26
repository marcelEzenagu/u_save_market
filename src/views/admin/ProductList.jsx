import React, { useEffect, useMemo, useState } from "react";
import { Items } from "../../data/mockData";
import { FiSearch } from "react-icons/fi";
import Bag from "../../assets/images/admin/bag.png";
import OrderVendorStatus from "../../components/order/OrderVendorStatus";
import PaginatedTable from "../../components/admin/CatelogueComponents/PaginatedTable";
import ModalForm from "../../components/admin/CatelogueComponents/ModelForm";
import DeleteModal from "../../components/admin/CatelogueComponents/DeleteModal";
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { HiUsers } from "react-icons/hi2";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { numberWithCommas, ReplaceImage} from "../../utils";
import { TfiAngleDown } from "react-icons/tfi";
const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Step 1: State for search term
  const [modalState, setModalState] = useState({ type: null, data: null });
  const [activeTab, setActiveTab] = useState("1");

  const tabItems = useMemo(
    () => [
      {
        name: "Total Products",
        icon: <LuBox className="text-lg text-regal-blue" />,
        total: "₦15k",
      },
      {
        name: "Active Products",
        icon: <HiUsers className="text-lg text-regal-blue" />,
        total: "350",
      },
      {
        name: "Inactive Products",
        icon: <FaHouseChimneyWindow className="text-lg text-regal-blue" />,
        total: "642",
      },
    ],
    []
  );

  const columns = [
    {
      key: "name",
      label: "PRODUCT NAME",
      render: (value, item) => (
        <ProductName
          value={value}
          image={item?.image}
          viewProduct={() => setModalState({ type: "view", data: item })}
        />
      ),
    },
    {
      key: "category",
      label: "CATEGORY",
      render: (value) => value || "Staples",
    },
    { key: "price", label: "PRICE" },
    { key: "stock", label: "STOCK" },
    { key: "supported countries", label: "SUPPORTED COUNTRIES" },
    { key: "unsupported countries", label: "UNSUPPORTED COUNTRIES" },
    { key: "status", label: "STATUS", render: () => <OrderVendorStatus /> },
  ];

  const actions = [
    {
      label: "Edit Product",
      icon: <FaEdit />,
      onClick: (item) => setModalState({ type: "edit", data: item }),
    },
    {
      label: "Delete Product",
      icon: <IoTrashOutline />,
      onClick: (item) => setModalState({ type: "delete", data: item }),
    },
  ];

  const handleDeleteConfirm = () => {
    console.log("Item deleted");
    setModalState({ type: null, data: null });
  };

  const handleModalClose = () => {
    setModalState({ type: null, data: null });
  };

  const handleCreateProduct = (formData) => {
    console.log("Product Created:", formData);
  };

  const tabOptions = useMemo(
    () => [
      { id: "1", name: "All" },
      { id: "2", name: "Active" },
      { id: "3", name: "Inactive" },
    ],
    []
  );

  // Step 2: Filter items based on search term
  const filteredItems = useMemo(() => {
    return Items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="product-list">
      <main className="flex  flex-col md:flex-row justify-between items-center mt-6">
        <DateFilters />
        <button
          className="text-white flex flex-row items-center gap-1 text-xs py-2 px-4 border rounded-md bg-regal-sky-blue   transition font-[500] active:scale-95"
          onClick={() => setModalState({ type: "create" })}
        >
          Add Product
        </button>
      </main>

      <TabOverview items={tabItems} />

      <section className="rounded-2xl border animate-fade-in mt-8 bg-white">
        <div className="p-4 md:px-8 md:pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between overflow-x-scroll">
            <TabButtons
              options={tabOptions}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Search bar */}
            <div className="w-full flex items-center border border-gray-300 max-w-[400px] rounded-md overflow-hidden mt-3 md:mt-0">
              <span className="pl-2 text-regal-light-gray">
                <FiSearch />
              </span>
              <input
                type="text"
                className="w-full p-2 outline-none text-xs"
                placeholder="Search Product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Step 3: Update search term
              />
            </div>
          </div>

          {/* Modals */}
          {modalState?.type === "edit" && (
            <ModalForm
              setCreateModel={handleModalClose}
              formType="product"
              onSubmit={handleCreateProduct}
              icon={Bag}
              isEdit={true}
              initialData={modalState.data}
            />
          )}

          {modalState?.type === "create" && (
            <ModalForm
              setCreateModel={handleModalClose}
              formType="product"
              onSubmit={handleCreateProduct}
              icon={Bag}
            />
          )}

          {modalState?.type === "delete" && (
            <DeleteModal
              isOpen={modalState?.type === "delete"}
              title="Delete Product"
              description={`Are you sure you want to delete ${modalState.data?.name}?`}
              onConfirm={handleDeleteConfirm}
              onClose={handleModalClose}
            />
          )}

          {/* Filtered and Paginated Table */}
          <section className="mt-8">
            {modalState?.type === "view" && modalState?.data !== null ? (
              <TabsView
                data={modalState?.data}
                filteredItems={filteredItems}
                close={() => setModalState({ type: null, data: null })}
              />
            ) : (
              <PaginatedTable
                columns={columns}
                data={filteredItems}
                actions={actions}
                itemsPerPage={10}
              />
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

const DateFilters = () => (
  <div className="flex gap-4">
    <InputDate label="From:" />
    <InputDate label="To:" />
  </div>
);

const InputDate = ({ label }) => (
  <div className="flex items-center gap-2">
    <h6 className="text-sm text-regal-light-gray">{label}</h6>
    <input
      type="date"
      className="text-xs text-regal-light-gray border rounded px-2 py-1"
    />
  </div>
);

const TabOverview = ({ items }) => (
  <section>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white mt-8 max-w-[1366px]">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center gap-4 p-4 border rounded-3xl"
        >
          <div className="w-12 h-12 rounded-full bg-regal-auth-bg-color flex items-center justify-center text-sm">
            {item.icon}
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-semibold text-regal-crum-gray">
              {item.name}
            </div>
            <div className="text-lg font-bold text-regal-blue">
              {item.total}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const TabButtons = ({ options, activeTab, onTabChange }) => (
  <div>
    {options.map((tab) => (
      <button
        key={tab.id}
        className={`shadow-sm rounded-full py-2 px-4 mr-3 text-xs font-semibold ${
          activeTab === tab.id
            ? "bg-regal-black text-white"
            : "text-regal-black bg-regal-dashboard-active-tab-gray"
        }`}
        onClick={() => onTabChange(tab.id)}
      >
        {tab.name}
      </button>
    ))}
  </div>
);

const ProductName = ({ value, image, viewProduct }) => (
  <div className="flex items-center gap-3 cursor-pointer" onClick={viewProduct}>
    <img src={image} alt={value} className="w-10 h-10 rounded-full" />
    <span>{value}</span>
  </div>
);

function TabsView({ data, close, filteredItems }) {
  const [getNum, setNumber] = useState(0);
  useEffect(() => {
    filteredItems?.map((i, index) => {
      if (i?.productID === data?.productID) {
        setNumber((index += 1));
      }
    });
  }, [data]);
  return (
    <div className="rounded-2xl border bg-white mt-8 overflow-hidden">
      <div className="bg-regal-dashboard-active-tab-gray border-b flex flex-row justify-between items-center p-4">
        <button
          className="flex flex-row gap-2 items-center text-xs font-[600]"
          onClick={() => {
            close();
          }}
        >
          <AiOutlineArrowLeft className="font-[400]" />
          Go Back
        </button>

        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src={data?.image || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs capitalize text-regal-black truncate max-w-[100px] md:max-w-full whitespace-nowrap font-[600]">
              {data?.name || "User Name"}
            </span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <IoIosArrowBack className="text-regal-crum-gray text-sm" />
            <span className="text-regal-black text-xs">
              <span className="text-regal-crum-gray text-xs">{getNum} of</span>{" "}
              {filteredItems?.length}
            </span>
            <IoIosArrowForward className="text-regal-black text-sm" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-row items-center gap-4">
        <div className="text-sm font-[500] animate-fade-in w-[100px] ">
        <div className="relative bg-white h-[200px]  rounded-lg  overflow-hidden ">
        <img
          src={data?.image || ReplaceImage}
          alt={data?.name}
          className="w-full h-full object-contain"
        />
          </div>
          </div>
          <div className="flex flex-col gap-1  ">
          <h5
          className="text-xs md:text-lg font-semibold mb-2 line-clamp-2"
        >
          {data?.name}
        </h5>
        <p className="text-regal-black font-semibold text-sm md:text-lg ">
          ₦{numberWithCommas(data?.price)}{" "}
            {data?.percentageOFF  !== null ?
          <s className="font-[400] text-xs text-regal-light-gray ">
            {data?.old_price && '₦'+ numberWithCommas(data?.old_price) }
          </s>

           : ''}
        </p>
          </div>


        </div>



        <div className="border rounded-md p-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <h6 className="text-regal-dark text-[16px]  mb-4 font-[600]">
        General information
        </h6>

            <div className="mb-2 col-span-2">
              <label
                htmlFor="ProductName"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Product Name
              </label>
              <input
                type="text"
                name="text"
                id="text"
                value={data?.name}
                disabled={true}
                placeholder="Enter name"
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              />
            </div>
            <div className="mb-2 col-span-2 md:col-span-1">
              <label
                htmlFor="FirstName"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Category
              </label>
              <div className="relative ">
                <select className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black">
                  <option value="status1">Active</option>
                  <option value="status2">New</option>
                  <option value="status3">In Process</option>
                  <option value="status4">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-[-3px] flex items-center px-2 pointer-events-none">
                  <TfiAngleDown className="text-gray-500 bg-white w-9 z-50" />
                </div>
              </div>
            </div>
            <div className="mb-2 col-span-2 md:col-span-1">
              <label
                htmlFor="LastName"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Sub Category
              </label>
              <div className="relative ">
                <select className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black">
                  <option value="status1">Active</option>
                  <option value="status2">New</option>
                  <option value="status3">In Process</option>
                  <option value="status4">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-[-3px] flex items-center px-2 pointer-events-none">
                  <TfiAngleDown className="text-gray-500 bg-white w-9 z-50" />
                </div>
              </div>
            </div>

            <div className="mb-2 col-span-2">
              <label
                htmlFor="ProductDescription"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Product Description
              </label>
              <textarea
                name=""
                id=""
                rows={"10"}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              >
               {data?.description}
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
