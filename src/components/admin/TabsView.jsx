import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function TabsView({ tabs, userInfo, url }) {
    const [active, setActive] = useState(tabs[0]?.id); // Set the first tab as active by default
    const   baseUrl = import.meta.env.VITE_APP_API_URL

    const activeTab = useMemo(() => tabs.find(tab => tab.id === active), [active, tabs]);

    return (
        <div className="rounded-2xl border bg-white mt-8 overflow-hidden">
            <div className="bg-regal-dashboard-active-tab-gray border-b flex flex-row justify-between items-center p-4">
                <Link className="flex flex-row gap-2 items-center text-xs font-[600]"
                to={url}>
                    <AiOutlineArrowLeft className="font-[400]" />
                    Go Back
                </Link>

                <div className="flex flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            src={userInfo?.profilePicture ? `${baseUrl}${userInfo?.profilePicture}` : "https://via.placeholder.com/40"}
                            alt="Profile"
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs capitalize text-regal-black whitespace-nowrap font-[600]">
                            {/* {userInfo.name || "User Name"} */}
                            {userInfo?.firstName.toUpperCase()}{" "}{userInfo?.lastName.toUpperCase()}
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
                        {tabs?.map((tab, index) => (
                            <li key={index} className="relative w-full">
                                <button
                                    onClick={() => setActive(tab.id)}
                                    className={`text-regal-light-gray text-nowrap text-xs md:px-8 after:scale-x-0 ${
                                        active === tab.id
                                            ? "text-regal-sky-blue after:scale-x-100 font-[600]"
                                            : "hover:text-regal-sky-blue hover:after:scale-x-100 font-[400]"
                                    } relative after:content-[''] after:absolute after:left-0 after:bottom-[-15px] after:w-full after:h-[4px] after:bg-regal-sky-blue after:rounded-full after:origin-left after:transition-transform after:duration-300 after:ease-in-out`}
                                >
                                    {tab.name}
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

export default TabsView;
