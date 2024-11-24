import React, { useState, useEffect } from 'react';
import { PiTrash } from "react-icons/pi";
import { SlArrowDown } from "react-icons/sl";
import { countries } from '../../../../data/mockData';
import { useSelector, useDispatch } from 'react-redux';
import useProfileUploadHooks from '../../../../hooks/useProfileUploadHooks';
import { useErrorMessageHooks } from '../../../../hooks/useErrorMessageHooks';
import { selectCurrentUser, setUserCredentails } from '../../../../features/auth/authSlice';
import { RxUpdate } from "react-icons/rx";
import { useUpdateAgentProfileMutation, useUpdateAgentProfilePictureMutation } from '../../../../features/agent/agentApiSlice';

function ProfileDetails() {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [image, setImage] = useState(null); // State for the uploaded image
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [updateAgentProfilePicture, { isLoading }] = useUpdateAgentProfilePictureMutation();
  const [updateAgentProfile, { isLoading: loading }] = useUpdateAgentProfileMutation();
  const { base64String, clearData, imagePreview, error, handleFileChange } = useProfileUploadHooks();
  const { errMsg, data, setData, setErrMsg, dispatch, handleError, setErrorMessagesList, handleErrorMessagesList } = useErrorMessageHooks();
  const user = useSelector(selectCurrentUser);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    setData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      profilePicture: user?.profilePicture || '',
    });
  }, [user]);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpenSelect(false); 
  };

  const handleUpload = async () => {
    setErrMsg("");
    setErrorMessagesList([]);
    if (base64String) {
      try {
        const profilePicture = base64String;
        const response = await updateAgentProfilePicture({ profilePicture }).unwrap();
        reduxDispatch(setUserCredentails({ user: response }));
      } catch (err) {
        handleError(err, "Update profile picture failed, please check your image might be too large");
      }
    }
  };

  const handleSavePersonalInfo = async () => {
    setErrMsg("");
    setErrorMessagesList([]);
    try {
      const updateUserDetails = await updateAgentProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      }).unwrap();
      reduxDispatch(setUserCredentails({ user: updateUserDetails }));
      setIsEditingPersonalInfo(false);
      clearData();
    } catch (err) {
      handleError(err, "Update profile failed");
    }
  };

  console.log("user==",user)
  return (
    <div className="p-4 md:p-8 animate-fade-in">
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
              src={data?.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
            />
          )}
        </div>

        <div className="flex flex-row items-center gap-4 w-full">
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

                          {
                            (!user.isVerified )
                            &&
                            <div className='w-fit'>
                              {
                                 user.interviewDate ?
                              <h5 className=" mt-20 p-2 bg-green-200 rounded border text-regal-black text-[12px]  md:text-sm items-start  font-[600] flex mr-0 flex-col  w-full">
                                          
                                          
                                                  <span className="font-bold text-yellow-600 bg-yellow-100 py-1 px-2 text-xs rounded-sm">
                                                    Pending Interview
                                                  </span>
                                                  <br/>
                                                  <span>{user.interviewDate}</span>
                                                  <a href={user.interviewLink} target="_blank" rel="noopener noreferrer" >Attend interview</a>
                                            </h5>
                                 :
                                 <h5 className=" mt-20 p-2 bg-green-200 rounded border text-regal-black text-[12px]  md:text-sm items-start  font-[600] flex mr-0 flex-col  w-full">
                                  Check back again <br/>
                                  Your interview date is yet to be set.
                                  </h5>
                              }
                            </div>
                          }
      </div>
      
      <div className="text-red-500 bg-white p-2">{error}</div>
      <p className="text-red-600 text-xs">{errMsg && errMsg}</p>

      <section className="max-w-[800px] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-4">
          <div className="mb-1 col-span-2">
            <label htmlFor="firstName" className="block text-xs md:text-[12px] font-[400] leading-6 mb-2 text-regal-black">
              First Name
            </label>
            <div
              className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
            
            >{data.firstName}</div>
           
          </div>

          <div className="mb-1 col-span-2">
            <label htmlFor="lastName" className="block text-xs md:text-[12px] font-[400] leading-6 mb-2 text-regal-black">
              Last Name
            </label>
            <div
              className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
            
            >{data.lastName}</div>
           
          </div>

          <div className="mb-1 col-span-2">
            <label htmlFor="phone" className="block text-xs md:text-[12px] font-[400] leading-6 mb-2 text-regal-black">
              Phone Number
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <div className="relative">
                  <button
                    onClick={() => setIsOpenSelect(!isOpenSelect)}
                    className="w-full flex justify-between items-center border-none rounded-md px-4 py-2 bg-transparent text-gray-700"
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
                            className="w-6 h-4 mr-2"
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
                name="phone"
                id="phone"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full py-3 md:py-4 text-xs pl-28 md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                placeholder="Phone"
              />
            </div>
          </div>

          <div className="mb-1 col-span-2">
            <label htmlFor="email" className="block text-xs md:text-[12px] font-[400] leading-6 mb-2 text-regal-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter Email"
              className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
            />
          </div>

          <div className="mb-1 col-span-2">
            <label htmlFor="homeAddress" className="block text-xs md:text-[12px] font-[400] leading-6 mb-2 text-regal-black">
              Home Address
            </label>
            <input
              type="text"
              name="homeAddress"
              id="homeAddress"
              placeholder="Enter Home Address"
              className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
            />
          </div>
        </div>
        <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
        <button
          onClick={handleSavePersonalInfo}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-regal-blue text-white rounded-md disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </section>
    </div>
  );
}

export default ProfileDetails;
