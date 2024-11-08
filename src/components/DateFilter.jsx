import React, { useState } from "react";

function DateFilter({ onDateRangeChange, onCustomDateChange }) {
  const [dateRange, setDateRange] = useState("7 Days ago");
  const [customDates, setCustomDates] = useState({ startDate: "", endDate: "" });

  const handleDateRangeChange = (event) => {
    const selectedRange = event.target.value;
    setDateRange(selectedRange);

    // Notify the parent about the selected range
    if (onDateRangeChange) {
      onDateRangeChange(selectedRange);
    }

    // Clear custom dates if a predefined range is selected
    if (selectedRange !== "customRange") {
      setCustomDates({ startDate: "", endDate: "" });
    }
  };

  const handleCustomDateChange = (e) => {
    const { name, value } = e.target;
    const updatedDates = { ...customDates, [name]: value };
    setCustomDates(updatedDates);

    // Notify the parent about the custom dates
    if (onCustomDateChange) {
      onCustomDateChange(updatedDates);
    }
  };

  return (
    <div className="date-filter flex flex-col md:flex-row gap-4 items-center">
      {/* <label className="text-sm font-medium text-regal-black">
        Date Range:
      </label> */}
      <select
        value={dateRange}
        onChange={handleDateRangeChange}
        className="px-2 py-2 bg-white border rounded-lg focus:outline-none text-sm text-regal-black"
      >
        <option value="7 days Ago">7 Days Ago</option>
        <option value="a fortnight ago">A Fortnight Ago</option>
        <option value="a month ago">A Month Ago</option>
        {/* <option value="lastQuarter">Last Quarter</option> */}
        <option value="a year ago">A Year Ago</option>
        <option value="customRange">Custom Range</option>
      </select>

      {dateRange === "customRange" && (
        <div className="flex gap-2 items-center">
          <input
            type="date"
            name="startDate"
            value={customDates.startDate}
            onChange={handleCustomDateChange}
            className="px-2 py-2 border rounded-lg focus:outline-none text-sm text-regal-black"
            placeholder="Start Date"
          />
          <span className="text-sm font-medium text-gray-500">to</span>
          <input
            type="date"
            name="endDate"
            value={customDates.endDate}
            onChange={handleCustomDateChange}
            className="px-2 py-2 border rounded-lg focus:outline-none text-sm text-regal-black"
            placeholder="End Date"
          />
        </div>
      )}
    </div>
  );
}

export default DateFilter;
