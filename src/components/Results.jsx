import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuthCheck();
    const { score, percentageScore, numItems, userQuizRecordId, quizTitle } =
        location.state || {
            score: 0,
            percentageScore: 0,
            numItems: 0,
            userQuizRecordId: null,
            quizTitle: "Untitled Quiz",
        };

    if (!user || !userQuizRecordId ) {
        navigate("/dashboard");
        return null;
    }
    const isPassed = percentageScore >= 60;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#17613d] via-[#267e52] to-[#1d7b4c] animated-background">
            <div className="p-16 px-32 bg-gradient-to-br from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0] animated-background rounded-lg  text-center shadow-xl">
                {isPassed ? (
                    <p className="text-5xl font-bold text-blue-600 mb-12">
                        You Passed!
                    </p>
                ) : (
                    <p className="text-6xl font-extrabold text-red-600 mb-8">
                        You Failed!
                    </p>
                )}
                <h1 className="text-4xl font-bold mb-8">{quizTitle}</h1>
                <p className="text-2xl">
                    Your Score: {score} / {numItems}
                </p>
                <p className="text-2xl mt-4">
                    Percentage: {percentageScore.toFixed(2)}%
                </p>
                <button
                    className="py-5 w-full bg-[#35A84C] hover:bg-[#33a149] transition duration-300 font-bold rounded-md mt-12 text-lg text-white"
                    style={{
                        boxShadow: "0 5px 0 #2c8c3b",
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </button>
                {/* <button
                    className="py-2 mt-4 w-full bg-[#FFD700] hover:bg-[#FFC120] transition duration-300 font-bold rounded-md  text-lg"
                    style={{
                        boxShadow: "0 5px 0 #B8860B",
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    Review
                </button> */}
                <div className="relative group items-center">
                    <button
                        className="py-2 mt-4 w-full bg-gray-400 cursor-not-allowed text-white font-bold rounded-md text-lg"
                        disabled
                    >
                        Review
                    </button>
                    {/* Tooltip */}
                    <div className="select-none pointer-events-none absolute top-1/2 w-full left-full transform -translate-y-1/2 translate-x-2 bg-gray-800 text-white text-sm rounded-md py-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        This feature is in development.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
