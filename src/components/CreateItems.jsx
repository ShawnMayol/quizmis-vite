import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import { db } from "../Firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const CreateItems = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState({
        title: "",
        description: "",
        course: "",
        visibility: "",
        dateCreated: "",
        totalQuizTakers: 0,
        scoreAccumulated: 0,
        questions: [],
    });
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizDetails = async () => {
            const quizRef = doc(db, "quizzes", quizId);
            const quizDoc = await getDoc(quizRef);
            if (quizDoc.exists()) {
                setQuiz(quizDoc.data());
            } else {
                console.log("No such quiz!");
            }
        };

        fetchQuizDetails();
    }, [quizId]);

    const toggleSettingsModal = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const handleSettingsUpdate = async (e) => {
        e.preventDefault();
        try {
            const quizRef = doc(db, "quizzes", quizId);
            await updateDoc(quizRef, {
                title: quiz.title,
                description: quiz.description,
                course: quiz.course,
                visibility: quiz.visibility,
            });
            toggleSettingsModal();
        } catch (error) {
            console.error("Error updating quiz settings: ", error);
            alert("Failed to update quiz settings. Please try again.");
        }
    };

    const handleAddQuestion = () => {
        navigate(`/quiz/${quizId}/add`);
    };

    return (
        <div className="min-h-screen pt-20">
            <TopBar />
            <div className="flex flex-col items-center justify-center">
                <div className="w-5/6 bg-opacity-75 bg-green-100 rounded-lg shadow-xl p-8 mt-10">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold mb-6">
                            {quiz.title || "Loading..."}
                        </h1>
                        <img
                            src="/assets/settings.svg"
                            alt="Settings"
                            className="h-7 w-7 hover:cursor-pointer"
                            onClick={toggleSettingsModal}
                        />
                    </div>

                    <hr className="border-black mb-8" />

                    {isSettingsOpen && (
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                            onClick={() => setIsSettingsOpen(false)}
                        >
                            <div
                                className="bg-white p-8 px-12 rounded-lg shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <form
                                    onSubmit={handleSettingsUpdate}
                                    className="space-y-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-xl font-bold">
                                            Quiz Settings
                                        </h1>
                                        <button
                                            onClick={toggleSettingsModal}
                                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-4xl px-2 rounded pb-1"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <hr className="border-black" />
                                    <div>
                                        <label
                                            htmlFor="quizTitle"
                                            className="block text-sm font-bold"
                                        >
                                            Quiz Title
                                        </label>
                                        <input
                                            type="text"
                                            id="quizTitle"
                                            value={quiz.title}
                                            onChange={(e) =>
                                                setQuiz({
                                                    ...quiz,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="mt-1 p-2 w-full border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-bold"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            value={quiz.description}
                                            onChange={(e) =>
                                                setQuiz({
                                                    ...quiz,
                                                    description: e.target.value,
                                                })
                                            }
                                            rows="4"
                                            className="mt-1 p-2 w-full border rounded-md"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="course"
                                            className="block text-sm font-bold"
                                        >
                                            Course
                                        </label>
                                        <select
                                            id="course"
                                            value={quiz.course}
                                            onChange={(e) =>
                                                setQuiz({
                                                    ...quiz,
                                                    course: e.target.value,
                                                })
                                            }
                                            className="mt-1 p-2 w-full border rounded-md hover:cursor-pointer"
                                            required
                                        >
                                            <option value="CIS 1101">
                                                CIS 1101 - PROGRAMMING 1
                                            </option>
                                            <option value="CIS 1201">
                                                CIS 1201 - PROGRAMMING 2
                                            </option>
                                            <option value="CS 1202">
                                                CS 1202 - WEB DEVELOPMENT 1
                                            </option>
                                            <option value="CIS 1205">
                                                CIS 1205 - NETWORKING 1
                                            </option>
                                            <option value="CIS 2101">
                                                CIS 2101 - DATA STRUCTURES AND
                                                ALGORITHMS
                                            </option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="visibility"
                                            className="block text-sm font-bold"
                                        >
                                            Visibility
                                        </label>
                                        <select
                                            id="visibility"
                                            value={quiz.visibility}
                                            onChange={(e) =>
                                                setQuiz({
                                                    ...quiz,
                                                    visibility: e.target.value,
                                                })
                                            }
                                            className="mt-1 p-2 w-full border rounded-md hover:cursor-pointer"
                                            required
                                        >
                                            <option value="Public">
                                                Public
                                            </option>
                                            <option value="Private">
                                                Private
                                            </option>
                                            <option value="Code">
                                                Accessible via Code
                                            </option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 float-right"
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        {quiz.questions.map((question, index) => (
                            <Link
                                to={`/quiz/${quizId}/question/${index}/edit`}
                                key={index}
                                className="p-4 shadow rounded-lg bg-white"
                            >
                                <h2 className="text-lg font-semibold">{`Question ${
                                    index + 1
                                }: ${question.questionText}`}</h2>
                                <div className="flex justify-between items-center">
                                    <p>{question.description}</p>
                                    <div className="text-right">
                                        <span className="text-sm">{`Choices: ${question.options.length}`}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <button
                            onClick={handleAddQuestion}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Question
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateItems;
