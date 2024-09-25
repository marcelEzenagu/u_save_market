import React, { useEffect, useState } from 'react';
import { countries } from '../../../data/mockData';
import { BiEditAlt } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { selectCurrentUser, setUserCredentails } from '../../../features/auth/authSlice';
import { useUpdateUserProfilePictureMutation, useUpdateUserProfileMutation } from '../../../features/user/userApiSlice';
import {useErrorMessageHooks} from '../../../hooks/useErrorMessageHooks';
import {useProfileUploadHooks} from '../../../hooks/useProfileUploadHooks';
// Modal component
const Modal = ({ title, children, onClose, onSave, loading }) => {
  return (
    <div className="fixed inset-0 bg-black w-full bg-opacity-75 flex justify-center lg:items-center z-50 animated fadeInDown">
      <div className="bg-white  w-full rounded-md p-6 max-w-[500px] animated fadeInDown">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-regal-sky-blue text-white rounded-md" onClick={onSave} disabled={loading}>{loading ? 'loading...' : 'Edit' }</button>
        </div>
      </div>
    </div>
  );
}

function Account() {
  const user = useSelector(selectCurrentUser);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const {errMsg, data, setData, setErrMsg, dispatch,  handleError, setErrorMessagesList, handleErrorMessagesList} = useErrorMessageHooks();
  const [updateUserProfile, {isLoading : profileLoading}] = useUpdateUserProfileMutation();
  const [updateUserProfilePicture, {isLoading: profilePictureLoading}] = useUpdateUserProfilePictureMutation();
  const {base64String, clearData, imagePreview, error,  handleFileChange} = useProfileUploadHooks();
useEffect(()=>{
  setData({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone,
    country: 'Nigeria',
    state: 'Adamawa',
    city: 'Nguel',
    zipCode: '905794',
    profilePicture: user?.profilePicture,
  });
}, []);
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSavePersonalInfo = async () => {
    setErrMsg("");
    setErrorMessagesList([]);
    try {
      const updateUserDetails = await updateUserProfile({
        firstName: data.firstName,
        lastName: data.lastName,
      }).unwrap();
      dispatch(setUserCredentails({user :updateUserDetails}));
      setIsEditingPersonalInfo(false);
    } catch (err) {
      console.log(err);
      handleError(err, "update profile failed");      
    }
  };

  const handleSaveProfilePicture = async () => {
    setErrMsg("");
    setErrorMessagesList([]);
    if (base64String) {
    try {
      const profilePicture = base64String;
      const updateUserDetails =  await updateUserProfilePicture({ profilePicture: profilePicture }).unwrap();
      setIsEditingProfilePicture(false);
      dispatch(setUserCredentails({user :updateUserDetails}));
    } catch (err) {
     handleError(err, "update profile picture failed, Please check your image might be too large");    
    }
  }else{
    setErrMsg("Please select an image");
  }
  };

  return (
    <div className='p-4'>
      <h6 className='text-regal-black text-sm md:text-xl font-bold'>Account</h6>

      {/* Profile Section */}
      <div className="rounded-md border p-5 mt-4">
        <div className='flex flex-row items-center justify-between'>
          <div className="flex flex-row items-center space-x-4">
            <div className="w-11 h-11 flex flex-col items-center justify-center rounded-full border border-regal-sky-blue">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user?.profilePicture || 'https://as2.ftcdn.net/jpg/02/15/84/43/160_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'}
                alt={user?.firstName}
              />
            </div>
            <div>
              <p className="text-sm text-start text-regal-black font-[700] w-[150px] truncate capitalize">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-regal-light-gray">{user?.email}</p>
            </div>
          </div>
          <button className='flex items-center py-1 px-4 gap-1 rounded-md border border-regal-sky-blue text-regal-sky-blue text-xs md:text-sm font-[500]'
            onClick={() => setIsEditingProfilePicture(true)}>
            Edit <BiEditAlt />
          </button>
        </div>
      </div>

      {/* Personal Info Section */}
      <div className="rounded-md border p-5 mt-4">
        <div className='flex flex-row items-center justify-between'>
          <div className="flex flex-row items-center space-x-4">
            <p className="text-sm text-start text-regal-black font-[700] capitalize">Personal info</p>
          </div>
          <button className='flex items-center py-1 px-4 gap-1 rounded-md border border-regal-sky-blue text-regal-sky-blue text-xs md:text-sm font-[500]'
            onClick={() => setIsEditingPersonalInfo(true)}>
            Edit <BiEditAlt />
          </button>
        </div>
        <div className='min-w-[400px]'>
            <div className='grid grid-cols-2 w-full'>
              <div className='mt-5'>
                <h6 className='text-xs  md:text-sm text-regal-light-gray font-[500]'>First name</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500] capitalize'>
               {user?.firstName}
                </p>
              </div>
              <div className='mt-5'>
                <h6 className='text-xs  md:text-sm text-regal-light-gray font-[500]'>Last Name</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500] capitalize'>
                {user?.lastName}
                </p>
              </div>
              <div className='mt-7 mb-4'>
                <h6 className='text-xs  md:text-sm text-regal-light-gray font-[500]'>Email Address</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
                {user?.email}
                </p>
              </div>
              <div className='mt-7 mb-4'>
                <h6 className='text-xs  md:text-sm text-regal-light-gray font-[500]'>Phone</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500] flex items-center'>
                <img src={countries[0]?.flag} alt="" className='w-6 rounded-sm mr-1' /> {countries[0]?.number} 8037048205
                </p>
              </div>
            </div>
          </div>
      </div>

      {/* Address Section */}
      <div className="rounded-md border p-5 mt-4">
        <div className='flex flex-row items-center justify-between'>
          <div className="flex flex-row items-center space-x-4">
            <p className="text-sm text-start text-regal-black font-[700] capitalize">Address</p>
          </div>
          <button className='flex items-center py-1 px-4 gap-1 rounded-md border border-regal-sky-blue text-regal-sky-blue text-xs md:text-sm font-[500]'
            onClick={() => setIsEditingAddress(true)}>
            Edit <BiEditAlt />
          </button>
        </div>
        <div className='min-w-[400px]'>
            <div className='grid grid-cols-2 w-full'>
              <div className='mt-5'>
                <h6 className='text-xs md:text-sm text-regal-light-gray font-[500]'>Country</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
                Nigeria
                </p>
              </div>
              <div className='mt-5'>
                <h6 className='text-xs md:text-sm text-regal-light-gray font-[500]'>State</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
                Adamawa
                </p>
              </div>
              <div className='mt-7 mb-4'>
                <h6 className='text-xs md:text-sm text-regal-light-gray font-[500]'>City</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
                Nguel
                </p>
              </div>
              <div className='mt-7 mb-4'>
                <h6 className='text-xs md:text-sm text-regal-light-gray font-[500]'>ZIP Code</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500] flex items-center'>
                905794
                </p>
              </div>
            </div>
          </div>
      </div>

      {/* Modals */}
      {isEditingProfilePicture && (
        <Modal title="Edit Profile Picture" loading={profilePictureLoading} onClose={() => {
          setIsEditingProfilePicture(false)
          clearData();
          setErrMsg("");
        }} onSave={handleSaveProfilePicture}>
          <input
            type="file"
            name="profilePicture"
            onChange={(e) => handleFileChange(e)}
          />
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="" className='w-32 h-32 mx-auto my-5 object-cover rounded-full text-center' />
            </div>
          )}
          <p className="text-red-600 text-xs">{error !== '' && error}</p>
            <p className="text-red-600 text-xs">{errMsg !== '' && errMsg}</p>
        </Modal>
      )}

      {isEditingPersonalInfo && (
        <Modal title="Edit Personal Info" loading={profileLoading}  onClose={() => {
          setErrMsg("");
          setIsEditingPersonalInfo(false)
        }} onSave={handleSavePersonalInfo}>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="w-full mb-2 p-2 border"
          />
            {handleErrorMessagesList("firstName")}
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="w-full mb-2 p-2 border"
          />
           {handleErrorMessagesList("lastName")}
           <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
        </Modal>
      )}

      {/* You can add an Address modal similarly if needed */}
    </div>
  );
}

export default Account;
