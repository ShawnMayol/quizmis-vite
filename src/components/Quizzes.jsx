import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import TopBar from "./TopBar.jsx";

const YourQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        const fetchQuizzes = async () => {
            if (user) {
                console.log("Fetching quizzes for user ID:", user.uid); // Log to verify the userID
                const quizzesRef = collection(db, "quizzes");
                const q = query(quizzesRef, where("creatorId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const quizzesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("Quizzes fetched:", quizzesData); // Log to verify the fetched data
                setQuizzes(quizzesData);
            } else {
                console.log("No user logged in or still loading user data");
            }
        };

        if (!loading && !error) {
            fetchQuizzes();
        }
    }, [user, loading, error]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="min-h-screen pt-32">
            <TopBar />
            <div className="flex flex-col items-center justify-center">
                <div className="w-5/6 bg-opacity-95 bg-white rounded-lg shadow-xl p-8 mt-10">
                    <h1 className="text-2xl font-bold mb-6">Your Quizzes</h1>
                    <hr className="border-black mb-8" />
                    {quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <Link
                                key={quiz.id}
                                to={`/quiz/${quiz.id}`}
                                className="block p-6 shadow rounded-lg mb-4 bg-green-50 hover:bg-green-100 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">
                                        {quiz.title}
                                    </h2>
                                    <span className="text-gray-500 text-sm">
                                        {quiz.numItems} items
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center">No quizzes found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YourQuizzes;
