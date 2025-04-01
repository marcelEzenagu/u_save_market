import React, { useMemo } from "react";
import GridBox from "../components/cards/GridBox";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../features/category/categoryApiSlice";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";

function Home() {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const imageList = useMemo(
    () => [
      "https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/5709271/pexels-photo-5709271.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/3987217/pexels-photo-3987217.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    []
  );

  return (
    <div className=" p-1 md:p-4">
      <h5 className="text-responsive font-bold text-regal-black mb-4 ">
        African Online Grocery Store for
        <span className="text-regal-blue"> Africans</span> in
        <span className="text-regal-blue"> Diaspora</span>
      </h5>

      {/* Image List */}
      <div className="overflow-x-auto flex space-x-4 scrollbar-hide my-4">
        {imageList.length
          ? imageList?.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[140px] lg:w-[10rem] h-[150px] relative overflow-hidden rounded-2xl shadow-lg group animate-fade-in"
              >
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="transition-transform w-full h-full object-cover group-hover:scale-110 duration-200"
                  loading="lazy"
                />
              </div>
            ))
          : 
        ""
        
        }
      </div>

      <DonationCard />

      {/* Category List (Mobile) */}
      <div className="lg:hidden mt-4">
        <div className="flex flex-wrap gap-2">
          {
            categories.length
              ? categories?.map((category) => (
                  <Link
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
                ))
              : 
            ""
          }
        </div>
      </div>

      {/* Grid Layout */}
      <main className="mt-6">
        <GridBox />
      </main>
    </div>
  );
}

function DonationCard() {
  return (
    <div className="flex flex-col text-sm font-medium leading-loose text-black space-x-4  ">
      <Link to="/extra">
        <ImageContainer
          src="https://cdn.builder.io/api/v1/image/assets/b53670262f1d4935bfecfb9f234abb33/2e6826af42933c1a96966cbf71723578a0b2ab07fdbbfb4a72ed872e620ef807?apiKey=b53670262f1d4935bfecfb9f234abb33&"
          alt="Main content image"
        />
        <ContentRow
          iconSrc="https://cdn.builder.io/api/v1/image/assets/b53670262f1d4935bfecfb9f234abb33/b983e2ffd7ca2cd3a0ef0f3dabd6ebabcd04657148a8cf2dc5b1949e0adf868b?apiKey=b53670262f1d4935bfecfb9f234abb33&"
          text="Put a smile on a face, far and beyond"
          indicatorSrc="https://cdn.builder.io/api/v1/image/assets/b53670262f1d4935bfecfb9f234abb33/13793f7018ffda8ec1861ea3a39517193ae44d8ddbf463122afadbdbca6c61a5?apiKey=b53670262f1d4935bfecfb9f234abb33&"
        />
      </Link>
    </div>
  );
}

function ImageContainer({ src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="object-contain w-full rounded-xl aspect-[2.88] max-md:max-w-full"
    />
  );
}

function ContentRow({ iconSrc, text, indicatorSrc }) {
  return (
    <div className="flex overflow-hidden flex-wrap gap-5 justify-between py-2.5 pl-4 mt-4 w-full bg-gray-200 rounded-xl max-md:max-w-full">
      <div className="flex gap-1">
        <img
          loading="lazy"
          src={iconSrc}
          alt=""
          className="object-contain shrink-0 rounded-lg aspect-[1.08] w-[43px]"
        />
        <div className="flex-auto my-auto">{text}</div>
      </div>
      <div
        // loading="lazy"
        // src={indicatorSrc}
        // alt=""
        className="object-contain shrink-0 m-auto w-3.5 aspect-[0.58] mr-4"
      >
        <AiOutlineArrowRight />
      </div>
    </div>
  );
}

export default Home;
