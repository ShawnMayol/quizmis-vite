import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const nameParts = currentUser.displayName
                    ? currentUser.displayName.split(" ")
                    : ["Unknown", "User"];

                // Assign all but the last word to firstName, and the last word to lastName
                setFirstName(nameParts.slice(0, -1).join(" ") || "Unknown");
                setLastName(nameParts.slice(-1).join("") || "User");
            }
        });

        return () => unsubscribe();
    }, []);

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
                        <div className="flex items-center space-x-8 mb-8">
                            <div className="relative">
                                <img
                                    src={user?.photoURL}
                                    alt="User Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-green-400"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {user?.displayName || "Unknown User"}
                                </h3>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-600 mb-2 font-medium">
                                    First name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-2 font-medium">
                                    Last name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Update Button */}
                        <div className="mt-8 flex justify-end">
                            <button
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
