import React from "react";
import DeleteIcon from '../../../assets/images/admin/delete.png';
const DeleteModal = ({
  isOpen,
  title,
  description,
  onConfirm,
  onClose,
  iconSrc,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-[500px] w-full">
        <div className="max-w-[400px] px-2 py-4 mx-auto">
          <img src={DeleteIcon} alt="Icon" className="w-[130px] mx-auto mb-4" />
          <h3 className="text-lg font-bold text-center mb-2">{title}</h3>
          <p className="text-center text-xs max-w-[300px] mx-auto mb-8">
            {description}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 text-sm rounded-md w-full font-[600]"
            >
              No, Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-white text-sm border border-red-500 text-red-500 py-2 px-4 font-[600] rounded-md w-full"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
