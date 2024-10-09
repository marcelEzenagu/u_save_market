import React, { useState, useEffect, useRef } from "react";
import Success from "../../../assets/images/payment/success.png";
import {useProfileUploadHooks} from "../../../hooks/useProfileUploadHooks";
import { IoClose } from "react-icons/io5";
const ModalForm = ({
  icon,
  setCreateModel,
  formType, // 'product', 'category', 'subcategory'
  isEdit = false, // To switch between create and edit mode
  initialData = {}, // Initial formData for edit mode
  onSubmit, // Function to handle form submission
  categories = [], // List of categories for dropdown in subcategory
  subCategories = [], // List of subCategories for dropdown products
  loading = false,
  success = false,
  handleErrorMessagesList,
  errMsg,
  countries = [],
  loadingCountries = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    categoryName: "",
    subCategory: "",
    status: "",
    image: "",
    productCategory : "",
    productSubCategory: "",
    categoryImage:"",
    productSupportedCountries:[],
    ...initialData, // Pre-fill fields in edit mode
  });
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const {error, handleFileChange, base64String, imagePreview, clearData} = useProfileUploadHooks();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCreateModel();
        clearData();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCreateModel]);

  useEffect(()=> {
    if (formType === 'category' && base64String) {
      setFormData({
        ...formData,
        categoryImage : base64String ,
      });
    } 
  }, [base64String]);

  const handleInputChange  =  (e) => {
    if (e.target.type === 'file') {
      handleFileChange(e)
    }else{
        const { name, value, files } = e.target;
        setFormData({
          ...formData,
          [name]: files ? files[0] : value,
        });
    }

  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setFilteredCountries(
      countries.filter((country) =>
        country?.name?.toLowerCase().includes(query)
      )
    );
  };
  
  const handleSelectCountry = (country) => {
    if (!formData?.productSupportedCountries.includes(country)) {
      setFormData((prevData) => ({
        ...prevData,
        productSupportedCountries: [...prevData?.productSupportedCountries, country],
      }));
      setSearchTerm("");
    }

  };

  const handleRemoveCountry = (country) => {
    setFormData((prevData) => ({
      ...prevData,
      productSupportedCountries: prevData?.productSupportedCountries.filter(
        (c) => c !== country
      ),
    }));
  };
  const handleFormSubmit = () => {
    onSubmit(formData); // Call parent function to handle form submission
  };

  const renderFormFields = () => {
    switch (formType) {
      case "product":
        return (
          <>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData?.productName}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
                placeholder="Enter product name"
              />
                {handleErrorMessagesList("productName")}
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Category
              </label>
              <select
                name="productCategory"
                value={formData?.productCategory}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.categoryID}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              {handleErrorMessagesList("productCategory")}
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Sub Category
              </label>
              <select
                name="productSubCategory"
                value={formData?.productSubCategory}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
              >
                <option value="">Select Category</option>
                {subCategories.map((cat) => (
                  <option key={cat.id} value={cat.subCategoryID}>
                    {cat.subCategoryName}
                  </option>
                ))}
              </select>
              {handleErrorMessagesList("productSubCategory")}
            </div>

            {/* supported countries*/}
            <div className="grid grid-cols-1 md:grid-cols-2  col-span-2 md:col-span-2 mb-2">
      {/* Supported Countries */}
      <div className="mb-2 col-span-2">
        <label
          htmlFor="SupportedCountries"
          className="block text-xs md:text-[12px] font-[400] leading-6 mb-2 text-regal-black"
        >
          Supported Countries
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 text-xs md:text-[12px] border rounded-lg focus:outline-regal-blue"
            placeholder="Search countries"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <ul className="absolute w-full bg-white border mt-1 z-10 max-h-40 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <li
                    key={country.id}
                    onClick={() => handleSelectCountry(country.name)}
                    className="p-2 text-xs hover:bg-gray-100 cursor-pointer"
                  >
                    {country.name}
                  </li>
                ))
              ) : (
                <li className="p-2 text-xs text-gray-500">No countries found</li>
              )}
              {loadingCountries &&  <li className="p-2  text-xs text-gray-500">loading...</li>}
            </ul>
          )}
        </div>
        {handleErrorMessagesList("productSupportedCountries")}
        
        {/* Selected countries */}
        <div className="flex gap-2 flex-wrap mt-2">
          {formData?.productSupportedCountries?.map((country, index) => (
            <span
              key={index}
              className=" text-xs capitalize flex items-center p-2 rounded gap-2 border"
            >
              {country}
              <IoClose
                className="cursor-pointer"
                onClick={() => handleRemoveCountry(country)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
               {/* Status Field */}
               <div className="mb-4">
                <label className="block text-xs font-semibold mb-2 text-regal-black">
                  Status
                </label>
                <select
                  name="productStatus"
                  value={formData?.productStatus}
                  onChange={handleInputChange}
                  className="w-full p-3 text-xs border rounded-lg"
                >
                  <option value="">Select Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                {handleErrorMessagesList("productStatus")}
              </div>
          </>
        );
      case "category":
        return (
          <>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                value={formData?.categoryName}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
                placeholder="Enter category name"
              />
                {handleErrorMessagesList("categoryName")}
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Upload Image
              </label>
              {formData?.categoryImage ? 
              <>
                 <input
                 type="file"
                 name="categoryImage"
                 onChange={handleInputChange}
                 className="w-full p-3 text-xs border rounded-lg"
               /> 
                <div className="w-14 h-14">
                  <img src={formData?.categoryImage} alt="" className="w-full h-full object-contain"/>
                </div>
              
              </>

               :
               <input
               type="file"
               name="categoryImage"
               onChange={handleInputChange}
               className="w-full p-3 text-xs border rounded-lg"
             />
              }
           
               {handleErrorMessagesList("categoryImage")}
            </div>
               {/* Status Field */}
               <div className="mb-4">
                <label className="block text-xs font-semibold mb-2 text-regal-black">
                  Status
                </label>
                <select
                  name="status"
                  value={formData?.status}
                  onChange={handleInputChange}
                  className="w-full p-3 text-xs border rounded-lg"
                >
                  <option value="">Select Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                {handleErrorMessagesList("status")}
              </div>
          </>
        );
      case "subcategory":
        return (
          <>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Category
              </label>
              <select
                name="productCategory"
                value={formData?.productCategory}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.categoryID}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Subcategory Name
              </label>
              <input
                type="text"
                name="subCategoryName"
                value={formData?.subCategoryName}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
                placeholder="Enter subcategory name"
              />
            </div>
               {/* Status Field */}
               <div className="mb-4">
                <label className="block text-xs font-semibold mb-2 text-regal-black">
                  Status
                </label>
                <select
                  name="status"
                  value={formData?.status}
                  onChange={handleInputChange}
                  className="w-full p-3 text-xs border rounded-lg"
                >
                  <option value="">Select Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                {handleErrorMessagesList("status")}
              </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        className={`bg-white rounded-2xl shadow-lg w-full ${
          !success ? "max-w-xl" : "max-w-md"
        } relative overflow-hidden`}
        ref={dropdownRef}
      >
           {!success &&  !isEdit && <div className="flex px-8 py-9   relative bg-gray-50">
              <div className="absolute top-5 flex flex-col items-center justify-center bg-gray-200 px-2 rounded-full border-4 border-white">
                <img
                  src={icon}
                  alt="Profile"
                  className="w-16 h-20 rounded-full object-contain  "
                />
              </div>
            </div>}
        {!success ? (
          <div className="p-8 mt-5">
              {/* Header */}
              <h2 className="text-2xl font-bold mb-1 capitalize">
                {isEdit ? `Edit ${formType}` : `Add ${formType}`}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-xs mb-6">
                {isEdit
                  ? `Update the details for this ${formType}.`
                  : `To add a new ${formType}, please provide the correct details below.`}
              </p>

              {/* Render Form Fields */}
              {renderFormFields()}

           
                {/* error message */}
                <p className="text-red-600">{errMsg}</p>
                <p className="text-red-600">{error}</p>
              {/* Submit Button */}
              <button
                onClick={handleFormSubmit}
                className="bg-regal-sky-blue text-xs text-white py-3 px-4 rounded-md hover:bg-regal-sky-blue transition-colors mb-4"
                disabled={loading}
              >
               {loading ? "loading..." : isEdit ? `Update ${formType}` : `Add ${formType}` }
              </button>
            </div>
        ) : (
          <div className="flex flex-col items-center py-14 justify-center">
            {/* Success Image */}
            <img src={Success} alt="Success" className="w-20 h-20 mb-4" />

            {/* Success Text */}
            <h2 className="text-2xl mb-4 font-bold text-regal-black ">
              {isEdit ? `${formType} Updated` : `New ${formType} Added`}
            </h2>

            {/* Close Button */}
            <button
              onClick={() => setCreateModel()}
              className="bg-regal-sky-blue text-xs text-white py-3 px-20 rounded-md hover:bg-regal-sky-blue transition-colors mb-4"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalForm;
