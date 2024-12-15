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

    const handleStartQuiz = () => {
        navigate(`/take-quiz/${quizId}/question/0`);

        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(
                    `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
                );
            });
        } else {
            console.error("Full screen mode is not supported in this browser.");
        }
    };

    const averageScore =
        quiz && quiz.totalQuizTakers > 0
            ? (quiz.scoreAccumulated / quiz.totalQuizTakers).toFixed(2)
            : "0";

    return (
        <div className="min-h-screen flex items-center justify-center">
            <TopBar />
            <div className="w-5/6 bg-opacity-95 bg-white rounded-lg shadow-xl py-10 px-12 mt-10">
                <div className="flex justify-between items-center mx-1">
                    <h1 className="text-3xl font-bold">{quiz?.title}</h1>
                    <span className="text-gray-700 text-lg">
                        {quiz?.numItems} items
                    </span>
                </div>
                <p className="text-md mb-6 mt-2 ms-1">{quiz?.description}</p>
                <hr className="border-black mb-8" />
                <div className="flex justify-between">
                    <div className="bg-green-100 w-5/6 p-4 rounded-md shadow">
                        {quiz ? (
                            <>
                                <ul className=" pl-5 space-y-4 text-xl py-2">
                                    <li>
                                        <strong>Course:</strong> {quiz.course}
                                    </li>
                                    <li>
                                        <strong>Total Takers:</strong>{" "}
                                        {quiz.totalQuizTakers}
                                    </li>
                                    <li>
                                        <strong>Average Score:</strong>{" "}
                                        {averageScore} / {quiz.numItems}
                                    </li>
                                    <li>
                                        <strong>Date Created:</strong>{" "}
                                        {new Date(
                                            quiz.dateCreated
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </li>
                                    <li>
                                        <strong>Creator:</strong>{" "}
                                        {quiz.creatorName}
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <p>Loading quiz details...</p>
                        )}
                    </div>

                    <button
                        className="bg-green-400 w-1/6 hover:bg-green-500 text-white font-bold py-4 px-8 text-2xl rounded-e-md"
                        onClick={handleStartQuiz}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TakeQuiz;
