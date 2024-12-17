import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import logo from "/assets/QuizmisBrand.svg";
import "../assets/css/Topbar.css";
import { HomeIcon as HomeIconSolid } from "@heroicons/react/16/solid";
import { HomeIcon as HomeIconOutline } from "@heroicons/react/24/outline";
import { PlusIcon as PlusIconSolid } from "@heroicons/react/16/solid";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

const TopBar = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();
    const [showLogoText, setShowLogoText] = useState(true);

    const openModal = () => {
        setIsProfileModalOpen(true);
    };
    const closeModal = () => {
        setIsProfileModalOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowLogoText(window.scrollY < 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Logout successful");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Logout failed", error);
            });
    };

    return (
        <div className="fixed top-0 w-full bg-[#FFFFF0] shadow-[#02A850] shadow-sm px-8 flex justify-between items-center z-40">
            <div className="flex items-center">
                <Link to="/dashboard" className="flex items-center">
                    <img src={logo} className="h-14 mr-4" alt="Quizmis Logo" />
                </Link>
            </div>

            <div className="flex space-x-4 h-full">
                {/* Home Link */}
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        "flex items-center px-4 py-4 text-[#02A850] transition duration-200 hover:text-[#6cbb91]" +
                        (isActive
                            ? " border-b-4 border-[#02A850]"
                            : " border-b-4 border-transparent")
                    }
                >
                    <HomeIconOutline className="w-6 mr-2" />
                    <span className="text-2xl mt-1">Home</span>
                </NavLink>

                {/* Create Link */}
                <NavLink
                    to="/create"
                    className={({ isActive }) =>
                        "flex items-center px-4 py-4 text-[#02A850] transition duration-200 hover:text-[#6cbb91]" +
                        (isActive
                            ? " border-b-4 border-[#02A850]"
                            : " border-b-4 border-transparent")
                    }
                >
                    <PlusIconOutline className="w-6 mr-2" />
                    <span className="text-2xl mt-1">Create</span>
                </NavLink>

                {/* Join Link */}
                <NavLink
                    to="/join"
                    className={({ isActive }) =>
                        "flex items-center px-4 py-4 text-[#02A850] transition duration-200 hover:text-[#6cbb91]" +
                        (isActive
                            ? " border-b-4 border-[#02A850]"
                            : " border-b-4 border-transparent")
                    }
                >
                    <PencilIcon className="w-6 mr-2" />
                    <span className="text-2xl mt-1">Join</span>
                </NavLink>
            </div>

            <div>
                <Bars3Icon
                    className="w-9 text-[#02A850] hover:cursor-pointer transition duration-200 hover:text-[#6cbb91]"
                    onClick={openModal}
                />
            </div>

            <div
                className={`fixed top-0 right-0 h-full w-1/4 bg-[#FFFFF0] shadow-lg rounded-lg p-6 z-20 ${
                    isProfileModalOpen ? "modal-visible" : "modal-hidden"
                }`}
                style={{ display: "flex", flexDirection: "column" }}
            >
                <div style={{ flexGrow: 1 }}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <img
                                src={user?.photoURL || logo}
                                alt="User Profile"
                                className="w-10 h-10 rounded-full border-2 border-green-400 mr-4"
                            />
                            <h2 className="text-xl text-[#02A850] font-semibold">
                                {user?.displayName || "Unknown User"}
                            </h2>
                        </div>
                        <button
                            onClick={closeModal}
                            className="text-green-400 hover:bg-green-100 text-4xl me-2 px-3 rounded-full pb-1"
                        >
                            &times;
                        </button>
                    </div>
                    <hr className="border-[#8cf5bd]" />
                    <ul className="space-y-1 my-3 overflow-auto">
                        <li>
                            <Link
                                to="/dashboard"
                                className="flex items-center p-2 rounded text-[#02A850] hover:bg-green-100 transition-all"
                            >
                                <HomeIconOutline className="w-5 mr-2" />
                                <span className="mt-1">Dashboard</span>
                            </Link>
                        </li>
                        <hr className="border-[#8cf5bd]" />
                        <li>
                            <Link
                                to="/profile"
                                className="flex items-center p-2 rounded text-[#02A850] hover:bg-green-100 transition-all"
                            >
                                <UserIcon className="w-5 mr-2" />
                                <span className="mt-1">Your Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/quizzes/${user?.uid}`}
                                className="flex items-center p-2 rounded text-[#02A850] hover:bg-green-100 transition-all"
                            >
                                <DocumentTextIcon className="w-5 mr-2" />
                                <span className="mt-1">Your Quizzes</span>
                            </Link>
                        </li>
                        <hr className="border-[#8cf5bd]" />
                        <li>
                            <Link
                                to="/create"
                                className="flex items-center p-2 rounded text-[#02A850] hover:bg-green-100 transition-all"
                            >
                                <DocumentPlusIcon className="w-5 mr-2" />
                                <span className="mt-1">Create Quiz</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/join"
                                className="flex items-center p-2 rounded text-[#02A850] hover:bg-green-100 transition-all"
                            >
                                <PencilIcon className="w-5 mr-2" />
                                <span className="mt-1">Join Quiz</span>
                            </Link>
                        </li>
                        <hr className="border-[#8cf5bd]" />
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center p-2 rounded w-full text-red-500 hover:bg-red-100 transition-all"
                            >
                                <ArrowLeftStartOnRectangleIcon className="w-5 mr-2" />
                                <span className="mt-1">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="text-center text-xs py-2 text-[#02A850]">
                        © 2024 Quizmis Inc. All Rights Reserved.
                    </p>
                </div>
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
