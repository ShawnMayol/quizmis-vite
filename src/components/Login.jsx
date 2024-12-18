import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import PasswordInput from "./PasswordInput";
import Logo from "/assets/QuizmisLogo.svg";
import Google from "/assets/google.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

        if (!email || !password) {
            setError("Please provide both email and password.");
            return;
        }

        try {
            setLoading(true);
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
            console.error("Login error: ", err);
            switch (err.code) {
                case "auth/user-not-found":
                    setError("No account found with this email.");
                    break;
                case "auth/wrong-password":
                    setError("Incorrect password. Please try again.");
                    break;
                case "auth/invalid-email":
                    setError("Invalid email format.");
                    break;
                case "auth/invalid-credential":
                    setError("Invalid credentials. Try logging in using Google below.");
                    break;
                case "auth/too-many-requests":
                    setError("Too many requests. Please try again later.");
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Received email:", user.email);
            if (!user.email.endsWith("@usc.edu.ph")) {
                console.log("Email does not end with @usc.edu.ph");
                setError("Only USC email addresses are allowed.");
                await auth.signOut();
                return;
            }

            // Fetch the user document to check existing sign-in method
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                try {
                    const userData = userDoc.data();
                    if (userData.signInMethod === "EmailAndPassword") {
                        await updateDoc(userDocRef, {
                            signInMethod: "Google",
                            isVerified: true,
                        });
                    }
                } catch (err) {
                    console.error("Error updating document:", err);
                    setError(err.message);
                }
            } else {
                // If the document does not exist, create a new one
                let firstName = "";
                let lastName = "";
                if (user.displayName) {
                    const splitName = user.displayName.trim().split(/\s+/);
                    if (splitName.length > 1) {
                        lastName = splitName.pop();
                        firstName = splitName.join(" ");
                    } else {
                        firstName = user.displayName;
                    }
                }
                await setDoc(userDocRef, {
                    firstName,
                    lastName,
                    email: user.email,
                    signInMethod: "Google",
                    isVerified: true,
                });
            }
            navigate("/dashboard");
        } catch (err) {
            if (err.code === "auth/account-exists-with-different-credential") {
                setError(
                    "Email is already registered. Please sign in using your email and password."
                );
            } else {
                setError("Failed to sign up with Google. Please try again.");
            }
        }
    };

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        if (inputEmail.length > 0 && !inputEmail.endsWith("@usc.edu.ph")) {
            setError("Email must end with @usc.edu.ph");
        } else {
            setError("");
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
                        placeholder="USC Email"
                        className="w-full p-2 mb-4 border rounded bg-[#FAF9F6]"
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#00A850] text-white py-3 rounded-md shadow-md"
                        style={{
                            boxShadow: "0 6px 0 #2c8c3b",
                        }}
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>

                    {error && <p className="text-red-500 mt-6">{error}</p>}

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#FFFFF0] text-gray-500">
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
