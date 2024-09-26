import React, { useMemo, useState, useEffect } from "react";
import { Items } from "../../data/mockData";
import { FiSearch } from "react-icons/fi";
import Bag from "../../assets/images/admin/category.png";
import OrderVendorStatus from "../../components/order/OrderVendorStatus";
import PaginatedTable from "../../components/admin/CatelogueComponents/PaginatedTable";
import ModalForm from "../../components/admin/CatelogueComponents/ModelForm";
import DeleteModal from "../../components/admin/CatelogueComponents/DeleteModal";
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { fetchCategories,addCategory} from "../../features/category/categorySlice";
const CategoryList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Step 1: State for search term
  const [modalState, setModalState] = useState({ type: null, data: null });
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const columns = [
    {
      key: "name",
      label: "NAME",
      render: (value) => value,
    },
    {
      key: "image",
      label: "IMAGE",
      render: (value) => 
      <div className="w-10 h-10">
        <img src={value} alt="" className="w-full h-full object-contain" />
      </div>,
    },
    { key: "status", label: "STATUS", render: () => <OrderVendorStatus /> },
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const handleDeleteConfirm = () => {
    console.log("Item deleted");
    setModalState({ type: null, data: null });
  };

  const handleModalClose = () => {
    setModalState({ type: null, data: null });
  };

  const handleCreateProduct = (formData) => {
    console.log("Category Created:", formData);
    dispatch(addCategory(formData));
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
    return categories?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
              initialData={modalState.data}
            />
          )}

          {modalState?.type === "create" && (
            <ModalForm
              setCreateModel={handleModalClose}
              formType="category"
              onSubmit={handleCreateProduct}
              icon={Bag}
            />
          )}

          {modalState?.type === "delete" && (
            <DeleteModal
              isOpen={modalState?.type === "delete"}
              title="Delete Category"
              description={`Are you sure you want to delete ${modalState.data?.name}?`}
              onConfirm={handleDeleteConfirm}
              onClose={handleModalClose}
            />
          )}

          <section className="">
          <div className="flex flex-row items-center">
            <div className="px-6 pt-6">
            <h2 className="text-sm md:text-lg font-[700] text-regal-blue">
                All Category ({filteredItems?.length})
                </h2>
            </div>

              </div>

              <PaginatedTable
                columns={columns}
                data={filteredItems}
                actions={actions}
                itemsPerPage={10}
              />
              {loading ? "Loading data" :''}
        
          </section>
        </div>
      </section>
    </div>
  );
};



export default CategoryList;
