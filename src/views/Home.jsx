import React, { useMemo } from "react";
import GridBox from "../components/cards/GridBox";
import { MockData } from "../data/mockData";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../features/category/categoryApiSlice";

function Home() {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

  const   baseUrl = import.meta.env.VITE_APP_API_URL

  const imageList = useMemo(() => [
    'https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5709271/pexels-photo-5709271.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3987217/pexels-photo-3987217.jpeg?auto=compress&cs=tinysrgb&w=600'
  ], []);

  return (
    <div className=" p-1 md:p-4">
      <h5 className="text-responsive font-bold text-regal-black mb-4 ">
        African Online Grocery Store for 
        <span className="text-regal-blue"> Africans</span> in 
        <span className="text-regal-blue"> Diaspora</span>
      </h5>

      {/* Image List */}
      <div className="overflow-x-auto flex space-x-4 scrollbar-hide my-4">
        {imageList.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-[140px] lg:w-[10rem] h-[150px] relative overflow-hidden rounded-2xl shadow-lg group animate-fade-in">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="transition-transform w-full h-full object-cover group-hover:scale-110 duration-200"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Category List (Mobile) */}
      <div className="lg:hidden mt-4">
        <div className="flex flex-wrap gap-2">
          {categories?.map(category => (
            <Link
              // to={`/products?category=${category.name.toLowerCase()}`}
              key={category.id}
              className="flex items-center p-1 hover:bg-gray-200 rounded-md transition"
            >
              <img
                // src={category.image}
                src={`${baseUrl}public/images/categories/${category.name.toLowerCase()}.png`} 
                alt={category.name.toLowerCase()} 
                className="w-6 h-6 object-cover rounded"
                loading="lazy"
              />
              <span className="mx-2 text-center text-xs font-bold">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <main className="mt-6">
        <GridBox />
      </main>
    </div>
  );
}

export default Home;
