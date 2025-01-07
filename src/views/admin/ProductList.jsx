import React, { useMemo, useState } from "react";
import {
  useGetProductsAdminQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../features/product/productApiSlice"; // Adjust the import path as necessary
import { FiSearch } from "react-icons/fi";
import Bag from "../../assets/images/admin/bag.png";
import PaginatedTable from "../../components/admin/CatelogueComponents/PaginatedTable";
import ModalForm from "../../components/admin/CatelogueComponents/ModelForm";
import DeleteModal from "../../components/admin/CatelogueComponents/DeleteModal";
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { HiUsers } from "react-icons/hi2";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import {useErrorMessageHooks} from "../../hooks/useErrorMessageHooks";
import { useGetAdminCategoriesQuery,useGetSubcategoriesQuery } from "../../features/category/categoryApiSlice";
import DefaultStatus from "../../components/order/DefaultStatus";
import { useGetCountriesQuery } from "../../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
  } = useGetProductsAdminQuery();
  const {
    data: countries = [],
    isLoading: loadingCountries,
    errorCountries,
  } = useGetCountriesQuery();
  const countriesList = useSelector((state) => state?.auth?.countries);
  const { data: categories = [], isLoading, errorCategory } = useGetAdminCategoriesQuery();
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
        total:  products.data?.filter((i)=> i?.productStatus?.toLowerCase() === "active")?.length ,
      },
      {
        name: "Inactive Products",
        icon: <FaHouseChimneyWindow className="text-lg text-regal-blue" />,
        total: products.data?.filter((i)=> i?.productStatus?.toLowerCase() === "inactive")?.length,
      },
    ],
    [products]
  );

  const columns = [
    {
      key: "productName",
      label: "PRODUCT NAME",
      render: (value, item) => (
        <ProductName
        value={value}
        viewProduct={() => setModalState({ type: "view", data: item })}
      />
      ),
    },
    {
      key: "productCategory",
      label: "CATEGORY",
      render: (value) => (
        <ProductCategoryName
        value={value}
        categories={categories}
      />
      ),
    },
    {
      key: "productSubCategory",
      label: "SUB CATEGORY",
      render: (value) => (
        <ProductSubCategoryName
        value={value}
        subCategories={subCategories}
      />
      ),
    },
    { key: "price", label: "PRICE" },
    { key: "stock", label: "STOCK" },
    { key: "productSupportedCountries", label: "SUPPORTED COUNTRIES",
      render: (value) => (
        <ProductCountryList
        value={value}
        countriesList={countriesList}
      />
      ),
     },
    { key: "unsupported countries", label: "UNSUPPORTED COUNTRIES" },
    { key: "productStatus", label: "STATUS", render: (value) => <DefaultStatus status={value} /> },
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
      await deleteProduct(modalState?.data?.productID);
    }
    setModalState({ type: null, data: null });
  };

  const handleModalClose = () => {
    setSuccess(false);
    setModalState({ type: null, data: null });
  };

  const handleCreateProduct = async (formData) => {
    setErrMsg("");
    setErrorMessagesList([]);
    if (modalState.type === "create") {
      try {
        console.log(formData,"formData");
        
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
          id: modalState.data.productID,
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
    if (activeTab !== 'all') {
      return products?.data?.filter((item) =>
        item?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) && item?.productStatus?.toLowerCase() === activeTab
      );
    }else{
      return products?.data?.filter((item) =>
        item?.productName?.toLowerCase().includes(searchTerm.toLowerCase())
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
              categories={categories.data}
              subCategories={subCategories.data}
              countries={countries}
              loadingCountries={loadingCountries}
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
              categories={categories.data}
              subCategories={subCategories.data}
              countries={countries}
              loadingCountries={loadingCountries}
            />
          )}

          {modalState?.type === "delete" && (
            <DeleteModal
              isOpen={modalState?.type === "delete"}
              title="Delete Product"
              description={`Are you sure you want to delete ${modalState.data?.productName}?`}
              onConfirm={handleDeleteConfirm}
              onClose={handleModalClose}
              handleErrorMessagesList={handleErrorMessagesList}
              errMsg={errMsg}
              loading={deleteLoading}
              success={success}
            />
          )}

       
            {modalState?.type === "view" && modalState?.data !== null ? (
              <ProductView
                product={modalState?.data}
                filteredItems={filteredItems}
                close={() => setModalState({ type: null, data: null })}
              />
            ) : (
              <main className="p-4 md:px-8 md:pt-8 pb-4">
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
          <section className="mt-8">
              <PaginatedTable
                columns={columns}
                data={products}
                actions={actions}
                itemsPerPage={10}
                isLoading={loadingProducts} // Add loading state for the table
              />
              {loadingProducts && <div>Loading data...</div>}
              {error && <div>Error loading Product: {error?.message  || "Unknown error"}</div>}
           </section>
           </main>
            )}
                 

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
      {items?.map((item) => (
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
    {options?.map((tab) => (
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



const ProductView = ({ product, filteredItems, close }) => {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden">
    
      <div className="bg-regal-dashboard-active-tab-gray border-b flex flex-row justify-between items-center p-4">
                <button className="flex flex-row gap-2 items-center text-xs font-[600]"
                onClick={()=>{
                  onClose();
                }}>
                    <AiOutlineArrowLeft className="font-[400]" />
                    Go Back
                </button>

                <div className="flex flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                        {/* <img
                            src={userInfo.profileImage || "https://via.placeholder.com/40"}
                            alt="Profile"
                            className="w-6 h-6 rounded-full object-cover"
                        /> */}
                        <span className="text-xs capitalize text-regal-black whitespace-nowrap font-[600]">
                            {product?.productName}
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <IoIosArrowBack className="text-regal-crum-gray text-sm" />
                        <span className="text-regal-black text-xs">
                            <span className="text-regal-crum-gray text-xs">1 of</span> 350
                        </span>
                        <IoIosArrowForward className="text-regal-black text-sm" />
                    </div>
                </div>
            </div>

      {/* Product Information */}
      <div className="flex space-x-6  p-4 max-w-[1366px]">
        {/* <img
          src={product?.images[0]}
          alt={product?.productName}
          className="w-32 h-32 object-cover rounded-md"
        /> */}
        <div>
          <h2 className="text-2xl font-bold capitalize">{product?.productName}</h2>
          {/* <p className="text-xl font-semibold text-gray-700 mt-1">₦{product?.price}</p> */}
        </div>
      </div>

      {/* General Information Section */}
      <div className="mt-6 border rounded-lg m-4  p-4">
        <h3 className="font-semibold text-gray-700 mb-4">General Information</h3>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">Product Name</label>
          <input
            type="text"
           className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
            value={product?.productName}
            readOnly
          />
        </div>

        {/* Category and Sub Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">Category</label>
            <select
             className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              value={product?.productCategory}
              disabled
            >
              <option>{product?.productCategory}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">Sub Category</label>
            <select
             className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              value={product?.productSubCategory}
              disabled
            >
              <option>{product?.productSubCategory}</option>
            </select>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-4">
          <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">Product Description</label>
          <textarea
           className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
            rows="4"
            value={product?.description}
            readOnly
          />
        </div>
      </div>
    </div>
 
  );
};



const ProductName = ({ value, image, viewProduct }) => (
  <div className="flex items-center gap-2 cursor-pointer" onClick={viewProduct}>
    <span className="text-sm capitalize">{value}</span>{" "}
  </div>
);

const ProductCategoryName =  ({ value, categories }) => {
  const catgoryDetails = categories.data?.find((i) => i?.categoryID === value)
  if (catgoryDetails) {  
  return  <div className="flex items-center gap-3 cursor-pointer capitalize" >
  <div className="w-10 h-10">
  <img src={catgoryDetails?.categoryImage} alt={catgoryDetails?.categoryName} className="w-full h-full object-contain" />
  </div>
    <span>{catgoryDetails?.categoryName}</span>
  </div>
  }else{
    return <p>Category not found</p>
  }
}

const ProductSubCategoryName =  ({ value, subCategories }) => {
  const catgoryDetails = subCategories?.data?.find((i) => i?.subCategoryID === value)
  if (catgoryDetails) {  
  return  <div className="flex items-center gap-3 cursor-pointer capitalize" >
    <span>{catgoryDetails?.subCategoryName}</span>
  </div>
  }else{
    return <p>Category not found</p>
  }
}

const ProductCountryList =  ({ value, countriesList }) => {
  const countriesDetails = countriesList?.filter((i) => value?.includes(i?.name))
  if (countriesDetails) {  
  return  <div className="flex items-center gap-3 cursor-pointer capitalize" >
    {countriesDetails?.map((i)=> (
          <span className="flex items-center gap-1 text-xs mx-2">
              <img src={`https://flagcdn.com/w320/${i?.code?.toLowerCase()}.png`} alt={i?.name} className="w-4 h-2" />
            {i?.name}
            </span>
    ))}
  </div>
  }else{
    return <p>Category not found</p>
  }
}
export default ProductList;
