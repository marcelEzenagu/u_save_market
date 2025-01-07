import React, { useState } from "react";
import { Items } from "../../../../data/mockData";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Line } from "react-chartjs-2";
import OrderVendorStatus from "../../../../components/order/OrderVendorStatus";
function VendorTab() {
  return (
    <div>    
    <section className=" p-4 md:pt-8 md:px-4  border rounded-2xl mt-8 ">
    <div className=" flex flex-row items-center justify-between">
          <h2 className="text-sm md:text-lg font-[700] text-regal-blue ">
          Vendor Rating (Active)
          </h2>

        </div>
        <ProductTableTab
              setActiveOrder={() =>
                setActiveOrder({
                  orderID: "1892423",
                  products: [],
                })
              }
            />
        </section>
        
        <section className=" p-4 md:pt-8 md:px-4  border rounded-2xl mt-8 ">
    <div className=" flex flex-row items-center justify-between">
          <h2 className="text-sm md:text-lg font-[700] text-regal-blue ">
          Vendor Rating (Inactive)
          </h2>

        </div>
        <ProductTableTab
              setActiveOrder={() =>
                setActiveOrder({
                  orderID: "1892423",
                  products: [],
                })
              }
            />
        </section>
        </div>
  )
}


  const ProductTableTab =  React.memo(()=>{
    const itemsPerPage = 7;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = Items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(Items.length / itemsPerPage);
  
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  }; 
  return (
    <div>
           <div className="w-full overflow-x-scroll mt-4 animate-fade-in">
      <table className=" min-w-full  ">
        <thead className="">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              VENDOR
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
             COUNTRY
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              TOTAL SALES
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
             No.PRODUCT
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
             STATUS
            </th>
  
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems?.map((product) => (
            <tr key={product.productID}>
                    <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                <div className="flex  items-center gap-2">
                <img src="https://via.placeholder.com/40" alt="" className="w-6 h-6 rounded-full object-cover" />
              <Link >
               Theresa Webb
                </Link>
                </div>
              </td>
              <td className="px-6 py-2 max-w-[200px]  truncate whitespace-nowrap text-xs text-regal-black font-[600]">
                Nigeria
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black font-[600]">
              ₦1,585.00
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-price-dark font-[600]">
             20
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                <OrderVendorStatus/>
              </td>
  
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        pageClassName="py-1 px-2 rounded-md text-xs md:text-sm mx-2  border border-gray-200 text-regal-paginate-color"
        pageLinkClassName=" "
        previousClassName="page-item"
        previousLinkClassName="py-1 px-2  text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
        nextClassName=""
        nextLinkClassName="py-1 px-2  text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
        breakClassName="page-item"
        breakLinkClassName="text-xs md:text-sm mx-2 py-1 px-2"
        containerClassName="flex flex-row items-center  justify-end "
        activeClassName=" border border-regal-sky-blue text-white bg-regal-sky-blue font-[500]"
        renderOnZeroPageCount={null}
      />
    </div>
  );
  });

export default VendorTab