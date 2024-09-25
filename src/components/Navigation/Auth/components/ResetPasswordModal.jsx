import React, { useState, useEffect, useLayoutEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {useErrorMessageHooks} from "../../../../hooks/useErrorMessageHooks";
import { useResetPasswordUserMutation } from "../../../../features/auth/authApiSlice";
import { useToaster } from "../../../ToasterContext";
const ResetPasswordModal = ({handleToggle, verifiedDetails, setVerifiedDetails, onClose}) => {
    const {
        setErrorMessagesList,
        handleErrorMessagesList,
        setErrMsg,
        errMsg,
        handleError,
        setData,
        handleChange,
        data,
        } = useErrorMessageHooks();
    useLayoutEffect(()=>{
      if (!verifiedDetails?.email || !verifiedDetails?.requestID || !verifiedDetails?.token){
        handleToggle('login');
      }
     }, [verifiedDetails])
  
    const [resetPasswordUser, { isLoading }] = useResetPasswordUserMutation();
    const { showToast } = useToaster(); 
  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrMsg("");
      setErrorMessagesList([]);
      try {
        const userData = await resetPasswordUser({
          token: verifiedDetails?.token,
          password: data.password,
          confirmPassword: data.confirmpassword,
        }).unwrap();
        handleToggle('login');
        console.log(userData);
        setVerifiedDetails({});
        onClose();
        showToast('Password reset successful', 'success');
        setData({
          password: "",
          confirmpassword: "",
          eye: false,
          eyeConfirm: false,
        });
      } catch (err) {
        console.log(err);
        handleError(err, 'Reset Password');
      }
    };

    return (
  
      <div className="max-w-[400px]">
            {/* Description Text */}
            <p className="text-s text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
            Create a uniques password that you would remember easily.
            </p>
  
            <form action="" onSubmit={handleSubmit}>
          
            <div className="mb-4 col-span-2">
            {handleErrorMessagesList('token')}
                <label
                  htmlFor="password"
                  className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
                >
                 New Password
                </label>
                <div className="mb-4 relative">
                  <input
                    type={data?.eye ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={data.password}
                    placeholder="Enter password"
                   
                    className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                  />
                  
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  
                  >
                    {data?.eye ? (
                      <AiOutlineEyeInvisible
                        size={20}
                        className="text-regal-light-gray"
                        onClick={()=> setData({...data, eye:!data.eye})}
                      />
                    ) : (
                      <AiOutlineEye size={20} className="text-regal-light-gray" onClick={()=> setData({...data, eye:!data.eye})} />
                    )}
                  </div>
                </div>
                {handleErrorMessagesList('password')}
              </div>
      
              <div className="mb-4 col-span-2">
                <label
                  htmlFor="Confirm password"
                  className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
                >
                 Confirm password
                </label>
                <div className="mb-4 relative">
                  <input
                    name="confirmpassword"
                    id="Confirm password"
                    onChange={handleChange}
                          value={data.confirmpassword}
                          type={data.eyeConfirm ? "text" : "password"}
                    placeholder="Enter password"
                    
                    className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
               
                  >
                    {data?.eyeConfirm ? (
                      <AiOutlineEyeInvisible
                        size={20}
                        className="text-regal-light-gray"
                        onClick={() =>
                          setData({ ...data, eyeConfirm: !data.eyeConfirm })
                        }
                      />
                    ) : (
                      <AiOutlineEye size={20} className="text-regal-light-gray"   onClick={() =>
                          setData({ ...data, eyeConfirm: !data.eyeConfirm })
                        } />
                    )}
                  </div>
                </div>
                {handleErrorMessagesList('confirmPassword')}
              </div>
              <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
              <div className="w-full flex flex-row gap-4 ">       
              <button className="w-full bg-regal-blue text-white font-semibold py-2 rounded-full"
              type="submit"
              disabled={isLoading}
              >
                   {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
  
            </form>
        </div>
    );
  }

  export default ResetPasswordModal;