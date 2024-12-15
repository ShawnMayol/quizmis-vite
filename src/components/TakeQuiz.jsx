import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase.js";
import { doc, getDoc } from "firebase/firestore";
import TopBar from "./TopBar.jsx";

const TakeQuiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        const fetchQuizDetails = async () => {
            const quizRef = doc(db, "quizzes", quizId);
            const quizDoc = await getDoc(quizRef);
            if (quizDoc.exists()) {
                setQuiz(quizDoc.data());
            } else {
                console.log("No such quiz!");
                navigate("/dashboard");
            }
        };

        fetchQuizDetails();
    }, [quizId, navigate]);

    const averageScore =
        quiz && quiz.totalQuizTakers > 0
            ? (quiz.scoreAccumulated / quiz.totalQuizTakers).toFixed(2)
            : "0";

    return (
        <div className="min-h-screen flex items-center justify-center">
            <TopBar />
            <div className="w-5/6 bg-opacity-85 bg-green-100 rounded-lg shadow-xl py-10 px-12 mt-10">
                <div className="flex justify-between items-center mb-6 mx-1">
                    <h1 className="text-3xl font-bold">Take Quiz</h1>
                    <span className="text-gray-700 text-lg">
                        {quiz?.numItems} items
                    </span>
                </div>
                <hr className="border-black mb-8" />
                <div className="flex justify-between">
                    <div>
                        {quiz ? (
                            <>
                                <h1 className="text-4xl font-bold mb-4 text-left">
                                    {quiz.title}
                                </h1>
                                <p className="text-lg mb-4">
                                    {quiz.description}
                                </p>
                                <p className="text-lg mb-4">
                                    <strong>Course:</strong> {quiz.course}
                                </p>
                                <p className="text-lg mb-4">
                                    <strong>Total Takers:</strong>{" "}
                                    {quiz.totalQuizTakers}
                                </p>
                                <p className="text-lg mb-4">
                                    <strong>Average Score:</strong>{" "}
                                    {averageScore}
                                </p>
                            </>
                        ) : (
                            <p>Loading quiz details...</p>
                        )}
                    </div>
                    <button
                        className="bg-green-400 hover:bg-green-500 text-white font-bold py-4 px-8 text-2xl rounded"
                        onClick={() => navigate(`/take-quiz/${quizId}/question/0`)}
                    >
                        Take Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TakeQuiz;
