import React, { useMemo, useState } from "react";
import { Items } from "../../../../data/mockData";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { PiDotsThreeOutline } from "react-icons/pi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import { Menu } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  // Register necessary Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
function SalesTab() {
  return (
    <div>      <section>
    <main className="  mt-8">
        <div className=" p-4 md:pt-8 md:px-4 border rounded-2xl">
          <div className=" flex flex-row items-center justify-between">
            <div>
              <h6 className="text-xs font-[600] text-regal-crum-gray">
                Total Sales
              </h6>
              <h2 className="text-sm md:text-3xl font-[700] text-regal-blue ">
                $37.5K
              </h2>
            </div>
            <button
              className="gap-2 text-xs font-[500] py-1 px-2 rounded-md
       bg-regal-secondary-light
      "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.67334 11.6398C4.56707 10.8325 3.56813 9.99777 3.56813 8.69778C3.56813 7.20622 4.95022 6.16624 7.26282 6.16624C9.20595 6.16624 10.1775 6.90518 10.5333 8.082C10.6975 8.62936 11.1491 9.03988 11.7238 9.03988H12.1343C13.0375 9.03988 13.6806 8.15042 13.3659 7.30201C12.7912 5.6873 11.4501 4.34626 9.31542 3.82627V2.88207C9.31542 1.7463 8.39859 0.829468 7.26282 0.829468C6.12705 0.829468 5.21022 1.7463 5.21022 2.88207V3.78522C2.55552 4.35995 0.420807 6.08414 0.420807 8.72515C0.420807 11.8862 3.03446 13.4598 6.8523 14.3767C10.2733 15.1977 10.9575 16.4019 10.9575 17.6745C10.9575 18.6187 10.287 20.1239 7.26282 20.1239C5.00496 20.1239 3.84181 19.3166 3.39024 18.1671C3.18498 17.6335 2.71972 17.2503 2.15868 17.2503H1.77553C0.858695 17.2503 0.215546 18.1808 0.557647 19.0292C1.33764 20.9313 3.15761 22.0534 5.21022 22.4913V23.4081C5.21022 24.5439 6.12705 25.4607 7.26282 25.4607C8.39859 25.4607 9.31542 24.5439 9.31542 23.4081V22.5187C11.9838 22.0123 14.1048 20.466 14.1048 17.6608C14.1048 13.7746 10.7796 12.4472 7.67334 11.6398Z"
                  fill="#21367F"
                />
              </svg>
            </button>
          </div>
          <ChartComponent />
        </div>

      </main>
    </section>


    <section className=" p-4 md:pt-8 md:px-4  border rounded-2xl mt-8 ">
    <div className=" flex flex-row items-center justify-between">
          <h2 className="text-sm md:text-lg font-[700] text-regal-blue ">
           Moost efficient Orders
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
        </section></div>
  )
}

const ChartComponent = React.memo(() => {
    const data = {
      labels: ["January", "March", "May", "July", "September", "November"], // Displaying only 6 months
      datasets: [
        {
          label: "Monthly Data",
          data: [40, 44, 33, 46, 36, 43, 45, 39, 60, 100], // Corresponding values for 6 months
          borderColor: "rgba(106, 210, 255, 1)", // Line color
          backgroundColor: "rgba(106, 210, 255, 0.2)", // Transparent fill
          tension: 0.3, // Smooth curve on the line
          fill: true, // Fill under the line
          pointRadius: 0, // Remove points from the line
        },
      ],
    };
  
    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 20, // Y-axis increments: 0, 20, 40, 60, 80, 100
          },
          grid: {
            display: true, // Remove horizontal lines
          },
        },
        x: {
          grid: {
            display: false, // Remove vertical lines
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    };
  
    return (
      <div className="mt-2">
        <Line data={data} options={options} />
      </div>
    );
  });
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
          {/* <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
            <input type="checkbox" />
            </th> */}
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
              ORDER ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              VENDOR
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
             ITEMS
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              DATE
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
             PRICE
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
             COUNTRY
            </th>
  
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems?.map((product) => (
            <tr key={product.productID}>
                   <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                   099084057
              </td>
              <td className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[600]">
                <div className="flex  items-center gap-2">
                <img src="https://via.placeholder.com/40" alt="" className="w-6 h-6 rounded-full object-cover" />
              <Link >
               Theresa Webb
                </Link>
                </div>
              </td>
              <td className="px-6 py-2 max-w-[200px]  truncate whitespace-nowrap text-xs text-regal-black font-[600]">
              {product.name}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black font-[600]">
              2nd Aug, 2023
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-price-dark font-[600]">
              ₦1,585.00
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                Nigeria
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

export default SalesTab