import React, { useState } from "react";
import { auth } from "../Firebase";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent successfully.");
            setError("");
        } catch (err) {
            setMessage("");
            setError(err.message);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Reset Password
                </h2>

                <form onSubmit={handleResetPassword}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {message && (
                        <p className="text-green-500 text-center mb-4">
                            {message}
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-center mb-4">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
                    >
                        Send Reset Email
                    </button>
                    <p className="flex text-center text-gray-500 mt-6">
                        <Link to="/login" className="text-blue-600 ">
                            Back to login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
