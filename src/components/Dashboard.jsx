import React, { useEffect, useState } from "react";
import {
    doc,
    getDoc,
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TopBar from "./TopBar.jsx";
import useAuthCheck from "../hooks/useAuthCheck.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import Footer from "./Footer.jsx";
import {
    AdjustmentsHorizontalIcon as FilterOutline,
    UserCircleIcon,
    CalendarIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon as FilterSolid } from "@heroicons/react/24/solid";
import { db } from "../Firebase";
import TrendingQuizzes from "./Trending.jsx";

const Dashboard = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({});
    const [courses, setCourses] = useState([]);
    const user = useAuthCheck("/login");
    const [userInfo, setUserInfo] = useState(null);
    const auth = getAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    if (!user) {
        return <LoadingScreen />;
    }

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                // Query quizzes collection with visibility = Public
                const quizzesRef = collection(db, "quizzes");
                const q = query(
                    quizzesRef,
                    where("visibility", "==", "Public")
                );
                const querySnapshot = await getDocs(q);

                // Extract quiz data
                const fetchedQuizzes = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setQuizzes(fetchedQuizzes);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const signInMethod = currentUser.providerData[0]?.providerId;
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserInfo({
                            uid: currentUser.uid,
                            email: currentUser.email,
                            photoURL: currentUser.photoURL,
                            signInMethod,
                            ...docSnap.data(),
                        });
                    } else {
                        console.log("No user details found in Firestore");
                        setUserInfo({
                            uid: currentUser.uid,
                            email: currentUser.email,
                            photoURL: currentUser.photoURL,
                            signInMethod,
                        });
                    }
                } catch (error) {
                    console.error(
                        "Error fetching user details from Firestore",
                        error
                    );
                    setUserInfo({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        signInMethod,
                        ...docSnap.data(),
                    });
                }
            } else {
                setUserInfo(null);
            }
        });

        return () => unsubscribe();
    }, []);

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
                    setCourses(data.courses || []);
                    // Initialize filters with all courses unchecked
                    const initialFilters = {};
                    data.courses.forEach((course) => {
                        initialFilters[course] = true;
                    });
                    setFilters(initialFilters);
                } else {
                    console.error("No courses document found!");
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const toggleFilter = () => {
        setShowFilters((prev) => !prev);
    };

    const toggleCourseFilter = (course) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [course]: !prevFilters[course],
        }));
    };

    return (
        <div>
            <TopBar />
            {!userInfo || !courses.length || !quizzes.length ? (
                // Loading Animation
                <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0]">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-500 text-md hover:cursor-default select-none">
                            Loading...
                        </p>
                    </div>
                </div>
            ) : (
                // Dashboard Content
                <div className="p-10 pt-24 min-h-screen bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0]">
                    <div className="flex justify-between items-center mb-8 mt-2">
                        {userInfo?.firstName ? (
                            <h1 className="text-4xl font-extrabold text-[#02A850]">
                                Hello, {userInfo.firstName}
                            </h1>
                        ) : (
                            <div className="h-10 w-56 bg-gradient-to-r from-green-100 via-green-200 to-green-100 rounded animate-pulse"></div>
                        )}

                        <button
                            onClick={toggleFilter}
                            className="w-8 h-8 cursor-pointer text-[#02A850] hover:text-[#6cbb91]"
                        >
                            {showFilters ? (
                                <FilterSolid className="w-full h-full" />
                            ) : (
                                <FilterOutline className="w-full h-full" />
                            )}
                        </button>
                    </div>

                    <hr className="border-[#62d899] mb-10" />

                    {/* Filter options container */}
                    <div
                        // without animation
                        className={` ${
                            // with animation
                            // className={`transform transition-all duration-300 origin-top ${
                            showFilters ? "scale-y-100 mt-7" : "scale-y-0"
                        }`}
                        style={{ maxHeight: showFilters ? "500px" : "0px" }}
                    >
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {courses.map((course) => (
                                <label
                                    key={course}
                                    className="flex items-center bg-[#FAF9F6] p-2 rounded shadow hover:cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters[course] || false}
                                        onChange={() =>
                                            toggleCourseFilter(course)
                                        }
                                        className="mr-2 form-checkbox rounded-full text-green-500 focus:outline-none focus:ring-white"
                                    />
                                    <span className="text-md text-gray-700 select-none">
                                        {course}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <TrendingQuizzes />

                    {/* Course Sections */}
                    {Object.keys(filters)
                        .filter((course) => filters[course] === true)
                        .map((course, idx) => (
                            <div key={idx} className="mt-10">
                                {/* Section Header */}
                                {quizzes.filter(
                                    (quiz) =>
                                        quiz.course === course &&
                                        quiz.visibility === "Public"
                                ).length > 0 && (
                                    <div className="flex items-center mb-4">
                                        <h2 className="text-3xl font-extrabold text-[#02A850] me-2">
                                            {course}
                                        </h2>
                                        <button className="text-[#02A850] no-underline hover:underline">
                                            View More
                                        </button>
                                    </div>
                                )}

                                {/* Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {quizzes
                                        .filter(
                                            (quiz) =>
                                                quiz.course === course &&
                                                quiz.visibility === "Public"
                                        )
                                        .sort(
                                            (a, b) =>
                                                b.totalQuizTakers -
                                                a.totalQuizTakers
                                        )
                                        .slice(0, 4)
                                        .map((quiz) => (
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
                                                <div className="p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-xl font-semibold text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap w-full">
                                                            {quiz.title ||
                                                                "Untitled Quiz"}
                                                        </h3>
                                                        <div className="flex flex-col text-end w-full">
                                                            <p className="text-gray-600 text-xs">
                                                                {quiz.numItems ||
                                                                    0}{" "}
                                                                Qs
                                                            </p>
                                                            <p className="text-gray-600 text-xs">
                                                                {quiz.totalQuizTakers ||
                                                                    0}{" "}
                                                                {quiz.totalQuizTakers ===
                                                                1
                                                                    ? "Play"
                                                                    : "Plays"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex mb-1 items-center">
                                                        <InformationCircleIcon className="w-5 me-1" />
                                                        <p className="text-gray-600 text-sm mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                                            {quiz.description ||
                                                                "No description"}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <div className="flex">
                                                            <UserCircleIcon className="w-4 me-1" />
                                                            <p className="text-gray-600 text-sm mt-1">
                                                                {quiz.creatorName ||
                                                                    "Anonymous"}
                                                            </p>
                                                        </div>
                                                        <div className="flex">
                                                            <CalendarIcon className="w-4 me-1" />
                                                            <p className="text-gray-600 text-sm mt-1">
                                                                {new Date(
                                                                    quiz.dateCreated
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "short",
                                                                        day: "numeric",
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                </div>
                            </div>
                        ))}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Dashboard;
