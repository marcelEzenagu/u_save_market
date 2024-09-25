import React, {useState} from 'react';
import ListComponent from '../../../components/admin/ListComponent';
import { Items } from '../../../data/mockData'; // No need to rename to Users
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const renderVendorRow = (User, selectedItems, handleCheckboxChange, handleDeleteClick, countries) => (
  <tr key={User.id}>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">
      <input
        type="checkbox"
        checked={selectedItems.includes(User.id)}
        onChange={() => handleCheckboxChange(User.id)}
      />
    </td>
       <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://via.placeholder.com/40"
                        alt=""
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <Link to={`/admin/users/${User.productID}`}>Theresa Webb</Link>
                    </div>
                  </td>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">{User.email}</td>
    <td className="px-6 py-2 text-xs font-medium text-regal-black">{User.phone}</td>
      <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-price-dark font-[600]">
                    <div className="flex flex-row items-center">
                      <img
                        src={countries[0]?.flag}
                        alt=""
                        className="w-6 mr-1"
                      />{" "}
                      {countries[0]?.name}
                    </div>
                  </td>

  </tr>
);

const VendorComponent = ({ selectedItems, handleCheckboxChange, handleDeleteClick }) => {
  const headers = ["Name", "Email Address", "Phone Number", "Country", ]; // Added "Actions" to match the User row actions
  const countries = useSelector((state) => state?.auth?.countries);
  return (
    <ListComponent
      data={Items} // Use mock data directly
      dropdownOptions={['All Users', 'Inactive Users']}
      title="Users"
      headers={headers} // Pass the headers
      renderRow={(User) =>
        renderVendorRow(User, selectedItems, handleCheckboxChange, handleDeleteClick, countries)
      }
      selectedItems={selectedItems}
      handleCheckboxChange={handleCheckboxChange}
      withActions={true} // To display action column
      handleDeleteClick={handleDeleteClick}
      url={'/admin/users'}
    />
  );
};

const UserList = () => {
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
    console.log(`User with ID ${id} will be deleted`);
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

export default UserList;


