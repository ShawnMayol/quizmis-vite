import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const YourQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [quizzesLoading, setQuizzesLoading] = useState(true);
    const [quizzesError, setQuizzesError] = useState(null);

    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        const fetchQuizzes = async () => {
            if (user) {
                try {
                    const quizzesRef = collection(db, "quizzes");
                    const q = query(quizzesRef, where("creatorId", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    const quizzesData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setQuizzes(quizzesData);
                } catch (error) {
                    setQuizzesError("Failed to load quizzes. Please try again later.");
                    console.error("Error fetching quizzes:", error);
                } finally {
                    setQuizzesLoading(false);
                }
            } else {
                setQuizzesLoading(false);
            }
        };

        if (!loading && !error) {
            fetchQuizzes();
        }
    }, [user, loading, error]);

    return (
        <div className="h-screen sm:max-w-screen md:w-1/4 bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0] shadow-r-xl px-6 py-24 left-0">
            <h1 className="text-2xl text-[#02A850] font-extrabold mb-2 hover:cursor-default select-none">
                Your Quizzes
            </h1>
            <hr className="border-[#62d899] mb-4" />

            {/* Loading State */}
            {loading || quizzesLoading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-500 text-sm hover:cursor-default select-none">
                            Loading your quizzes...
                        </p>
                    </div>
                </div>
            ) : error || quizzesError ? (
                <p className="text-red-500 text-sm text-center">
                    {error ? `Error: ${error.message}` : quizzesError}
                </p>
            ) : quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <Link
                        key={quiz.id}
                        to={`/quiz/${quiz.id}`}
                        className="block py-3 px-2 shadow-sm hover:shadow-md mb-4 bg-gradient-to-b from-[#FFFFF0] to-[#FAF9F6] rounded transition duration-300 transform hover:scale-x-105"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{quiz.title}</h2>
                            <span className="text-gray-500 text-sm">
                                {quiz.numItems} items
                            </span>
                        </div>
                    </Link>
                ))
            ) : (
                <p className="text-gray-500 text-sm hover:cursor-default select-none">
                    You don't own any quizzes.
                </p>
            )}
        </div>
    );
};

export default YourQuizzes;
