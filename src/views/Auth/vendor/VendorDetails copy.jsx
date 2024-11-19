import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Logo from "../../../assets/images/nav/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "../../../data/mockData";
import { SlArrowDown } from "react-icons/sl";
import { IoCameraOutline } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useErrorMessageHooks from "../../../hooks/useErrorMessageHooks";
import { useSelector } from "react-redux";
import { useUpdateVendorProfileMutation } from "../../../features/vendor/vendorApiSlice";
import useProfileUploadHooks from "../../../hooks/useProfileUploadHooks";
import { RxUpdate } from "react-icons/rx";
import { PiTrash } from "react-icons/pi";

const ProgressFormPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState({}); 

  const [body, setBody] = useState({
    profileImage: "",
    fullName: "",
    country: "",
    phoneNumber: "",
    homeAddress: "",
    idDocumentType: "",
    businessAddress: "",
    businessEmail: "",
    businessPhoneNumber: "",
    businessName: "",
    cacNumber: "",
    cacDocument: "",
    cacDocumentPrev: "",
    businessBankAccount: "",
    bankName: "",
    businessBankAccountName: "",
    idDocument: "",
    idDocumentPrev: "",
    acknowledgment: false,
  });

  const [storeName, setStoreName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [businessDetails, setBusinessDetails] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const { base64String, clearData, imagePreview, error, handleFileChange } =
    useProfileUploadHooks();

  const [updateVendor,isLoading] = useUpdateVendorProfileMutation();

  const user = useSelector((state) => state.auth?.user);

  console.log("USER-body-images::::", images);
  // const [base64String, setBase64String] = useState('');
  // const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  // manage not verified email
  useLayoutEffect(() => {
    // console
    if (user && !user?.isEmailVerified) {
      navigate("vendor/verify-email");
    }
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  const handleProfileINput = () => {
    profileInputRef.current.click();
  };

  const StepDetails = [
    // {
    //   name: "NAME STORE",
    //   header: "Naming your store",
    //   Description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum elit eget purus suscipit, sed egestas ",
    // },
    // {
    //   name: "NAME STORE",
    //   header: "Naming your store",
    //   Description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum elit eget purus suscipit, sed egestas ",
    // },
    {
      name: "IDENTIFICATION",
      header: "Upload documents",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum elit eget purus suscipit, sed egestas ",
    },
    {
      name: "BUSINESS DETAILS",
      header: "Tell us about your business",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum elit eget purus suscipit, sed egestas ",
    },
    {
      name: "BUSINESS DETAILS",
      header: "Enter account details",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum elit eget purus suscipit, sed egestas ",
    },
    {
      name: "ACCEPTANCE FORM",
      header: "Acceptance Form",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum elit eget purus suscipit, sed egestas ",
    },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    handleComplete();
  };

  const handleComplete = async () => {
    console.log("DATAAAA====", body);
    console.log("profileImage====", profileImage);
    console.log("file====", file);
    console.log("selectedCountry====", selectedCountry);

    const req = {
      ...body,
    };
    await updateVendor();
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePhoneChange = (event) => {
    const { name, value } = event.target;

    // console.log("selectedCountry:::",selectedCountry)

    setBody((prev) => ({
      ...prev,
      [name]: `${selectedCountry.number}-${value}`,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBody((prev) => ({
      ...prev,
      [name]: name != "acknowledgment" ? value : !body.acknowledgment,
    }));
  };

  const handleImageUpload = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0]; // Get the selected file

  //   if (file) {
  //     const reader = new FileReader();

  //     // Define the callback for when the file is read
  //     reader.onloadend = () => {
  //       const base64String = reader.result; // Get the base64 string
  //       setBase64String(base64String);
  //       setImagePreview(base64String); // Set image preview
  //       setUploadStatus("")
  //       console.log("base64String",base64String); // Logs the base64 string of the image
  //     };
  //     // Read the file as a Data URL (which contains the base64 string)
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleUpload = async () => {
    try {
      const response = await axios.patch(`${baseUrl}/vendors`, {
        businessProfilePicture: base64String,
      });

      if (response.status === 200) {
        setUploadStatus("Image uploaded successfully!");
      } else {
        setUploadStatus("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Error uploading image.");
    }
  };

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpenSelect(false); // Close dropdown after selection
  };

  const handleSelection = (event) => {
    setSelectedId(event.target.value);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "application/vnd.ms-excel" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImageSelect = (e) => {
    const { name } = e.target;
    // const selectedFile = e.target.files[0];
    handleFileChange(e);
    // console.log("base64String=====", imagePreview);
    // setBody((prev) => ({
    //   ...prev,
    //   [name]: base64String,
    //   [name + "Prev"]: imagePreview,
    // }));

    setImages((prev) => ({
      ...prev,
      [name]: {
        base64: base64String,
        preview: imagePreview,
      },
    }));
  


    // if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    //   setFile(selectedFile);
    // }
  };

  // const handleImageSelect = (e) => {
  //   const { name } = e.target;
  //   // const selectedFile = e.target.files[0];
  //   handleFileChange(e);
  //   console.log("base64String=====", imagePreview);
  //   setBody((prev) => ({
  //     ...prev,
  //     [name]: base64String,
  //     [name + "Prev"]: imagePreview,
  //   }));

  //   // if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
  //   //   setFile(selectedFile);
  //   // }
  // };


  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setFile(selectedFile);
    }
  };

  const renderForm = ({ user }) => {
    switch (step) {
      case 1:
        //   return (
        //     <div className="animated fadeInDown">
        //       <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
        //         Store Name
        //       </label>
        //       <input
        //         type="text"
        //         placeholder="Enter store name"
        //         value={storeName}
        //         onChange={(e) => setStoreName(e.target.value)}
        //         className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
        //       />
        //     </div>
        //   );
        // case 2:
        return (
          <div className="animated fadeInDown">
            <div className="mb-4 flex flex-row items-center ">
              <input
                type="file"
                ref={profileInputRef}
                onChange={handleImageSelect}
                className="w-full p-3 hidden text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
              />
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className=" w-24 h-24 rounded-full object-cover"
                  onClick={handleProfileINput}
                />
              ) : (
                <div className="flex flex-col items-center justify-center bg-gray-400  w-24 h-24 rounded-full">
                  <IoCameraOutline
                    className="text-white text-3xl"
                    onClick={handleProfileINput}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2 ml-5">
                <h5 className="block text-xs font-bold text-regal-black">
                  Upload profile
                </h5>
                <h5 className="block text-xs font-[400] text-regal-black">
                  Recommended Image is 1200 x 1200
                </h5>
                <h5 className="block text-xs font-[400] text-regal-black">
                  Format .jpg, .png
                </h5>
              </div>
            </div>

            <div className="flex items-center space-x-4">
        <div className="relative">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
            />
          ) : (
            <img
              src={'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
            />
          )}
        </div>

        <div className="flex flex-row items-center gap-4">
          {imagePreview ? (
            <>
              <button onClick={handleUpload} className="md:text-xs flex items-center px-4 py-1 space-x-1 border-[1.5px] text-white border-regal-sky-blue bg-regal-sky-blue rounded-md">
                <RxUpdate className="text-lg" />
                <span className="font-[600] text-[10px] md:text-xs py-1" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update'}
                </span>
              </button>
              <button onClick={clearData} className="flex items-center px-4 py-1 space-x-1 border-[1.5px] text-regal-light-gray border-regal-light-gray rounded-md">
                <PiTrash className="text-lg" />
                <span className="font-[600] text-[10px] md:text-xs py-1">Remove</span>
              </button>
            </>
          ) : (
            <label className="block text-[10px] md:text-xs font-medium text-gray-700">
              <span className="inline-block px-4 py-2 md:py-2 text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-md cursor-pointer">
                Change Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </span>
            </label>
          )}
        </div>
      </div>
            
            <div className="mb-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Full Name
              </label>

              <div className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black">
                {user?.firstName} {user?.lastName}
              </div>

              {/* <input
                type="text"
                placeholder="Enter full name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
              /> */}
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
                  onChange={handlePhoneChange}
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
                value={body.homeAddress}
                name="homeAddress"
                onChange={handleChange}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
              />
            </div>

            <hr className="mt-5 mb-8 border-[1.2px]" />

            <div>
              <h5 className="text-sm font-[600] text-regal-black">
                Upload means of Identification
              </h5>
              <div className="flex flex-col space-y-5 mt-4">
                <label className="inline-flex items-center ">
                  <input
                    type="radio"
                    name="idDocumentType"
                    value="drivers_license"
                    checked={selectedId === "drivers_license"}
                    onChange={handleSelection}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-xs text-regal-black font-[500]">
                    Driver’s License
                  </span>
                </label>
                <label className="inline-flex items-center ">
                  <input
                    type="radio"
                    name="idDocumentType"
                    value="passport"
                    checked={selectedId === "passport"}
                    onChange={handleSelection}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-xs text-regal-black font-[500]">
                    International Passport
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="idDocumentType"
                    value="national_id"
                    checked={selectedId === "national_id"}
                    onChange={handleSelection}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-xs text-regal-black font-[500]">
                    National ID
                  </span>
                </label>
              </div>
              {/* Render the selected form fields */}
              {renderFormFields()}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animated fadeInDown">
            <div className="mb-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Business Address
              </label>
              <input
                type="text"
                placeholder="Enter business address"
                value={body.businessAddress}
                name="businessAddress"
                onChange={handleChange}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Business Email
              </label>
              <input
                type="email"
                placeholder="Enter business email"
                value={body.businessEmail}
                name="businessEmail"
                onChange={handleChange}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Business Phone Number
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
                  name="businessPhoneNumber"
                  id="businessPhoneNumber"
                  onChange={handlePhoneChange}
                  className="w-full p-3 pl-28 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <hr className="mt-5 mb-8 border-[1.2px]" />

            <div>
              <h5 className="text-sm font-[600] text-regal-black">
                Upload CAC Document
              </h5>
              <div className="mt-4">
                <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                  ID Image
                </label>

                {images.cacDocument?.preview ? (
                <img
                  src={images.cacDocument?.preview}
                  alt="Profile"
                  className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
                /> ):
                <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  name="cacDocument"
                />
                                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="flex flex-col items-center justify-center border-2 bg-gray-100  border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:border-regal-black transition-colors max-w-[400px]"
                  >
                    <MdCloudUpload className="text-5xl text-gray-400 mb-4" />

                    <label
                      htmlFor="file-upload"
                      className="text-sm  text-regal-black mb-2"
                      onClick={handleImageSelect}
                    >
                      Click or drag file here to upload.
                      <br />
                      Files accepted- pdf, png, jpeg, jpg
                    </label>
                  </div>
                </>
    }
                {/* {!file ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="flex flex-col items-center justify-center border-2 bg-gray-100  border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:border-regal-black transition-colors max-w-[400px]"
                  >
                    <MdCloudUpload className="text-5xl text-gray-400 mb-4" />

                    <label
                      htmlFor="file-upload"
                      className="text-sm  text-regal-black mb-2"
                      onClick={handleButtonClick}
                    >
                      Click or drag file here to upload.
                      <br />
                      Files accepted- pdf, png, jpeg, jpg
                    </label>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-row items-center justify-between mt-4">
                      <div className="flex flex-row items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-regal-auth-bg-color flex flex-col items-center justify-center">
                          <FaRegFileLines className="text-regal-blue" />
                        </div>
                        <h6 className="text-xs font-[400] text-regal-black">
                          {file?.name}
                        </h6>
                      </div>
                      <div className="flex flex-row items-center gap-4">
                        <FaEdit
                          className="text-xl text-regal-light-gray"
                          onClick={handleButtonClick}
                        />
                        <RiDeleteBin6Line
                          className="text-xl text-regal-light-gray"
                          onClick={() => {
                            setFile(null);
                          }}
                        />
                      </div>
                    </div>
                  </>
                )} */}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animated fadeInDown">
            <div className="mb-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Bank Name
              </label>
              <input
                type="text"
                placeholder="Enter bank name"
                name="bankName"
                value={body.bankName}
                onChange={handleChange}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Account Name
              </label>
              <input
                type="text"
                name="businessBankAccountName"
                placeholder="Enter bank Name"
                value={body.businessBankAccountName}
                onChange={handleChange}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Account Number
              </label>

              <input
                type="text"
                name="businessBankAccount"
                placeholder="Enter bank Name"
                value={body.businessBankAccount}
                onChange={handleChange}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animated fadeInDown">
            <div className="mb-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Acknowledgement Form
              </label>
              <div>
                <p>This is the</p>
              </div>
              <div className="flex items-center py-2">
                <input
                  type="checkbox"
                  name="acknowledgment"
                  value={body.acknowledgment}
                  onChange={handleChange}
                  className="text-xs mr-3 md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
                />{" "}
                <p>I accept the terms and conditions</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  
  const renderFormFields = () => {
    let formFields;
  
    switch (selectedId) {
      case "drivers_license":
        formFields = (
          <>
            <div className="mt-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Driver’s License Number
              </label>
              <input
                type="text"
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
                placeholder="Enter your Driver’s License Number"
              />
            </div>
          </>
        );
        break;
  
      case "passport":
        formFields = (
          <>
            <div className="mt-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Passport Number
              </label>
              <input
                type="text"
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
                placeholder="Enter your Passport Number"
              />
            </div>
            <div className="mt-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Country of Issue
              </label>
              <input
                type="text"
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
                placeholder="Enter the Country of Issue"
              />
            </div>
          </>
        );
        break;
  
      case "national_id":
        formFields = (
          <>
            <div className="mt-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                National ID Number
              </label>
              <input
                type="text"
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
                placeholder="Enter your National ID Number"
              />
            </div>
          </>
        );
        break;
  
      default:
        formFields = null;
        break;
    }
  
    return (
      <div>
        {formFields}
        {/* Common ID Image Field */}
        <div className="mt-4">
          <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
            ID Image
          </label>
          {images?.idDocument?.preview ? (
            <img
              src={images?.idDocument?.preview}
              alt="Profile"
              className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
            />
          ) : (
            <input
              type="file"
              name="idDocument"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          )}
          {!images?.idDocument?.preview  ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center border-2 bg-gray-100 border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:border-regal-black transition-colors max-w-[400px]"
            >
              <MdCloudUpload className="text-5xl text-gray-400 mb-4" />
              <label
                className="text-sm text-regal-black mb-2"
                onClick={handleButtonClick}
              >
                Click or drag file here to upload.
                <br />
                Files accepted- pdf, png, jpeg, jpg
              </label>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-between mt-4">
              </div>
          )}
          </div>
        </div>
        )
      }

  // const renderFormFields = () => {
  //   switch (selectedId) {
  //     case "drivers_license":
  //       return (
  //         <div>
  //           <div className="mt-4">
  //             <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
  //               Driver’s License Number
  //             </label>

  //             <input
  //               type="text"
  //               className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
  //               placeholder="Enter your Driver’s License Number"
  //             />
  //           </div>
  //           <div className="mt-4">
  //             <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
  //               ID Image
  //             </label>

  //             {images?.idDocument?.preview ? (
  //               <img
  //                 src={images?.idDocument?.preview}
  //                 alt="Profile"
  //                 className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
  //               />
  //             ) : (
  //               <input
  //                 ref={fileInputRef}
  //                 type="file"
  //                 name="idDocument"
  //                 accept="image/*"
  //                 onChange={ handleImageSelect}
  //                 className="hidden"
  //               />
  //             )}
  //             {!file ? (
  //               <div
  //                 onDrop={handleDrop}
  //                 onDragOver={handleDragOver}
  //                 className="flex flex-col items-center justify-center border-2 bg-gray-100  border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:border-regal-black transition-colors max-w-[400px]"
  //               >
  //                 <MdCloudUpload className="text-5xl text-gray-400 mb-4" />

  //                 <label
  //                   htmlFor="file-upload"
  //                   className="text-sm  text-regal-black mb-2"
  //                   onClick={handleButtonClick}
  //                 >
  //                   Click or drag file here to upload.
  //                   <br />
  //                   Files accepted- pdf, png, jpeg, jpg
  //                 </label>
  //               </div>
  //             ) : (
  //               <>
  //                 <div className="flex flex-row items-center justify-between mt-4">
  //                   <div className="flex flex-row items-center gap-4">
  //                     <div className="w-10 h-10 rounded-lg bg-regal-auth-bg-color flex flex-col items-center justify-center">
  //                       <FaRegFileLines className="text-regal-blue" />
  //                     </div>
  //                     <h6 className="text-xs font-[400] text-regal-black">
  //                       {file?.name}
  //                     </h6>
  //                   </div>
  //                   <div className="flex flex-row items-center gap-4">
  //                     <FaEdit
  //                       className="text-xl text-regal-light-gray"
  //                       onClick={handleButtonClick}
  //                     />
  //                     <RiDeleteBin6Line
  //                       className="text-xl text-regal-light-gray"
  //                       onClick={() => {
  //                         setFile(null);
  //                       }}
  //                     />
  //                   </div>
  //                 </div>
  //               </>
  //             )}
  //           </div>
  //         </div>
  //       );
  //     case "passport":
  //       return (
  //         <div>
  //           <div className="mt-4">
  //             <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
  //               Passport Number
  //             </label>
  //             <input
  //               type="text"
  //               className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
  //               placeholder="Enter your Passport Number"
  //             />
  //             <label className="block text-sm font-medium text-gray-700 mt-4">
  //               Country of Issue
  //             </label>
  //             <input
  //               type="text"
  //               className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
  //               placeholder="Enter the Country of Issue"
  //             />
  //           </div>
  //           <div className="mt-4">
  //             <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
  //               ID Image
  //             </label>

  //             {images?.idDocument?.preview ? (
  //               <img
  //                 src={images?.idDocument?.preview}
  //                 alt="Profile"
  //                 className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
  //               />
  //             ) : (
  //               <input
  //                 ref={fileInputRef}
  //                 type="file"
  //                 name="idDocument"
  //                 accept="image/*"
  //                 onChange={handleImageSelect}
  //                 className="hidden"
  //               />
  //             )}
  //             {!file ? (
  //               <div
  //                 onDrop={handleDrop}
  //                 onDragOver={handleDragOver}
  //                 className="flex flex-col items-center justify-center border-2 bg-gray-100  border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:border-regal-black transition-colors max-w-[400px]"
  //               >
  //                 <MdCloudUpload className="text-5xl text-gray-400 mb-4" />

  //                 <label
  //                   htmlFor="file-upload"
  //                   className="text-sm  text-regal-black mb-2"
  //                   onClick={handleButtonClick}
  //                 >
  //                   Click or drag file here to upload.
  //                   <br />
  //                   Files accepted- pdf, png, jpeg, jpg
  //                 </label>
  //               </div>
  //             ) : (
  //               <>
  //                 <div className="flex flex-row items-center justify-between mt-4">
  //                   <div className="flex flex-row items-center gap-4">
  //                     <div className="w-10 h-10 rounded-lg bg-regal-auth-bg-color flex flex-col items-center justify-center">
  //                       <FaRegFileLines className="text-regal-blue" />
  //                     </div>
  //                     <h6 className="text-xs font-[400] text-regal-black">
  //                       {file?.name}
  //                     </h6>
  //                   </div>
  //                   <div className="flex flex-row items-center gap-4">
  //                     <FaEdit
  //                       className="text-xl text-regal-light-gray"
  //                       onClick={handleButtonClick}
  //                     />
  //                     <RiDeleteBin6Line
  //                       className="text-xl text-regal-light-gray"
  //                       onClick={() => {
  //                         setFile(null);
  //                       }}
  //                     />
  //                   </div>
  //                 </div>
  //               </>
  //             )}
  //           </div>
  //         </div>
  //       );
  //     case "national_id":
  //       return (
  //         <div>
  //           <div className="mt-4">
  //             <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
  //               National ID Number
  //             </label>
  //             <input
  //               type="text"
  //               className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
  //               placeholder="Enter your National ID Number"
  //             />
  //           </div>
  //           <div className="mt-4">
  //             <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
  //               ID Image
  //             </label>
  //             {images?.idDocument?.preview ? (
  //               <img
  //                 src={images?.idDocument?.preview}
  //                 alt="Profile"
  //                 className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
  //               />
  //             ) : (
  //               <input
  //                 ref={fileInputRef}
  //                 type="file"
  //                 name="idDocument"
  //                 accept="image/*"
  //                 onChange={handleImageSelect}
  //                 className="hidden"
  //               />
  //             )}
  //             {!file ? (
  //               <div
  //                 onDrop={handleDrop}
  //                 onDragOver={handleDragOver}
  //                 className="flex flex-col items-center justify-center border-2 bg-gray-100  border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:border-regal-black transition-colors max-w-[400px]"
  //               >
  //                 <MdCloudUpload className="text-5xl text-gray-400 mb-4" />

  //                 <label
  //                   htmlFor="file-upload"
  //                   className="text-sm  text-regal-black mb-2"
  //                   onClick={handleButtonClick}
  //                 >
  //                   Click or drag file here to upload.
  //                   <br />
  //                   Files accepted- pdf, png, jpeg, jpg
  //                 </label>
  //               </div>
  //             ) : (
  //               <>
  //                 <div className="flex flex-row items-center justify-between mt-4">
  //                   <div className="flex flex-row items-center gap-4">
  //                     <div className="w-10 h-10 rounded-lg bg-regal-auth-bg-color flex flex-col items-center justify-center">
  //                       <FaRegFileLines className="text-regal-blue" />
  //                     </div>
  //                     <h6 className="text-xs font-[400] text-regal-black">
  //                       {file?.name}
  //                     </h6>
  //                   </div>
  //                   <div className="flex flex-row items-center gap-4">
  //                     <FaEdit
  //                       className="text-xl text-regal-light-gray"
  //                       onClick={handleButtonClick}
  //                     />
  //                     <RiDeleteBin6Line
  //                       className="text-xl text-regal-light-gray"
  //                       onClick={() => {
  //                         setFile(null);
  //                       }}
  //                     />
  //                   </div>
  //                 </div>
  //               </>
  //             )}
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="p-2 md:p-8 max-w-[1366px] mx-auto">
      <div className="grid lg:grid-cols-2 ">
        {/* Left Section */}
        <div className="w-full bg-gray-100  py-5 px-2 md:px-8 md:py-0 md:min-h-[690px] h-full">
          {/* Logo */}
          <Link to="/" className="mb-10">
            <img src={Logo} alt="" className="w-36 " />
          </Link>
          {/* Step Number and Name */}
          <div className="mb-4 mt-8">
            <span className="text-[13px]  font-[500] text-regal-light-gray">
              0{step}/0{StepDetails.length}{" "}
              <span className="ml-3"> {StepDetails[step]?.name}</span>
            </span>
            <h2 className="text-tabs-header-text font-bold text-gray-800 mt-3 max-w-[470px] leading-[3.2rem]  animate-fade-in">
              {StepDetails[step]?.header}
            </h2>
          </div>
          {/* Description */}
          <p className="text-gray-600 text-[12px] lg:text-[17px]  font-[400] text-regal-light-gray max-w-[500px]  animate-fade-in">
            {StepDetails[step]?.Description}
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:p-8 flex flex-col justify-between">
          {/* Form */}
          <div className="mb-8 mt-11 w-full px-2 md:px-0 md:w-[550px] mx-auto">
            {renderForm({ user })}
          </div>
        </div>
      </div>
      {/* Progress Bar & Navigation */}
      <div>
        <div className="flex-1 h-2 my-8 bg-gray-300 rounded-full">
          <div
            className={`h-full bg-regal-blue rounded-full transition-all duration-300`}
            style={{ width: `${(step / StepDetails.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={step === 1}
            className={`px-4 md:px-14 py-2 rounded-md  border text-xs md:text-sm font-[500]  ${
              step === 1
                ? "text-white bg-gray-300"
                : "border-regal-sky-blue text-regal-sky-blue "
            }`}
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            // disabled={step === (StepDetails.length)}
            className={`px-4 md:px-14 py-2 rounded-md  border text-xs md:text-sm font-[500]  ${
              step === StepDetails.length
                ? "text-white bg-regal-sky-blue"
                : "border-regal-sky-blue text-regal-sky-blue "
            }`}
          >
            {step === StepDetails.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressFormPage;
