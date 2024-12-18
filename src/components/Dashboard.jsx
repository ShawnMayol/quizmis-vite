import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TopBar from "./TopBar.jsx";
import useAuthCheck from "../hooks/useAuthCheck.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import Footer from "./Footer.jsx";
import { AdjustmentsHorizontalIcon as FilterOutline } from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon as FilterSolid } from "@heroicons/react/24/solid";

const Dashboard = () => {
    const db = getFirestore();
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const user = useAuthCheck("/login");
    const [userInfo, setUserInfo] = useState(null);
    const auth = getAuth();
    if (!user) {
        return <LoadingScreen />;
    }

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

    const toggleFilter = (course) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [course]: !prevFilters[course],
        }));
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
        setShowFilters(!showFilters);
    };

    return (
        <div>
            <TopBar />
            <div className="p-10 pt-24 min-h-screen bg-gradient-to-b from-[#FFFFF0] via-[#F7F7E8] to-[#EFEFD0]">
                <div className="flex justify-between items-center mb-8 mt-2">
                    <h1 className="text-4xl font-extrabold text-[#02A850]">
                        Hello, {userInfo?.firstName || ""}
                    </h1>
                    <button
                        onClick={toggleFilterVisibility}
                        className="w-8 h-8 cursor-pointer text-[#02A850] hover:text-[#6cbb91] transition duration-200"
                    >
                        {/* {isFilterVisible ? (
                            <FilterSolid className="w-full h-full" />
                        ) : (
                            <FilterOutline className="w-full h-full" />
                        )} */}
                    </button>
                </div>

                <hr className="border-[#62d899]" />

                {/* Filter options container */}
                {/* <div
                    className={`transform transition-all duration-300 origin-top ${
                        showFilters ? "scale-y-100 mt-7" : "scale-y-0"
                    }`}
                    style={{ maxHeight: showFilters ? "500px" : "0px" }}
                >
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(filters).map(([course, isChecked]) => (
                            <label
                                key={course}
                                className="flex items-center bg-[#FAF9F6] p-2 rounded shadow hover:cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleFilter(course)}
                                    className="mr-2 form-checkbox rounded-full text-green-500 focus:outline-none focus:ring-0"
                                />

                                <span className="text-md text-gray-700">
                                    {course}
                                </span>
                            </label>
                        ))}
                    </div>
                </div> */}

                {/* Course Sections */}
                {/* Top 4 Quizzes are displayed (based on totalTakers) */}
                {/* {courseData.map((course, idx) => (
                    <div key={idx} className="mb-8 mt-8">
                        <div className="flex items-center mb-4">
                            <h2 className="text-3xl font-extrabold text-[#02A850] me-2">
                                {course.name}
                            </h2>
                            <button className="text-[#02A850] no-underline hover:underline">
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
                ))} */}
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
