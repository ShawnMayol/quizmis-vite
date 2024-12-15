import React from 'react';
import { useLocation } from 'react-router-dom';
import useAuthCheck from '../hooks/useAuthCheck';

const Results = () => {
    const location = useLocation();
    const user = useAuthCheck();
    const { score, percentageScore } = location.state || { score: 0, percentageScore: 0 };

    if (!user) {
        return <div>Loading or redirecting...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold text-center mb-4">Quiz Results</h1>
                <p className="text-lg text-center">Your Score: {score}</p>
                <p className="text-lg text-center">Percentage: {percentageScore.toFixed(2)}%</p>
                {/* Additional component logic */}
            </div>
        </div>
    );
};

export default Results;
