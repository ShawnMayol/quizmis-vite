import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import { db } from "../Firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditQuestion = () => {
    const { quizId, questionIndex } = useParams();
    const index = parseInt(questionIndex, 10);
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [question, setQuestion] = useState({
        text: "",
        options: [{ text: "" }, { text: "" }],
        correctIndex: null,
    });

    const addOption = () => {
        if (question.options.length < 5) {
            setQuestion((prevQuestion) => ({
                ...prevQuestion,
                options: [...prevQuestion.options, { text: "" }],
            }));
        }
    };

    useEffect(() => {
        const fetchQuizDetails = async () => {
            const quizRef = doc(db, "quizzes", quizId);
            const quizDoc = await getDoc(quizRef);
            if (quizDoc.exists()) {
                const data = quizDoc.data();
                setQuiz(data);
                if (data.questions && data.questions[index]) {
                    setQuestion(data.questions[index]);
                } else {
                    navigate(`/quiz/${quizId}`);
                }
            } else {
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

    const handleOptionChange = (optionIndex, value) => {
        const newOptions = question.options.map((option, i) => ({
            text: i === optionIndex ? value : option.text,
        }));
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            options: newOptions,
        }));
    };

    const handleToggleCorrect = (selectedIndex) => {
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            correctIndex: selectedIndex,
        }));
    };

    const removeOption = (optionIndex) => {
        if (question.options.length > 2) {
            const newOptions = question.options.filter(
                (_, i) => i !== optionIndex
            );
            setQuestion((prevQuestion) => ({
                ...prevQuestion,
                options: newOptions,
                correctIndex:
                    prevQuestion.correctIndex === optionIndex
                        ? null
                        : prevQuestion.correctIndex > optionIndex
                        ? prevQuestion.correctIndex - 1
                        : prevQuestion.correctIndex,
            }));
        }
    };

    const saveChanges = async () => {
        if (
            question.correctIndex === null ||
            question.correctIndex >= question.options.length ||
            question.options.some((option) => option.text.trim() === "")
        ) {
            alert(
                "Please ensure all fields are filled correctly and a correct answer is selected."
            );
            return;
        }

        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index] = question;

        try {
            const quizRef = doc(db, "quizzes", quizId);
            await updateDoc(quizRef, { questions: updatedQuestions });
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
                <div className="w-5/6 bg-opacity-95 bg-white rounded-lg shadow-xl p-8 mt-10">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold mb-6">
                            Edit Question
                        </h1>
                        <img
                            src="/assets/trash.svg"
                            alt="Delete"
                            className="h-7 w-7 hover:cursor-pointer"
                        />
                    </div>
                    <hr className="border-black mb-8" />
                    <input
                        type="text"
                        value={question.questionText}
                        onChange={handleQuestionChange}
                        placeholder="Enter question"
                        className="w-full p-2 border rounded-lg text-2xl text-center py-40 bg-green-50"
                    />
                    <div className="flex justify-between items-center mt-4 space-x-2">
                        {question.options.map((option, index) => (
                            <div
                                key={index}
                                className="flex flex-grow items-center border rounded-md relative"
                            >
                                <label className="absolute top-1 left-2 flex items-center">
                                    <input
                                        type="radio"
                                        name="correctOption"
                                        checked={
                                            question.correctIndex === index
                                        }
                                        onChange={() =>
                                            handleToggleCorrect(index)
                                        }
                                        className="form-radio hover:cursor-pointer border-gray-700 border-2 rounded-full h-5 w-5 text-green-600"
                                    />
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
                                        onClick={() => removeOption(index)}
                                        className="absolute top-1 right-2"
                                    >
                                        <img
                                            src="/assets/trash.svg"
                                            alt="Delete"
                                            className="h-7 w-7 hover:cursor-pointer"
                                        />
                                    </button>
                                )}
                            </div>
                        ))}
                        {question.options.length < 5 && (
                            <button
                                onClick={addOption}
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
                            onClick={() => navigate(`/quiz/${quizId}`)}
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
