import React, { useState, useEffect, useRef } from "react";
import Success from "../../../assets/images/payment/success.png";
const ModalForm = ({
  icon,
  setCreateModel,
  formType, // 'product', 'category', 'subcategory'
  isEdit = false, // To switch between create and edit mode
  initialData = {}, // Initial data for edit mode
  onSubmit, // Function to handle form submission
  categories = [], // List of categories for dropdown in subcategory
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
    status: "",
    image: "",
    ...initialData, // Pre-fill fields in edit mode
  });

  const [success, setSuccess] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCreateModel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCreateModel]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFormSubmit = () => {
    onSubmit(formData); // Call parent function to handle form submission
    setSuccess(true); // Show success message after submission
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
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
                placeholder="Enter product name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData?.category}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
                placeholder="Enter category"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Subcategory
              </label>
              <input
                type="text"
                name="subCategory"
                value={formData?.subCategory}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
                placeholder="Enter subcategory"
              />
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
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
                placeholder="Enter category name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-2 text-regal-black">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
              />
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
                name="category"
                value={formData?.category}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
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
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                className="w-full p-3 text-xs border rounded-lg"
                placeholder="Enter subcategory name"
              />
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleFormSubmit}
                className="bg-regal-sky-blue text-xs text-white py-3 px-4 rounded-md hover:bg-regal-sky-blue transition-colors mb-4"
              >
                {isEdit ? `Update ${formType}` : `Add ${formType}`}
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
