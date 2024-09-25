import React, {  } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import {useErrorMessageHooks} from "../../../../hooks/useErrorMessageHooks";
import { useToaster } from "../../../../components/ToasterContext";
import { useResetPasswordUserMutation } from "../../../../features/auth/authApiSlice";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
function ChangePassword() {
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
    <div className="p-4">
      <div className="flex flex-row items-center justify-between mb-4">
        <Link
          to="/settings"
          className="text-regal-black text-sm md:text-xl gap-2  flex items-center font-bold cursor-pointer"
        >
          {" "}
          <HiOutlineArrowLeft /> Change Password
        </Link>
    
      </div>
      <div className="max-w-[500px] mx-auto mt-14">
            {/* Description Text */}
            <p className="text-s text-xs md:text-sm text-center text-regal-light-gray mb-8 font-[400]">
            Create a uniques password that you would remember easily.
            </p>
  
            <form action="" onSubmit={handleSubmit}>
            <div className="mb-4 col-span-2">
            {handleErrorMessagesList('token')}
                <label
                  htmlFor="password"
                  className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
                >
                 old Password
                </label>
                <div className="mb-4 relative">
                  <input
                    type={data?.eyeold ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={data.passwordOld}
                    placeholder="Enter password"
                   
                    className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                  />
                  
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  
                  >
                    {data?.eyeold ? (
                      <AiOutlineEyeInvisible
                        size={20}
                        className="text-regal-light-gray"
                        onClick={()=> setData({...data, eyeold:!data.eyeold})}
                      />
                    ) : (
                      <AiOutlineEye size={20} className="text-regal-light-gray" onClick={()=> setData({...data, eyeold:!data.eyeold})} />
                    )}
                  </div>
                </div>
                {handleErrorMessagesList('password')}
              </div>
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
              <button className="w-full bg-regal-sky-blue text-white font-semibold py-2 rounded mt-5"
              type="submit"
              disabled={isLoading}
              >
                   {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
  
            </form>
        </div>
    </div>
  );
}

export default ChangePassword;
