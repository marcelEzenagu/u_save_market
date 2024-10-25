import React, {useState,useRef, useEffect } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import ProductDescription from "../../../../components/ProductDescription";
import { numberWithCommas } from "../../../../utils";
function ViewProduct(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
      <>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown ">
            <div
              className="bg-white py-3 px-4   md:p-6 rounded-lg shadow-lg w-[350px] md:w-[700px] "
              ref={dropdownaddRef}
            >
              {props?.data?.itemName === "" ? (
                <div className="h-24 flex flex-col items-center justify-center gap-4">
                  <h5 className="text-sm"> Nothing to preview yet</h5>
                </div>
              ) : (
                <main className="my-4 mb-20 grid grid-cols-1 md:grid-cols-2  gap-4">
                  <div className="w-full h-80 my-auto relative">
                    <img
                      src={props?.data?.images[0]}
                      alt={props?.data?.itemName}
                      className="w-full h-full object-contain"
                    />
                    <span className=" text-xs absolute bottom-0 right-0 font-semibold text-regal-black py-2 px-4 bg-regal-light-item-color">
                      2 pieces left
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-[500] text-regal-black">
                      {props?.data?.itemName}
                    </h4>
                    <h5 className="text-sm font-[700] text-regal-blue">
                      ₦{numberWithCommas(props?.data?.originalPrice)}
                    </h5>
                    <div>
                      <h1 className="text-sm  font-[600] text-regal-light-gray mb-2">
                        Product description
                      </h1>
                      <ProductDescription
                        description={props?.data?.description}
                      />
                    </div>
                  </div>
                </main>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  export default ViewProduct;
  