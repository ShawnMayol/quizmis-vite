import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import PasswordInput from "./PasswordInput";
import Logo from "/assets/QuizmisLogo.svg";
import Google from "/assets/google.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard");
            }
        });

        return unsubscribe;
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

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

    const handleGoogleLogin = async () => {
        setError("");
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google login successful, user email:", user.email); // Debugging

            if (!user.email.endsWith("@usc.edu.ph")) {
                console.log("Non-USC email attempted to sign in"); // Debugging
                setError("Only USC email addresses are allowed.");
                await auth.signOut();
                return;
            }

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    username: user.displayName || "Google User",
                    email: user.email,
                });
            }
            navigate("/dashboard");
        } catch (err) {
            console.error("Google sign-in error:", err); 
            setError("Failed to sign up with Google. Please try again.");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-[#FFFFF0] flex items-center justify-center">
                <Link to="/">
                    <img src={Logo} className="h-80" alt="Quizmis Logo" />
                </Link>
            </div>

            <div className="w-2/3 bg-[#20935C] flex items-center justify-center">
                <form
                    className="bg-[#FFFFF0] p-12 rounded-lg shadow-xl w-3/5"
                    onSubmit={handleLogin}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Log In
                    </h2>

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded bg-[#FAF9F6]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                    >
                        Log In
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                OR
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full border py-3 rounded flex items-center bg-[#FAF9F6] justify-center border-gray-500 hover:border-gray-400"
                        onClick={handleGoogleLogin}
                    >
                        <img src={Google} className="w-6 mr-2" alt="Google" />
                        Continue with Google
                    </button>

                    <p className="text-center mt-8">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
