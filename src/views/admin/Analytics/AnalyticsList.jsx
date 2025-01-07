import React, { useMemo, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import SalesTab from "./component/SalesTab";
import VendorTab from "./component/VendorTab";
import UserTab from "./component/UserTab";
import ProductTab from "./component/ProductTab";
function AnalyticsList() {
  const [dropdownOption, setDropdownOption] = useState("This Month");
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const tabOptions = useMemo(
    () => [
      { id: "1", name: "Sales", component: SalesTab },
      { id: "2", name: "Vendors", component: VendorTab },
      {
        id: "3",
        name: "Users",
        component: UserTab,
      },
      { id: "4", name: "Products",  component:ProductTab},
    ],
    []
  );

  const handleOptionChange = (option) => {
    setDropdownOption(option);
    setIsOpenSelect(false);
  };

  const [activeTab, setActiveTab] = useState("1");
  const ActiveComponent = useMemo(
    () => tabOptions?.find((i) => i.id === activeTab),
    [activeTab]
  );
  return (
    <div className="">
      <section className="rounded-2xl  animate-fade-in  bg-white">
        <div className="  pt-8 pb-4">
          <div className="flex flex-row items-center justify-between">
            <div>
              {tabOptions?.map((tab) => (
                <button
                  key={tab.id}
                  className={`shadow-sm rounded-full py-2 px-4 mr-3 hover:text-white hover:bg-regal-black text-xs md:text-xs font-[600] ${
                    activeTab === tab.id
                      ? "bg-regal-black text-white"
                      : "text-regal-black bg-regal-dashboard-active-tab-gray"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
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
        </div>
      </section>

      <section>
        <ActiveComponent.component />
      </section>
    </div>
  );
}

export default AnalyticsList;
