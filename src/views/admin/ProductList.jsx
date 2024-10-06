import React, { useEffect, useMemo, useState } from "react";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../features/product/productApiSlice"; // Adjust the import path as necessary
import { Items } from "../../data/mockData"; // You may not need this anymore if you're fetching from the API
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
import { numberWithCommas, ReplaceImage } from "../../utils";
import { TfiAngleDown } from "react-icons/tfi";
import {useErrorMessageHooks} from "../../hooks/useErrorMessageHooks";
import { useGetCategoriesQuery,useGetSubcategoriesQuery } from "../../features/category/categoryApiSlice";
import DefaultStatus from "../../components/order/DefaultStatus";
const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalState, setModalState] = useState({ type: null, data: null });
  const [activeTab, setActiveTab] = useState("all");
  const [success, setSuccess] = useState(false);
  const { handleError, setErrMsg,  setErrorMessagesList, handleErrorMessagesList, errMsg} = useErrorMessageHooks();
  const {
    data: products = [],
    isLoading: loadingProducts,
    error,
  } = useGetProductsQuery();
  const { data: categories = [], isLoading, errorCategory } = useGetCategoriesQuery();
  const { data: subCategories = [], isLoading: subIsLoading, error : subError} = useGetSubcategoriesQuery();
  const [addProduct, { isLoading: addLoading }] = useAddProductMutation();
  const [updateProduct, { isLoading: editLoading }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

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
        total: products?.filter((i)=> i?.status.toLowerCase() === "active")?.length,
      },
      {
        name: "Inactive Products",
        icon: <FaHouseChimneyWindow className="text-lg text-regal-blue" />,
        total:  products?.filter((i)=> i?.status.toLowerCase() === "inactive")?.length,
      },
    ],
    [products]
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
      render: (value) => value || "not found",
    },
    { key: "price", label: "PRICE" },
    { key: "stock", label: "STOCK" },
    { key: "supported countries", label: "SUPPORTED COUNTRIES" },
    { key: "unsupported countries", label: "UNSUPPORTED COUNTRIES" },
    { key: "status", label: "STATUS", render: (value) => <DefaultStatus status={value} /> },
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

  const handleDeleteConfirm = async () => {
    if (modalState.data) {
      await deleteProduct(modalState.data.id); // Assuming your product has an 'id'
    }
    setModalState({ type: null, data: null });
  };

  const handleModalClose = () => {
    setModalState({ type: null, data: null });
  };

  const handleCreateProduct = async (formData) => {
    await addProduct(formData);
    setErrMsg("");
    setErrorMessagesList([]);

    if (modalState.type === "create") {
      try {
        console.log(formData);
        const newCategory = await addProduct({ ...formData }).unwrap();
        // dispatch(addCategoryToRedux(newCategory));
        console.log("Product Created:", newCategory);
        // handleModalClose();
        setSuccess(true);
      } catch (err) {
        handleError(err, "Product");
        console.error("Failed to Product:", err);
      }
    } else if (modalState.type === "edit") {
      try {
        console.log(editLoading);
        const updatedProduct = await updateProduct({
          id: modalState.data.subCategoryID,
          ...formData,
        }).unwrap();
        // dispatch(updateSubcategory({ id: modalState.data.id, updatedCategory }));
        console.log("sub Product Updated:", updatedProduct);
        setSuccess(true);
      } catch (err) {
        console.error("Failed to update Product:", err);
      }
    }
  };

  const tabOptions = useMemo(
    () => [
      { id: "all", name: "All" },
      { id: "active", name: "Active" },
      { id: "inactive", name: "Inactive" },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    console.log(products);
    if (activeTab !== 'all') {
      return products.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item?.status?.toLowerCase() === activeTab
      );
    }else{
      return products.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
  }, [searchTerm, products, activeTab]);

  return (
    <div className="product-list">
      <main className="flex flex-col md:flex-row justify-between items-center mt-6">
        <DateFilters />
        <button
          className="text-white flex flex-row items-center gap-1 text-xs py-2 px-4 border rounded-md bg-regal-sky-blue transition font-[500] active:scale-95"
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
              handleErrorMessagesList={handleErrorMessagesList}
              errMsg={errMsg}
              initialData={modalState.data}
              loading={editLoading}
              success={success}
              categories={categories}
              subCategories={subCategories}
            />
          )}

          {modalState?.type === "create" && (
            <ModalForm
              setCreateModel={handleModalClose}
              formType="product"
              onSubmit={handleCreateProduct}
              icon={Bag}
              handleErrorMessagesList={handleErrorMessagesList}
              errMsg={errMsg}
              loading={addLoading}
              success={success}
              categories={categories}
              subCategories={subCategories}
            />
          )}

          {modalState?.type === "delete" && (
            <DeleteModal
              isOpen={modalState?.type === "delete"}
              title="Delete Product"
              description={`Are you sure you want to delete ${modalState.data?.name}?`}
              onConfirm={handleDeleteConfirm}
              onClose={handleModalClose}
              handleErrorMessagesList={handleErrorMessagesList}
              errMsg={errMsg}
              loading={deleteLoading}
              success={success}
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
                isLoading={loadingProducts} // Add loading state for the table
              />
            )}
                  {loadingProducts && <div>Loading data...</div>}
                  {error && <div>Error loading Product: {error.message  || "Unknown error"}</div>}
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
          <div className="w-12 h-12 rounded-full bg-regal-auth-bg-color flex justify-center items-center">
            {" "}
            {item.icon}{" "}
          </div>{" "}
          <div>
            {" "}
            <h6 className="font-medium text-xs">{item.name}</h6>{" "}
            <span className="font-semibold text-sm">{item.total}</span>{" "}
          </div>{" "}
        </div>
      ))}{" "}
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
  <div className="flex items-center gap-2 cursor-pointer" onClick={viewProduct}>
    {" "}
    <img src={image} alt={value} className="w-12 h-12 rounded" />{" "}
    <span className="text-sm">{value}</span>{" "}
  </div>
);
export default ProductList;
