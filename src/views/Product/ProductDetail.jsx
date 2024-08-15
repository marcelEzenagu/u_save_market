import React from "react";
import { Link, useParams } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { Items } from "../../data/mockData";
import {numberWithCommas} from '../../utils'
import { GoHeart } from "react-icons/go";
import RelatedProduct from "../../components/RelatedProduct";
import { BsCart3 } from "react-icons/bs";
import ProductDescription from "../../components/ProductDescription";
function ProductDetail() {
  const { name , product} = useParams();
  const productinfo = Items[0];
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
    <div>
      <main className="flex flex-row items-center justify-between">
        <nav className="flex  text-gray-700 " aria-label="Breadcrumb">
          <div className="inline-flex items-center space-x-1 md:space-x-2">
            <Link
              to="/"
              className="text-regal-black text-xs md:text-sm font-[600] inline-flex items-center"
            >
              Home
            </Link>
            <SlArrowRight className="text-xs md:text-sm" />
            <span   className="text-regal-black text-xs md:text-sm font-[600] inline-flex items-center max-w-36 md:max-w-[180px] truncate whitespace-nowrap">
               {name}
            </span>
            <SlArrowRight className="text-xs md:text-sm" />
            <span className="text-regal-crum-gray text-xs md:text-sm font-[600] max-w-36 md:max-w-[180px] truncate whitespace-nowrap">{product}</span>
          </div>
        </nav>
      </main>
      <main className="my-4 mb-20 grid grid-cols-1 md:grid-cols-2  gap-4">
            <div className="w-full h-80 relative">
                <img src={productinfo?.image} alt={productinfo?.name} className="w-full h-full object-contain" />
            <span className=" text-xs absolute bottom-0 right-0 font-semibold text-regal-black py-2 px-4 bg-regal-light-item-color">2 pieces left</span>
            </div>
            <div className="flex flex-col gap-4">
                <h4 className="text-lg font-[500] text-regal-black">{productinfo?.name}</h4>
                <h5 className="text-lg font-[700] text-regal-blue" >₦{numberWithCommas(productinfo?.price)}</h5>
                <div className="max-w-[300px] flex items-center gap-2">
                    <button className="w-full p-3 flex flex-row items-center justify-center text-white bg-regal-sky-blue rounded-full ">
                    <BsCart3 className="mr-2" />  Add to Cart
                    </button>
                    <div className="w-16 h-full rounded-full border flex flex-col items-center justify-center bg-white  ">
                        <GoHeart className="text-2xl"/>
                    </div>
                </div>
                <div>
                <h1 className="text-sm  font-[600] text-regal-footer-gray mb-2">
                    Product description
                </h1>
                <ProductDescription description={description}/>
                </div>
                </div>
      </main>
        <RelatedProduct Items={Items} category={name}/>
    </div>
  );
}


export default ProductDetail;
