import React from "react";
import ProductCard from "./cards/ProductCard";
function RelatedProduct({Items, cols, category}) {
  return (
    <div>
      {" "}
      <main className="my-6">
        <h5 className="text-sm md:text-lg font-[700] text-regal-black mb-2">
          Related Products
        </h5>
        <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  ${cols == '5' ? 'lg:grid-cols-5': 'lg:grid-cols-4' } gap-4 `}>
          {Items.map((item) => (
            <ProductCard item={item} key={item.id} category={category || ''} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default RelatedProduct;
