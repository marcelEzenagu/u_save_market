import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import UserAccountTab from "./components/UserAccountTab";
import UserAddressTab from "./components/userAddressTab";
import UserPasswordTab from "./components/UserPasswordTab";
import UserOrderTab from "./components/UserOrderTab";
import UserPaymentMethod from "./components/UserPaymentMethod";
import UserSavedItemsTab from "./components/UserSavedItemsTab";
function UserView() {
    const [active, setActive] = useState("1");
    const tabs = [
        {
            id: '1',
            name: 'Account',
            component: <UserAccountTab />
        },
        {
            id: '2',
            name: 'Address',
            component: <UserAddressTab />
        },
        {
            id: '3',
            name: 'Password',
            component: <UserPasswordTab />
        },
        {
            id: '4',
            name: 'Orders',
            component: <UserOrderTab />
        },
        {
            id: '5',
            name: 'Saved Items',
            component: <UserSavedItemsTab />
        },
        {
            id: '6',
            name: 'Payment Methods',
            component: <UserPaymentMethod />
        },

    ];

    // Find the component for the active tab
    const activeTab = tabs.find(tab => tab.id === active);

    return (
        <div className="rounded-2xl border bg-white mt-8 overflow-hidden">
            <div className="bg-regal-dashboard-active-tab-gray border-b flex flex-row justify-between items-center p-4">
                <Link className="flex flex-row gap-2 items-center text-xs font-[600]">
                    <AiOutlineArrowLeft className="font-[400]" />
                    Go Back
                </Link>

                <div className="flex flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://via.placeholder.com/40"
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs capitalize text-regal-black whitespace-nowrap font-[600]">
                            Theresa Webb
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <IoIosArrowBack className="text-regal-crum-gray text-sm" />
                        <span className="text-regal-black text-xs">
                            <span className="text-regal-crum-gray text-xs">1 of</span> 350
                        </span>
                        <IoIosArrowForward className="text-regal-black text-sm" />
                    </div>
                </div>
            </div>

            <section>
                <nav className="flex flex-row items-center justify-between px-4 mt-5 py-3 border-b mb-2">
                    <ul className="hidden lg:flex flex-row items-center space-x-1 animate-fade-in">
                        {tabs.map((e, index) => (
                            <li key={index} className="relative w-full">
                                <button
                                    onClick={() => setActive(e.id)}
                                    className={`text-regal-light-gray text-nowrap text-xs md:px-8 after:scale-x-0 ${
                                        active === e.id
                                            ? "text-regal-sky-blue after:scale-x-100 font-[600]"
                                            : "hover:text-regal-sky-blue hover:after:scale-x-100 font-[400]"
                                    } relative after:content-[''] after:absolute after:left-0 after:bottom-[-15px] after:w-full after:h-[4px] after:bg-regal-sky-blue after:rounded-full after:origin-left after:transition-transform after:duration-300 after:ease-in-out`}
                                >
                                    {e.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    {activeTab ? activeTab.component : null}
                </div>
            </section>
        </div>
    );
}

export default UserView;
