import { useState, useEffect, useRef } from "react";
import { countries } from "../../../data/mockData";
import ReactPaginate from "react-paginate";
import { SlArrowDown } from "react-icons/sl";
import SearchableDropdown from "@/components/common";

function UserAddressTab() {
  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = countries.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(countries.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % countries.length;
    setItemOffset(newOffset);
  };

  const [isModalAddressDetails, setIsModalAddressDetails] = useState(false);
  const [isModalOpenAddAddress, setIsModalOpenAddAddress] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);

  return (
    <div className="p-4 md:px-8 md:pt-2 pb-4 animate-fade-in">
        <div className="min-h-[500px]">
      <div className="w-full overflow-x-scroll mt-4 animate-fade-in ">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-light-gray tracking-wider">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-light-gray tracking-wider">
                COUNTRY
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-light-gray tracking-wider">
                STATE/REGION
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-light-gray tracking-wider">
                CITY
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-light-gray tracking-wider">
                ZIP CODE
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-light-gray tracking-wider">
                STREET NAME
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems?.map((e, index) => (
              <tr key={index}>
                <td className="px-6 py-3 text-xs font-medium text-regal-black">
                  <input type="checkbox" />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-price-dark font-[600]"
                    onClick={() => {
                        setIsModalAddressDetails(true);
                      }}
                >
                  <div className="flex flex-row items-center">
                    <img src={e?.flag} alt="" className="w-6 mr-1" /> {e?.name}
                  </div>
                </td>
                <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                  Gotland
                </td>
                <td className="px-6 py-2 max-w-[200px] truncate whitespace-nowrap text-xs text-regal-black font-[600]">
                  Ogunu
                </td>
                <td className="px-6 py-2 max-w-[200px] truncate whitespace-nowrap text-xs text-regal-black font-[600]">
                  099084057
                </td>
                <td className="px-6 py-2 max-w-[200px] truncate whitespace-nowrap text-xs text-regal-black font-[600]">
                  Idugboe Estate, off Elf Road
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row items-center justify-between mt-4">
        <h6 className="text-xs text-regal-crum-gray">
          Showing {currentItems.length} items out of {countries.length} results
          found
        </h6>

        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          pageClassName="py-1 px-2 rounded-md text-xs md:text-sm mx-2 border border-gray-200 text-regal-paginate-color"
          pageLinkClassName=""
          previousClassName="page-item"
          previousLinkClassName="py-1 px-2 text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
          nextClassName=""
          nextLinkClassName="py-1 px-2 text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
          breakClassName="page-item"
          breakLinkClassName="text-xs md:text-sm mx-2 py-1 px-2"
          containerClassName="flex flex-row items-center justify-end"
          activeClassName="border border-regal-sky-blue text-white bg-regal-sky-blue font-[500]"
          renderOnZeroPageCount={null}
        />
      </div>
      </div>
      <button
          onClick={() => {
            setIsModalOpenAddAddress(true);
          }}
      className="inline-block px-8  py-2 md:py-3 mt-8  text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-sm cursor-pointer">
        New Address
      </button>


      
      <AddressDetails
        isModalOpen={isModalAddressDetails}
        setIsModalOpen={(e) => {
          setIsModalAddressDetails(e);
        }}
      />
      <AddAddress
        isModalOpen={isModalOpenAddAddress}
        setIsModalOpen={(e) => {
          setIsModalOpenAddAddress(e);
        }}
      />
    </div>
  );
}


function AddressDetails(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const handleSelect = (country) => {
      setSelectedCountry(country);
      setIsOpenSelect(false); // Close dropdown after selection
    };
    useEffect(() => {
      setIsModalOpen(props.isModalOpen);
    }, [props.isModalOpen]);
  
    const dropdownRef = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      
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
              className="bg-white py-3 px-4   md:p-8 rounded-lg shadow-lg w-[350px] md:w-[700px] "
              ref={dropdownRef}
            >
              <h1 className="text-sm md:text-lg font-[700] text-regal-black">
                Address Details
              </h1>
  
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-5">
  
                  <div className="mb-1 col-span-2">
                    <label
                      htmlFor="StreetName"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      Street Name
                    </label>
                    <input
                      type="text"
                      name="StreetName"
                      id="text"
                      placeholder="Enter Street Name"
                      className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="Country"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      Country
                    </label>
                    <SearchableDropdown
                      options={countries}
                      onSelect={(country) => setSelectedCountry(country)}
                      selectedValue={selectedCountry}
                      displayKey="name"
                      valueKey="name"
                      placeholder="Select country"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="City"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      City
                    </label>
                    <select
                      name="City"
                      id="City"
                      placeholder="Enter City"
                      className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                    >
                      <option value="">Enter City</option>
                    </select>
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="State/Region"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      State/Region
                    </label>
                    <select
                      name="State/Region"
                      id="State/Region"
                      placeholder="Enter State/Region"
                      className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                    >
                      <option value="">Enter State</option>
                    </select>
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="Zip Code"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      Zip Code
                    </label>
                    <input
                      name="Zip Code"
                      id=" Zip Code"
                      placeholder="Enter Zip Code"
                      className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                    />
                  </div>
                </div>

                <div className="w-full mb-14 mt-9">
                  <button className="py-3 px-10 float-start text-xs md:text-sm active:scale-95 font-[500] text-white rounded-md bg-regal-sky-blue">
                   Update Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  function AddAddress(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const handleSelect = (country) => {
      setSelectedCountry(country);
      setIsOpenSelect(false); // Close dropdown after selection
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
      <>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown ">
            <div
              className="bg-white py-3 px-4   md:p-8 rounded-lg shadow-lg w-[350px] md:w-[700px] "
              ref={dropdownaddRef}
            >
              <h1 className="text-sm md:text-lg  font-[700] text-regal-black">
                New Address
              </h1>
  
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-5">
  
                  <div className="mb-1 col-span-2">
                    <label
                      htmlFor="StreetName"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      Street Name
                    </label>
                    <input
                      type="text"
                      name="StreetName"
                      id="text"
                      placeholder="Enter Street Name"
                      className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="Country"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      Country
                    </label>
                    <SearchableDropdown
                      options={countries}
                      onSelect={(country) => setSelectedCountry(country)}
                      selectedValue={selectedCountry}
                      displayKey="name"
                      valueKey="name"
                      placeholder="Select country"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="City"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      City
                    </label>
                    <select
                      name="City"
                      id="City"
                      placeholder="Enter City"
                      className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                    >
                      <option value="">Enter City</option>
                    </select>
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="State/Region"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      State/Region
                    </label>
                    <select
                      name="State/Region"
                      id="State/Region"
                      placeholder="Enter State/Region"
                      className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                    >
                      <option value="">Enter State</option>
                    </select>
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="Zip Code"
                      className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
                    >
                      Zip Code
                    </label>
                    <input
                      name="Zip Code"
                      id=" Zip Code"
                      placeholder="Enter Zip Code"
                      className="w-full p-3 text-xs md:text-sm border  focus:outline-none rounded-md bg-transparent text-regal-crum-gray"
                    />
                  </div>
                </div>

                <div className="w-full mb-14 mt-9">
                  <button className="py-3 px-10 float-start text-xs md:text-sm active:scale-95 font-[500] text-white rounded-md bg-regal-sky-blue">
                   Update Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

export default UserAddressTab;
