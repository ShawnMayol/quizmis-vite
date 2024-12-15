import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase.js";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Quiz = () => {
    const { quizId, questionIndex } = useParams();
    const index = parseInt(questionIndex, 10);
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(index || 0);
    const [answers, setAnswers] = useState([]);
    const auth = getAuth();

    useEffect(() => {
        const fetchQuiz = async () => {
            const quizRef = doc(db, "quizzes", quizId);
            const quizDoc = await getDoc(quizRef);
            if (quizDoc.exists()) {
                setQuiz(quizDoc.data());
            } else {
                console.log("No such quiz!");
                navigate("/dashboard");
            }
        };

        fetchQuiz();
    }, [quizId, navigate]);

    useEffect(() => {
        navigate(`/take-quiz/${quizId}/question/${currentIndex}`);
    }, [currentIndex, quizId, navigate]);

    const handleSelectOption = (optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const navigateToQuestion = (index) => {
        setCurrentIndex(index);
    };

    const submitQuiz = async () => {
        if (!quiz || !answers) {
            console.error("No quiz data or answers available.");
            return;
        }

        if (
            answers.length < quiz.questions.length ||
            answers.includes(undefined)
        ) {
            if (
                !window.confirm(
                    "Not all questions are answered. Are you sure you want to submit the quiz?"
                )
            ) {
                return;
            }
        }

        // Calculate score
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctIndex) {
                score += 1;
            }
        });

        const totalItems = quiz.questions.length; // Total number of questions in the quiz
        const percentageScore = (score / totalItems) * 100;

        // Database updates
        try {
            const quizRef = doc(db, "quizzes", quizId);
            const userRef = doc(
                db,
                "userQuizRecords",
                `${auth.currentUser.uid}_${quizId}`
            ); // Naming convention userUID_quizID

            // Update general quiz data
            await updateDoc(quizRef, {
                totalQuizTakers: (quiz.totalQuizTakers || 0) + 1,
                scoreAccumulated: (quiz.scoreAccumulated || 0) + score,
            });

            // Update individual user quiz record
            await setDoc(userRef, {
                userId: auth.currentUser.uid,
                quizId: quizId,
                score: score,
                percentageScore: percentageScore,
                dateTaken: new Date(),
            });

            // Navigate to a results page or use state to show results
            navigate(`/quiz/${quizId}/results`, {
                state: { score, percentageScore, numItems: totalItems }, // Now passing numItems
            });
        } catch (error) {
            console.error("Failed to record quiz results:", error);
            alert("Failed to submit quiz. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-5/6 bg-opacity-90 bg-white rounded-lg shadow-xl p-8 my-10">
                <div className="flex items-center justify-center my-4 space-x-1">
                    {Array.from({ length: quiz?.questions.length }, (_, i) => (
                        <button
                            key={i}
                            className={`p-4 rounded text-lg ${
                                currentIndex === i
                                    ? "bg-blue-500"
                                    : answers[i] !== undefined
                                    ? "bg-gray-400"
                                    : "bg-gray-300"
                            }`}
                            onClick={() => navigateToQuestion(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                {quiz && (
                    <div>
                        <h2 className="w-full border rounded-lg text-3xl text-center py-40 bg-green-50">
                            {quiz.questions[currentIndex].questionText}
                        </h2>
                        <div className="flex space-x-2 text-xl">
                            {quiz.questions[currentIndex].options.map(
                                (option, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleSelectOption(index)
                                        }
                                        className={`flex-1 text-center px-4 py-24 border rounded my-6 ${
                                            answers[currentIndex] === index
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200"
                                        }`}
                                        style={{
                                            minWidth: `${
                                                100 /
                                                    quiz.questions[currentIndex]
                                                        .options.length -
                                                2
                                            }%`,
                                        }}
                                    >
                                        {option.text}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mb-6">
                    <button
                        className="bg-gray-200 py-3 px-5 text-lg rounded"
                        onClick={() => navigateToQuestion(currentIndex - 1)}
                        style={{
                            visibility: currentIndex > 0 ? "visible" : "hidden",
                        }}
                    >
                        Back
                    </button>
                    <span>
                        {currentIndex + 1}/{quiz?.questions.length}
                    </span>
                    {currentIndex < quiz?.questions.length - 1 ? (
                        <button
                            className="bg-gray-200 py-3 px-5 text-lg rounded"
                            onClick={() => navigateToQuestion(currentIndex + 1)}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-5 text-lg rounded"
                            onClick={submitQuiz}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
