import React, { useMemo, useState } from "react";
import { Items } from "../../data/mockData";
import { FiSearch } from "react-icons/fi";
import Bag from "../../assets/images/admin/category.png";
import OrderVendorStatus from "../../components/order/OrderVendorStatus";
import PaginatedTable from "../../components/admin/CatelogueComponents/PaginatedTable";
import ModalForm from "../../components/admin/CatelogueComponents/ModelForm";
import DeleteModal from "../../components/admin/CatelogueComponents/DeleteModal";
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
const SubCategoryList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Step 1: State for search term
  const [modalState, setModalState] = useState({ type: null, data: null });
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Furniture" },
    // Add more categories here
  ];
  const columns = [
    {
      key: "name",
      label: "CATEGORY",
      render: (value, item) => (
        <ProductName
          value={value}
          image={item?.image}
          viewProduct={() => setModalState({ type: "view", data: item })}
        />
      ),
    },
    {
      key: "name",
      label: "SUBCATEGORY",
      render: (value) => value,
    },
    { key: "status", label: "STATUS", render: () => <OrderVendorStatus /> },
  ];

  const actions = [
    {
      label: "Edit Subcategory",
      icon: <FaEdit />,
      onClick: (item) => setModalState({ type: "edit", data: item }),
    },
    {
      label: "Delete Subcategory",
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
    console.log("Subcategory Created:", formData);
  };

  // Step 2: Filter items based on search term
  const filteredItems = useMemo(() => {
    return Items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="Subcategory-list">
      <main className="flex  flex-col md:flex-row justify-between items-center mt-6">
      <div className="w-full flex items-center border border-gray-300 max-w-[400px] rounded-md overflow-hidden mt-3 md:mt-0">
              <span className="pl-2 text-regal-light-gray">
                <FiSearch />
              </span>
              <input
                type="text"
                className="w-full p-2 md:py-3 outline-none text-xs"
                placeholder="Search Subcategory"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Step 3: Update search term
              />
            </div>
        <button
         className="text-regal-sky-blue flex flex-row items-center gap-1 text-xs py-2 px-4 border rounded-md border-regal-sky-blue transition font-[500] active:scale-95" 
          onClick={() => setModalState({ type: "create" })}
        >
          Add Subcategory
        </button>
      </main>

     

      <section className="rounded-2xl border animate-fade-in mt-8 bg-white">
        <div className="">

          {/* Modals */}
          {modalState?.type === "edit" && (
            <ModalForm
              setCreateModel={handleModalClose}
              formType="subcategory"
              onSubmit={handleCreateProduct}
              categories={categories}
              icon={Bag}
              isEdit={true}
              initialData={modalState.data}
            />
          )}

          {modalState?.type === "create" && (
            <ModalForm
              setCreateModel={handleModalClose}
              formType="subcategory"
              onSubmit={handleCreateProduct}
              icon={Bag}
              categories={categories}
            />
          )}

          {modalState?.type === "delete" && (
            <DeleteModal
              isOpen={modalState?.type === "delete"}
              title="Delete Subcategory"
              description={`Are you sure you want to delete ${modalState.data?.name}?`}
              onConfirm={handleDeleteConfirm}
              onClose={handleModalClose}
            />
          )}

          <section className="">
          <div className="flex flex-row items-center px-6 pt-6">
                <h2 className="text-sm md:text-lg font-[700] text-regal-blue">
                All Subcategory ({filteredItems?.length})
                </h2>
                <DropdownDiv dropdownOptions={['All Users', 'Inactive Users']}/>
              </div>
              <PaginatedTable
                columns={columns}
                data={filteredItems}
                actions={actions}
                itemsPerPage={10}
              />
        
          </section>
        </div>
      </section>
    </div>
  );
};


const DropdownDiv = ({dropdownOptions}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [dropdownOption, setDropdownOption] = useState(dropdownOptions[0]);

  const handleOptionChange = (option) => {
    setDropdownOption(option);
    setIsOpenSelect(false);
  };
  return (      
    <div className="relative">
    {/* Dropdown button */}
    <button
      type="button"
      onClick={() => setIsOpenSelect(!isOpenSelect)}
      className="w-full text-xs flex justify-between items-center border rounded-sm py-2 px-3 ml-4 bg-transparent text-gray-700"
    >
      {dropdownOption}
      <SlArrowDown className="text-xs" />
    </button>

    {/* Dropdown menu */}
    {isOpenSelect && (
      <ul className="absolute left-0 pl-4 pr-8 bg-white border text-nowrap shadow-sm rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
        {dropdownOptions.map((option) => (
          <li
            key={option}
            className="py-2 flex flex-row items-center justify-between"
          >
            <button
              type="button"
              className={`text-xs ${
                dropdownOption === option
                  ? "text-regal-blue font-[600]"
                  : ""
              }`}
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>);
}
const ProductName = ({ value, image, viewProduct }) => (
  <div className="flex items-center gap-3 cursor-pointer" onClick={viewProduct}>
    <img src={image} alt={value} className="w-10 h-10 rounded-full" />
    <span>{value}</span>
  </div>
);



export default SubCategoryList;
