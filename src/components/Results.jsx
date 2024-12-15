import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuthCheck();
    const { score, percentageScore, numItems } = location.state || {
        score: 0,
        percentageScore: 0,
        numItems: 0,
    };

    if (!user) {
        navigate("/dashboard");
        return null;
    }

    const isPassed = percentageScore >= 60;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-1/2 py-16 bg-opacity-95 bg-white rounded-lg shadow-md text-center">
                {isPassed ? (
                    <p className="text-5xl font-bold text-blue-600 mb-12">
                        You Passed!
                        <span role="img" aria-label="celebrating">🎉</span>
                    </p>
                ) : (
                    <p className="text-5xl font-bold text-red-600 mb-12">
                        You Failed!
                        <span role="img" aria-label="sad">😢</span>
                    </p>
                )}
                <p className="text-2xl">
                    Your Score: {score} / {numItems}
                </p>
                <p className="text-2xl mt-2">
                    Percentage: {percentageScore.toFixed(2)}%
                </p>
                <button
                    className="p-5 bg-blue-600 hover:bg-blue-700 rounded-md mt-12 text-lg text-white"
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Results;
