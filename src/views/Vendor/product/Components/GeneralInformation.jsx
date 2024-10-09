import React, {useEffect, useState} from "react";
import { TfiAngleDown } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import {
  useGetProductsQuery,
} from "../../../../features/product/productApiSlice";
import { useGetCountriesQuery } from "../../../../features/auth/authApiSlice";
import { useGetCategoriesQuery,useGetSubcategoriesQuery } from "../../../../features/category/categoryApiSlice";
function GeneralInformation({handleChange, data, handleErrorMessagesList, setData}) {
  const {
    data: products = [],
    isLoading: loadingProducts,
    error,
  } = useGetProductsQuery();
  const {
    data: countries = [],
    isLoading: loadingCountries,
    errorCountries,
  } = useGetCountriesQuery();
  const { data: categories = [], isLoading, errorCategory } = useGetCategoriesQuery();
  const { data: subCategories = [], isLoading: subIsLoading, error : subError} = useGetSubcategoriesQuery();
    
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setFilteredCountries(
      countries.filter((country) =>
        country?.name?.toLowerCase().includes(query)
      )
    );
  };
  useEffect(()=>{
    if (data?.productID) {
      const getSupportedCountries = products?.find((i) => i?.productID ===  data?.productID)
      if (getSupportedCountries) {
        setData((prevData) => ({
          ...prevData,
          itemSupportedCountries: getSupportedCountries?.productSupportedCountries,
        }));
      }
    }

  }, [data?.productID, products])


  const handleRemoveCountry = (country) => {
    setData((prevData) => ({
      ...prevData,
      itemSupportedCountries: prevData?.itemSupportedCountries.filter(
        (c) => c !== country
      ),
    }));
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="mb-2 col-span-2">
          <label
            htmlFor="itemName"
            className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
          >
            Product Name
          </label>
          <input
            type="text"
            name="itemName"
            id="text"
            value={data?.itemName}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
          />
          {handleErrorMessagesList('itemName')}
        </div>
        <div className="mb-2 col-span-2 md:col-span-1">
          <label
            htmlFor="FirstName"
            className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
          >
            Category
          </label>
          <div className="relative ">
            <select
            value={data?.itemCategory}
            onChange={handleChange}
            name="itemCategory"
             className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black">
            <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
                {isLoading && 'loading...'}
            </select>
            <div className="absolute inset-y-0 right-[-3px] flex items-center px-2 pointer-events-none">
              <TfiAngleDown className="text-gray-500 bg-white w-9 z-50" />
            </div>
          </div>

          {handleErrorMessagesList('itemCategory')}
        </div>
        <div className="mb-2 col-span-2 md:col-span-1">
          <label
            htmlFor="LastName"
            className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
          >
            Sub Category
          </label>
          <div className="relative ">
            <select
               value={data?.itemSubCategory}
               onChange={handleChange}
               name="itemSubCategory"
            className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black">
            <option value="">Select Category</option>
                {subCategories.map((cat) => (
                  <option key={cat.id} value={cat.subCategoryID}>
                    {cat.subCategoryName}
                  </option>
                ))}
                {subIsLoading && 'loading...'}
            </select>
            <div className="absolute inset-y-0 right-[-3px] flex items-center px-2 pointer-events-none">
              <TfiAngleDown className="text-gray-500 bg-white w-9 z-50" />
            </div>
          </div>
          {handleErrorMessagesList('itemSubCategory')}
        </div>

        <div className="mb-2 col-span-2 md:col-span-2">
          <label
            htmlFor="LastName"
            className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
          >
           Product
          </label>
          <div className="relative ">
            <select 
              value={data?.productID}
              onChange={handleChange}
              name="productID"
            className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black">
            <option value="">Select Product</option>
                {products.map((cat) => (
                  <option key={cat.id} value={cat.productID}>
                    {cat.productName}
                  </option>
                ))}
                {loadingProducts && 'loading...'}
            </select>
            <div className="absolute inset-y-0 right-[-3px] flex items-center px-2 pointer-events-none">
              <TfiAngleDown className="text-gray-500 bg-white w-9 z-50" />
            </div>
          </div>
          {handleErrorMessagesList('itemSubCategory')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  col-span-2 md:col-span-2 mb-2">
      {/* Supported Countries */}
      <div className="mb-2 col-span-2">
        <label
          htmlFor="SupportedCountries"
          className="block text-xs md:text-[12px] font-[400] leading-6 mb-2 text-regal-black"
        >
          Supported Countries
        </label>
        {/* <div className="relative">
          <input
            type="text"
            className="w-full p-3 text-xs md:text-[12px] border rounded-lg focus:outline-regal-blue"
            placeholder="Search countries"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <ul className="absolute w-full bg-white border mt-1 z-10 max-h-40 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <li
                    key={country.id}
                    onClick={() => handleSelectCountry(country.name)}
                    className="p-2 text-xs hover:bg-gray-100 cursor-pointer"
                  >
                    {country.name}
                  </li>
                ))
              ) : (
                <li className="p-2 text-xs text-gray-500">No countries found</li>
              )}
              {loadingCountries &&  <li className="p-2  text-xs text-gray-500">loading...</li>}
            </ul>
          )}
        </div> */}
        {handleErrorMessagesList("itemSupportedCountries")}
        
        {/* Selected countries */}
        <div className="flex gap-2 flex-wrap mt-2">
          {data?.itemSupportedCountries?.map((country, index) => (
            <span
              key={index}
              className=" text-xs capitalize flex items-center p-2 rounded gap-2 border"
            >
              {country}
              <IoClose
                className="cursor-pointer"
                onClick={() => handleRemoveCountry(country)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
        <div className="mb-2 col-span-2">
          <label
            htmlFor="ProductDescription"
            className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
          >
            Product Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={"10"}
            value={data?.description}
            onChange={handleChange}
            className="w-full p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
          >
           {data?.description}
          </textarea>
          {handleErrorMessagesList('description')}
        </div>
      </div>
    </div>
  );
}

export default GeneralInformation;
