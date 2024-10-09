import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useErrorMessageHooks } from "../../../../hooks/useErrorMessageHooks";
import { useToaster } from "../../../../components/ToasterContext";
import { useChangePasswordMutation } from "../../../../features/user/userApiSlice";
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

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { showToast } = useToaster();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setErrorMessagesList([]);
    if (data?.newPassword !== data?.confirmpassword) {
      setErrMsg("new password and confirm password must be the same");
    }else{
    try {
      await changePassword({
        oldPassword :data?.oldPassword,
        newPassword: data?.newPassword,
      }).unwrap();

      showToast("Password reset successful", "success");
      setData({
        oldPassword: "",
        newPassword: "",
        confirmpassword: "",
        eye: false,
        eyeConfirm: false,
      });
    } catch (err) {
      console.log(err);
      handleError(err, "Reset Password");
    }
  }
  };

  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-between mb-4">
        <Link
          to="/settings"
          className="text-regal-black text-sm md:text-xl gap-2 flex items-center font-bold cursor-pointer"
        >
          <HiOutlineArrowLeft /> Change Password
        </Link>
      </div>

      <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow-md rounded-md">
        {/* Description */}
        <h2 className="text-xl font-bold text-center text-regal-black mb-4">
          Update Your Password
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Ensure your account is using a secure password. Create a unique
          password that you will remember, and never share it with anyone.
        </p>

        <form action="" onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="mb-6">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-regal-black mb-2"
            >
              Old Password
            </label>
            <div className="relative">
              <input
                type={data?.eyeold ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                onChange={handleChange}
                value={data.oldPassword}
                placeholder="Enter old password"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-regal-blue bg-transparent text-regal-black"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setData({ ...data, eyeold: !data.eyeold })}
              >
                {data?.eyeold ? (
                  <AiOutlineEyeInvisible size={20} className="text-gray-400" />
                ) : (
                  <AiOutlineEye size={20} className="text-gray-400" />
                )}
              </div>
            </div>
            {handleErrorMessagesList("oldPassword")} {handleErrorMessagesList("old password")}
          </div>

          {/* New Password */}
          <div className="mb-6">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-regal-black mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={data?.eye ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                onChange={handleChange}
                value={data.newPassword}
                placeholder="Enter new password"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-regal-blue bg-transparent text-regal-black"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setData({ ...data, eye: !data.eye })}
              >
                {data?.eye ? (
                  <AiOutlineEyeInvisible size={20} className="text-gray-400" />
                ) : (
                  <AiOutlineEye size={20} className="text-gray-400" />
                )}
              </div>
            </div>
            {handleErrorMessagesList("newPassword")} {handleErrorMessagesList("new password")}
          </div>

          {/* Confirm New Password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-regal-black mb-2"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                name="confirmpassword"
                id="confirmPassword"
                onChange={handleChange}
                value={data.confirmpassword}
                type={data.eyeConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-regal-blue bg-transparent text-regal-black"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setData({ ...data, eyeConfirm: !data.eyeConfirm })
                }
              >
                {data?.eyeConfirm ? (
                  <AiOutlineEyeInvisible size={20} className="text-gray-400" />
                ) : (
                  <AiOutlineEye size={20} className="text-gray-400" />
                )}
              </div>
            </div>
            {handleErrorMessagesList("confirmPassword")}
          </div>

          {/* Error Message */}
          {errMsg && <p className="text-red-600 text-xs mb-4">{errMsg}</p>}

          {/* Submit Button */}
          <button
            className="w-full bg-regal-sky-blue text-white font-semibold py-3 rounded-md"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
