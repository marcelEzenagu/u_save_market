import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import ReactPaginate from "react-paginate";
import { FiSearch } from "react-icons/fi";
import DeleteIcon from '../../assets/images/admin/delete.png';

function ListComponent({
  data, // User or Vendor Data
  dropdownOptions, // Dropdown options like ['All data', 'Disabled data']
  title, // Title like 'All data', 'All Vendors'
  url,
  renderRow, // Function to render the table rows dynamically
  headers, // Table headers as array
  withActions = false, // Boolean to determine if action column should be displayed
  selectedItems,
  handleCheckboxChange,
  handleDeleteClick,
  setCreateModel
}) {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [dropdownOption, setDropdownOption] = useState(dropdownOptions[0]);
//   const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActiveTab(location?.pathname !== url);
  }, [location]);


useEffect(()=>{
    if (selectedItems?.length > 0) {
        setIsModalOpen(true);
    }else{
        setIsModalOpen(false);
    }
}, [handleDeleteClick]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    setIsModalOpen(false);
  };

  const handleOptionChange = (option) => {
    setDropdownOption(option);
    setIsOpenSelect(false);
  };

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center mt-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-white rounded-md text-sm pl-11 pr-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-[370px] font-[400]"
          />
          <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-regal-crum-gray text-xl" />
        </div>

        <button className="text-regal-sky-blue flex flex-row items-center gap-1 text-xs py-2 px-4 border rounded-md border-regal-sky-blue transition font-[500] active:scale-95"
          onClick={()=>{
            setCreateModel()
          }}
        >
          Create {title}
        </button>
      </div>
      {activeTab ? (
        <Outlet />
      ) : (
        <section>
          <div className="p-4 md:pt-8 md:px-4 border rounded-2xl mt-8">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <h2 className="text-sm md:text-lg font-[700] text-regal-blue">
                  {dropdownOption} ({data?.total})
                </h2>
                <div className="relative">
                  {/* Dropdown button */}
                  <button
                    type="button"
                    onClick={() => setIsOpenSelect(!isOpenSelect)}
                    className="w-full text-xs flex justify-between items-center border rounded-sm py-2 px-3 ml-4 bg-transparent text-gray-700"
                  >
                    {dropdownOption}
                    <SlArrowDown className="text-xs" />
                  </button>

                  {/* Dropdown menu */}
                  {isOpenSelect && (
                    <ul className="absolute left-0 pl-4 pr-8 bg-white border text-nowrap shadow-sm rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
                      {dropdownOptions.map((option) => (
                        <li
                          key={option}
                          className="py-2 flex flex-row items-center justify-between"
                        >
                          <button
                            type="button"
                            className={`text-xs ${
                              dropdownOption === option
                                ? "text-regal-blue font-[600]"
                                : ""
                            }`}
                            onClick={() => handleOptionChange(option)}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="flex items-center gap-2 border-r px-2">
                  <input
                    type="checkbox"
                    className="font-[400] text-regal-black text-xs"
                    checked={selectedItems.length > 0}
                  />
                  <span className="font-[400] text-regal-black text-xs">
                    {selectedItems.length} Selected
                  </span>
                </div>
                <button
                  onClick={handleDeleteClick}
                  className="flex flex-row items-center justify-center gap-2 font-[400] text-regal-black text-xs"
                >
                  Delete
                  <BsTrash3 className="text-sm text-regal-light-gray" />
                </button>
              </div>
            </div>
            <TableComponent
              data={data}
              selectedItems={selectedItems}
              handleCheckboxChange={handleCheckboxChange}
              headers={headers}
              renderRow={renderRow}
              handleDeleteClick={withActions ? handleDeleteClick : null}
            />
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg max-w-[500px] w-full">
                <div className="max-w-[400px] px-2 py-4 mx-auto">
                  <img
                    src={DeleteIcon}
                    alt="Delete Icon"
                    className="w-[130px] mx-auto mb-4"
                  />
                  <h3 className="text-lg font-bold text-center mb-2">
                    Delete {title}
                  </h3>
                  <p className="text-center text-xs max-w-[300px] mx-auto mb-8">
                    Are you sure you want to delete this {title.toLowerCase()}? By deleting, they will no longer have access.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleModalClose}
                      className="bg-red-500 text-white py-2 px-4 text-sm rounded-md w-full font-[600]"
                    >
                      No, Cancel
                    </button>
                    <button
                      onClick={handleDeleteConfirm}
                      className="bg-white text-sm border border-red-500 text-red-500 py-2 px-4 font-[600] rounded-md w-full"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

const TableComponent = React.memo(
  ({ headers, data, renderRow, selectedItems, handleCheckboxChange, handleDeleteClick }) => {
    const itemsPerPage = 4;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data?.data?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data?.total / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data?.total;
      setItemOffset(newOffset);
    };

    return (
      <div>
        <div className="w-full overflow-x-scroll mt-4 animate-fade-in">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-regal-light-gray">
                  <input type="checkbox" />
                </th>
                {headers?.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-xs font-medium text-regal-light-gray"
                  >
                    {header}
                  </th>
                ))}

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems?.map((item) => renderRow(item, selectedItems, handleCheckboxChange))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row items-center justify-between mt-4">
          <h6 className="text-xs text-regal-crum-gray">
            Showing {currentItems?.length} items out of {data?.total} results found
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
    );
  }
);

export default ListComponent;
