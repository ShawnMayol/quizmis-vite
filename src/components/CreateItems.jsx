import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer.jsx";
import { db } from "../Firebase.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
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
    const [courseOptions, setCourseOptions] = useState([]);
    const [quizToDelete, setQuizToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleCopy = () => {
        navigator.clipboard.writeText(quizId).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesDocRef = doc(
                    db,
                    "adminConfig",
                    "77j74B03UV8D39cP10JN"
                );
                const coursesDocSnap = await getDoc(coursesDocRef);

                if (coursesDocSnap.exists()) {
                    const data = coursesDocSnap.data();
                    setCourseOptions(data.courses || []); // Update state with courses array
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchQuizDetails = async () => {
            const quizRef = doc(db, "quizzes", quizId);
            const quizDoc = await getDoc(quizRef);
            if (quizDoc.exists()) {
                setQuiz(quizDoc.data());
                setLoading(false);
            } else {
                console.log("No such quiz!");
                setLoading(false);
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
            // alert("Failed to update quiz settings. Please try again.");
        }
    };

    const handleAddQuestion = () => {
        navigate(`/quiz/${quizId}/add`);
    };

    const handleDelete = async () => {
        try {
            const quizRef = doc(db, "quizzes", quizToDelete.id);
            await deleteDoc(quizRef);
            // alert(
            //     `Quiz "${quizToDelete.title}" has been deleted successfully.`
            // );
            setIsModalOpen(false);
            navigate("/create");
        } catch (error) {
            console.error("Error deleting quiz: ", error);
            // alert("Failed to delete quiz. Please try again.");
        }
    };

    return (
        <div>
            <TopBar />
            <div className="md:flex md:justify-between">
                <YourQuizzes />
                <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#20935C] via-[#33a06a] to-[#1d7b4c] animated-background">
                    <div className="w-5/6 bg-opacity-95 bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0] rounded-lg shadow-xl p-8 mt-10">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <h1 className="text-3xl font-extrabold me-4">
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

                        {/* Info Details */}
                        {isInfoSolid && (
                            <div className="px-4 mt-4 pointer-events-none select-none tracking-wide">
                                <div className="flex space-y-1 flex-col tracking-normal">
                                    <p className="me-6 text-ellipsis overflow-hidden whitespace-nowrap">
                                        <strong className="me-2">
                                            Description:
                                        </strong>
                                        <span className="text-gray-700 ">
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

                        <hr className="border-[#62d899] my-8" />

                        {/* Settings Modal */}
                        {isSettingsOpen && (
                            <div
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
                                onClick={() => setIsSettingsOpen(false)}
                            >
                                <div
                                    className="bg-[#FFFFF0] w-2/5 p-8 px-12 rounded-lg shadow-lg"
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
                                                    className="mt-1 w-full p-2 border rounded-md hover:cursor-pointer bg-[#FAF9F6]"
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        Select Course
                                                    </option>
                                                    {courseOptions.map(
                                                        (courseName, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    courseName
                                                                }
                                                            >
                                                                {courseName}
                                                            </option>
                                                        )
                                                    )}
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
                                                onClick={() => {
                                                    setQuizToDelete({
                                                        id: quizId,
                                                        title: quiz.title,
                                                    });
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                Delete
                                            </button>

                                            {/* Confirmation Modal */}
                                            {isModalOpen && (
                                                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                                                    <div className="bg-white px-8 py-10 rounded-lg shadow-lg max-w-md w-full">
                                                        <h2 className="text-lg text-center mb-8">
                                                            Are you sure you
                                                            want to delete{" "}
                                                            <span className="font-extrabold">
                                                                {
                                                                    quizToDelete.title
                                                                }
                                                            </span>
                                                            ?
                                                        </h2>
                                                        <div className="flex justify-end space-x-4">
                                                            <button
                                                                className="px-4 py-2 bg-[#e0e0e0] text-gray-700 rounded-lg"
                                                                onClick={() =>
                                                                    setIsModalOpen(
                                                                        false
                                                                    )
                                                                }
                                                                style={{
                                                                    boxShadow:
                                                                        "0 3px 0 #949494",
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                className="px-4 py-2 bg-[#E02424] text-white rounded-lg font-bold shadow-lg"
                                                                style={{
                                                                    boxShadow:
                                                                        "0 3px 0 #9b1d1d",
                                                                }}
                                                                onClick={
                                                                    handleDelete
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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
                            {loading ? (
                                <div className="py-1 px-4 shadow-sm mb-2 bg-gradient-to-b from-[#FFFFF0] to-[#FAF9F6] rounded transition duration-300 flex items-center">
                                    <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin mr-4"></div>
                                    <span className="text-lg font-semibold text-gray-500">
                                        Loading questions...
                                    </span>
                                </div>
                            ) : quiz?.questions?.length > 0 ? (
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
