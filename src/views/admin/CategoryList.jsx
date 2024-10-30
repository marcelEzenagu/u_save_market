import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Bag from "../../assets/images/admin/category.png";
import DefaultStatus from "../../components/order/DefaultStatus";
import PaginatedTable from "../../components/admin/CatelogueComponents/PaginatedTable";
import ModalForm from "../../components/admin/CatelogueComponents/ModelForm";
import DeleteModal from "../../components/admin/CatelogueComponents/DeleteModal";
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useGetAdminCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "../../features/category/categoryApiSlice";
// import { addCategory as addCategoryToRedux, updateCategory, deleteCategory } from "../../features/category/categorySlice";
import {useErrorMessageHooks} from "../../hooks/useErrorMessageHooks";
import { useAdminListVendorsQuery } from "../../features/admin/adminApiSlice";
import { useDispatch } from "react-redux";
const CategoryList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Step 1: State for search term
  const [modalState, setModalState] = useState({ type: null, data: null });
  const { handleError, setErrMsg,  setErrorMessagesList, handleErrorMessagesList, errMsg} = useErrorMessageHooks();
  // const { data, isLoading, error } = useGetAdminCategoriesQuery();
  var { data: vendors = [], isLoading, error } = useAdminListVendorsQuery()

  var { data: categories = [], isLoading, error } = useGetAdminCategoriesQuery();
  const [addCategory, {isLoading: addLoading},] = useAddCategoryMutation();
  const [updateCategory,  {isLoading: editLoading}] = useUpdateCategoryMutation();
  const [deleteCategory,  {isLoading: deleteLoading}] = useDeleteCategoryMutation();
  const [success, setSuccess] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const dispatch = useDispatch()

  const columns = [
    {
      key: "categoryName",
      label: "NAME",
      render: (value) => value,
    },
    {
      key: "categoryImage",
      label: "IMAGE",
      render: (value) => (
        <div className="w-10 h-10">
          <img src={value} alt="" className="w-full h-full object-contain" />
        </div>
      ),
    },
    { key: "status", label: "STATUS", render: (value) =>  <DefaultStatus status={value} /> },
  ];

  const actions = [
    {
      label: "Edit Category",
      icon: <FaEdit />,
      onClick: (item) => setModalState({ type: "edit", data: item }),
    },
    {
      label: "Delete Category",
      icon: <IoTrashOutline />,
      onClick: (item) => setModalState({ type: "delete", data: item }),
    },
  ];

  const handleDeleteConfirm = async () => {
    if (modalState.data) {
      try {
        await deleteCategory(modalState.data.categoryID);
        // dispatch(deleteCategory(modalState.data.id));
        console.log("Category deleted:", modalState.data.categoryName);
        setModalState({ type: null, data: null });
        setSuccess(true)

      } catch (err) {
        handleError(err, "category");

        console.error("Failed to delete the category:", err);
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
        const newCategory = await addCategory({...formData}).unwrap();
        // dispatch(addCategoryToRedux(newCategory));
        handleModalClose();
        setSuccess(true)

      } catch (err) {
        handleError(err, "category");
        console.error("Failed to create category:", err);
      }
    } else if (modalState.type === "edit") {
      try {
        console.log(editLoading);
        const updatedCategory = await updateCategory({
          id: modalState.data.categoryID,
          ...formData,
        }).unwrap();
        // dispatch(updateCategory({ id: modalState.data.id, updatedCategory }));
        console.log("Category Updated:", updatedCategory);
        setSuccess(true)
      } catch (err) {
        console.error("Failed to update category:", err);
      }
    }
  };

  const filteredItems = useMemo(() => {
    console.log("vendors:: ",vendors)
    return categories.data?.filter((item) =>
      item?.categoryName?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  
  }, [categories, searchTerm]);

  return (
    <div className="Category-list">
      <main className="flex  flex-col md:flex-row justify-between items-center mt-6">
        <div className="w-full flex items-center border border-gray-300 max-w-[400px] rounded-md overflow-hidden mt-3 md:mt-0">
          <span className="pl-2 text-regal-light-gray">
            <FiSearch />
          </span>
          <input
            type="text"
            className="w-full p-2 md:py-3 outline-none text-xs"
            placeholder="Search Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Step 3: Update search term
          />
        </div>
        <button
          className="text-regal-sky-blue flex flex-row items-center gap-1 text-xs py-2 px-4 border rounded-md border-regal-sky-blue transition font-[500] active:scale-95"
          onClick={() => setModalState({ type: "create" })}
        >
          Add Category
        </button>
      </main>

      <section className="rounded-2xl border animate-fade-in mt-8 bg-white">
        <div className="">
          {/* Modals */}
          {modalState?.type === "edit" && (
            <ModalForm
              setCreateModel={handleModalClose}
              formType="category"
              onSubmit={handleCreateProduct}
              icon={Bag}
              isEdit={true}
              initialData={modalState?.data}
              handleErrorMessagesList={handleErrorMessagesList}
              errMsg={errMsg}
              loading={editLoading}
              success={success}
            />
          )}

          {modalState?.type === "create" && (
            <ModalForm
              setCreateModel={handleModalClose}
              handleErrorMessagesList={handleErrorMessagesList}
              errMsg={errMsg}
              formType="category"
              onSubmit={handleCreateProduct}
              icon={Bag}
              loading={addLoading}
              success={success}
            />
          )}

          {modalState?.type === "delete" && (
            <DeleteModal
              isOpen={modalState?.type === "delete"}
              title="Delete Category"
              description={`Are you sure you want to delete ${modalState?.data?.categoryName}?`}
              onConfirm={handleDeleteConfirm}
              onClose={handleModalClose}
              handleErrorMessagesList={handleErrorMessagesList}
              errMsg={errMsg}
              loading={deleteLoading}
              success={success}
            />
          )}

          <section className="">
            <div className="flex flex-row items-center">
              <div className="px-6 pt-6">
                <h2 className="text-sm md:text-lg font-[700] text-regal-blue">
                  All Categories ({filteredItems?.length})
                </h2>
              </div>
            </div>

           <div className="pb-4">  
           <PaginatedTable
              columns={columns}
              data={categories}
              actions={actions}
              itemsPerPage={perPage}
            />
            {isLoading && <div>Loading data...</div>}
            {error && <div>Error loading categories: {error.message  || "Unknown error"}</div>}

           </div>
         
          </section>
        </div>
      </section>
    </div>
  );
};

export default CategoryList;
