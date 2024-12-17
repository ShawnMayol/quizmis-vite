import React, { useState } from "react";
import TopBar from "./TopBar.jsx";
import { db } from "../Firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";

const Create = () => {
    const [quizTitle, setQuizTitle] = useState("");
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState("");
    const [visibility, setVisibility] = useState("");
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleQuizCreation = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (error) {
            console.error("Error: ", error);
            return;
        }
        if (!user) {
            console.error("No user logged in!");
            return;
        }
        const currentDate = new Date();
        try {
            const docRef = await addDoc(collection(db, "quizzes"), {
                title: quizTitle,
                description: description,
                course: course,
                visibility: visibility,
                creatorId: user.uid,
                creatorName: user.displayName || "Anonymous",
                numItems: 0,
                questions: [],
                dateCreated: currentDate.toISOString(),
                totalQuizTakers: 0,
                scoreAccumulated: 0,
            });
            console.log("Document written with ID: ", docRef.id);
            navigate(`/quiz/${docRef.id}`);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div>
            <TopBar />
            <div className="min-h-screen py-20 bg-[#20935C]">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-5/6 bg-opacity-95 bg-[#FFFFF0] rounded-lg shadow-xl p-8 mt-10">
                        <h1 className="text-2xl font-bold mb-6">
                            Create a New Quiz
                        </h1>
                        <form onSubmit={handleQuizCreation} className="w-full">
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
                                    className="mt-1 p-2 py-4 w-full border rounded-md shadow-sm bg-[#FAF9F6] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter quiz title"
                                    minLength="4"
                                    maxLength="20"
                                    required
                                />
                                <p className="text-xs text-gray-600 mt-1">
                                    Title should at least be 4 characters and
                                    max 20 characters.
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
                                    className="mt-1 p-2 w-full border bg-[#FAF9F6] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe your quiz"
                                    maxLength="100"
                                ></textarea>
                                <p className="text-xs text-gray-600">
                                    Optional. Max 100 characters.
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <div className="mb-6 w-full me-2">
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
                                        className="mt-1 p-2 py-4 w-full border bg-[#FAF9F6] rounded-md hover:cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Course</option>
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
                                <div className="mb-6 w-full">
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
                                        className="mt-1 p-2 py-4 w-full borde bg-[#FAF9F6] rounded-md hover:cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">
                                            Select Visibility
                                        </option>
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                        <option value="Code">
                                            Accessible via Code
                                        </option>
                                    </select>
                                </div>
                            </div>

                            
                            <button
                                type="submit"
                                className="transform bg-[#35A84C] font-bold text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg hover:shadow-none float-right"
                                style={{
                                    boxShadow: "0 5px 0 #2c8c3b",
                                }}
                            >
                                Create Quiz
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Create;
