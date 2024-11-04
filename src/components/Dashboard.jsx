import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "/C.png";
import profileImage from "/C.png";
import "../assets/css/Tooltip.css";
import { ReactComponent as NotificationIcon } from "../assets/svg/notification.svg";
import { ReactComponent as OptionsIcon } from "../assets/svg/options.svg";

const TopBar = () => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [userStatus, setUserStatus] = useState("online"); // Dynamic status
    const username = "John Doe"; // Replace with dynamic username

    const optionsRef = useRef();
    const notificationsRef = useRef();
    const profileRef = useRef();

    // Function to handle outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                optionsRef.current &&
                !optionsRef.current.contains(event.target)
            ) {
                setIsOptionsOpen(false);
            }
            if (
                notificationsRef.current &&
                !notificationsRef.current.contains(event.target)
            ) {
                setIsNotificationsOpen(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileModalOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/dashboard" className="flex items-center">
                    <img src={logo} className="h-14 me-3" alt="Quizmis Logo" />
                    <span className="self-center text-2xl font-semibold text-green-500">
                        <span className="text-red-500">Q</span>uizmis
                    </span>
                </Link>
            </div>

            <form className="flex items-center">
                <label for="simple-search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="gray"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 pe-28 p-2.5"
                        placeholder="Search..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="p-3 text-sm font-medium text-white bg-green-600 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </button>
            </form>

            <div className="flex items-center relative group">
                {/* Home */}
                <Link to="/dashboard" className="hover:text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                    </svg>
                </Link>

                {/* Tooltip */}
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-20 w-max bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Home
                    <div className="tooltip-arrow"></div>
                </div>
            </div>

            <div className="relative flex items-center justify-center group w-24 h-10 me-12">
                {/* Options */}
                <div
                    className="cursor-pointer hover:text-gray-800 flex justify-center items-center"
                    onClick={() => setIsOptionsOpen(true)}
                >
                    <OptionsIcon />

                    {/* Tooltip with Arrow */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 -ml-10 w-max bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 tooltip">
                        Options
                        <div className="tooltip-arrow"></div>
                    </div>
                </div>

                <div
                    className="relative group cursor-pointer hover:text-gray-800"
                    onClick={() => setIsNotificationsOpen(true)}
                >
                    <NotificationIcon />
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Notifications
                    </span>
                </div>

                <img
                    src={profileImage}
                    alt="User Profile"
                    className="w-14 h-14 ms-8 rounded-full border-2 border-gray-300 cursor-pointer"
                    onClick={() => setIsProfileModalOpen(true)}
                />
            </div>

            {/* Options Modal */}
            {isOptionsOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10"
                        onClick={() => setIsOptionsOpen(false)}
                    ></div>
                    <div
                        ref={optionsRef}
                        className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg rounded-lg p-6 z-20"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold mt-2">
                                Options
                            </h2>
                            <button
                                onClick={() => setIsOptionsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-4xl"
                            >
                                &times;
                            </button>
                        </div>
                        <p className="text-gray-600">
                            Customize your experience here.
                        </p>
                    </div>
                </>
            )}

            {/* Notifications Modal */}
            {isNotificationsOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10"
                        onClick={() => setIsNotificationsOpen(false)}
                    ></div>
                    <div
                        ref={notificationsRef}
                        className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg rounded-lg p-6 z-20"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold mt-2">
                                Notifications
                            </h2>
                            <button
                                onClick={() => setIsNotificationsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-4xl"
                            >
                                &times;
                            </button>
                        </div>
                        <p className="text-gray-600">
                            Here are your latest notifications.
                        </p>
                    </div>
                </>
            )}

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10"
                        onClick={() => setIsProfileModalOpen(false)}
                    ></div>
                    <div
                        ref={profileRef}
                        className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg rounded-lg p-6 z-20"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold mt-2">
                                {username}
                            </h2>
                            <button
                                onClick={() => setIsProfileModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-4xl"
                            >
                                &times;
                            </button>
                        </div>
                        <p className="text-gray-600">
                            User Status: {userStatus}
                        </p>
                        <Link
                            to="/profile"
                            className="text-blue-500 hover:underline"
                        >
                            View Profile
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

const DashboardBody = () => {
    return (
        <div>
            <TopBar />
            <div className="flex justify-between py-8 px-4 bg-[#20935C] min-h-screen">
                {/* Left Side Content */}
                <div className="hidden lg:block lg:w-1/4 p-4">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Left Side Content</p>
                        <p className="text-xs text-gray-400">
                            Additional information or widgets can go here.
                        </p>
                    </div>
                    {/* Additional Placeholder Boxes */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Another Widget</p>
                    </div>
                </div>

                {/* Main News Feed */}
                <div className="w-full lg:w-1/2 p-4">
                    {/* News Feed Post */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <p className="text-gray-800 font-semibold">
                            News Feed Item 1
                        </p>
                        <p className="text-gray-600">
                            This is a placeholder for a news feed item.
                        </p>
                    </div>
                    {/* Additional News Feed Items */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <p className="text-gray-800 font-semibold">
                            News Feed Item 2
                        </p>
                        <p className="text-gray-600">
                            More content for the feed.
                        </p>
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="hidden lg:block lg:w-1/4 p-4">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Right Side Content</p>
                        <p className="text-xs text-gray-400">
                            Notifications or other widgets.
                        </p>
                    </div>
                    {/* Additional Placeholder Boxes */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Another Widget</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBody;
