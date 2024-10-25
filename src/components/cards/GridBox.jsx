import React from "react";
// import { MockData } from "../../data/mockData";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";

function GridBox() {
    const gridColors = [
      'bg-grid-card-color-1',
      'bg-grid-card-color-2',
      'bg-grid-card-color-3',
      'bg-grid-card-color-4',
      'bg-grid-card-color-5',
      'bg-grid-card-color-6',
      ];
      const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

      console.log("categories:::: ",categories)
    const subCategories = categories?.filter((e)=>e?.subcat.length >= 5)
  return (
    <div>
      <div>
      {categories?.map((category, index) => {
        const isEven = parseInt(category.id) % 2 === 0;
        const hasFiveOrMoreSubcats = category.subcat.length >= 5;
        const color = gridColors[index % gridColors.length]
        return (
          <div key={category.id} className="category-container mb-8">
            <h2 className="text-lg font-bold mb-4">{category.name}</h2>
            <div className={`grid grid-cols-2  ${ category.subcat.length == 4 ? 'md:grid-cols-4' : 'md:grid-cols-3' } gap-4`}>
              {category?.subcat.map((sub, subIndex) => {
                let additionalClass = '';
                let additionalClass3 = '';

                   // Mobile view: If subcategory length is 5 or more, set the last child to col-span-2
                // But skip this rule if it's the first subcategory with 5 or more subcats
                if (
                  hasFiveOrMoreSubcats &&
                  subIndex === category.subcat.length - 1 &&
                  subCategories[0]?.id !== category.id
                ) {
                  additionalClass = 'col-span-2  sm:col-span-1';
                }

               // Even numbered categories with 5 or more subcats: Apply col-span-2 to the 4th subcat

               if (subCategories[0]?.id === category.id && subIndex === 0 && subIndex !== category.subcat.length - 1 ) {
                 additionalClass = 'col-span-2';
                }
                if (isEven && hasFiveOrMoreSubcats && subIndex === 3) {
                  additionalClass = 'col-span-1  sm:col-span-2';
                }

                // Odd numbered categories: Apply col-span-2 to the last subcat
                if (!isEven && subIndex === category.subcat.length - 1 && subCategories[0]?.id !== category.id) {
                  additionalClass = 'col-span-2';
                }

                if (category.subcat.length === 3 && subIndex === 2 ) {
                  additionalClass3 = ' col-span-2 sm:col-span-1';
                }

                
                return (
                    <Link
                    to={`/products?name=${category.name.toLowerCase()}subcategory=${sub?.name.toLowerCase()}`}
                    key={sub.id}
                    className={`subcat-item relative animate-fade-in rounded-lg transform transition-transform
                       duration-500 ease-in-out hover:scale-105 h-40
                        hover:shadow-lg overflow-hidden
                         ${color} ${category?.subcat.length  >= 5 && additionalClass}
                         ${category?.subcat.length  === 3 && additionalClass3}
                         `}
                  >
                    {/* Image as background */}
                    <img 
                      src={sub.image || ``} 
                      alt={sub.name} 
                      className="w-full object-contain absolute bottom-0"
                    />
                    
                    {/* Subcategory name positioned at the top-left corner */}
                    <span className="absolute top-0 left-0 m-2 text-regal-black  bg-opacity-50 px-2 py-1 text-sm font-[400]">
                      {sub.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}


export default GridBox;
