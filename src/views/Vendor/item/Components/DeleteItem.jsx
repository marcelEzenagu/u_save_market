import React, { useState, useRef, useEffect } from "react";
import Cancelicon from "../../../../assets/images/order/cancel.png";
import { useDeleteItemMutation } from "../../../../features/item/itemApiSlice";
import { useErrorMessageHooks } from "../../../../hooks/useErrorMessageHooks";
function DeleteItem({isModalOpen, setIsModalOpen,data }) {
  const [isModalOpenModal, setIsModalOpenModal] = useState(false);
  useEffect(() => {
    setIsModalOpenModal(isModalOpen);
  }, [isModalOpen]);
  const [deleteItem, { isLoading }] = useDeleteItemMutation();
  const dropdownaddRef = useRef(null);
  const {
    handleError,
    setErrMsg,
    setErrorMessagesList,
    errMsg,
    navigate,
  } = useErrorMessageHooks();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownaddRef.current &&
        !dropdownaddRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSubmit = async () => {
    setErrMsg("");
    setErrorMessagesList([]);
    try {
      const { response } = await deleteItem(data?.ItemID).unwrap();
      console.log(response);
      showToast("Item deleted successfully", "success");
      setIsModalOpen(false);
    } catch (err) {
      handleError(err, "Delete Item");
    }
  };
  return (
    isModalOpenModal && (
      <div
        className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown"
        ref={dropdownaddRef}
      >
        <div className="bg-white p-5 md:p-14 rounded-lg shadow-lg w-[300px] md:w-[450px] text-center ">
          <img src={Cancelicon} alt="" className="w-32 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-2">Delete Item</h2>
          <p className="text-regal-black text-sm mt-4 mb-6">
            Are you sure you want to delete this product <span className="font-semibold">{data?.itemName}</span>? the product would stop
            being displayed on the website
          </p>
          <p className="text-red-600 text-xs">{errMsg}</p>
          {/* Buttons in flex-col with gap */}
          <div className="flex flex-col gap-4 w-[200px] mx-auto">
            <button
              onClick={() => {
                // Handle delete action here
                setIsModalOpen(false);
              }}
              className="bg-regal-sky-blue text-white py-2 text-sm rounded-md hover:bg-blue-900 transition active:scale-95"
            >
              Save as Draft
            </button>
            <button
              onClick={handleSubmit}
              className=" text-regal-sky-blue text-sm py-2 border-2 border-white rounded-md hover:border-regal-sky-blue transition font-[500] active:scale-95"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Yes, Delete' }
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteItem;
