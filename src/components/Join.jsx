import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logo from "/assets/QuizmisBrand.svg";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";

const Join = () => {
    const [user, setUser] = useState(null);
    const [quizCode, setQuizCode] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
        <div>
            <TopBar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFFF0] via-[#FFFFF0] to-[#FFFFF0]">
                <img
                    src="/assets/ThatGraduate.svg"
                    alt="Background"
                    className="w-2/5 select-none pointer-events-none max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                />
                <div className="absolute flex items-center justify-center w-100 px-4 mt-4">
                    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg pr-28 p-8">
                        <input
                            type="text"
                            placeholder="Enter quiz code"
                            className="w-full p-4 border-none bg-[#FFFFF0] rounded-lg text-lg focus:outline-none focus:ring-0 font-semibold"
                            value={quizCode}
                            onChange={(e) => setQuizCode(e.target.value)}
                            maxLength={25}
                        />
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#35A84C] font-bold text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg hover:shadow-none"
                            style={{
                                boxShadow: "0 5px 0 #2c8c3b",
                            }}
                            onClick={handleJoinQuiz}
                        >
                            JOIN
                        </button>
                    </div>
                </div>
            </div>

            {/* Make a smaller footer, for now use default 
                - Shawn M.
                */}
            <Footer />
        </div>
    );
};

export default Join;
