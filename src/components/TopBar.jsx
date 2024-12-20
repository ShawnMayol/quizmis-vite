import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Brand from "/assets/QuizmisBrand.svg";
import BrandLogo from "/assets/QuizmisLogo.svg";
import "../assets/css/Topbar.css";
import { db } from "../Firebase.js";
import { doc, getDoc } from "firebase/firestore";
import {
    HomeIcon as HomeIconSolid,
    Bars3Icon,
    PencilIcon as PencilIconSolid,
    DocumentPlusIcon as PlusSolid,
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import {
    HomeIcon as HomeIconOutline,
    UserIcon,
    PencilIcon as PencilIconOutline,
    DocumentPlusIcon as PlusOutline,
} from "@heroicons/react/24/outline";

const TopBar = () => {
    const [IsSideModalOpen, setIsSideModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();
    const [isNotificationVisible, setIsNotificationVisible] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const signInMethod = currentUser.providerData[0]?.providerId;
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUser({
                            uid: currentUser.uid,
                            email: currentUser.email,
                            photoURL: currentUser.photoURL,
                            signInMethod,
                            ...docSnap.data(),
                        });
                        setLoading(false);
                    } else {
                        console.log("No user details found in Firestore");
                        setUser({
                            uid: currentUser.uid,
                            email: currentUser.email,
                            photoURL: currentUser.photoURL,
                            signInMethod,
                        });
                    }
                } catch (error) {
                    console.error(
                        "Error fetching user details from Firestore",
                        error
                    );
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        signInMethod,
                    });
                }
            } else {
                setUser(null);
                setLoading(false);
            }
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

    const openModal = () => {
        setIsSideModalOpen(true);
    };

    const closeModal = () => {
        setIsSideModalOpen(false);
    };

    return (
        <div>
            <div className="fixed left-0 top-0 w-full sm:max-w-screen bg-[#FFFFF0] shadow-[#02A850] shadow-sm px-8 flex justify-between items-center z-40">
                <div className="flex items-center">
                    <Link to="/dashboard">
                        <img
                            src={Brand}
                            className="h-14 mr-4"
                            alt="Quizmis Logo"
                        />
                    </Link>
                </div>

                <div className="hidden md:flex space-x-4 h-full">
                    {/* Home Link */}
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-4 text-[#02A850] transition duration-200 hover:text-[#6cbb91]` +
                            (isActive
                                ? " border-b-4 border-[#02A850]"
                                : " border-b-4 border-transparent")
                        }
                    >
                        {({ isActive }) =>
                            isActive ? (
                                <>
                                    <HomeIconSolid className="w-6 mr-2" />
                                    <span className="text-2xl mt-1 font-semibold">
                                        Home
                                    </span>
                                </>
                            ) : (
                                <>
                                    <HomeIconOutline className="w-6 mr-2" />
                                    <span className="text-2xl mt-1">Home</span>
                                </>
                            )
                        }
                    </NavLink>

                    {/* Create Link */}
                    {loading ? (
                        <NavLink className="flex items-center px-4 py-4 text-[#02A850] transition duration-200 hover:text-[#6cbb91] border-b-4 border-transparent">
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <PlusOutline className="w-6 mr-2" />
                                        <span className="text-2xl mt-1 font-semibold">
                                            Create
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <PlusSolid className="w-6 mr-2" />
                                        <span className="text-2xl mt-1">
                                            Create
                                        </span>
                                    </>
                                )
                            }
                        </NavLink>
                    ) : user?.isVerified ? (
                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-4 text-[#02A850] transition duration-200 hover:text-[#6cbb91]` +
                                (isActive
                                    ? " border-b-4 border-[#02A850]"
                                    : " border-b-4 border-transparent")
                            }
                        >
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <PlusSolid className="w-6 mr-2" />
                                        <span className="text-2xl mt-1 font-semibold">
                                            Create
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <PlusOutline className="w-6 mr-2" />
                                        <span className="text-2xl mt-1">
                                            Create
                                        </span>
                                    </>
                                )
                            }
                        </NavLink>
                    ) : (
                        <div className="flex items-center px-4 py-4 text-gray-400 select-none cursor-not-allowed border-b-4 border-transparent">
                            <PlusOutline className="w-6 mr-2" />
                            <span className="text-2xl mt-1">Create</span>
                        </div>
                    )}

                    {/* Join Link */}
                    {loading ? (
                        <NavLink className="flex items-center px-4 py-4 text-[#02A850] transition duration-200 hover:text-[#6cbb91] border-b-4 border-transparent">
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <PencilIconOutline className="w-6 mr-2" />
                                        <span className="text-2xl mt-1 font-semibold">
                                            Join
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <PencilIconSolid className="w-6 mr-2" />
                                        <span className="text-2xl mt-1">
                                            Join
                                        </span>
                                    </>
                                )
                            }
                        </NavLink>
                    ) : user?.isVerified ? (
                        <NavLink
                            to="/join"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-4 text-[#02A850] transition duration-200 hover:text-[#6cbb91]` +
                                (isActive
                                    ? " border-b-4 border-[#02A850]"
                                    : " border-b-4 border-transparent")
                            }
                        >
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <PencilIconSolid className="w-6 mr-2" />
                                        <span className="text-2xl mt-1 font-semibold">
                                            Join
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <PencilIconOutline className="w-6 mr-2" />
                                        <span className="text-2xl mt-1">
                                            Join
                                        </span>
                                    </>
                                )
                            }
                        </NavLink>
                    ) : (
                        <div className="flex items-center px-4 py-4 text-gray-400 select-none cursor-not-allowed border-b-4 border-transparent">
                            <PencilIconOutline className="w-6 mr-2" />
                            <span className="text-2xl mt-1">Join</span>
                        </div>
                    )}
                </div>

                <div>
                    <Bars3Icon
                        className="w-9 text-[#02A850] hover:cursor-pointer transition duration-200 hover:text-[#6cbb91]"
                        onClick={openModal}
                    />
                </div>

                {/* Side Modal */}
                <div
                    className={`fixed top-0 right-0 h-full md:w-1/4 sm:w-full bg-[#FFFFF0] shadow-lg rounded-l-lg p-6 z-20 ${
                        IsSideModalOpen ? "modal-visible" : "modal-hidden"
                    }`}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div style={{ flexGrow: 1 }}>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <img
                                    src={user?.photoURL || BrandLogo}
                                    alt="User Profile"
                                    className="w-10 h-10 rounded-full border-2 border-green-400 mr-4"
                                />
                                <h2 className="text-xl text-[#02A850] font-semibold">
                                    {user
                                        ? `${user.firstName} ${user.lastName}`
                                        : "Unknown User"}
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
                            {/* <hr className="border-[#8cf5bd]" /> */}
                            <li>
                                <Link
                                    to="/profile"
                                    className="flex items-center p-2 rounded text-[#02A850] hover:bg-green-100 transition-all"
                                >
                                    <UserIcon className="w-5 mr-2" />
                                    <span className="mt-1">Your Profile</span>
                                </Link>
                            </li>

                            {/* Create Quiz */}
                            <li>
                                {user?.isVerified ? (
                                    <Link
                                        to="/create"
                                        className="flex items-center p-2 rounded text-[#02A850] hover:bg-green-100 transition-all"
                                    >
                                        <PlusOutline className="w-5 mr-2" />
                                        <span className="mt-1">
                                            Create Quiz
                                        </span>
                                    </Link>
                                ) : (
                                    <div className="flex items-center p-2 rounded text-gray-400 select-none cursor-not-allowed">
                                        <PlusOutline className="w-5 mr-2" />
                                        <span className="mt-1">
                                            Create Quiz
                                        </span>
                                    </div>
                                )}
                            </li>

                            {/* Join Quiz */}
                            <li>
                                {user?.isVerified ? (
                                    <Link
                                        to="/join"
                                        className="flex items-center p-2 rounded text-[#02A850] hover:bg-green-100 transition-all"
                                    >
                                        <PencilIconOutline className="w-5 mr-2" />
                                        <span className="mt-1">Join Quiz</span>
                                    </Link>
                                ) : (
                                    <div className="flex items-center p-2 rounded text-gray-400 select-none cursor-not-allowed">
                                        <PencilIconOutline className="w-5 mr-2" />
                                        <span className="mt-1">Join Quiz</span>
                                    </div>
                                )}
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
                            © 2024 Quizmis Team. All Rights Reserved.
                        </p>
                    </div>
                </div>

                {IsSideModalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10"
                        onClick={closeModal}
                    ></div>
                )}
            </div>

            {!loading && isNotificationVisible && !user?.isVerified && (
                <div
                    className={`fixed left-1/2 transform -translate-x-1/2 bg-opacity-95 rounded-lg w-5/6 md:w-3/5 lg:w-3/5 bg-gradient-to-b from-[#20935C] via-[#33a06a] to-[#1d7b4c]  text-white flex items-center justify-between px-6 py-4 shadow-xl z-30 transition-all duration-500 ease-in-out border border-[#1d7b4c] ${
                        isNotificationVisible ? "top-20" : "-top-40"
                    }`}
                    style={{
                        boxShadow: "0 3px 0 #1C5D38",
                    }}
                >
                    <span className="text-2xl font-bold select-none">🎉</span>
                    <div className="flex items-center">
                        <p className="text-md md:text-md font-medium select-none me-2 mt-1">
                            Welcome to <strong>Quizmis</strong>! Verify your
                            account to access all our features.{" "}
                        </p>
                        <Link
                            target="_blank"
                            to={`/${user?.uid}/verify`}
                            className="bg-[#FFD700] hover:bg-[#FFC120] px-2 py-1 rounded-md transition duration-300 font-semibold text-sm"
                            style={{
                                boxShadow: "0 5px 0 #B8860B",
                            }}
                        >
                            Get Verified
                        </Link>
                    </div>
                    <button
                        onClick={() => setIsNotificationVisible(false)}
                        className="text-white hover:text-gray-200 font-bold text-xl transition duration-200 focus:outline-none"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopBar;
