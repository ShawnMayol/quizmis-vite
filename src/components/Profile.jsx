import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "/Logo.png";
import TopBar from "./general/TopBar.jsx";

const Profile = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-green-200">
            <TopBar />
            <div className="flex p-8 mt-16">
                {/* Left Section */}
                <div className="w-1/3 flex flex-col items-center space-y-8 mt-8">
                    <img
                        src={user?.photoURL || logo}
                        alt="User Profile"
                        className="w-36 h-36 rounded-full object-cover"
                    />
                    <h2 className="text-2xl font-semibold">{user?.displayName || 'Unknown User'}</h2>
                    {/* <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition duration-300">
                        Edit Profile
                    </button> */}
                </div>

                {/* Right Section */}
                <div className="w-2/3 flex flex-col space-y-8 p-8 rounded-lg">
                    <div className="bg-green-100 p-8 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-6">
                            Pinned Quizzes
                        </h3>
                        <div className="flex flex-wrap gap-12">
                            <div className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow-sm">
                                Placeholder Quiz 1
                            </div>
                            <div className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow-sm">
                                Placeholder Quiz 2
                            </div>
                            <div className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow-sm">
                                Placeholder Quiz 3
                            </div>
                            <div className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow-sm">
                                Placeholder Quiz 4
                            </div>
                            {/* Add more pills as needed */}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-green-100 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">
                            Comments
                        </h3>
                        <div className="flex flex-col space-y-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                Comment 1
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                Comment 2
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                Comment 3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
