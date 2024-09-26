import React, { useState } from "react";
import ListComponent from "../../../components/admin/ListComponent";
import { Items } from "../../../data/mockData"; // No need to rename to vendors
import OrderVendorStatus from "../../../components/order/OrderVendorStatus";
import { Link } from "react-router-dom";
import { PiDotsThreeOutline } from "react-icons/pi";
import { Menu } from "@headlessui/react";
const renderVendorRow = (
  vendor,
  selectedItems,
  handleCheckboxChange,
  handleDeleteClick
) => (
  <tr key={vendor.id}>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">
      <input
        type="checkbox"
        checked={selectedItems.includes(vendor.id)}
        onChange={() => handleCheckboxChange(vendor.id)}
      />
    </td>
    <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
      <div className="flex items-center gap-2">
        <img
          src="https://via.placeholder.com/40"
          alt=""
          className="w-6 h-6 rounded-full object-cover"
        />
        <Link to={`/admin/vendors/${vendor.productID}`}>Theresa Webb</Link>
      </div>
    </td>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">
      {vendor.email}
    </td>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">
      {vendor.phone}
    </td>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">
      <OrderVendorStatus />
    </td>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">
      <Menu as="button" className="relative inline-block text-right">
        <div>
          <Menu.Button className=" rounded-full text-sm md:text-lg   focus:outline-none">
            <PiDotsThreeOutline />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right z-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
          <div className="py-1">
            {/* Delete Product Menu Item */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center w-full px-4 py-2 text-xs gap-2 text-regal-black ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleDeleteClick(vendor.productID || 1)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                      stroke="#0F0F0F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                      stroke="#0F0F0F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.8504 9.14014L18.2004 19.2101C18.0904 20.7801 18.0004 22.0001 15.2104 22.0001H8.79039C6.00039 22.0001 5.91039 20.7801 5.80039 19.2101L5.15039 9.14014"
                      stroke="#171717"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.3301 16.5H13.6601"
                      stroke="#171717"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 12.5H14.5"
                      stroke="#171717"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </td>
  </tr>
);

const VendorComponent = ({
  selectedItems,
  handleCheckboxChange,
  handleDeleteClick,
}) => {
  const headers = [
    "Name",
    "Email Address",
    "Phone Number",
    "Status",
    "Actions",
  ]; // Added "Actions" to match the vendor row actions

  return (
    <ListComponent
      data={Items} // Use mock data directly
      dropdownOptions={["All Vendors", "Inactive Vendors"]}
      title="Vendors"
      headers={headers} // Pass the headers
      renderRow={(vendor) =>
        renderVendorRow(
          vendor,
          selectedItems,
          handleCheckboxChange,
          handleDeleteClick
        )
      }
      selectedItems={selectedItems}
      handleCheckboxChange={handleCheckboxChange}
      withActions={true} // To display action column
      handleDeleteClick={handleDeleteClick}
      url={"/admin/vendors"}
    />
  );
};

const VendorList = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Handle checkbox selection/deselection
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle delete action
  const handleDeleteClick = (id) => {
    console.log(`Vendor with ID ${id} will be deleted`);
    setSelectedItems([id]);
    // Here, you can add actual deletion logic
  };

  return (
    <VendorComponent
      selectedItems={selectedItems}
      handleCheckboxChange={handleCheckboxChange}
      handleDeleteClick={handleDeleteClick}
    />
  );
};

export default VendorList;
