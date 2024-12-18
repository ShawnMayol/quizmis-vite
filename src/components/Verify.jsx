import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase.js";
import { getAuth, sendEmailVerification } from "firebase/auth";
import Loading from "/assets/Loading.gif";

const VerifyPage = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDocRef = doc(db, "users", uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUser(userData);

                    if (userData.isVerified) {
                        navigate("/dashboard");
                    }
                } else {
                    setError("User not found.");
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to fetch user details.");
            }
            setLoading(false);
        };

        fetchUser();
    }, [uid, navigate]);

    const handleVerify = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        try {
            setIsButtonDisabled(true);
            setCountdown(30);
            await sendEmailVerification(currentUser);
        } catch (err) {
            console.error("Error sending verification email:", err);
            alert("Failed to send verification email. Please try again.");
        }
    };

    useEffect(() => {
        let interval;
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsButtonDisabled(false);
        }
        return () => clearInterval(interval);
    }, [countdown]);

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center flex-col bg-gradient-to-br from-[#20935C] via-[#33a06a] to-[#1d7b4c] animated-background">
                <div className="bg-[#FFFFF0] p-12 rounded-lg shadow-lg justify-center text-center">
                    <h1 className="text-4xl font-bold hover:cursor-default">
                        Loading...
                    </h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-screen flex justify-center items-center flex-col bg-gradient-to-br from-[#20935C] via-[#33a06a] to-[#1d7b4c] animated-background">
                <div className="bg-[#FFFFF0] p-12 rounded-lg shadow-lg justify-center text-center">
                    <h1 className="text-4xl font-bold hover:cursor-default text-red-800">
                        Error
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col bg-gradient-to-br from-[#20935C] via-[#33a06a] to-[#1d7b4c] animated-background">
            <div className="bg-[#FFFFF0] p-12 rounded-lg shadow-lg justify-center text-center space-y-4">
                <h1 className="text-4xl font-bold hover:cursor-default">
                    Email Verification
                </h1>
                <p className="hover:cursor-default tracking-wide">
                    <span className="hover:underline text-lg">
                        {user?.email || "N/A"}
                    </span>
                </p>
                {!user?.isVerified && (
                    <button
                        onClick={handleVerify}
                        disabled={isButtonDisabled}
                        className={`bg-[#00A850] text-white border-2 border-transparent w-full py-2 rounded-lg shadow-md flex items-center justify-center space-x-2 ${
                            isButtonDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                        style={{
                            boxShadow: isButtonDisabled
                                ? "none"
                                : "0 5px 0 #2c8c3b",
                        }}
                    >
                        {isButtonDisabled && (
                            <img
                                src={Loading}
                                alt="Loading..."
                                className="w-5 h-5 animate-spin"
                            />
                        )}
                        <span className="mt-1">
                            {isButtonDisabled
                                ? "Please wait..."
                                : "Send Verification Email"}
                        </span>
                    </button>
                )}
                <p className="text-gray-600 text-sm hover:cursor-default">
                    {isButtonDisabled && countdown > 0
                        ? `You can resend the verification email in ${countdown} seconds.`
                        : "Click the button above to get verified."}
                </p>
            </div>
        </div>
    );
};

export default VerifyPage;
