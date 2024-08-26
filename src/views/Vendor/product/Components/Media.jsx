import React, { useState, useRef } from 'react';
import { FaPlus, FaRegFileImage, FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

function Media() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === 'image/png' ||
        selectedFile.type === 'image/jpeg' ||
        selectedFile.type === 'image/webp') &&
      selectedFile.size <= MAX_FILE_SIZE
    ) {
      setFile({
        img: URL.createObjectURL(selectedFile),
        name: selectedFile.name,
      });
    } else {
      alert(
        'Please select a valid image file (png, jpeg, webp) with a size less than 2MB.'
      );
    }
  };

  const handleDrop = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === 'image/png' ||
        selectedFile.type === 'image/jpeg' ||
        selectedFile.type === 'image/webp') &&
      selectedFile.size <= MAX_FILE_SIZE
    ) {
      setFile({
        img: URL.createObjectURL(selectedFile),
        name: selectedFile.name,
      });
    } else {
      alert(
        'Please select a valid image file (png, jpeg, webp) with a size less than 2MB.'
      );
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="mb-2 col-span-2">
          <label
            htmlFor="ProductName"
            className="flex items-center  text-xs md:text-[12px] font-[600] leading-6 mb-2 text-regal-black"
          >
            Add Product Image  {file && <span onClick={()=>{setFile(null)}}><RiDeleteBin6Line className='text-red-600 text-sm ml-2'/></span>}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center border-2 bg-gray-100 border-dashed border-gray-200 rounded-lg p-14 text-center cursor-pointer hover:border-gray-300 transition-colors max-w-[400px]"
            >
              <FaPlus onClick={handleButtonClick} className="text-lg text-gray-400 mb-4" />
            </div>
          ) : (
            <div  className="text-xs font-[500] animate-fade-in mt-4 ">
            <div className="relative bg-white h-[200px] w-[200px]   overflow-hidden">
            <img
                  src={file.img}
                  alt={file?.name}
                  className="w-full h-full object-contain"
                />
            
            <div className="absolute bottom-0  w-full">
            <button 
            onClick={handleButtonClick} 
            className="p-2 w-full text-xs text-blue-400 bg-blue-100 ">
            Change Image
            </button>
            </div>
            </div>
            
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Media;

