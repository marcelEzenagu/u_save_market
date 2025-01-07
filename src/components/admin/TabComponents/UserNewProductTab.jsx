import React, { useState } from "react";
import EmptyBag from "../../../assets/images/account/empty.png";
import { Items } from "../../../data/mockData";
import ReactPaginate from "react-paginate";
import DeleteIcon from "../../../assets/images/admin/delete.png";
import AdminProductCard from "../../cards/AdminProductCard";
import ProductDescription from "../../ProductDescription";
import { numberWithCommas } from "../../../utils";
import { IoIosArrowRoundBack } from "react-icons/io";
function UserNewProductTab() {
  const itemsPerPage = 20;
  const [itemOffset, setItemOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // For viewing product details
  const [showProductDetail, setShowProductDetail] = useState(false); // Toggling between list and detail view
  const [productToDelete, setProductToDelete] = useState(null); // For managing deletion

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = Items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(Items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Items.length;
    setItemOffset(newOffset);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true); // Hide list and show detail
  };

  const handleBackToList = () => {
    setShowProductDetail(false);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Perform delete logic here
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="p-4">
      {/* Show Product List or Product Detail */}
      {!showProductDetail ? (
        <div>
          {currentItems.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-col-5 lg:grid-cols-5 2xl:grid-cols-7">
                {currentItems?.map((e) => (
                    <AdminProductCard
                      item={e}
                      handleProductClick={() => handleProductClick(e)} 
                      handleDeleteClick={() => handleDeleteClick(e)}
                      key={e?.id}
                    />
                ))}
              </div>
              <div className="flex flex-row items-center justify-between mt-4">
                <h6 className="text-xs text-regal-crum-gray">
                  Showing {currentItems.length} items out of {Items.length} results found
                </h6>

                <ReactPaginate
                  breakLabel="..."
                  nextLabel=" >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< "
                  pageClassName="py-1 px-2 rounded-md text-xs md:text-sm mx-2 border border-gray-200 text-regal-paginate-color"
                  containerClassName="flex flex-row items-center justify-end"
                  activeClassName="border border-regal-sky-blue text-white bg-regal-sky-blue font-[500]"
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
          ) : (
            <div className="p-14 rounded-lg mx-auto max-w-[400px] text-center">
              <img src={EmptyBag} alt="" className="text-center my-3 mx-auto" />
              <h6 className="text-regal-black text-sm mt-4 mb-6 font-[700]">
                This Vendor Doesn't have any Product
              </h6>
            </div>
          )}
        </div>
      ) : (
        <ProductDetail product={selectedProduct} onBack={handleBackToList} />
      )}

      {/* Modal for Delete Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-[500px] w-full">
            <div className="max-w-[400px] px-2 py-4 mx-auto">
              <img src={DeleteIcon} alt="Delete Icon" className="w-[130px] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-center mb-2">
                Delete Product
              </h3>
              <p className="text-center text-xs max-w-[300px] mx-auto mb-8">
                Are you sure you want to delete this{" "}
                {productToDelete?.title?.toLowerCase()}? By deleting, they will no longer have access.
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
    </div>
  );
}

export default UserNewProductTab;

// ProductDetail Component
function ProductDetail({ product, onBack }) {
  const description = `
  <p> Our Organic Mediterranean Olive Oil is a premium blend sourced from the finest olives grown in the Mediterranean region. This extra virgin olive oil is cold-pressed to retain its natural flavor and nutritional benefits, making it a perfect addition to any culinary creation.</p>
  <ul>
    <li><strong>Origin:</strong> 100% organically grown olives from the Mediterranean basin.</li>
    <li><strong>Flavor Profile:</strong> Rich, fruity taste with a hint of pepper and a smooth finish.</li>
    <li><strong>Health Benefits:</strong> High in monounsaturated fats and  health.</li>
    <li><strong>Uses:</strong> Ideal for dressing salads, drizzling over vegetables, or enhancing the flavor of meats and fish.</li>
    <li><strong>Packaging:</strong> Available in 500ml and 1L bottles.</li>
    <li><strong>Certification:</strong> USDA Organic and Non-GMO verified.</li>
  </ul>
  `;
  return (
    <div className="p-4">
      <button
        onClick={onBack}
       className=" flex items-center gap-2 text-regal-sky-blue text-sm  mb-4"
        
      >
            <IoIosArrowRoundBack className="text-lg" />
        Back 
      </button>
      <main className="my-4 mb-20 grid grid-cols-1 md:grid-cols-2  mt-14  max-w-[1366px] gap-4">
            <div className="w-full h-80 my-auto relative">
                <img src={product?.image} alt={product?.name} className="w-full h-full object-contain" />
            <span className=" text-xs absolute bottom-0 right-0 font-semibold text-regal-black py-2 px-4 bg-regal-light-item-color">2 pieces left</span>
            </div>
            <div className="flex flex-col gap-3">
                <h4 className="text-xs font-[500] text-regal-black">{product?.name}</h4>
                <h5 className="text-sm font-[700] text-regal-blue" >₦{numberWithCommas(product?.price)}</h5>

                <div>
                <h1 className="text-sm  font-[600] text-regal-light-gray mb-2">
                    Product description
                </h1>
                <ProductDescription description={description}/>
                </div>
                </div>
      </main>
    </div>
  );
}
