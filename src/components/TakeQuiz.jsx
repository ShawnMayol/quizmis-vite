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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#20935C] via-[#33a06a] to-[#1d7b4c] animated-background">
            <TopBar />
            <div className="md:w-5/6 lg:w-5/6 sm:w-full bg-opacity-95 bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0] rounded-lg shadow-xl py-10 px-12 mt-10">
                <div className="flex justify-between items-center mx-1">
                    <h1 className="text-4xl font-bold">{quiz?.title}</h1>
                    {quiz?.numItems !== undefined && (
                        <span className="text-gray-700 text-lg">
                            {quiz.numItems}{" "}
                            {quiz.numItems === 1 ? "item" : "items"}
                        </span>
                    )}
                </div>
                <p className="text-xl mb-6 mt-2 ms-1">{quiz?.description}</p>
                <hr className="border-black mb-8" />
                <div className="bg-[#FAF9F6] w-full p-4 rounded-md shadow">
                    {quiz ? (
                        <>
                            <div className="flex flex-col text-xl p-4 space-y-4">
                                <div className="flex justify-between">
                                    <div className="w-full">
                                        <strong>Course:</strong>{" "}
                                        <span className="tracking-tighter">
                                            {quiz.course}
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <strong>Total Takers:</strong>{" "}
                                        {quiz.totalQuizTakers}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-full">
                                        <strong>Creator:</strong>{" "}
                                        {quiz.creatorName}
                                    </div>
                                    <div className="w-full">
                                        <strong>Average Score:</strong>{" "}
                                        {averageScore} / {quiz.numItems}
                                    </div>
                                </div>
                                <div>
                                    <strong>Date Created:</strong>{" "}
                                    {new Date(
                                        quiz.dateCreated
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-4 text-gray-500 text-sm hover:cursor-default select-none">
                                    Loading quiz details...
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        className={`font-bold text-2xl text-white px-8 py-3 mt-10 rounded-lg shadow-lg float-right transition duration-300 ${
                            quiz?.numItems > 0
                                ? "bg-[#35A84C] hover:bg-[#33a149] cursor-pointer"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        style={{
                            boxShadow:
                                quiz?.numItems > 0 ? "0 5px 0 #2c8c3b" : "none",
                        }}
                        onClick={handleStartQuiz}
                        disabled={quiz?.numItems === 0}
                    >
                        Take Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TakeQuiz;
