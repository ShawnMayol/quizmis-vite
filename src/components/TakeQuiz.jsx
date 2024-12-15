import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import { db } from "../Firebase.js";
import { doc, getDoc } from "firebase/firestore";

const TakeQuiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        const fetchQuizDetails = async () => {
            const quizRef = doc(db, "quizzes", quizId);
            const quizDoc = await getDoc(quizRef);
            if (quizDoc.exists()) {
                setQuiz(quizDoc.data());
            } else {
                console.log("No such quiz!");
                navigate("/"); // Redirect if quiz not found
            }
        };

        fetchQuizDetails();
    }, [quizId, navigate]);

    const handleSelectAnswer = (questionIndex, optionIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: optionIndex,
        });
    };

    return (
        <div className="min-h-screen py-20">
            <TopBar />
            <div className="flex flex-col items-center justify-center">
                <div className="w-5/6 bg-opacity-75 bg-green-100 rounded-lg shadow-xl p-8 mt-10">
                    <h1 className="text-2xl font-bold mb-6">{quiz ? `Take Quiz: ${quiz.title}` : "Loading..."}</h1>
                    {quiz && quiz.questions.map((question, qIndex) => (
                        <div key={qIndex} className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">{question.questionText}</h2>
                            {question.options.map((option, oIndex) => (
                                <div
                                    key={oIndex}
                                    className={`p-4 border rounded-lg cursor-pointer ${selectedAnswers[qIndex] === oIndex ? "bg-blue-200" : "bg-white"}`}
                                    onClick={() => handleSelectAnswer(qIndex, oIndex)}
                                >
                                    {option.text}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TakeQuiz;
