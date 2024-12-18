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
        <div className="flex items-center">
            <div className="w-screen h-screen bg-gradient-to-br from-[#17613d] via-[#267e52] to-[#1d7b4c] animated-background p-8">
                <div className="flex items-center justify-center mb-7 space-x-1">
                    {Array.from({ length: quiz?.questions.length }, (_, i) => (
                        <button
                            key={i}
                            className={`p-4 rounded shadow-xl text-lg ${
                                currentIndex === i
                                    ? "bg-[#FFD700] border-white border-2 scale-105 transform transition"
                                    : answers[i] !== undefined
                                    ? "bg-[#FFD700] border-2 border-transparent"
                                    : "bg-[#FAF9F6] border-2 border-transparent"
                            }`}
                            onClick={() => navigateToQuestion(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                {quiz && (
                    <div>
                        <h2 className="w-full p-2 shadow rounded-lg md:py-28 sm:py-10 text-center text-2xl bg-[#FAF9F6]  select-none">
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
                                        className={`flex-1 text-center px-4  border-2 py-20 border-transparent rounded-md my-6 ${
                                            answers[currentIndex] === index
                                                ? "bg-[#FFD700]  border-white"
                                                : "bg-[#FAF9F6]"
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

                <div className="flex justify-between items-center fixed bottom-0 left-0 w-full p-8">
                    <button
                        className="mt-4 bg-[#FFD700] font-bold text-lg py-3 px-8 rounded-lg shadow-lg"
                        onClick={() => navigateToQuestion(currentIndex - 1)}
                        style={{
                            boxShadow: "0 5px 0 #B8860B",
                            visibility: currentIndex > 0 ? "visible" : "hidden",
                        }}
                    >
                        Back
                    </button>

                    <span className="text-[#FFFFF0] select-none">
                        {currentIndex + 1}/{quiz?.questions.length}
                    </span>
                    {currentIndex < quiz?.questions.length - 1 ? (
                        <button
                            className="mt-4 bg-[#FFD700] font-bold text-lg  py-3 px-8 rounded-lg shadow-lg"
                            onClick={() => navigateToQuestion(currentIndex + 1)}
                            style={{
                                boxShadow: "0 5px 0 #B8860B",
                                visibility:
                                    currentIndex >= 0 ? "visible" : "hidden",
                            }}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            className="mt-4 bg-[#8B0000] font-bold text-lg text-white py-3 px-8 rounded-lg shadow-lg"
                            style={{
                                boxShadow: "0 5px 0 #4B0000", // Darker red shadow
                            }}
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
