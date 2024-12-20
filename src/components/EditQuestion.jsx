import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import { db } from "../Firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

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
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleDeleteQuestion = async () => {
        try {
            if (!quiz || !quiz.questions || quiz.questions.length <= index) {
                console.error("Invalid quiz data or question index.");
                return;
            }

            const updatedQuestions = [...quiz.questions];
            updatedQuestions.splice(index, 1); // Remove the question

            const quizRef = doc(db, "quizzes", quizId);
            await updateDoc(quizRef, {
                questions: updatedQuestions,
                numItems: (quiz.numItems || 1) - 1, // Decrement numItems, ensuring it doesn't go below 0
            });

            setIsModalOpen(false);
            navigate(`/quiz/${quizId}`); // Redirect after deletion
        } catch (error) {
            console.error("Error deleting question: ", error);
            alert("Failed to delete question. Please try again.");
        }
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
        <div>
            <TopBar />
            <div className="flex items-center">
                <div className="w-screen h-screen pt-28 bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0] rounded-lg p-8">
                    <div className="flex justify-between mb-6">
                        <h1 className="text-3xl text-[#02A850] font-bold">
                            Edit Question
                        </h1>
                        <TrashIcon
                            className="w-8 hover:cursor-pointer text-red-600 hover:text-red-500 transition duration-300"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>

                    {/* Confirmation Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 py-10 rounded-lg shadow-lg max-w-md w-full">
                                <h2 className="text-lg mb-4 text-center">
                                    Are you sure you want to delete{" "}
                                    <span className="font-extrabold">
                                        {question.questionText ||
                                            "this question"}
                                    </span>
                                    ?
                                </h2>
                                <div className="flex justify-end mt-6 space-x-4">
                                    <button
                                        className="px-4 py-2 bg-[#e0e0e0] text-gray-700 rounded-lg"
                                        onClick={() => setIsModalOpen(false)}
                                        style={{
                                            boxShadow: "0 3px 0 #949494",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-[#E02424] text-white rounded-lg font-bold shadow-lg"
                                        style={{
                                            boxShadow: "0 3px 0 #9b1d1d",
                                        }}
                                        onClick={handleDeleteQuestion}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <hr className="border-[#62d899] mb-8" />

                    <textarea
                        value={question.questionText}
                        onChange={handleQuestionChange}
                        placeholder="Enter question"
                        className="w-full p-2 border rounded-lg md:py-28 sm:py-10 text-center text-2xl bg-[#FAF9F6] border-[#62d899] overflow-y-auto resize-none"
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
                                        className="form-radio hover:cursor-pointer mt-1 border-[#50b17d] border-2 rounded-full h-5 w-5 text-green-600 focus:outline-[#FAF9F6] focus:ring-[#FAF9F6]"
                                    />
                                </label>
                                <textarea
                                    value={option.text}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter answer option"
                                    className="flex-grow p-2 text-center py-20 bg-[#FAF9F6] rounded-lg text-xl border-[#62d899] overflow-y-hidden resize-none"
                                    maxLength={100}
                                />
                                {question.options.length > 2 && (
                                    <button
                                        onClick={() => removeOption(index)}
                                        className="absolute top-1 right-2"
                                    >
                                        <TrashIcon className="h-5 mt-1 text-red-600 hover:cursor-pointer hover:text-red-500 transition duration-300" />
                                    </button>
                                )}
                            </div>
                        ))}
                        {question.options.length < 5 && (
                            <button onClick={addOption} className="p-2">
                                <PlusCircleIcon className="w-10 text-[#02A850] hover:cursor-pointer hover:text-[#4dbd81] transition duration-300" />
                            </button>
                        )}
                    </div>
                    <div className="flex justify-between mt-2">
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
                            onClick={saveChanges}
                            className="mt-4 bg-[#35A84C] hover:bg-[#33a149] transition duration-300 font-bold text-lg text-white py-3 px-8 rounded-lg shadow-lg"
                            style={{
                                boxShadow: "0 5px 0 #2c8c3b",
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQuestion;
