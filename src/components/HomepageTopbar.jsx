import React from "react";
import { Link } from "react-router-dom";
import logo from "/assets/QuizmisBrand.svg";
const TopBar = () => {
    return (
        <div className="bg-white bg-opacity-70 shadow-md py-3 px-8 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="h-14 mr-4" alt="Quizmis Logo" />
                </Link>
            </div>
            <div className="flex space-x-4">
                <Link
                    to="/join"
                    className="bg-green-50 text-[#20935C] border-2 px-4 py-2 rounded-md shadow-md hover:bg-gree-100 hover:border-transparent transition duration-300"
                >
                    Enter Quiz
                </Link>
                <Link
                    to="/login"
                    className="bg-white text-[#20935C] border-2 border-transparent px-4 py-2 rounded-md shadow-md hover:bg-green-50 transition duration-300"
                >
                    Log In
                </Link>
                <Link
                    to="/signup"
                    className="bg-green-500 text-white border-2 border-transparent px-4 py-2 rounded-md shadow-md hover:bg-green-400 transition duration-300"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};
export default TopBar;