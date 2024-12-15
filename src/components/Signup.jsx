import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import PasswordInput from "./PasswordInput";
import Logo from "/C.png";
import Google from "/assets/google.svg";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle Email/Password Signup
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
            // Attempt to create the user in Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
            });

            navigate("/dashboard");
        } catch (err) {
            // Friendly error messages
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please log in.");
            } else {
                setError("Failed to create an account. Please try again.");
            }
        }
    };

    // Handle Google Signup
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

            // Check if user already exists in Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // Save new user data to Firestore
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
            <div className="w-1/3 bg-white flex items-center justify-center">
                <img src={Logo} className="h-60" alt="Quizmis Logo" />
            </div>

            <div className="w-2/3 bg-[#20935C] flex items-center justify-center">
                <form className="bg-white p-12 rounded-lg shadow-xl w-3/5" onSubmit={handleEmailSignup}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 mb-4 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordInput password={password} setPassword={setPassword} />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Sign Up
                    </button>

                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    <div className="text-center mt-6">
                        <button
                            type="button"
                            className="w-full border py-2 rounded hover:border-gray-500 flex items-center justify-center"
                            onClick={handleGoogleSignup}
                        >
                            <img src={Google} className="w-6 mr-2" alt="Google" />
                            Continue with Google
                        </button>
                    </div>
                    <p className="text-center mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
