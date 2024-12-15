import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logo from "/Brand.png";

const Join = () => {
    const [user, setUser] = useState(null);
    const [quizCode, setQuizCode] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleJoinQuiz = () => {
        if (quizCode.trim()) {
            navigate(`/take-quiz/${quizCode}`);
        } else {
            alert("Please enter a valid quiz code.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-green-100 to-blue-50">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-10">
                <Link to={user ? "/dashboard" : "/"}>
                    <img
                        src={Logo}
                        className="h-48 w-auto transform hover:scale-105 transition-transform duration-300"
                        alt="Quizmis Logo"
                    />
                </Link>
                <h1 className="text-4xl font-extrabold text-gray-800 mt-6">
                    Join a <span className="text-green-500">Quiz</span>
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    Enter your unique quiz code to get started.
                </p>
            </div>

            {/* Input Section */}
            <div className="relative w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter quiz code"
                        className="w-full p-4 pr-20 border rounded-lg text-lg focus:outline-none"
                        value={quizCode}
                        onChange={(e) => setQuizCode(e.target.value)}
                    />
                    <button
                        className="absolute top-0 right-0 bg-green-500 text-white h-full px-4 rounded-r-lg hover:bg-green-400 transition duration-300"
                        onClick={handleJoinQuiz}
                    >
                        JOIN
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Join;
