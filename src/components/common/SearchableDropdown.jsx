import { useState } from "react";

const SearchableDropdown = ({ 
  options, 
  onSelect, 
  selectedValue,
  displayKey = "name",
  valueKey = "name",
  placeholder = "Type to search...",
  className = "",
  inputClassName = ""
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filter options based on the search input
  const filteredOptions = options
    .filter((option) =>
      option[displayKey]?.toLowerCase().includes(search?.toLowerCase())
    );

  // Handle option selection
  const handleSelect = (option) => {
    setSearch("");
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={search || selectedValue?.[displayKey] || ""}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className={`w-full p-3 text-xs md:text-sm border font-[300] focus:outline-none rounded-md bg-transparent text-regal-black ${inputClassName}`}
      />

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 text-xs cursor-pointer hover:bg-gray-100"
              >
                {option[displayKey]}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-xs text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;