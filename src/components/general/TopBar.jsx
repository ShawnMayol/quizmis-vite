import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/Logo.png";
import "../../assets/css/Topbar.css";

const TopBar = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const username = "John Doe"; // Dynamic username

    const openModal = () => {
        setIsProfileModalOpen(true);
    };
    const closeModal = () => {
        setIsProfileModalOpen(false);
    };

    return (
        <div className="fixed top-0 w-full bg-white rounded-b-sm shadow-md py-3 px-8 flex justify-between items-center z-50">
            <div className="flex items-center">
                <Link to="/dashboard" className="flex items-center">
                    <img src={logo} className="h-14 mr-4" alt="Quizmis Logo" />
                    <span className="self-center text-2xl font-semibold text-green-500">
                        <span className="text-red-500">Q</span>uizmis
                    </span>
                </Link>
            </div>
            <img
                src={logo}
                alt="User Profile"
                className="w-14 h-14 rounded-full border-2 border-gray-300 cursor-pointer"
                onClick={openModal}
            />

            {/* Profile Modal */}
            <div
                className={`fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg rounded-lg p-6 z-20 ${
                    isProfileModalOpen ? "modal-visible" : "modal-hidden"
                }`}
                style={{ transition: "transform 300ms ease-in-out" }}
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <img
                            src={logo}
                            alt="User Profile"
                            className="w-10 h-10 rounded-full border-2 border-gray-300 mr-3"
                        />
                        <h2 className="text-xl font-semibold">{username}</h2>
                    </div>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-4xl me-2 px-2 rounded pb-1"
                    >
                        &times;
                    </button>
                </div>
                <hr />
                <ul className="space-y-2 my-3">
                    <li>
                        <Link
                            to="/profile"
                            className="block p-2 rounded text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-all"
                        >
                            Your Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/your-quizzes"
                            className="block p-2 rounded text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-all"
                        >
                            Your Quizzes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/saved-quizzes"
                            className="block p-2 rounded text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-all"
                        >
                            Saved Quizzes
                        </Link>
                    </li>
                </ul>
                <hr />
                <Link
                    to="/logout"
                    className="block p-2 mt-3 rounded text-red-500 hover:bg-red-100 hover:text-red-700 transition-all"
                >
                    Log Out
                </Link>
            </div>

            {isProfileModalOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10"
                    onClick={closeModal}
                ></div>
            )}
        </div>
    );
};

export default TopBar;