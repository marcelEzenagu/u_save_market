import React, { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    // Handle account deletion logic here
    console.log("Account deleted.");
    closeModal();
  };

  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-between mb-4">
        <Link
          to="/settings"
          className="text-regal-black text-sm md:text-xl gap-2 flex items-center font-bold cursor-pointer"
        >
          <HiOutlineArrowLeft /> Back to Settings
        </Link>
      </div>

      <div className="mt-8 max-w-xl">
        <h1 className="text-xl md:text-2xl font-semibold text-regal-black mb-4">
          Delete Your Account
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Once you delete your account, all your saved items, orders, and items
          in your cart will be permanently lost. You will no longer be able to
          retrieve any of this information.
        </p>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Please note that this action cannot be undone. If you are sure you
          want to delete your account, click the button below.
        </p>

        <button
          onClick={handleDeleteClick}
          className="px-6 py-2 bg-red-600 text-white font-bold rounded-md"
        >
          Delete Account
        </button>
      </div>

      {/* Modal for Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete your account?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone. Once you delete your account, all
              your data, including saved items, orders, and cart contents, will
              be permanently deleted.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2  bg-red-600 text-white rounded-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
