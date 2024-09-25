import React, { useMemo, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { FiBarChart ,FiSearch} from "react-icons/fi";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// Register the necessary components for the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsAndAnalytics() {
    const [dropdownOption, setDropdownOption] = useState("This Month");
    const [isOpenSelect, setIsOpenSelect] = useState(false);
  const tab = useMemo(
    () => [
      {
        name: "Total Shipments",
        icon: <FiBarChart />,
        total: "500",
        color: "text-red-600",
        bgColor: "bg-red-100",
      },
      {
        name: "In Transit",
        icon: <FiBarChart />,
        total: "22",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      },
      {
        name: "Delivered",
        icon: <FiBarChart />,
        total: "40K",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
      },
      {
        name: "Completed",
        icon: <FiBarChart />,
        total: "40K",
        color: "text-green-600",
        bgColor: "bg-green-100",
      },
    ],
    []
  );
  
  const handleOptionChange = (option) => {
    setDropdownOption(option);
    setIsOpenSelect(false);
  };

  return (
    <div>
      <main className=" bg-regal-auth-bg-color">
      <div className="bg-white p-4 md:p-6">
      <div className="flex flex-row items-center justify-between">
          <h5 className="text-regal-black text-xs md:text-2xl font-[700] flex flex-row items-center gap-2">
          Reports & Analytics
            </h5>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-white rounded-md text-sm pl-11 pr-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-[370px] font-[400]"
              />
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-regal-crum-gray text-xl" />
            </div>
          </div>
        </div>
      </main>
      <main className="m-4 p-4 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 bg-white rounded-lg ">


        <section className="p-4  bg-white md:col-span-3 border rounded-lg" >

                <div className="flex flex-row justify-between">
                <h6 className="text-sm md:text-lg text-regal-black font-[500] ">Shipments Statistic</h6>
                <div className="relative md:pr-5">
              <button
                type="button"
                onClick={() => setIsOpenSelect(!isOpenSelect)}
                className="w-full text-xs flex justify-between items-center border rounded-sm py-2 px-3 ml-4 bg-transparent text-gray-700"
              >
                {dropdownOption}
                <SlArrowDown className="text-xs" />
              </button>

              {isOpenSelect && (
                <ul className="absolute left-0 pl-4 pr-8 bg-white border text-nowrap shadow-sm rounded-md mt-2 z-10 max-h-60 overflow-y-auto">
                  <li className="py-2">
                    <button
                      type="button"
                      className={`text-xs ${
                        dropdownOption === "This Month"
                          ? "text-regal-blue font-[600]"
                          : ""
                      }`}
                      onClick={() => handleOptionChange("This Month")}
                    >
                      This Month
                    </button>
                  </li>
                  <li className="py-2">
                    <button
                      type="button"
                      className={`text-xs ${
                        dropdownOption === "Disabled Users"
                          ? "text-regal-blue font-[600]"
                          : ""
                      }`}
                      onClick={() => handleOptionChange("Disabled Users")}
                    >
                      Disabled Users
                    </button>
                  </li>
                </ul>
              )}
            </div>
                </div>

                <SlimBarChart />

        </section>
        <section className="  md:row-span-1 bg-white flex flex-col gap-4 md:gap-8 ">
              <main className=" p-4 border rounded-lg row-span-1 flex flex-col items-start justify-between  h-1/2">
              <h6 className="text-sm md:text-lg text-regal-black font-[500] mb-4 ">Today</h6>
              <div
              className="flex flex-row items-center gap-4 mb-4"
            >
              <div className="flex flex-col gap-1">
                <div className="text-xs font-[600] text-regal-crum-gray">
                  Shipments
                </div>
                <div className="flex flex-row   gap-2 items-center ">
                  <h6 className="text-2xl font-bold text-regal-black">
                  500
                  </h6>
                  <span className="flex items-center text-[11px] text-regal-light-green font-[600] gap-1">
                  +20%
                  <span className="text-regal-crum-gray font-[500]">
                   vs same day last week 
                  </span>
                </span>
                </div>
          
              </div>
            </div>
            <div
              className="flex flex-row items-center gap-4 mb-2"
            >
              <div className="flex flex-col gap-1">
                <div className="text-xs font-[600] text-regal-crum-gray">
                  Revenue
                </div>
                <div className="flex flex-row   gap-2 items-center ">
                  <h6 className="text-2xl font-bold text-regal-black">
                  $2k
                  </h6>
                  <span className="flex items-center text-[11px] text-regal-light-green font-[600] gap-1">
                  +20%
                  <span className="text-regal-crum-gray font-[500]">
                   vs same day last week 
                  </span>
                </span>
                </div>
          
              </div>
            </div>
              </main>

              <main className=" p-4 border rounded-lg flex flex-col items-start justify-between  h-1/2">
              <h6 className="text-sm md:text-lg text-regal-black font-[500]  ">Past 30 days</h6>
              <div
              className="flex flex-row items-center gap-4 "
            >
              <div className="flex flex-col gap-1">
                <div className="text-xs font-[600] text-regal-crum-gray">
                  Shipments
                </div>
                <div className="flex flex-row   gap-2 items-center ">
                  <h6 className="text-2xl font-bold text-regal-black">
                  500
                  </h6>
                  <span className="flex items-center text-[11px] text-regal-light-green font-[600] gap-1">
                  +20%
                  <span className="text-regal-crum-gray font-[500]">
                   vs same day last week 
                  </span>
                </span>
                </div>
          
              </div>
            </div>
            <div
              className="flex flex-row items-center gap-4 "
            >
              <div className="flex flex-col gap-1">
                <div className="text-xs font-[600] text-regal-crum-gray">
                  Revenue
                </div>
                <div className="flex flex-row   gap-2 items-center ">
                  <h6 className="text-2xl font-bold text-regal-black">
                  $2k
                  </h6>
                  <span className="flex items-center text-[11px] text-regal-light-green font-[600] gap-1">
                  +20%
                  <span className="text-regal-crum-gray font-[500]">
                   vs same day last week 
                  </span>
                </span>
                </div>
          
              </div>
            </div>
              </main>
        </section>

        <section className="md:col-span-1">
        <main className=" p-4 border rounded-lg row-span-1 flex flex-col items-start justify-between  h-full">
              <h6 className="text-sm md:text-lg text-regal-black font-[500] mb-4 ">Incomplete shipment</h6>
              <div
              className="flex flex-row items-center gap-4 "
            >
              <div className="flex flex-col gap-1">
             
                <div className="flex flex-col   gap-2 items-cstart ">
                  <h6 className="text-3xl font-bold text-regal-black">
                  500
                  </h6>
                  <div className="text-xs font-[600] text-regal-crum-gray">
                  unfufilled Shipments
                </div>
                </div>
          
              </div>
            </div>
              </main>
        </section>
        <section className="p-4  bg-white md:col-span-3 border rounded-lg" >

<div className="flex flex-row justify-between">
<h6 className="text-sm md:text-lg text-regal-black font-[500] ">Weekly Revenue</h6>
</div>

<SlimBarChart />

</section>
      </main>
    </div>
  );
}


const SlimBarChart = () => {
    // Data for the chart
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Total',
          data: [50, 60, 70, 85, 90, 95, 100, 110, 120, 130, 140, 150], // Example data for total
          backgroundColor: 'rgba(157, 223, 245, 1)',
          borderRadius: 10, // Rounded edges
          barPercentage: 0.5, // Slim bars
          categoryPercentage: 0.5, // Slim bars
        },
        {
          label: 'Completed',
          data: [30, 45, 55, 75, 80, 85, 90, 95, 100, 105, 110, 120], // Example data for completed
          backgroundColor: 'rgba(2, 152, 202, 1)',
          borderRadius: 10, // Rounded edges
          barPercentage: 0.5, // Slim bars
          categoryPercentage: 0.5, // Slim bars
        },
      ],
    };
  
    // Options for the chart
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true, // Makes the legend icon circular
            pointStyle: 'circle',
            padding: 20, // Adds padding between legend items
            font: {
              size: 12, // Adjust font size if needed
            },
            boxWidth: 10, // Adjust size of the legend box
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false, // Hides grid lines for the x-axis
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false, // Hides horizontal grid lines
          },
        },
      },
    };
  
    return (
      <div className="w-full h-full">
        <Bar data={data} options={options} />
      </div>
    );
  };
  

export default ReportsAndAnalytics;
