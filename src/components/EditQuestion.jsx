import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import { db } from "../Firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditQuestion = () => {
    const { quizId, questionIndex } = useParams();
    const index = parseInt(questionIndex, 10);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [question, setQuestion] = useState({
        text: "",
        options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
        ],
    });

    const handleCancel = () => {
        navigate(`/quiz/${quizId}`);
    };

    useEffect(() => {
        const fetchQuizDetails = async () => {
            const quizRef = doc(db, "quizzes", quizId);
            const quizDoc = await getDoc(quizRef);
            if (quizDoc.exists()) {
                const data = quizDoc.data();
                console.log("Fetched quiz data:", data);
                setQuiz(data);
                if (data.questions && data.questions[index]) {
                    setQuestion(data.questions[index]);
                    console.log("Fetched question:", data.questions[index]);
                } else {
                    console.log(`No question found at index: ${index}`);
                    navigate(`/quiz/${quizId}`);
                }
            } else {
                console.log("No such quiz!");
                navigate(`/quiz/${quizId}`);
            }
        };

        fetchQuizDetails();
    }, [quizId, index, navigate]);

    const handleQuestionChange = (e) => {
        const newText = e.target.value;
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            questionText: newText,
        }));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = question.options.map((option, i) => {
            if (i === index) {
                return { ...option, text: value };
            }
            return option;
        });
        setQuestion({ ...question, options: newOptions });
    };

    const handleToggleCorrect = (index) => {
        const newOptions = question.options.map((option, i) => ({
            ...option,
            isCorrect: i === index ? !option.isCorrect : option.isCorrect,
        }));
        setQuestion({ ...question, options: newOptions });
    };

    const saveChanges = async () => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index] = question;

        try {
            const quizRef = doc(db, "quizzes", quizId);
            await updateDoc(quizRef, { questions: updatedQuestions });
            console.log("Question updated successfully!");
            navigate(`/quiz/${quizId}`);
        } catch (error) {
            console.error("Error updating question: ", error);
            alert("Failed to update question. Please try again.");
        }
    };

    return (
        <div className="min-h-screen py-20">
            <TopBar />
            <div className="flex flex-col items-center justify-center">
                <div className="w-5/6 bg-opacity-75 bg-green-100 rounded-lg shadow-xl p-8 mt-10">
                    <h1 className="text-2xl font-bold mb-6">Edit question</h1>

                    <hr className="border-black mb-8" />

                    <input
                        type="text"
                        value={question.questionText} 
                        onChange={handleQuestionChange}
                        placeholder="Enter question"
                        className="w-full p-2 border rounded-lg text-2xl text-center py-40 bg-green-50"
                    />

                    <div className="flex justify-between items-center mt-2 space-x-2">
                        {question.options.map((option, index) => (
                            <div
                                key={index}
                                className="flex flex-grow items-center border rounded-md relative"
                            >
                                <label className="absolute top-1 left-2 flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={option.isCorrect}
                                        onChange={() =>
                                            handleToggleCorrect(index)
                                        }
                                        className="form-checkbox border-gray-700 border-2 rounded h-5 w-5 text-green-600"
                                    />
                                    {!option.isCorrect && (
                                        <span className="text-gray-300 -ml-4">
                                            ✔
                                        </span>
                                    )}
                                </label>
                                <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter answer option"
                                    className="flex-grow p-2 text-center py-24 bg-green-50 rounded-lg"
                                />
                                {question.options.length > 2 && (
                                    <button
                                        onClick={() => {
                                            const newOptions =
                                                question.options.filter(
                                                    (_, i) => i !== index
                                                );
                                            setQuestion({
                                                ...question,
                                                options: newOptions,
                                            });
                                        }}
                                        className="absolute top-1 right-2"
                                    >
                                        <img
                                            src="/assets/trash.svg"
                                            alt="Delete"
                                            className="h-5 w-5 hover:cursor-pointer"
                                        />
                                    </button>
                                )}
                            </div>
                        ))}
                        {question.options.length < 5 && (
                            <button
                                onClick={() => {
                                    const newOptions = [
                                        ...question.options,
                                        { text: "", isCorrect: false },
                                    ];
                                    setQuestion({
                                        ...question,
                                        options: newOptions,
                                    });
                                }}
                                className="bg-green-200 hover:bg-green-300 font-bold p-2 rounded"
                            >
                                <img
                                    src="/assets/plus.svg"
                                    alt="Add option"
                                    className="h-7 w-7 hover:cursor-pointer"
                                />
                            </button>
                        )}
                    </div>
                    <div className="flex justify-between mt-2">
                        <button
                            onClick={handleCancel}
                            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveChanges}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQuestion;
