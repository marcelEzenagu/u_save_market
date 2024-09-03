import React, { useState } from "react";
import { PiExport } from "react-icons/pi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
function Analytics() {
  const chartData = [
    {
      id: "1",
      labels: ["January", "February", "March"], // X-axis labels
      todayData: [0, 39, 40], // Data for today
      yesterdayData: [20, 6, 30], // Data for yesterday (you can replace with actual values)
      header: "Sales",
      yesterdayDataColor: "rgba(206, 214, 240, 1)",
      total: 1000,
      color: "rgba(33, 54, 127, 1)",
    },
    {
      id: "2",
      labels: ["January", "February", "March"], // X-axis labels
      todayData: [0, 39, 20], // Data for today
      yesterdayData: [20, 6, 30], // Data for yesterday (you can replace with actual values)
      header: "Visitors",
      yesterdayDataColor: "rgba(185, 229, 255, 1)",
      total: 120,
      color: "rgba(21, 171, 255, 1)",
    },
    {
      id: "3",
      labels: ["January", "February", "March"], // X-axis labels
      todayData: [22, 6, 21], // Data for today
      yesterdayData: [0, 18, 40], // Data for yesterday (you can replace with actual values)
      header: "Orders",
      yesterdayDataColor: "rgba(204, 247, 174, 1)",
      total: 30,
      color: "rgba(98, 205, 20, 1)",
    },
  ];

  const data = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Today",
        data: [30, 34, 39], // Today's data
        backgroundColor: "rgba(33, 54, 127, 1)",
        borderColor: "rgba(33, 54, 127, 1)",
        borderWidth: 2,
        pointStyle: "circle",
        pointRadius: 5,
      },
      {
        label: "Yesterday",
        data: [20, 6, 30], // Yesterday's data
        backgroundColor: "rgba(206, 214, 240, 1)",
        borderColor: "rgba(206, 214, 240, 1)",
        borderWidth: 2,
        pointStyle: "circle",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          color: "white",
          drawBorder: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "#e5e5e5",
        },
        ticks: {
          stepSize: findHighest(data.datasets[0].data) / 2, // Dynamic step size based on max value
        },
        suggestedMin: findLowest([
          ...data.datasets[0].data,
          ...data.datasets[1].data,
        ]), // Minimum value across both datasets
        suggestedMax: findHighest([
          ...data.datasets[0].data,
          ...data.datasets[1].data,
        ]), // Maximum value across both datasets
      },
    },
    plugins: {
      legend: {
        display: true, // Display the legend for both datasets
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    layout: {
      padding: {},
    },
  };

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between ">
        <h5 className="text-regal-black text-lg md:text-2xl font-[700]">
          Analytics
        </h5>
        <div className="flex flex-row items-center gap-6">
          <button className="flex flex-row items-center justify-center gap-2 font-[500] text-regal-black text-xs">
            <PiExport className="text-sm" />
            Export
          </button>
          <input
            type="date"
            className=" px-2 py-2 bg-white text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
          />
          <select
            name=""
            id=""
            disabled="disabled"
            className=" px-2 py-2 bg-white text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
          >
            <option value="">Compare Yesterday</option>
            <option value="">Compare Today</option>
            <option value="">Compare last Month</option>
          </select>
        </div>
      </div>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {chartData.map((e, index) => (
            <div className="rounded-md border bg-white p-5" key={index}>
              <LineChartComponent
                header={e?.header}
                total={e?.total}
                color={e?.color}
                chartData={e}
                yesterdayDataColor={e?.yesterdayDataColor}
              />
            </div>
          ))}

          <div className="rounded-md border md:col-span-2 bg-white p-5">
            <div>
              <h2 className="text-lg font-bold text-black">Performance</h2>
              <p className={`text-3xl my-4 font-semibold text-regal-blue`}>
                60 %
              </p>
              <div className="h-72">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>

        <div className="rounded-md border bg-white p-5" >
        <div>
        <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-bold text-black">Best seller</h2>
        <select className=" text-regal-blue ">
            <option value="">By Sales</option>
            <option value="">By Price</option>
        </select>
        </div>
        <div className="flex flex-row items-center gap-4 my-5">
          <img src="" alt="" className="w-14 h-14" />
          <div className="w-full">
            <h5 className="text-regal-blue font-[700]  text-lg max-w-[200px] line-clamp-3">
            Spice Supreme Curry Powder 85 g
            </h5>
            <div className="mt-3 flex flex-row items-center justify-between">
                <h6 className="text-regal-black  text-sm  font-[700]"> Total Sale</h6>
                <p className="text-regal-light-gray text-sm  font-[500]">
                    $400
                </p>
            </div>
          </div>
        </div>

        <div className="h-72">
        <Bar data={data} options={options} />
        </div>
      </div>
            </div>
        </div>
      </section>
    </div>
  );
}

function findHighest(arr) {
  if (arr.length === 0) return undefined;
  return Math.max(...arr);
}

function findLowest(arr) {
  if (arr.length === 0) return undefined;
  return Math.min(...arr);
}
const LineChartComponent = ({
  header,
  total,
  color = "black",
  chartData,
  yesterdayDataColor,
}) => {
  const data = {
    labels: chartData.labels, // Common labels for both datasets
    datasets: [
      {
        label: "Today",
        data: chartData.todayData,
        borderColor: color,
        backgroundColor: color,
        fill: false,
        pointStyle: "circle", // Set point style to circle
        pointRadius: 5, // Set the radius of the circle
      },
      {
        label: "Yesterday",
        data: chartData.yesterdayData,
        borderColor: yesterdayDataColor, // A different color for Yesterday
        backgroundColor: yesterdayDataColor,
        fill: false,
        pointStyle: "circle", // Set point style to circle
        pointRadius: 5, // Set the radius of the circle
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          color: "white",
          drawBorder: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "#e5e5e5",
        },
        ticks: {
          stepSize: findHighest(chartData.todayData) / 2, // Dynamic step size based on max value
        },
        suggestedMin: findLowest([
          ...chartData.todayData,
          ...chartData.yesterdayData,
        ]), // Minimum value across both datasets
        suggestedMax: findHighest([
          ...chartData.todayData,
          ...chartData.yesterdayData,
        ]), // Maximum value across both datasets
      },
    },
    plugins: {
      legend: {
        display: true, // Display the legend for both datasets
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    layout: {
      padding: {},
    },
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-black">{header}</h2>
      <p className={`text-3xl my-4 font-semibold`} style={{ color }}>
        {header === "Sales" && "$"}
        {total}
      </p>
      <div className="h-72">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
