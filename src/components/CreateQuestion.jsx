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
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

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
        <div>
            <TopBar />
            <div className="flex items-center">
                <div className="w-screen h-screen pt-28 bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0] rounded-lg p-8">
                    <h1 className="text-3xl text-[#02A850] font-bold mb-6">
                        Add a New Question
                    </h1>
                    <hr className="border-[#62d899] mb-8" />
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Enter question"
                        className="w-full p-2 border rounded-lg md:py-28 sm:py-10 text-center text-2xl bg-[#FAF9F6] border-[#62d899]"
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
                                        className="form-radio hover:cursor-pointer mt-1 border-[#50b17d] border-2 rounded-full h-5 w-5 text-green-600 focus:outline-[#FAF9F6] focus:ring-[#FAF9F6]"
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
                                    className="flex-grow p-2 text-center py-20 bg-[#FAF9F6] rounded-lg text-xl border-[#62d899]"
                                />
                                {options.length > 2 && (
                                    <button
                                        onClick={() => removeOption(index)}
                                        className="absolute top-1 right-2"
                                    >
                                        <TrashIcon className="h-5 mt-1 text-red-600 hover:cursor-pointer hover:text-red-500 transition duration-300" />
                                    </button>
                                )}
                            </div>
                        ))}
                        {options.length < 5 && (
                            <button onClick={addOption} className="p-2">
                                <PlusCircleIcon className="w-10 text-[#02A850] hover:cursor-pointer hover:text-[#4dbd81] transition duration-300" />
                            </button>
                        )}
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                        <button
                            onClick={() => navigate(`/quiz/${quizId}`)}
                            className="mt-4 bg-[#35A84C] hover:bg-[#33a149] transition duration-300 font-bold text-lg text-white py-3 px-8 rounded-lg shadow-lg"
                            style={{
                                boxShadow: "0 5px 0 #2c8c3b",
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveQuestion}
                            className="mt-4 bg-[#35A84C] hover:bg-[#33a149] transition duration-300 font-bold text-lg text-white py-3 px-8 rounded-lg shadow-lg"
                            style={{
                                boxShadow: "0 5px 0 #2c8c3b",
                            }}
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
