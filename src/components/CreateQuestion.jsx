import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import { db } from "../Firebase.js";
import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    increment,
} from "firebase/firestore";

const CreateQuestions = () => {
    const navigate = useNavigate();
    const { quizId } = useParams();
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
    const [correctIndex, setCorrectIndex] = useState(null);

    useEffect(() => {
        const fetchQuizDetails = async () => {
            const quizRef = doc(db, "quizzes", quizId);
            const quizDoc = await getDoc(quizRef);
            if (!quizDoc.exists()) {
                console.log("No such quiz!");
                navigate("/dashboard");
            }
        };
        fetchQuizDetails();
    }, [quizId, navigate]);

    const handleOptionChange = (index, value) => {
        const newOptions = options.map((option, i) => ({
            text: i === index ? value : option.text,
        }));
        setOptions(newOptions);
    };

    const handleToggleCorrect = (selectedIndex) => {
        setCorrectIndex(selectedIndex);
    };

    const addOption = () => {
        setOptions([...options, { text: "" }]);
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
            if (index === correctIndex) {
                setCorrectIndex(null);
            } else if (index < correctIndex) {
                setCorrectIndex(correctIndex - 1);
            }
        }
    };

    const handleSaveQuestion = async () => {
        if (
            !questionText.trim() ||
            options.some((opt) => !opt.text.trim()) ||
            correctIndex === null
        ) {
            alert(
                "Please fill in all fields correctly and select a correct answer."
            );
            return;
        }

        const newQuestion = {
            questionText,
            options,
            correctIndex,
        };

        try {
            const quizRef = doc(db, "quizzes", quizId);
            await updateDoc(quizRef, {
                questions: arrayUnion(newQuestion),
                numItems: increment(1),
            });
            // alert("Question added successfully!");
            setQuestionText("");
            setOptions([{ text: "" }, { text: "" }]);
            setCorrectIndex(null);
            navigate(`/quiz/${quizId}`);
        } catch (error) {
            console.error("Error adding question: ", error);
            alert("Failed to add question. Please try again.");
        }
    };

    return (
        <div className="min-h-screen py-20">
            <TopBar />
            <div className="flex flex-col items-center justify-center">
                <div className="w-5/6 bg-opacity-95 bg-white rounded-lg shadow-xl p-8 mt-10">
                    <h1 className="text-2xl font-bold mb-6">
                        Add a New Question
                    </h1>
                    <hr className="border-black mb-8" />
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Enter question"
                        className="w-full p-2 border rounded-lg py-40 text-center text-2xl bg-green-50"
                    />
                    <div className="flex justify-between items-center mt-4 space-x-2">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="flex flex-grow items-center border rounded-md relative"
                            >
                                <label className="absolute top-1 left-2 flex items-center">
                                    <input
                                        type="radio"
                                        name="correctOption"
                                        checked={correctIndex === index}
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
                                    className="flex-grow p-2 text-center py-24 bg-green-50 rounded-lg text-xl"
                                />
                                {options.length > 2 && (
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
                        {options.length < 5 && (
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
                    <div className="flex justify-between">
                        <button
                            onClick={() => navigate(`/quiz/${quizId}`)}
                            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveQuestion}
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

export default CreateQuestions;
