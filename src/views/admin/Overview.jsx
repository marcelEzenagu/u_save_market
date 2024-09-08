import React, { useMemo, useState } from "react";
import { Items } from "../../data/mockData";
import { Link } from "react-router-dom";
import OrderVendorStatus from "../../components/order/OrderVendorStatus";
import { Line } from "react-chartjs-2";
import { Menu } from "@headlessui/react";
import ReactPaginate from "react-paginate";
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

function Overview() {
  const tab = useMemo(
    () => [
      {
        name: "Total Sales",
        icon: (
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
        ),
        total: "₦15k",
        percentage: "+23%",
      },
      {
        name: "Total Customers",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
              fill="#21367F"
            />
            <path
              d="M14.08 14.15C11.29 12.29 6.74001 12.29 3.93001 14.15C2.66001 15 1.96001 16.15 1.96001 17.38C1.96001 18.61 2.66001 19.75 3.92001 20.59C5.32001 21.53 7.16001 22 9.00001 22C10.84 22 12.68 21.53 14.08 20.59C15.34 19.74 16.04 18.6 16.04 17.36C16.03 16.13 15.34 14.99 14.08 14.15Z"
              fill="#21367F"
            />
            <path
              d="M19.9904 7.3401C20.1504 9.2801 18.7704 10.9801 16.8604 11.2101C16.8504 11.2101 16.8504 11.2101 16.8404 11.2101H16.8104C16.7504 11.2101 16.6904 11.2101 16.6404 11.2301C15.6704 11.2801 14.7804 10.9701 14.1104 10.4001C15.1404 9.4801 15.7304 8.1001 15.6104 6.6001C15.5404 5.7901 15.2604 5.0501 14.8404 4.4201C15.2204 4.2301 15.6604 4.1101 16.1104 4.0701C18.0704 3.9001 19.8204 5.3601 19.9904 7.3401Z"
              fill="#21367F"
            />
            <path
              d="M21.99 16.59C21.91 17.56 21.29 18.4 20.25 18.97C19.25 19.52 17.99 19.78 16.74 19.75C17.46 19.1 17.88 18.29 17.96 17.43C18.06 16.19 17.47 15 16.29 14.05C15.62 13.52 14.84 13.1 13.99 12.79C16.2 12.15 18.98 12.58 20.69 13.96C21.61 14.7 22.08 15.63 21.99 16.59Z"
              fill="#21367F"
            />
          </svg>
        ),
        total: "350",
        percentage: "+5 new",
      },
      {
        name: "Total Vendors",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.8603 6.36997L11.9303 0.829971C10.8603 -0.0300287 9.13026 -0.0300287 8.07026 0.819971L1.14027 6.36997C0.360265 6.98997 -0.139735 8.29997 0.0302651 9.27997L1.36027 17.24C1.60027 18.66 2.96027 19.81 4.40027 19.81H15.6003C17.0303 19.81 18.4003 18.65 18.6403 17.24L19.9703 9.27997C20.1303 8.29997 19.6303 6.98997 18.8603 6.36997ZM10.0003 13.5C8.62027 13.5 7.50027 12.38 7.50027 11C7.50027 9.61997 8.62027 8.49997 10.0003 8.49997C11.3803 8.49997 12.5003 9.61997 12.5003 11C12.5003 12.38 11.3803 13.5 10.0003 13.5Z"
              fill="#21367F"
            />
          </svg>
        ),
        total: "642",
        percentage: "+3 new",
      },
      {
        name: "Total Orders",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 19 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0002 0H2.00018C0.900183 0 0.000183105 0.9 0.000183105 2V15C0.000183105 15.55 0.450183 16 1.00018 16C1.55018 16 2.00018 15.55 2.00018 15V3C2.00018 2.45 2.45018 2 3.00018 2H13.0002C13.5502 2 14.0002 1.55 14.0002 1C14.0002 0.45 13.5502 0 13.0002 0ZM13.5902 4.59L18.4202 9.42C18.7902 9.79 19.0002 10.3 19.0002 10.83V20C19.0002 21.1 18.1002 22 17.0002 22H5.99018C4.89018 22 4.00018 21.1 4.00018 20L4.01018 6C4.01018 4.9 4.90018 4 6.00018 4H12.1702C12.7002 4 13.2102 4.21 13.5902 4.59ZM13.0002 11H17.5002L12.0002 5.5V10C12.0002 10.55 12.4502 11 13.0002 11Z"
              fill="#21367F"
            />
          </svg>
        ),
        total: "2935",
        percentage: "",
      },
    ],
    []
  );
  return (
    <div className="">
      <div className="flex flex-row items-center gap-4 mt-4">
        <div className="flex flex-row items-center gap-2">
          <h6 className="text-sm text-regal-light-gray">Form:</h6>
          <input
            type="date"
            className="text-xs text-regal-light-gray border rounded-[4px] px-2 py-1"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <h6 className="text-sm text-regal-light-gray">To:</h6>
          <input
            type="date"
            className="text-xs text-regal-light-gray border rounded-[4px] px-2 py-1"
          />
        </div>
      </div>

      <section>
        <div className="grid grid-cols-2 md:grid-cols-4  gap-4  relative  bg-white mt-8">
          {tab.map((item) => (
            <div
              key={item.name}
              className="flex flex-row items-center gap-4 p-4 border rounded-3xl"
            >
              <div className="w-12 h-12 rounded-full text-white bg-regal-auth-bg-color flex items-center justify-center text-sm">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs font-[600] text-regal-crum-gray">
                  {item.name}
                </div>
                <div className="text-lg  font-bold text-regal-blue">
                  {item.total}
                </div>
                <span className="flex items-center text-[11px] text-regal-light-green font-[600] gap-1">
                  {item.percentage}{" "}
                  <span className="text-regal-crum-gray font-[500]">
                    since last month
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <main className="grid grid-cols-1 md:grid-cols-3 gap-4  mt-8">
          <div className="col-span-2 p-4 md:pt-8 md:px-4 border rounded-2xl">
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
          <div className="p-4 md:pt-8 md:px-4  border rounded-2xl">
            <div className=" flex flex-row items-center justify-between">
              <h2 className="text-sm md:text-lg font-[700] text-regal-blue ">
                Best Sellers
              </h2>
              <button
                className="gap-2 text-xs font-[500]
         text-regal-sky-blue
        "
              >
                View details
              </button>
            </div>

            <div className="min-h-[400px] max-h-[540px] overflow-auto">
              {Items.map((e) => (
                <div
                  key={e?.productID}
                  className="flex flex-row items-center justify-between gap-8 px-4 py-3 rounded-xl shadow-xl mt-5"
                >
                  <div>
                    <img
                      src={e.image}
                      alt={e.name}
                      className="w-12 h-14 object-cover rounded ml-2"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row items-center justify-between">
                      <h5 className=" text-sm font-medium text-regal-black w-[130px] line-clamp-1">
                        {e?.name}
                      </h5>
                      <p className=" text-xs font-medium text-regal-black  line-clamp-1">
                        ₦{e?.price}
                      </p>
                    </div>
                    <p className=" text-xs  text-regal-crum-gray w-[50px] line-clamp-1">
                      Staples
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </section>

      <section>
        <div className="p-4 md:pt-8 md:px-4  border rounded-2xl mt-8">
          <div className=" flex flex-row items-center justify-between">
            <h2 className="text-sm md:text-lg font-[700] text-regal-blue ">
             Ongoing Orders
            </h2>
            <button
              className="gap-2 text-xs font-[500]
         text-regal-sky-blue
        "
            >
              View All
            </button>
          </div>
              <ProductTableTab/>

        </div>
      </section>
    </div>
  );
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
           Status
          </th>

        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {currentItems.map((product) => (
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
            <OrderVendorStatus />
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

export default Overview;
