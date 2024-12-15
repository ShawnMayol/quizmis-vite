import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import TopBar from "./TopBar.jsx";
import useAuthCheck from "../hooks/useAuthCheck.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import Footer from "./Footer.jsx";

const courseData = [
    {
        name: "CIS 1101 - PROGRAMMING 1",
        image: "https://northlink.edu.ph/lms/pluginfile.php/423/course/overviewfiles/computer%20programming1.jpg",
    },
    {
        name: "CIS 1201 - PROGRAMMING 2",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRETUMKLftPuSQgUwezZjx9jv7mkXj17Tyzn1wkrrRfsmd7g9vB86CpVZhAmUVI46205Bb21LOImFq-4mATn9fOTQ87t6yr6N-T3SqOGNOv8avE7wruyjvRe_Ur9cjn18mlYxhFH9AsL8/s640/86698731_10158013343572442_3708177310558453760_n.jpg",
    },
    {
        name: "CS 1202 - WEB DEVELOPMENT 1",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20231205165904/web-development-image.webp",
    },
    {
        name: "CIS 1205 - NETWORKING 1",
        image: "https://i0.wp.com/www.technologygee.com/wp-content/uploads/2023/12/what-is-computer-networking-tech-gee-knowledge-base-technology-gee.png?resize=620%2C400&ssl=1",
    },
    {
        name: "CIS 2101 - DATA STRUCTURES AND ALGORITHMS",
        image: "https://www.synergisticit.com/wp-content/uploads/2020/09/Data-structures-and-algorithms-new.webp",
    },
];

const Dashboard = () => {
    const db = getFirestore();
    const user = useAuthCheck("/login");

    if (!user) {
        return <LoadingScreen />;
    }

    const [filters, setFilters] = useState({
        "CIS 1101": true,
        "CIS 1201": true,
        "CS 1202": true,
        "CIS 1205": true,
        "CIS 2101": true,
    });
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilter = (course) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [course]: !prevFilters[course],
        }));
    };

    const toggleFilterVisibility = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div>
            <TopBar />
            <div
                className="p-10 pt-24 min-h-screen"
                style={{
                    background:
                        "linear-gradient(to bottom, #e6f5e6, #c7e9c0, #90ee90)",
                }}
            >
                <div className="flex justify-between items-center mb-8 mt-2">
                    <h1 className="text-4xl font-extrabold text-green-700">
                        Dashboard
                    </h1>
                    <img
                        src="/assets/filter.svg"
                        alt="Filter"
                        className="h-8 w-8 cursor-pointer"
                        onClick={toggleFilterVisibility}
                    />
                </div>

                <hr className="border-green-800" />

                {/* Filter options here */}
                {showFilters && (
                    <div className="bg-green-50 bg-opacity-60 p-4 rounded shadow mt-7">
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">
                            Filter Quizzes
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(filters).map(
                                ([course, isChecked]) => (
                                    <label
                                        key={course}
                                        className="flex items-center bg-white p-2 rounded shadow hover:cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() =>
                                                toggleFilter(course)
                                            }
                                            className="mr-2 form-checkbox rounded text-green-500"
                                        />
                                        <span className="text-md text-gray-700">
                                            {course}
                                        </span>
                                    </label>
                                )
                            )}
                        </div>
                    </div>
                )}

                {/* Course Sections */}
                {/* Top 4 Quizzes are displayed (based on totalTakers) */}
                {courseData.map((course, idx) => (
                    <div key={idx} className="mb-8 mt-8">
                        <div className="flex items-center mb-4">
                            <h2 className="text-3xl font-extrabold text-green-700 me-2">
                                {course.name}
                            </h2>
                            <button className="text-green-600 no-underline hover:underline">
                                View More
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <a
                                    key={i}
                                    href="/quizzes"
                                    className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                                >
                                    <img
                                        src={course.image}
                                        alt={`${course.name} Quiz ${i + 1}`}
                                        className="rounded-lg mb-4 w-full h-40 object-cover"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800">{`Quiz ${
                                        i + 1
                                    }`}</h3>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
