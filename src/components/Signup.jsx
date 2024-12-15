import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase.js";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import PasswordInput from "./PasswordInput";
import Logo from "/C.png";
import Google from "/assets/google.svg";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "" || password === "" || username === "") {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
            });

            navigate("/login");
        } catch (err) {
            console.error("Firebase Error:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email is already in use.");
            } else if (err.code === "auth/invalid-email") {
                setError("Invalid email format.");
            } else {
                setError("Error creating account. Please try again.");
            }
        }
    };

    const handleSignupWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const { user } = result;

            if (!user.email.endsWith("@usc.edu.ph")) {
                setError("Only USC email addresses are allowed.");
                return;
            }

            await setDoc(doc(db, "users", user.uid), {
                username: user.displayName || "Google User",
                email: user.email,
            });

            navigate("/dashboard");
        } catch (error) {
            console.error("Google Sign-Up Error:", error.message);
            setError("Failed to sign up with Google. Please try again.");

            if (auth.currentUser) {
                await auth.signOut();
            }
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
                    className="bg-white p-12 rounded-lg shadow-xl w-3/5"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Create your profile
                    </h2>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
                    >
                        Create Account
                    </button>
                    {error && (
                        <p className="text-red-500 text-center mt-4">{error}</p>
                    )}
                    <p className="flex text-gray-700 mt-6">
                        Already have an account?
                        <Link to="/login" className="text-blue-600 ms-1">
                            Log In
                        </Link>
                    </p>
                    <div className="flex items-center justify-center mt-4">
                        <span className="border-b border-gray-400 w-1/3"></span>
                        <span className="mx-2 text-gray-500">OR</span>
                        <span className="border-b border-gray-400 w-1/3"></span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <button
                            type="button" // Prevents form submission
                            className="w-full border border-black hover:border-gray-500 py-2 rounded mb-2 flex items-center justify-center"
                            onClick={handleSignupWithGoogle} // Google signup handler
                        >
                            <img src={Google} className="w-7 me-2" alt="" />
                            Continue with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
