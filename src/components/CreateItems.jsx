import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer.jsx";
import { db } from "../Firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../assets/css/Copy.css";
import YourQuizzes from "./Quizzes.jsx";
import {
    Cog6ToothIcon as CogIconOutline,
    Square2StackIcon,
    InformationCircleIcon as InfoIconOutline,
    ChartBarIcon as ChartIconOutline,
    CheckIcon,
} from "@heroicons/react/24/outline";
import {
    Cog6ToothIcon as CogIconSolid,
    InformationCircleIcon as InfoIconSolid,
    ChartBarIcon as ChartIconSolid,
} from "@heroicons/react/16/solid";

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
    const [isChartSolid, setIsChartSolid] = useState(false);
    const [isInfoSolid, setIsInfoSolid] = useState(false);
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(quizId).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

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
    const toggleChartIcon = () => setIsChartSolid(!isChartSolid);
    const toggleInfoIcon = () => setIsInfoSolid(!isInfoSolid);

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
            window.location.reload();
        } catch (error) {
            console.error("Error updating quiz settings: ", error);
            alert("Failed to update quiz settings. Please try again.");
        }
    };

    const handleAddQuestion = () => {
        navigate(`/quiz/${quizId}/add`);
    };

    return (
        <div>
            <TopBar />
            <div className="md:flex md:justify-between">
                <YourQuizzes />
                <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#20935C] via-[#33a06a] to-[#1d7b4c] animated-background">
                    <div className="w-5/6 bg-opacity-95 bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0] rounded-lg shadow-xl p-8 mt-10">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-extrabold me-4 text-[#02A850]">
                                    {quiz.title || "Loading..."}
                                </h1>
                                {quiz.visibility !== "Private" && (
                                    <div className="copy-button-wrapper me-4 bg-gradient-to-b text-lg from-gray-50 to-gray-100 shadow-md rounded-lg">
                                        <p className="text-lg font-medium text-gray-700 me-4 hover:cursor-default">
                                            {quizId}
                                        </p>
                                        <div className="flex items-center">
                                            <button
                                                onClick={handleCopy}
                                                className="copy-button"
                                            >
                                                {copied ? (
                                                    <CheckIcon className="w-6" />
                                                ) : (
                                                    <Square2StackIcon className="w-6" />
                                                )}
                                            </button>
                                            <span className="copy-tooltip pointer-events-none text-sm">
                                                {copied
                                                    ? "Copied to clipboard!"
                                                    : "Copy code"}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {/* Chart Icon */}
                                {isChartSolid ? (
                                    <ChartIconSolid
                                        className="w-6 me-3 hover:cursor-pointer text-[#2c8c3b]"
                                        onClick={toggleChartIcon}
                                    />
                                ) : (
                                    <ChartIconOutline
                                        className="w-6 me-3 hover:cursor-pointer text-[#2c8c3b]"
                                        onClick={toggleChartIcon}
                                    />
                                )}

                                {/* Info Icon */}
                                {isInfoSolid ? (
                                    <InfoIconSolid
                                        className="w-6 hover:cursor-pointer text-[#2c8c3b]"
                                        onClick={toggleInfoIcon}
                                    />
                                ) : (
                                    <InfoIconOutline
                                        className="w-6 hover:cursor-pointer text-[#2c8c3b]"
                                        onClick={toggleInfoIcon}
                                    />
                                )}
                            </div>
                            {isSettingsOpen ? (
                                <CogIconSolid className="w-8 hover:cursor-pointer text-[#2c8c3b]" />
                            ) : (
                                <CogIconOutline
                                    className="w-8 hover:cursor-pointer text-[#2c8c3b] hover:text-[#6cbb91] transition duration-200"
                                    onClick={toggleSettingsModal}
                                />
                            )}
                        </div>

                        {/* Statistics */}
                        {isChartSolid && (
                            <div className="px-4 mt-4 pointer-events-none select-none tracking-wide">
                                <div className="flex tracking-normal">
                                    <p className="me-6 ">
                                        <strong className="me-2">
                                            Total Takes:
                                        </strong>
                                        <span className="text-gray-700">
                                            {quiz.totalQuizTakers}
                                        </span>
                                    </p>
                                    <p className="me-6">
                                        <strong className="me-2">
                                            Average Score:
                                        </strong>
                                        <span className="text-gray-700">
                                            {quiz.totalQuizTakers > 0
                                                ? (
                                                      quiz.scoreAccumulated /
                                                      quiz.totalQuizTakers
                                                  ).toFixed(2) +
                                                  " / " +
                                                  quiz.numItems
                                                : "N/A"}
                                        </span>
                                    </p>
                                    <p className="me-6">
                                        <strong className="me-2">
                                            Average Percentage:
                                        </strong>
                                        <span className="text-gray-700">
                                            {quiz.totalQuizTakers > 0
                                                ? (
                                                      (quiz.scoreAccumulated /
                                                          (quiz.numItems *
                                                              quiz.totalQuizTakers)) *
                                                      100
                                                  ).toFixed(2) + "%"
                                                : "N/A"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Info Details */}
                        {isInfoSolid && (
                            <div className="px-4 mt-4 pointer-events-none select-none tracking-wide">
                                <div className="flex tracking-normal">
                                    <p className="me-6 ">
                                        <strong className="me-2">
                                            Description:
                                        </strong>
                                        <span className="text-gray-700">
                                            {quiz.description}
                                        </span>
                                    </p>
                                    <p className="me-6 ">
                                        <strong className="me-2">
                                            Course:
                                        </strong>
                                        <span className="text-gray-700">
                                            {quiz.course}
                                        </span>
                                    </p>
                                    <p className="me-6 ">
                                        <strong className="me-2">
                                            Visibility:
                                        </strong>
                                        <span className="text-gray-700">
                                            {quiz.visibility}
                                        </span>
                                    </p>
                                    <p>
                                        <strong className="me-2">
                                            Date Created:
                                        </strong>
                                        <span className="text-gray-700">
                                            {new Date(
                                                quiz.dateCreated
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}

                        <hr className="border-[#62d899] my-8" />

                        {/* Settings Modal */}
                        {isSettingsOpen && (
                            <div
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                                onClick={() => setIsSettingsOpen(false)}
                            >
                                <div
                                    className="bg-[#FFFFF0] p-8 px-12 rounded-lg shadow-lg"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <form
                                        onSubmit={handleSettingsUpdate}
                                        className="space-y-4"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h1 className="text-xl text-[#02A850] font-bold">
                                                Quiz Settings
                                            </h1>
                                            <button
                                                onClick={toggleSettingsModal}
                                                className="text-green-400 hover:bg-green-100 text-4xl px-3 rounded-full pb-1 transition duration-300"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                        <hr className="border-[#62d899]" />
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
                                                className="mt-1 p-2 w-full border rounded-md bg-[#FAF9F6]"
                                                minLength="4"
                                                maxLength="20"
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
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                rows="4"
                                                className="mt-1 p-2 w-full bg-[#FAF9F6] border rounded-md resize-none"
                                                maxLength="100"
                                            />
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="w-full me-4">
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
                                                            course: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="mt-1 p-2 border rounded-md hover:cursor-pointer bg-[#FAF9F6]"
                                                    required
                                                >
                                                    <option value="CIS 1101">
                                                        CIS 1101 - PROGRAMMING 1
                                                    </option>
                                                    <option value="CIS 1201">
                                                        CIS 1201 - PROGRAMMING 2
                                                    </option>
                                                    <option value="CS 1202">
                                                        CS 1202 - WEB
                                                        DEVELOPMENT 1
                                                    </option>
                                                    <option value="CIS 1205">
                                                        CIS 1205 - NETWORKING 1
                                                    </option>
                                                    <option value="CIS 2101">
                                                        CIS 2101 - DATA
                                                        STRUCTURES AND
                                                        ALGORITHMS
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="w-full">
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
                                                            visibility:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="mt-1 p-2 w-full border rounded-md hover:cursor-pointer bg-[#FAF9F6]"
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
                                        </div>

                                        <div className="flex justify-between">
                                            <button
                                                type="button"
                                                className="px-4 py-2 mt-4 bg-[#E02424] text-white rounded-lg font-bold shadow-lg"
                                                style={{
                                                    boxShadow:
                                                        "0 5px 0 #9b1d1d",
                                                }}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 mt-4 bg-[#35A84C] hover:bg-[#33a149] transition duration-300 font-bold rounded-lg shadow-lg text-white"
                                                style={{
                                                    boxShadow:
                                                        "0 5px 0 #2c8c3b",
                                                }}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col">
                            {quiz.questions.length > 0 ? (
                                quiz.questions.map((question, index) => (
                                    <Link
                                        to={`/quiz/${quizId}/question/${index}/edit`}
                                        key={index}
                                        className="py-1 px-4 shadow-sm hover:shadow-md mb-2 bg-gradient-to-b from-[#FFFFF0] to-[#FAF9F6] rounded transition duration-300"
                                    >
                                        <div className="flex justify-between items-center py-2">
                                            <h2 className="text-lg font-semibold">{`Question ${
                                                index + 1
                                            }: ${question.questionText}`}</h2>
                                            <div>
                                                <span className="text-sm">{`Choices: ${question.options.length}`}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 text-sm hover:cursor-default select-none">
                                    No items. Click{" "}
                                    <span className="font-semibold">
                                        Add a Question
                                    </span>{" "}
                                    button below to add an item.
                                </p>
                            )}
                            <button
                                onClick={handleAddQuestion}
                                className="mt-4 w-1/6 bg-[#35A84C] hover:bg-[#33a149] transition duration-300 font-bold text-white py-2 px-2 rounded-lg shadow-lg self-end"
                                style={{
                                    boxShadow: "0 5px 0 #2c8c3b",
                                }}
                            >
                                Add a Question
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateItems;
