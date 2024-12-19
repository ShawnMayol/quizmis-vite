import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    doc,
    orderBy,
    limit,
} from "firebase/firestore";
import dayjs from "dayjs";
import {
    ArrowTrendingUpIcon,
    UserCircleIcon,
    CalendarIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

const TrendingQuizzes = () => {
    const [trendingQuizzes, setTrendingQuizzes] = useState([]);

    useEffect(() => {
        const fetchTrendingQuizzes = async () => {
            try {
                const oneWeekAgo = dayjs().subtract(7, "days").toDate(); // Get the exact date 7 days ago

                // Step 1: Query userQuizRecords for records within the last week
                const recordsRef = collection(db, "userQuizRecords");
                const recordsQuery = query(
                    recordsRef,
                    where("dateTaken", ">", oneWeekAgo)
                );
                const recordsSnapshot = await getDocs(recordsQuery);

                console.log("Records fetched:", recordsSnapshot.size); // Log the total number of records fetched

                // Step 2: Count dateTaken occurrences by quizId
                const quizCountMap = {};
                recordsSnapshot.forEach((doc) => {
                    const record = doc.data();
                    const quizId = record.quizId;
                    if (quizId) {
                        quizCountMap[quizId] = (quizCountMap[quizId] || 0) + 1;
                    }
                });

                console.log("Quiz ID Count Map:", quizCountMap); // Log the counts of quizIds

                // Step 3: Sort quizIds by count and get the top 4
                const sortedQuizIds = Object.entries(quizCountMap)
                    .sort((a, b) => b[1] - a[1]) // Sort by count descending
                    .slice(0, 4) // Get top 4
                    .map(([quizId]) => quizId);

                console.log("Top 4 Quiz IDs:", sortedQuizIds); // Log the top 4 quiz IDs

                // Step 4: Fetch quiz details from quizzes collection
                if (sortedQuizIds.length > 0) {
                    try {
                        const quizzes = await Promise.all(
                            sortedQuizIds.map(async (quizId) => {
                                const quizDoc = await getDoc(
                                    doc(db, "quizzes", quizId)
                                ); // Fetch each quiz by ID
                                if (quizDoc.exists()) {
                                    return {
                                        id: quizDoc.id,
                                        ...quizDoc.data(),
                                    };
                                } else {
                                    console.warn(
                                        `Quiz with ID ${quizId} not found`
                                    );
                                    return null;
                                }
                            })
                        );

                        // Filter out null entries in case a quiz was not found
                        const validQuizzes = quizzes.filter(
                            (quiz) => quiz !== null
                        );

                        console.log("Fetched Trending Quizzes:", validQuizzes); // Log the fetched quiz details
                        setTrendingQuizzes(validQuizzes);
                    } catch (error) {
                        console.error("Error fetching quiz details:", error);
                        setTrendingQuizzes([]);
                    }
                } else {
                    console.log("No trending quizzes found."); // Log when no quizzes match
                    setTrendingQuizzes([]);
                }
            } catch (error) {
                console.error("Error fetching trending quizzes:", error);
            }
        };

        fetchTrendingQuizzes();
    }, []);

    return (
        <div className="mb-8">
            {/* Heading */}
            <div className="flex items-center mb-4 text-[#02A850]">
                <ArrowTrendingUpIcon className="w-10 me-4" />
                <h2 className="text-3xl font-extrabold">Trending Quizzes</h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {trendingQuizzes.map((quiz) => (
                    <a
                        key={quiz.id}
                        href={`/take-quiz/${quiz.id}`}
                        className="block bg-[#FFFFF0] rounded-lg shadow-md hover:shadow-xl transition duration-300"
                    >
                        {/* Image Section */}
                        <div className="relative">
                            <img
                                src="/assets/ComputerImgBG.svg"
                                alt="Quiz Illustration"
                                className="w-full h-32 object-cover rounded-t-lg"
                            />
                            {/* SVG Wave */}
                            <svg
                                className="absolute bottom-0 left-0 w-full -mb-1"
                                viewBox="0 0 1440 100"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#FFFFF0"
                            >
                                <path d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,74.7C840,75,960,53,1080,53.3C1200,53,1320,75,1380,85.3L1440,96L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
                            </svg>
                        </div>

                        {/* Information Section */}
                        <div className="p-4 items-end">
                            <div className="flex items-end justify-between mb-2">
                                <h3 className="text-xl font-semibold text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap w-full">
                                    {quiz.title || "Untitled Quiz"}
                                </h3>
                                <div className="flex flex-col text-end w-full">
                                    <p className="text-gray-600 text-xs">
                                        {quiz.numItems || 0} Qs
                                    </p>
                                    <p className="text-gray-600 text-xs">
                                        {quiz.totalQuizTakers || 0}{" "}
                                        {quiz.totalQuizTakers === 1
                                            ? "Play"
                                            : "Plays"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex mb-1 items-center">
                                <InformationCircleIcon className="w-5 me-1" />
                                <p className="text-gray-600 text-sm mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                    {quiz.description || "No description"}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex">
                                    <UserCircleIcon className="w-4 me-1" />
                                    <p className="text-gray-600 text-sm mt-1">
                                        {quiz.creatorName || "Anonymous"}
                                    </p>
                                </div>
                                <div className="flex">
                                    <CalendarIcon className="w-4 me-1" />
                                    <p className="text-gray-600 text-sm mt-1">
                                        {new Date(
                                            quiz.dateCreated
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TrendingQuizzes;
