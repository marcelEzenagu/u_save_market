import React, { useState, useEffect, useRef } from "react";
import Cancelicon from "../../../../assets/images/order/cancel.png";
function Settings() {
    const [isModalOpenDeleteAccount, setisModalOpenDeleteAccount] =
    useState(false);

  return (
    <div>
    <div>
      <div className="p-4 md:p-8 border-b animate-fade-in">
        <h6 className="text-regal-black text-[12px] md:text-lg font-[600]">
        Notification settings
        </h6>
        <p className="text-regal-light-gray text-[10px] md:text-sm font-[400] mt-1">
        Verify your business to keep the marketplace safe for everyone
        </p>
      </div>

      <section>
      <main className="border rounded-md p-4 md:p-4 m-4 md:m-8">
          <div>
            <h5 className="text-regal-black text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
            System notifications
            </h5>
          </div>

          <div className="border-b py-4 mt-4">
            <div className="w-full flex flex-row items-center justify-between ">
              <div>
                <h5 className="text-regal-black text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
                Desktop

                </h5>
                <h6 className="text-regal-light-gray text-[10px] md:text-xs  mt-1">
                Show notifications for all activities (orders, payments, etc)
                </h6>
              </div>
              <label className="inline-flex items-center cursor-pointer gap-4 ">
                <input type="checkbox" value="" className="sr-only peer " />
                <div className="relative w-8 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[0px] after:start-[-5.3px] peer-checked:after:bg-white after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          
          <div className="py-4">
            <div className="w-full flex flex-row items-center justify-between ">
              <div>
                <h5 className="text-regal-black text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
                Email 
             
                </h5>
                <h6 className="text-regal-light-gray text-[10px] md:text-xs  mt-1">
                Send an email with all unread activities
                </h6>
              </div>
              <label className="inline-flex items-center cursor-pointer gap-4 ">
                <input type="checkbox" value="" className="sr-only peer " />
                <div className="relative w-8 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[0px] after:start-[-5.3px] peer-checked:after:bg-white after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </main>

        <main className="border rounded-md p-4 md:p-4 m-4 md:m-8">
          <div>
            <h5 className="text-regal-black text-[12px] md:text-sm  font-[600] flex flex-row items-center ">
            Communications with UsaveMarket
            </h5>
          </div>

          <div className=" pt-3 ">
            <div className="w-full flex flex-row items-center justify-between ">
              <div>
                <h6 className="text-regal-light-gray text-[10px] md:text-xs  mt-1">
                Send me genuinely useful emails to help me get the most out of UsaveMarket services
                </h6>
              </div>
              <label className="inline-flex items-center cursor-pointer gap-4 ">
                <input type="checkbox" value="" className="sr-only peer " />
                <div className="relative w-8 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[0px] after:start-[-5.3px] peer-checked:after:bg-white after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
  
        </main>


        <main className="border rounded-md p-4 md:p-4 m-4 md:m-8">
          <div>
            <h5 className="text-regal-black text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
            Delete Account
            </h5>
          </div>

          <div className=" pt-3  ">
            <div className="w-full flex flex-row items-center justify-between ">
              <div>
                <h6 className="text-regal-light-gray text-[10px] md:text-xs  mt-1">
                Delete Account
                </h6>
              </div>
            <button className='text-xs text-white bg-red-600 rounded-md py-2 px-3 '
               onClick={() => {
                setisModalOpenDeleteAccount(true);
              }}
            >
                Delete
            </button>
            </div>
          </div>
          <DeleteAccount
        isModalOpen={isModalOpenDeleteAccount}
        setIsModalOpen={(e) => {
          setisModalOpenDeleteAccount(e);
        }}
      />
        </main>
      </section>
    </div>
  </div>
  )
}

function DeleteAccount(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
    useEffect(() => {
      setIsModalOpen(props.isModalOpen);
    }, [props.isModalOpen]);
  
    const dropdownaddRef = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownaddRef.current &&
          !dropdownaddRef.current.contains(event.target)
        ) {
          props.setIsModalOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    return (
      isModalOpen && (
        <div className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown" ref={dropdownaddRef}>
          <div className="bg-white p-5 md:p-14 rounded-lg shadow-lg w-[300px] md:w-[500px] text-center ">
            <img src={Cancelicon} alt="" className="w-32 mx-auto mb-2" />
            <h2 className="text-xl font-bold mb-2">Delete Account</h2>
            <p className="text-regal-black text-sm mt-4 mb-6">
            Are you sure you want to delete this account? 
            You won’t have access to any information related to this account anymore
            </p>
  
            {/* Buttons in flex-col with gap */}
            <div className="flex flex-col gap-4 w-[200px] mx-auto">
              <button
                onClick={() => {
                  // Handle delete action here
                  props.setIsModalOpen(false);
                }}
                className="bg-regal-sky-blue text-white py-2 text-sm rounded-md hover:bg-blue-900 transition active:scale-95"
              >
               Delete
              </button>
              <button
                onClick={() => {
                  // Handle delete action here
                  props.setIsModalOpen(false);
                }}
                className=" text-regal-sky-blue text-sm py-2 border-2 border-white rounded-md hover:border-regal-sky-blue transition font-[500] active:scale-95"
              >
              Cancel
              </button>
            </div>
          </div>
        </div>
      )
    );
  }

export default Settings