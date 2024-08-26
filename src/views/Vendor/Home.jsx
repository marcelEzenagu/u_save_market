import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { LuListFilter } from "react-icons/lu";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaShoppingCart, FaUserPlus, FaBox } from 'react-icons/fa';
import { LiaBoxSolid } from "react-icons/lia";
import { Items } from "../../data/mockData";
import ReactPaginate from "react-paginate";
import OrderVendorStatus from "../../components/order/OrderVendorStatus";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function Home() {

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            data: [500, 1000, 1500, 2000, 1800, 2100, 1900],
            backgroundColor: 'rgba(33, 54, 127, 1)',
            borderColor: 'rgba(33, 54, 127, 1)',
            borderWidth: 0,
          },
        ],
      };
      
      const options = {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 2500,
          },
        },
      };
      
  return (
    <div className="px-4 py-8">
      <div className="flex flex-row items-center justify-between ">
        <h5 className="text-regal-black text-lg md:text-2xl font-[700]">
          Dashboard
        </h5>
        <input
          type="date"
          className=" px-2 py-2 bg-white text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-4 overflow-hidden">
    {/* Left Side: Chart */}
    <div className="bg-white p-4 rounded shadow mt-4" >
        <h2  className="text-sm md:text-lg font-[700] ">Sales</h2>
        <Bar data={data} options={options} />
      </div>

      {/* Right Side: Stats */}
      <div className="bg-white pt-4 rounded shadow space-y-4 mt-4">
      <div className="px-6 flex flex-row items-center justify-between">
        <h3></h3>
          <button
            className="gap-2 text-xs  py-2 px-3 font-[400]
         text-regal-sky-blue  bg-regal-secondary-light rounded-md
        "
          >
            View all
          </button>
      
      </div>
  <div className="grid grid-cols-2 md:gap-4 md:px-8 relative">
  {[
    { name: 'Orders', icon: <FaShoppingCart />, total: 183, percentage: '+12%' },
    { name: 'New Customers', icon: <FaUserPlus />, total: 96, percentage: '+5%' },
    { name: 'Total sections', icon: <LiaBoxSolid />, total: 12, percentage: '+3%' },
    { name: 'Total Products', icon: <LiaBoxSolid />, total: 25, percentage: '+3%' },
  ].map((item) => (
    <div key={item.name} className="flex flex-row items-start justify-between p-4">
      <div className="flex flex-col gap-2">
        <div className="text-xs md:text-sm font-[400]">{item.name}</div>
        <div className="text-lg md:text-xl font-bold">{item.total}</div>
        <span>
          <span className="text-xs font-[500] py-1 px-3 bg-green-100 text-green-800 rounded-full">
            {item.percentage}
          </span>
        </span>
      </div>
      <div className="w-10 h-10 rounded-full text-white bg-regal-sky-blue flex items-center justify-center text-sm">
        {item.icon}
      </div>
    </div>
  ))}

  {/* Pseudo-element to create borders between the gaps */}
  <div className="absolute inset-0 grid grid-cols-2    md:px-8  pointer-events-none">
    <div className="border-r border-b border-gray-300"></div>
    <div className="border-b border-gray-300"></div>
    <div className="border-r border-gray-300"></div>
    <div></div>
  </div>
</div>


      </div>

        <BestSeller />
        <Orders />
      </div>
    </div>
  );
}

const BestSeller = () => {
  const itemsPerPage = 5;
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
    <div className=" py-6 bg-white rounded-lg shadow-md mt-4 ">
      <div className="px-6 mb-6 flex flex-row items-center justify-between">
        <h2 className="text-sm md:text-lg font-[700] ">Best Sellers</h2>
        <div className="flex items-center gap-3">
        <button
            className="gap-2 text-xs  py-2 px-3 font-[400]
         text-regal-black  bg-gray-200 rounded-md
        "
          >
            <LuListFilter className="text-sm"/>
          </button>
          <button
            className="gap-2 text-xs  py-2 px-3 font-[400]
         text-regal-sky-blue  bg-regal-secondary-light rounded-md
        "
          >
            View all
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-scroll">
      <table className=" min-w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider">
              Product
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              No. of Items
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black  tracking-wider">
              Total Revenue
            </th>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {currentItems.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-2 whitespace-nowrap">
                <img
                  src={product.image}
                  alt={product.name}
                 className="w-12 h-14 object-cover rounded"
                />
              </td>
              <td className="px-6 py-2 text-xs font-medium text-regal-black w-[200px] line-clamp-3">
                {product.name}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                200
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                $1000
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
};
const Orders = () => {
    const itemsPerPage = 5;
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
      <div className="py-6 bg-white rounded-lg shadow-md mt-4">
        <div className="px-6 mb-6 flex flex-row items-center justify-between">
          <h2 className="text-sm md:text-lg font-[700] ">Orders</h2>
          <div className="flex items-center gap-3">
          <button
              className="gap-2 text-xs  py-2 px-3 font-[400]
           text-regal-black  bg-gray-200 rounded-md
          "
            >
              <LuListFilter className="text-sm"/>
            </button>
            <button
              className="gap-2 text-xs  py-2 px-3 font-[400]
           text-regal-sky-blue  bg-regal-secondary-light rounded-md
          "
            >
              View all
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
         
              <th className="px-6 py-4 text-left text-xs font-medium text-regal-black  tracking-wider">
              Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-regal-black  tracking-wider">
             Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-regal-black  tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-regal-black tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-regal-black  tracking-wider">
                Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {currentItems.map((product) => (
              <tr key={product.id}>
                      <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                      199090879
                </td>

                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                <OrderVendorStatus />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                  $1000
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <img
                    src={product.image}
                    alt={product.name}
                 className="w-12 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-2 text-xs font-medium text-regal-black w-[200px] line-clamp-3">
                  {product.name}
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
  };

const BarChart = () => {
  // Data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [500, 1200, 1500, 1000, 1800, 2000],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Revenue",
        data: [400, 1100, 1400, 900, 1700, 1900],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales and Revenue",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
          max: 2500,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Home;
