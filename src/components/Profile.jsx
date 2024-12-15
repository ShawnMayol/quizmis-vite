import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "/Logo.png";
import TopBar from "./TopBar.jsx";

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
// i eat
    return (
        <div
            className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 relative"
            style={{
                backgroundImage: "url('/path/to/your/pattern.svg')",
                backgroundRepeat: "repeat",
                backgroundSize: "150px",
            }}
        >
            <TopBar />
            <div className="flex justify-center items-center py-20 pt-28">
                {/* Profile Card */}
                <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-10">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">
                        Personal Information
                    </h2>

                    {/* Profile Section */}
                    <div className="flex items-center space-x-8 mb-8">
                        <div className="relative">
                            <img
                                src={user?.photoURL || logo}
                                alt="User Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                            />
                            {/* Edit Icon */}
                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md">
                                +
                            </div>
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
                                First name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2 font-medium">
                                Last name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Update Button */}
                    <div className="mt-8 flex justify-end">
                        <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:opacity-90 transition duration-300">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;