import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signInWithEmailAndPassword,
} from "firebase/auth";
import PasswordInput from "./PasswordInput";
import Logo from "/C.png";
import Google from "/assets/google.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Skip validation if Google button is clicked
        if (!email && !password) {
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

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if the user's email matches the domain
            if (!user.email.endsWith("@usc.edu.ph")) {
                setError("Only USC email addresses are allowed.");
                await auth.signOut(); // Log the user out
                return;
            }

            navigate("/dashboard"); // Proceed to dashboard
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
            setError("Failed to sign in with Google. Please try again.");
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
                <form
                    className="bg-white p-12  rounded-lg shadow-xl w-3/5"
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
                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
                    >
                        Log In
                    </button>
                    {/* Error message display */}
                    {error && (
                        <p className="text-red-500 text-center mt-4">{error}</p>
                    )}
                    <p className="flex justify-between text-gray-500 mt-6">
                        <Link to="/signup" className="text-blue-600">
                            Don't have an account?
                        </Link>
                        <Link to="/forgot" className="text-blue-600">
                            Forgot password?
                        </Link>
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        <span className="border-b border-gray-400 w-1/3"></span>
                        <span className="mx-2 text-gray-500">OR</span>
                        <span className="border-b border-gray-400 w-1/3"></span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <button
                            type="button"
                            className="w-full border border-black hover:border-gray-500 py-2 rounded mb-2 flex items-center justify-center"
                            onClick={handleLoginWithGoogle}
                        >
                            <img src={Google} className="w-8 me-2" alt="" />
                            Continue with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
