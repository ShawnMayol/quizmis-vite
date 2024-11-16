import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "/C.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setError("Please enter both email and password.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            let errorMessage = error.message;

            if (error.code === "auth/user-not-found") {
                errorMessage = "No user found with this email.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email format.";
            }

            setError(errorMessage);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-white flex items-center justify-center">
                <div className="text-center">
                    <Link to="/" className="text-4xl font-bold mb-4">
                        <img src={Logo} className="h-60" alt="Quizmis Logo" />
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

                <form
                    className="bg-white p-8 rounded-lg shadow-xl w-3/5"
                    onSubmit={handleLogin}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Log In
                    </h2>

                    {/* Email input */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password input */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Error message display */}
                    {error && (
                        <p className="text-red-500 text-center mb-4">{error}</p>
                    )}

                    {/* Submit button */}
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
                </form>
            </div>
        </div>
    );
};

export default Login;
