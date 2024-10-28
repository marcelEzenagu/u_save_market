import React, { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useProfileUploadHooks } from "../../../../hooks/useProfileUploadHooks";

function Media({ data, handleChange, setData, handleErrorMessagesList }) {
  const [file, setFile] = useState(null);
  const { base64String, clearData, imagePreview, error, handleFileChange } = useProfileUploadHooks();
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  // Function to trigger file selection
  const handleButtonClick = () => fileInputRef.current.click();

  // Function to handle file validation and selection
  const validateAndSelectFile = (file) => {
    if (
      file &&
      (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/webp") &&
      file.size <= MAX_FILE_SIZE
    ) {
      handleFileChange({ target: { files: [file] } });
    } else {
      alert("Please select a valid image file (png, jpeg, webp) under 2MB.");
    }
  };

  // Handle file input change
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    validateAndSelectFile(selectedFile);
  };

  // Handle image drop (drag & drop functionality)
  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    validateAndSelectFile(selectedFile);
  };

  // Handle image drag over
  const handleDragOver = (event) => event.preventDefault();

  // Effect to update state when base64 string is available
  useEffect(() => {
    if (base64String && !data?.images?.includes(base64String)) {
      setData((prevData) => ({
        ...prevData,
        images: [...prevData.images, base64String],
      }));
      clearData();
    } else if (data?.images?.includes(base64String)) {
      alert("This image is already added.");
    }
  }, [base64String, data, setData, clearData]);

  // Remove image from the list
  const handleRemoveImage = (image) => {
    setData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((img) => img !== image),
    }));
  };

  // Image preview component for cleaner code
  const renderImagePreview = (image, index) => (
    <div className="relative bg-white h-[200px] w-[200px] overflow-hidden" key={index}>
      <img src={image} alt={`Preview ${index}`} className="w-full h-full object-contain" />
      <div className="absolute bottom-0 w-full">
        <button
          onClick={() => handleRemoveImage(image)}
          className="p-2 w-full text-xs text-blue-400 bg-blue-100"
          type="button"
        >
          Remove Image
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="mb-2 col-span-2">
        <label htmlFor="ProductName" className="flex items-center text-xs md:text-[12px] font-semibold leading-6 mb-2 text-regal-black">
          Add Product Image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col items-center justify-center border-2 bg-gray-100 border-dashed border-gray-200 rounded-lg p-14 text-center cursor-pointer hover:border-gray-300 transition-colors max-w-[400px]"
          onClick={handleButtonClick}
        >
          <FaPlus className="text-lg text-gray-400 mb-4" />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {handleErrorMessagesList("images")}

        {/* Render Image Previews */}
        <div className="flex flex-nowrap gap-4 mt-4">
          {data?.images?.map((image, index) => renderImagePreview(image, index))}
        </div>
      </div>
    </div>
  );
}

export default Media;
