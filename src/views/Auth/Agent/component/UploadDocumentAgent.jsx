import React, { useState, useRef } from "react";
import { countries } from "../../../../data/mockData";
import { IoCameraOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { MdCloudUpload } from "react-icons/md";
import { PiTrash } from "react-icons/pi";
import { MdOutlineWallpaper } from "react-icons/md";
function UploadDocumentAgent() {
    const [storeName, setStoreName] = useState("");
    const profileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const handleImageUpload = (event) => {
        setProfileImage(URL.createObjectURL(event.target.files[0]));
      };
      const handleProfileINput =() =>{
        profileInputRef.current.click();
      }
      const handleSelect = (country) => {
        setSelectedCountry(country);
        setIsOpenSelect(false); // Close dropdown after selection
      };
      const handleSelection = (event) => {
        setSelectedId(event.target.value);
      };
      const handleImageRemove = () => {
        profileInputRef(null); // Remove the image
      };
  return (
    <div className="animated fadeInDown md:w-[450px] mx-auto">
    <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto ">
    Upload Documents
          </h1>
          {/* Description Text */}
          <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum elit eget purus suscipit, sed egestas 
          </p>
    <div className="mb-4 flex flex-row items-center ">
        
      <input
        type="file"
        ref={profileInputRef}
        onChange={handleImageUpload}
        className="w-full p-3 hidden text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
      />
      {profileImage ? (
        <img
          src={profileImage}
          alt="Profile"
            accept="image/*"
          className=" w-20 h-20 rounded-full object-cover"
          onClick={handleProfileINput}
        />
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-400  w-20 h-20 rounded-full">
          <IoCameraOutline className="text-white text-3xl" onClick={handleProfileINput}/>
        </div>
      )}
        {profileImage ?
            <div className="mx-2">
               <div className='flex flex-row items-center gap-4 '>
           <button  onClick={handleProfileINput} className="flex items-center gap-1 px-4  py-1 md:py-2  font-[600] text-[10px] md:text-xs text-regal-sky-blue border border-regal-sky-blue bg-white rounded-md ">
           <MdOutlineWallpaper className='text-lg ' />   Change Picture
          </button>
        {profileImage && (
          <button
            onClick={handleImageRemove}
            className="flex items-center  px-4 p py-1 md:py-1  space-x-1 border text-regal-light-gray border-regal-light-gray rounded-md"
          >
            <PiTrash className='text-lg ' />
            <span className='font-[600] text-[10px] md:text-xs py-1'>Remove</span>
          </button>
        )}
      </div>
            </div>
        :   <div className="flex flex-col gap-2 ml-5">
        <h5 className="block text-xs font-bold text-regal-black">
          Upload profile
        </h5>
        <h5 className="block text-xs font-[400] text-regal-black">
          Recommended Image is 1200 x 1200
        </h5>
        <h5 className="block text-xs font-[400] text-regal-black">
          Format .jpg, .png
        </h5>
      </div> }
    </div>
    <div className="mb-4">
      <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
        Gender
      </label>
      <select name="" id="" className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black">
      <option value="">select your gender</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
    </div>
    <div className="mb-4">
      <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
        Country
      </label>
      <input
        type="text"
        placeholder="Enter country"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="phone"
        className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
      >
        Phone Number
      </label>
      <div className="relative mt-2 rounded-md ">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {/* <span className="text-gray-500 sm:text-sm">$</span> */}
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <div className="relative">
            {/* Dropdown button */}
            <button
              onClick={() => setIsOpenSelect(!isOpenSelect)}
              className="w-full flex justify-between items-center border-none  rounded-md px-4 py-2 bg-transparent text-gray-700"
            >
              {selectedCountry ? (
                <div className="flex items-center text-sm">
                  <img
                    src={selectedCountry.flag}
                    alt="flag"
                    className="w-6 h-4 mr-2"
                  />
                  {selectedCountry.number}
                </div>
              ) : (
                "Select a country"
              )}

              <SlArrowDown className="ml-1" />
            </button>

            {/* Dropdown menu */}
            {isOpenSelect && (
              <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
                {countries.map((country, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(country)}
                    className="flex items-center text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="w-6 h-4  mr-2"
                    />
                    {country.number}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <input
          type="text"
          name="phonenumber"
          id="phonenumber"
          className="w-full p-3 pl-28 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
          placeholder="Enter phone number"
        />
      </div>
    </div>
    <div className="mb-4">
      <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
        Home Address
      </label>
      <input
        type="text"
        placeholder="Enter Home Address"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
      />
    </div>

    <div className="mt-8">
      <h5 className="text-sm font-[600] text-regal-black">
        Upload means of Identification
      </h5>
      {/* Render the selected form fields */}
      {renderFormFields()}
    </div>
  </div>
  )
}

const renderFormFields = () => {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
      const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(selectedFile);
    }
}
const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };
const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/vnd.ms-excel' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
 return ( 
     <div className="mb-14">
    <div className="mt-4">
      <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
        National ID
      </label>
      <input
        type="text"
        className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
        placeholder="Enter your  National's ID Number"
      />
    </div>
    <div className="mt-4">
      <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
        ID Image
      </label>
      <input
        ref={fileInputRef}
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileSelect}
          className="hidden"
         
        />
      {!file ?<div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col items-center justify-center border-2 bg-gray-100  border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:border-regal-black transition-colors max-w-[400px]"
      >
        <MdCloudUpload  className="text-5xl text-gray-400 mb-4" />
  
        <label
          htmlFor="file-upload"
         className="text-sm  text-regal-black mb-2"
         onClick={handleButtonClick}
        >
        Click or drag file here to upload.
        <br />
        Files accepted- xls, xlxs
        </label>
      </div> : (
        <>
            <div className="flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-regal-auth-bg-color flex flex-col items-center justify-center">
                    <FaRegFileLines className="text-regal-blue"/>
                    </div>
                    <h6 className="text-xs font-[400] text-regal-black">
                        {file?.name}
                    </h6>
                </div>
                <div className="flex flex-row items-center gap-4">
                <FaEdit className="text-xl text-regal-light-gray" onClick={handleButtonClick}/>
                <RiDeleteBin6Line className="text-xl text-regal-light-gray" onClick={()=>{
                    setFile(null)
                }} />
                </div>
            </div>
        </>
      )}

    </div>
  </div>);
  };

export default UploadDocumentAgent