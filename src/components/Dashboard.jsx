import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "/C.png";
import profileImage from "/C.png";

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
            <div className="flex items-center">
                {/* Home */}
                <Link
                    to="/dashboard"
                    className="hover:text-gray-800 focus:ring-blue-500 focus:border-blue-500 "
                >
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
            </div>
            <div className="relative flex items-center space-x-4">
                <div className="flex items-center me-5">
                    {/* Friends */}
                    {/* <Link to="/friends" className="hover:text-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 ms-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                            />
                        </svg>
                    </Link> */}
                    {/* Chats */}
                    {/* <Link to="/" className="hover:text-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 ms-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                            />
                        </svg>
                    </Link> */}
                    {/* Options */}
                    <div
                        className="relative group cursor-pointer hover:text-gray-800"
                        onClick={() => setIsOptionsOpen(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-7 ms-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                            />
                        </svg>
                        <span className="absolute left-14 transform -translate-x-1/2 mt-2 mb-2 w-max bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Options
                        </span>
                    </div>

                    {/* Notifications */}
                    <div
                        className="relative group cursor-pointer hover:text-gray-800"
                        onClick={() => setIsNotificationsOpen(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-7 ms-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                        </svg>
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Notifications
                        </span>
                    </div>
                </div>
                <img
                    src={profileImage}
                    alt="User Profile"
                    className="w-14 h-14 rounded-full border-2 border-gray-300 cursor-pointer"
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
