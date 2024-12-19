import React from "react";
import { Link } from "react-router-dom";
import logo from "/assets/QuizmisBrand.svg";
const TopBar = () => {
    return (
        <div className="fixed top-0 bg-[#FFFFF0] shadow-[#02A850] shadow-sm w-full py-3 px-8 flex justify-between items-center z-40">
            <Link to="/">
                <img src={logo} className="h-14 mr-4" alt="Quizmis Logo" />
            </Link>
            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="bg-[#FAF9F6] text-[#02A850] border-2 px-4 py-2 rounded-lg shadow-lg hover:bg-[#E6F4EA] transition duration-300"
                    style={{
                        boxShadow: "0 6px 0 #cecdcc",
                    }}
                >
                    Log In
                </Link>

                <Link
                    to="/signup"
                    className="bg-[#00A850] hover:bg-[#33a149] trasition duration-300 text-white border-2 border-transparent px-4 py-2 rounded-lg shadow-md"
                    style={{
                        boxShadow: "0 5px 0 #2c8c3b",
                    }}
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};
export default TopBar;
