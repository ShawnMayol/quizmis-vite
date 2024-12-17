import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import PasswordInput from "./PasswordInput";
import Logo from "/assets/QuizmisLogo.svg";
import Google from "/assets/google.svg";

const Signup = () => {
    const [username, setUsername] = useState("");
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

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        if (!email.endsWith("@usc.edu.ph")) {
            setError("Only USC email addresses are allowed.");
            return;
        }
        if (!username || !email || !password) {
            setError("Please fill in all fields.");
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
                username,
                email,
            });
            navigate("/dashboard");
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please log in.");
            } else {
                setError("Failed to create an account. Please try again.");
            }
        }
    };

    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (!user.email.endsWith("@usc.edu.ph")) {
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
                    onSubmit={handleEmailSignup}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Create Account
                    </h2>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 mb-4 border rounded bg-[#FAF9F6]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                        className="w-full bg-[#00A850] text-white py-3 rounded-md shadow-md"
                        style={{
                            boxShadow: "0 6px 0 #2c8c3b",
                        }}
                    >
                        Sign Up
                    </button>

                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    <div className="text-center my-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm leading-5">
                                <span className="px-2 bg-[#FFFFF0] text-gray-500">
                                    OR
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full border py-3 rounded border-gray-500 hover:border-gray-400 flex items-center justify-center bg-[#FAF9F6]"
                        onClick={handleGoogleSignup}
                    >
                        <img src={Google} className="w-6 mr-2" alt="Google" />
                        Continue with Google
                    </button>

                    <p className="text-center mt-8">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
