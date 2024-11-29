import React, { useState,useEffect, useRef } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { MdCloudUpload } from "react-icons/md";
import { PiTrash } from "react-icons/pi";
import { MdOutlineWallpaper } from "react-icons/md";
function UploadDocumentAgent({setData,body}) {
    
    const countries = JSON.parse(localStorage.getItem("countries"));
    const [selectedId, setSelectedId] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]||"");
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const profileInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const backInputRef = useRef(null);

    const [error, setError] = useState("");


  useEffect(() => {
  
    if (body.country) {
      const filtered = countries.filter(
        (country) => country.name?.toLowerCase() === body.country.toLowerCase()
      );
      console.log("FILTERED:: ", filtered);
  
      // Only update selectedCountry if it's different
      if (!selectedCountry || filtered[0]?.name !== selectedCountry.name) {
        setSelectedCountry(filtered[0] || null);
      }
    }
  }, [body.country, countries]); 

    const clearFile = (name) => {
      setData((prev) => ({
        ...prev,
        [name]: "",
      }));
    };
    console.log("BODY @UploadDocumentAgent ===",body)

    const handleSelection = (e) => {
      const {name,value} = e.target
      setSelectedId(value);
      setData(prev => ({
        ...prev,
        [name]:value
      }))
    };

    const handleImageUpload = (event) => {
        setProfileImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleProfileINput =() =>{
      profileInputRef.current.click();
    }

    const handleSelect = (country) => {

      console.log("handleSelect",country)

      setSelectedCountry(country);
      setIsOpenSelect(false); // Close dropdown after selection
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setData((prev) => ({
        ...prev,
        [name]: value
      }));
    };
    
    const handleImageRemove = () => {
      profileInputRef(null); // Remove the image
    };

    const handlePhoneChange = (event) => {
      const { name, value } = event.target;
  
      if(name == "phoneNumber"){
        setBody((prev) => ({
          ...prev,
          [name]: `${selectedCountry.number}-${value}`,
        }));
  
      }else if (name =="businessPhoneNumber"){
        setBody((prev) => ({
          ...prev,
          [name]: `${selectedBusinessCountry.number}-${value}`,
        }));
      }
    };

    console.log("body===",body)

    const handleCountrySelect = (country) => {
      console.log("COUNTRY=handleCountrySelect:: =",country)
  
      setData((prev) => ({
        ...prev,
        country,
      }));
    };

    const handleImage = async (e) => {
      console.log("=handleImage clicked===")
      const { name } = e.target;
  
      console.log("NAME===",name)
      const MAX_FILE_SIZE = 2 * 1024 * 1024 ; // 2MB in bytes
  
      setError("");
      const file = e.target.files[0]; // Get the selected file
      try {
        if (!file) {
          setError("No file selected");
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          setError(
            "File size exceeds the 2MB limit. Please choose a smaller file."
          );
        }
        if (file) {
          const reader = new FileReader();
          console.log("setting file");
          // Define the callback for when the file is read
          reader.onloadend = () => {
            const base64String = reader.result; // Get the base64 string
           
            setData((prev) => ({
              ...prev,
              [name]: base64String,
              // preview: base64String,
            }));
          };
          // Read the file as a Data URL (which contains the base64 string)
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.log(error);
        setError("something went wrong selecting your image.", error);
      }
    };

    const renderFormFields = () => {
      let formField;
    
      if (selectedId == "drivers_license"){
        formField = (
          <div>
            <div className="mt-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Driver’s License Number
              </label>
    
              <input
                type="text"
                name="idDocumentNumber"
                onChange={handleChange}
                value={body.idDocumentNumber}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
                placeholder="Enter your Driver’s License Number"
              />
            </div>
          </div>
        );
    
      }else if (selectedId == "passport"){
        formField = (
          <div>
            <div className="mt-4">
              <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                Passport Number
              </label>
              <input
                type="text"
    
                name="idDocumentNumber"
                onChange={handleChange}
                value={body.idDocumentNumber}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
                placeholder="Enter your Passport Number"
              />
              {/* <label className="block text-sm font-medium text-gray-700 mt-4">
                Country of Issue
              </label>
              <input
                type="text"
    
                name="idDocumentNumber"
                onChange={handleChange}
                value={body.idDocumentNumber}
                className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
                placeholder="Enter the Country of Issue"
              /> */}
            </div>
          </div>
        );
    
    
    }else if (selectedId == "national_id"){
      formField = (
        <div>
          <div className="mt-4">
            <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
              National ID Number
            </label>
            <input
              type="text"
    
              name="idDocumentNumber"
              onChange={handleChange}
              value={body.idDocumentNumber}
              className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"
              placeholder="Enter your National ID Number"
            />
          </div>
        </div>
      );
    
    }
        
      return (
        <div>
          {formField}
          {/* Common ID Image Field */}
          {body.idDocumentType && (
            <div className="flex-col items-center justify-between">
              <div className="mt-4">
                <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                  ID Image (Front)
                </label>
    
                {body.idDocumentFront ? (
                  <div className="flex flex-row items-center justify-between mt-4">
                    <img
                      src={body.idDocumentFront}
                      alt="Profile"
                      className="w-[200px] h-[200px] rounded-lg object-cover border border-gray-300"
                    />
                    <button
                      onClick={() => clearFile("idDocumentFront")}
                      className="flex items-center px-4 py-1 space-x-1 border-[1.5px] text-regal-light-gray border-regal-light-gray rounded-md"
                    >
                      <PiTrash className="text-lg" />
                      <span className="font-[600] text-[10px] md:text-xs py-1">
                        Remove
                      </span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center border-2 bg-gray-100  border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:border-regal-black transition-colors max-w-[400px]"
                    >
                      <MdCloudUpload className="text-5xl text-gray-400 mb-4"></MdCloudUpload>
    
                      <label
                        htmlFor="file-upload"
                        className="text-sm  text-regal-black mb-2"
                      >
                        Click or drag file here to upload.
                        <br />
                        Files accepted- png, jpeg, jpg
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImage}
                          className="hidden"
                          name="idDocumentFront"
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
                  ID Image (Back)
                </label>
    
                {body.idDocumentBack ? (
                  <div className="flex flex-row items-center justify-between mt-4">
                    <img
                      src={body.idDocumentBack}
                      alt="Profile"
                      className="w-[200px] h-[200px] rounded-lg object-cover border border-gray-300"
                    />
                    <button
                      onClick={() => clearFile("idDocumentBack")}
                      className="flex items-center px-4 py-1 space-x-1 border-[1.5px] text-regal-light-gray border-regal-light-gray rounded-md"
                    >
                      <PiTrash className="text-lg" />
                      <span className="font-[600] text-[10px] md:text-xs py-1">
                        Remove
                      </span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => backInputRef.current.click()}
                      className="flex flex-col items-center justify-center border-2 bg-gray-100  border-dashed border-gray-400 rounded-lg p-12 text-center cursor-pointer hover:border-regal-black transition-colors max-w-[400px]"
                    >
                      <MdCloudUpload className="text-5xl text-gray-400 mb-4"></MdCloudUpload>
    
                      <label
                        htmlFor="file-upload"
                        className="text-sm  text-regal-black mb-2"
                      >
                        Click or drag file here to upload.
                        <br />
                        Files accepted- png, jpeg, jpg
                        <input
                          ref={backInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImage}
                          className="hidden"
                          name="idDocumentBack"
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      );
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
      
      <div className="flex items-center space-x-4">
              <div className="relative">
                {body.profilePicture ? (
                  <img
                    src={body.profilePicture}
                    alt="Profile"
                    className=" w-20 h-20 rounded-full object-cover"

                    // className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
                  />
                ) : (
                 
                  <div className="flex flex-col items-center justify-center bg-gray-400  w-20 h-20 rounded-full">
                  <IoCameraOutline className="text-white text-3xl" onClick={handleProfileINput}/>
                </div>
                )}
              </div>

              <div className="flex flex-row items-center gap-4">
                {body.profilePicture ? (
                  <>
                    {/* <button
                      onClick={handleUpload}
                      className="md:text-xs flex items-center px-4 py-1 space-x-1 border-[1.5px] text-white border-regal-sky-blue bg-regal-sky-blue rounded-md"
                    >
                      <RxUpdate className="text-lg" />
                      <span
                        className="font-[600] text-[10px] md:text-xs py-1"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Update"}
                      </span>
                    </button> */}
                    <button
                      onClick={()=>clearFile("profilePicture")}
                      className="flex items-center px-4 py-1 space-x-1 border-[1.5px] text-regal-light-gray border-regal-light-gray rounded-md"
                    >
                      <PiTrash className="text-lg" />
                      <span className="font-[600] text-[10px] md:text-xs py-1">
                        Remove
                      </span>
                    </button>
                  </>
                ) : (
                  <label className="block text-[10px] md:text-xs font-medium text-gray-700">
                    <span className="inline-block px-4 py-2 md:py-2 text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-md cursor-pointer">
                      Change Picture
                      <input
                        type="file"
                        ref={profileInputRef}
                        accept="image/*"
                        onChange={handleImage}
                        className="hidden"
                        name="profilePicture"

                      />
                    </span>
                  </label>
                )}
              </div>
            </div>
      <div className="mb-4">
        <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
          Gender
        </label>
        <select name="gender"
          onChange={handleChange}
          id="" className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black">
        <option value="">select your gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black">
          Country
        </label>
        <SearchableDropdown
                  options={countries}
                  onSelect={handleCountrySelect}
                  selected_country={body.country}
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
                    <span className="w-6 h-6 mr-2 text-lg">
                            {selectedCountry.flag}
                          </span>
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
                      
                      <span className="w-6 h-6 mr-2 text-lg">
                              {country.flag}
                            </span>
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
          name="homeAddress"
          value={body.homeAddress}
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
    )

}

const SearchableDropdown = ({ options, onSelect,selected_country }) => {
  const [search, setSearch] = useState(""); // State to manage search input
  const [selectedCountry, setSelectedCountry] = useState(null); // State to track selected country

  // Filter countries based on the search input
  const filteredCountries = options
    .filter((country) =>
      country?.name?.toLowerCase().includes(search?.toLowerCase())
    )
    .map((country) => country.name);

  // Handle country selection
  const handleSelect = (country) => {
    console.log("COUNTRY:: =",country)
    setSelectedCountry(country);
    setSearch(""); // Reset search input after selecting
    onSelect(country); // Call the onSelect callback with the selected country
  };
  console.log("COUNTRY-selected_country:: =",selected_country, "search==",search,"selectedCountry" ,selectedCountry)

  return (
    <div>
      {/* Input field for search */}
      <input
        type="text"
        placeholder="Type to search..."
        value={search ? search :selected_country  || selectedCountry}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black"

        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />

      {/* Filtered country list */}
      {search && (
        <ul
          style={{
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "scroll",
            paddingLeft: "0",
            listStyleType: "none",
          }}
        >
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <li
                key={index}
                onClick={() => handleSelect(country)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedCountry === country ? "#f0f0f0" : "white",
                }}
              >
                {country}
              </li>
            ))
          ) : (
            <li style={{ padding: "8px" }}>No countries found</li>
          )}
        </ul>
      )}

      {/* Display the selected country */}
      {/* {selectedCountry && (
        <div style={{ marginTop: "10px" }}>{selectedCountry}</div>
      )} */}
    </div>
  );
};

export default UploadDocumentAgent

