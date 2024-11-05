import React from "react";
import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="flex items-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                        className="h-8 me-3"
                        alt="Quizmis Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        <span className="text-green-500">
                            <span className="text-red-500">Q</span>
                            uizmis
                        </span>
                    </span>
                </Link>
            </div>

            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="bg-green-100 text-[#20935C] border-2 border-transparent px-4 py-2 rounded-md hover:bg-green-200 transition duration-300"
                >
                    Log In
                </Link>
                <Link
                    to="/signup"
                    className="bg-green-500 text-white border-2 border-transparent px-4 py-2 rounded-md hover:bg-green-400 transition duration-300"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

const Join = () => {
    return (
        <div className="min-h-screen bg-green-200 flex flex-col">
            <TopBar />
            <div className="flex flex-grow justify-center items-center">
                <div className="relative w-96">
                    <input
                        type="text"
                        placeholder="Enter quiz code"
                        className="w-full p-4 pr-20 border rounded-l-md text-lg focus:outline-none"
                    />
                    <button className="absolute top-0 right-0 bg-green-500 text-white h-full px-4 rounded-r-md hover:bg-green-400 transition duration-300">
                        JOIN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Join;
