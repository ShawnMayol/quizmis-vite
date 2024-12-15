import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import PasswordInput from "./PasswordInput";
import Logo from "/C.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Verify the user exists in Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                setError("Account not found. Please sign up first.");
                return;
            }

            navigate("/dashboard");
        } catch (err) {
            if (err.code === "auth/user-not-found") {
                setError("No account found with this email.");
            } else if (err.code === "auth/wrong-password") {
                setError("Incorrect password. Please try again.");
            } else if (err.code === "auth/invalid-email") {
                setError("Invalid email format.");
            } else {
                setError("Failed to log in. Please check your credentials.");
            }
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-white flex items-center justify-center">
                <img src={Logo} className="h-60" alt="Quizmis Logo" />
            </div>

            <div className="w-2/3 bg-[#20935C] flex items-center justify-center">
                <form className="bg-white p-12 rounded-lg shadow-xl w-3/5" onSubmit={handleLogin}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password Input */}
                    <PasswordInput password={password} setPassword={setPassword} />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Log In
                    </button>

                    {/* Error Display */}
                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    {/* Forgot Password Link */}
                    <p className="text-right mt-4">
                        <Link to="/forgot" className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </p>

                    {/* Sign Up Link */}
                    <p className="text-center mt-6">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
