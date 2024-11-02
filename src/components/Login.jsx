import React from "react";
import { Link } from "react-router-dom";
import logo from "/C.png";

const Login = () => {
    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-white flex items-center justify-center">
                <div className="text-center">
                    <Link to="/" className="text-4xl font-bold mb-4">
                        <img src={logo} className="h-60" alt="Quizmis Logo" />
                    </Link>
                </div>
            </div>

            <div className="w-2/3 bg-[#20935C] flex flex-col items-center justify-center">
                <Link
                    to="/signup"
                    className="absolute top-4 right-4 bg-[#00A950] text-white px-12 py-3 rounded-full shadow-xl hover:bg-[#2dbb58] transition duration-300"
                >
                    Sign Up
                </Link>

                <form className="bg-white p-8 rounded-lg shadow-xl w-3/5">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Log In
                    </h2>
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
                    >
                        Log In
                    </button>
                    <p className="text-center text-gray-500 mt-4">
                        <Link to="/" className="text-blue-600">
                            Forgot password?
                        </Link>
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        <span className="border-b border-gray-400 w-1/3"></span>
                        <span className="mx-2 text-gray-500">OR</span>
                        <span className="border-b border-gray-400 w-1/3"></span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <button className="w-full bg-red-600 text-white py-2 rounded mb-2">
                            Continue with Google
                        </button>
                        <button className="w-full bg-blue-600 text-white py-2 rounded">
                            Continue with Facebook
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
