import React, { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Bag from "../../assets/images/admin/category.png";
import PaginatedTable from "../../components/admin/CatelogueComponents/PaginatedTable";
import ModalForm from "../../components/admin/CatelogueComponents/ModelForm";
import DeleteModal from "../../components/admin/CatelogueComponents/DeleteModal";
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import {useErrorMessageHooks} from "../../hooks/useErrorMessageHooks";
import { useGetAdminCategoriesQuery,useGetSubcategoriesQuery,  useAddSubcategoryMutation, useUpdateSubcategoryMutation, useDeleteSubcategoryMutation } from "../../features/category/categoryApiSlice";
import DefaultStatus from "../../components/order/DefaultStatus";
const SubCategoryList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Step 1: State for search term
  const [modalState, setModalState] = useState({ type: null, data: null });
  const [categoryNames, setCatgoryNames] = useState([]);
  const { data: categories = [], isLoading, error } = useGetAdminCategoriesQuery();
  const { data: subCategories = [], isLoading: subIsLoading, error : subError} = useGetSubcategoriesQuery();
  const [SelectedCategory, setSelectedCategory] = useState("All Categories");
  const [addSubcategory, {isLoading: addLoading},] = useAddSubcategoryMutation();
  const [updateSubcategory,  {isLoading: editLoading}] = useUpdateSubcategoryMutation();
  const [deleteSubcategory,  {isLoading: deleteLoading}] = useDeleteSubcategoryMutation();
  const { handleError, setErrMsg,  setErrorMessagesList, handleErrorMessagesList, errMsg} = useErrorMessageHooks();
  const [success, setSuccess] = useState(false);
  useEffect(()=>{
 if (categories) {
  setCatgoryNames(categories.data?.map((i) => i?.categoryName))
 }else{
  setCatgoryNames([]);
 }
  }, [categories]);

  const columns = [
    {
      key: "productCategory",
      label: "CATEGORY",
      render: (value, item) => (
        <ProductName
          value={value}
          image={item?.image}
          categories={categories}
          viewProduct={() => setModalState({ type: "view", data: item })}
        />
      ),
    },
    {
      key: "subCategoryName",
      label: "SUBCATEGORY",
      render: (value) => value,
    },
    { key: "status", label: "STATUS", render: (value) => <DefaultStatus status={value} /> },
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

  const handleDeleteConfirm = async () => {
    if (modalState.data) {
      try {
        await deleteSubcategory(modalState?.data?.subCategoryID);
        // dispatch(deleteSubcategory(modalState.data.id));
        console.log("sub Category deleted:", modalState?.data?.subCategoryName);
        setModalState({ type: null, data: null });
      } catch (err) {
        console.error("Failed to delete the sub Category:", err);
      }
    }
  };

  const handleModalClose = () => {
    setModalState({ type: null, data: null });
    setSuccess(false)
  };

  const handleCreateProduct = async (formData) => {
    setErrMsg("");
    setErrorMessagesList([]);
    
    if (modalState.type === "create") {
      try {
        console.log(formData);
        const newCategory = await addSubcategory({...formData}).unwrap();
        // dispatch(addCategoryToRedux(newCategory));
        console.log("sub Category Created:", newCategory);
        // handleModalClose();
        setSuccess(true)

      } catch (err) {
        handleError(err, "sub category");
        console.error("Failed to create category:", err);
      }
    } else if (modalState.type === "edit") {
      try {
        console.log(editLoading);
        const updatedCategory = await updateSubcategory({
          id: modalState.data.subCategoryID,
          ...formData,
        }).unwrap();
        // dispatch(updateSubcategory({ id: modalState.data.id, updatedCategory }));
        console.log("sub Category Updated:", updatedCategory);
        setSuccess(true)
      } catch (err) {
        console.error("Failed to update sub Category:", err);
      }
    }
  };

  // Step 2: Filter items based on search term
  const filteredItems = useMemo(() => {
    console.log("subCategories::: ",subCategories)

    if (SelectedCategory !== "All Categories") {
      return subCategories?.data?.filter((item) =>
        item?.subCategoryName?.toLowerCase().includes(searchTerm?.toLowerCase()) && 
      item?.productCategory?.categoryName?.toLowerCase() === SelectedCategory?.toLowerCase()
      );
    }else{
      return subCategories?.data?.filter((item) =>
        item?.subCategoryName?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    }

  }, [searchTerm, subCategories, SelectedCategory]);


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
              categories={categories.data}
              icon={Bag}
              isEdit={true}
              initialData={modalState.data}
              handleErrorMessagesList={handleErrorMessagesList}
              errMsg={errMsg}
              loading={editLoading}
              success={success}
            />
          )}

          {modalState?.type === "create" && (
            <ModalForm
              setCreateModel={handleModalClose}
              formType="subcategory"
              onSubmit={handleCreateProduct}
              icon={Bag}
              categories={categories.data}
              loading={addLoading}
              success={success}
              handleErrorMessagesList={handleErrorMessagesList}
            />
          )}

          {modalState?.type === "delete" && (
            <DeleteModal
              isOpen={modalState?.type === "delete"}
              title="Delete Subcategory"
              description={`Are you sure you want to delete ${modalState.data?.subCategoryName}?`}
              onConfirm={handleDeleteConfirm}
              onClose={handleModalClose}
              handleErrorMessagesList={handleErrorMessagesList}
              errMsg={errMsg}
              loading={deleteLoading}
              success={success}
            />
          )}

          <section className="">
          <div className="flex flex-row items-center px-6 pt-6">
                <h2 className="text-sm md:text-lg font-[700] text-regal-blue">
                All Subcategory ({filteredItems?.length})
                </h2>
                <DropdownDiv dropdownOptions={categoryNames} setSelectedCategory={setSelectedCategory} isLoading={isLoading} error={error}/>
              </div>
              <PaginatedTable
                columns={columns}
                data={subCategories}
                actions={actions}
                itemsPerPage={10}
              />
         {subIsLoading && <div>Loading data...</div>}
         {subError && <div>Error loading sub-categories: {subError.message  || "Unknown error"}</div>}
          </section>
        </div>
      </section>
    </div>
  );
};


const DropdownDiv = ({dropdownOptions, setSelectedCategory, isLoading, error}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [dropdownOption, setDropdownOption] = useState("All Categories");

  const handleOptionChange = (option) => {
    setDropdownOption(option);
    setSelectedCategory(option);
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
        <li 
            className="py-2 flex flex-row items-center justify-between"
          >
            <button
              type="button"
              className={`text-xs ${
                dropdownOption === 'All Categories'
                  ? "text-regal-blue font-[600]"
                  : ""
              }`}
              onClick={() => handleOptionChange("All Categories")}
            >
              {'All Categories'}
            </button>
        </li>
        {dropdownOptions?.map((option, index) => (
          <li
            key={index}
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
            {isLoading && <div>Loading data...</div>}
            {error && <div>Error loading categories: {error.message  || "Unknown error"}</div>}
      </ul>
    )}
  </div>);
}

const ProductName = ({ value, image, viewProduct, categories }) => {
  console.log("value::: ",value)
  // const catgoryDetails = categories.data?.find((i) => i?.categoryID === value?.categoryID)
  const catgoryDetails = categories.data?.find((i) => i?.categoryID === value)
  if (catgoryDetails) {  
  return  <div className="flex items-center gap-3 cursor-pointer" onClick={viewProduct}>
  <div className="w-10 h-10">
  <img src={catgoryDetails?.categoryImage} alt={catgoryDetails?.categoryName} className="w-full h-full object-contain" />
  </div>
    <span>{catgoryDetails?.categoryName}</span>
  </div>
  }else{
    return <p>Category not found</p>
  }

};



export default SubCategoryList;
