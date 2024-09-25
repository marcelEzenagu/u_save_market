import React, {useState} from 'react';
import ListComponent from '../../../components/admin/ListComponent';
import { Items } from '../../../data/mockData'; // No need to rename to vendors
import OrderVendorStatus from '../../../components/order/OrderVendorStatus';
import { Link } from 'react-router-dom';
const renderVendorRow = (vendor, selectedItems, handleCheckboxChange, handleDeleteClick) => (
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
    <td className="px-6 py-2 text-xs font-medium text-regal-black">{vendor.email}</td>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">{vendor.phone}</td>
    <td className="px-6 py-2 text-xs font-medium text-regal-black"><OrderVendorStatus/></td>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">
      <button
        onClick={() => handleDeleteClick(vendor.id || 1)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </td>
  </tr>
);

const VendorComponent = ({ selectedItems, handleCheckboxChange, handleDeleteClick }) => {
  const headers = ["Name", "Email Address", "Phone Number", "Status", "Actions"]; // Added "Actions" to match the vendor row actions

  return (
    <ListComponent
      data={Items} // Use mock data directly
      dropdownOptions={['All Vendors', 'Inactive Vendors']}
      title="Vendors"
      headers={headers} // Pass the headers
      renderRow={(vendor) =>
        renderVendorRow(vendor, selectedItems, handleCheckboxChange, handleDeleteClick)
      }
      selectedItems={selectedItems}
      handleCheckboxChange={handleCheckboxChange}
      withActions={true} // To display action column
      handleDeleteClick={handleDeleteClick}
      url={'/admin/vendors'}
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


