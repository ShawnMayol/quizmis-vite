import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
import { db } from "../Firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Logo from "/assets/QuizmisLogo.svg";
import {
    ExclamationCircleIcon,
    CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
        }
    }, [user]);

    const [hasChanges, setHasChanges] = useState(false);

    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Determine sign-in method, assuming multiple providerData entries are handled.
                const signInMethod = currentUser.providerData[0]?.providerId; // e.g., 'google.com' for Google
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
                    } else {
                        console.log("No user details found in Firestore");
                        setUser({
                            uid: currentUser.uid,
                            email: currentUser.email,
                            photoURL: currentUser.photoURL, // This might be null if not using an OAuth provider
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
            }
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (field, value) => {
        setHasChanges(true);
        if (field === "firstName") {
            setFirstName(value);
        } else if (field === "lastName") {
            setLastName(value);
        }
    };

    const handleUpdateName = async () => {
        if (!auth.currentUser) {
            console.error("No authenticated user found.");
            return;
        }

        const userDocRef = doc(db, "users", auth.currentUser.uid);

        try {
            await setDoc(
                userDocRef,
                { firstName, lastName },
                { merge: true } // Merge to avoid overwriting other fields
            );
            console.log("Name updated successfully.");
            window.location.reload();
        } catch (error) {
            console.error("Error updating name:", error);
        }
    };

    return (
        <div>
            <TopBar />
            <div className="h-screen bg-gradient-to-b from-[#20935C] via-[#33a56c] to-[#1d7b4c]">
                <div className="flex justify-center items-center py-20 pt-28 mt-10">
                    {/* Profile Card */}
                    <div className="bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0] w-full max-w-4xl rounded-xl shadow-lg p-10">
                        {/* Title */}
                        <h2 className="text-2xl font-bold mb-8">
                            Personal Information
                        </h2>

                        {/* Profile Section */}
                        <div className="flex justify-between items-center space-x-8 mb-8">
                            <div className="flex items-center">
                                <img
                                    src={user?.photoURL || Logo}
                                    alt="User Profile"
                                    className="w-24 h-24 me-5 rounded-full object-cover border-4 border-green-400 shadow"
                                />
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {user
                                        ? `${user.firstName} ${user.lastName}`
                                        : "Loading..."}
                                </h3>
                            </div>
                            <div className="bg-gradient-to-b text-lg from-gray-50 to-gray-100 py-3 px-8 shadow rounded-lg flex justify-between">
                                <h2 className="me-3">
                                    {user ? user.email : "Loading..."}
                                </h2>
                                <div className="relative flex items-center">
                                    {user?.isVerified ? (
                                        <div className="group relative flex items-center">
                                            <CheckBadgeIcon className="w-5 text-green-700 hover:cursor-pointer" />
                                            <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 scale-0 transition-transform duration-150 bg-green-500 text-white text-xs rounded px-2 py-1 group-hover:scale-100">
                                                Verified
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="group relative flex items-center">
                                            <Link to={`/${user?.uid}/verify`}>
                                                <ExclamationCircleIcon className="w-5 text-red-700 hover:cursor-pointer" />
                                            </Link>
                                            <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 scale-0 transition-transform duration-150 bg-red-500 text-white text-xs rounded px-2 py-1 group-hover:scale-100">
                                                Unverified
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-600 mb-2 font-medium">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "firstName",
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-2 font-medium">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "lastName",
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Update Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleUpdateName}
                                disabled={!hasChanges}
                                className="bg-[#35A84C] font-bold text-white px-6 py-2 rounded-lg shadow-lg"
                                style={{
                                    boxShadow: "0 5px 0 #2c8c3b",
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
