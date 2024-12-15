import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";
import { db } from "../Firebase.js";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const CreateItems = () => {
    const { quizId } = useParams();
    const [quizTitle, setQuizTitle] = useState("");
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState("");
    const [visibility, setVisibility] = useState("");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ]);

    useEffect(() => {
        const fetchQuizDetails = async () => {
            const quizRef = doc(db, "quizzes", quizId);
            const quizDoc = await getDoc(quizRef);
            if (quizDoc.exists()) {
                const data = quizDoc.data();
                setQuizTitle(data.title);
                setDescription(data.description || "");
                setCourse(data.course || "");
                setVisibility(data.visibility || "");
            } else {
                console.log("No such quiz!");
            }
        };

        fetchQuizDetails();
    }, [quizId]);

    const toggleSettingsModal = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = options.map((option, i) => {
            if (i === index) {
                return { ...option, text: value };
            }
            return option;
        });
        setOptions(newOptions);
    };

    const handleToggleCorrect = (index) => {
        const newOptions = options.map((option, i) => ({
            ...option,
            isCorrect: i === index ? !option.isCorrect : option.isCorrect,
        }));
        setOptions(newOptions);
    };
    
    const addOption = () => {
        if (options.length < 5) {
            setOptions([...options, { text: "", isCorrect: false }]);
        }
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const handleSettingsUpdate = async (e) => {
        e.preventDefault();
        try {
            const quizRef = doc(db, "quizzes", quizId);
            await updateDoc(quizRef, {
                title: quizTitle,
                description: description,
                course: course,
                visibility: visibility,
            });
            alert("Quiz settings updated successfully!");
            toggleSettingsModal();
        } catch (error) {
            console.error("Error updating quiz settings: ", error);
            alert("Failed to update quiz settings. Please try again.");
        }
    };

    return (
        <div className="min-h-screen pt-20">
            <TopBar />
            <div className="flex flex-col items-center justify-center">
                <div className="w-5/6 bg-opacity-75 bg-green-100 rounded-lg shadow-xl p-8 mt-10">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold mb-6">
                            {quizTitle || "Loading..."}
                        </h1>
                        <img
                            src="/assets/settings.svg"
                            alt="Settings"
                            className="h-7 w-7 hover:cursor-pointer"
                            onClick={toggleSettingsModal}
                        />
                    </div>

                    <hr className="border-black" />

                    {isSettingsOpen && (
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                            onClick={() => setIsSettingsOpen(false)}
                        >
                            <div
                                className="bg-white p-6 px-10 rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <form
                                    onSubmit={handleSettingsUpdate}
                                    className="space-y-6 relative"
                                >
                                    <div className="mb-6">
                                        <label
                                            htmlFor="quizTitle"
                                            className="block text-sm font-bold"
                                        >
                                            Quiz Title
                                        </label>
                                        <input
                                            type="text"
                                            id="quizTitle"
                                            value={quizTitle}
                                            onChange={(e) =>
                                                setQuizTitle(e.target.value)
                                            }
                                            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter quiz title"
                                            required
                                        />
                                        <p className="text-xs text-gray-600 mt-1">
                                            Title should at least be 4
                                            characters and max 20 characters.
                                        </p>
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
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            rows="4"
                                            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Describe your quiz"
                                        ></textarea>
                                        <p className="text-xs text-gray-600">
                                            Optional. Max 100 characters.
                                        </p>
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
                                            value={course}
                                            onChange={(e) =>
                                                setCourse(e.target.value)
                                            }
                                            className="mt-1 p-2 w-full border rounded-md hover:cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">
                                                Select Course
                                            </option>
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
                                            value={visibility}
                                            onChange={(e) =>
                                                setVisibility(e.target.value)
                                            }
                                            className="mt-1 p-2 w-full border rounded-md hover:cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">
                                                Select Visibility
                                            </option>
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
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 float-end"
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="mt-4">
                        <input
                            type="text"
                            value={question}
                            onChange={handleQuestionChange}
                            placeholder="Enter question"
                            className="w-full p-2 border rounded-md py-40 text-center text-2xl bg-green-50"
                        />
                        <div className="flex justify-between items-center mt-4 space-x-2">
                            {options.map((option, index) => (
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
                                        placeholder={`Enter answer option`}
                                        className="flex-grow p-2 text-center py-24 bg-green-50"
                                    />
                                    {options.length > 2 && (
                                        <button
                                            onClick={() => removeOption(index)}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateItems;
