import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import logo from "/C.png";
import Logo from "/Logo.png";

const Dropdown = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)} // Open dropdown on hover
            onMouseLeave={() => setIsOpen(false)} // Close dropdown when not hovering
        >
            <button className="text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                {title}
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md z-10">
                    <ul>
                        <li className="p-2 hover:bg-gray-100">Option 1</li>
                        <li className="p-2 hover:bg-gray-100">Option 2</li>
                        <li className="p-2 hover:bg-gray-100">Option 3</li>
                        <li className="p-2 hover:bg-gray-100">Option 4</li>
                        <li className="p-2 hover:bg-gray-100">Option 5</li>
                        <li className="p-2 hover:bg-gray-100">Option 6</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

const TopBar = () => {
    return (
        <div className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="h-14 me-3" alt="Quizmis Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        <span className="text-green-500">
                            <span className="text-red-500">Q</span>
                            uizmis
                        </span>
                    </span>
                </Link>
            </div>

            <div className="flex space-x-4">
                {Array.from({ length: 6 }, (_, i) => (
                    <Dropdown key={i} title={`Dropdown ${i + 1}`} />
                ))}
            </div>

            <div className="flex space-x-4">
                <Link
                    to="/join"
                    className="bg-white text-[#20935C] border-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 hover:border-transparent transition duration-300"
                >
                    Enter Quiz
                </Link>
                <Link
                    to="/login"
                    className="bg-green-100 text-[#20935C] border-2 border-transparent px-4 py-2 rounded-md shadow-md hover:bg-green-200 transition duration-300"
                >
                    Log In
                </Link>
                <Link
                    to="/signup"
                    className="bg-green-500 text-white border-2 border-transparent px-4 py-2 rounded-md shadow-md hover:bg-green-400 transition duration-300"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

const Carousel = () => {
    return (
        <div className="px-10 py-8 mx-48 bg-gray-500 bg-opacity-20 rounded-lg">
            <div
                id="default-carousel"
                className="relative w-full"
                data-carousel="slide"
            >
                <div className="relative h-56 overflow-hidden rounded-lg">
                    <div
                        className="hidden ease-in-out"
                        data-carousel-item
                        style={{ transitionDuration: "2s" }}
                    >
                        <Link to="/">
                            <img
                                src={logo}
                                className="absolute block max-w-full max-h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt="..."
                            />
                        </Link>
                    </div>
                    <div
                        className="hidden ease-in-out"
                        data-carousel-item
                        style={{ transitionDuration: "2s" }}
                    >
                        <Link to="/">
                            <img
                                src={logo}
                                className="absolute block max-w-full max-h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt="..."
                            />
                        </Link>
                    </div>
                    <div
                        className="hidden ease-in-out"
                        data-carousel-item
                        style={{ transitionDuration: "2s" }}
                    >
                        <Link to="/">
                            <img
                                src={logo}
                                className="absolute block max-w-full max-h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt="..."
                            />
                        </Link>
                    </div>
                    <div
                        className="hidden ease-in-out"
                        data-carousel-item
                        style={{ transitionDuration: "2s" }}
                    >
                        <Link to="/">
                            <img
                                src={logo}
                                className="absolute block max-w-full max-h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt="..."
                            />
                        </Link>
                    </div>
                    <div
                        className="hidden ease-in-out"
                        data-carousel-item
                        style={{ transitionDuration: "2s" }}
                    >
                        <Link to="/">
                            <img
                                src={logo}
                                className="absolute block max-w-full max-h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt="..."
                            />
                        </Link>
                    </div>
                </div>
                {/* <div className="absolute z-30 mt-6 flex -translate-x-1/2  left-1/2 space-x-3 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="true"
                        aria-label="Slide 1"
                        data-carousel-slide-to="0"
                    ></button>
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 2"
                        data-carousel-slide-to="1"
                    ></button>
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 3"
                        data-carousel-slide-to="2"
                    ></button>
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 4"
                        data-carousel-slide-to="3"
                    ></button>
                    <button
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 5"
                        data-carousel-slide-to="4"
                    ></button>
                </div> */}
                {/* <button
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button> */}
            </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <div className="text-center">
            <TopBar />
            <div className="flex flex-col items-center justify-start text-center my-40">
                <h1 className="text-4xl font-bold mb-24">
                    Empowering Carolinians,
                    <br />
                    one quiz at a time,
                    <br />
                    connecting learners
                    <br />
                    through shared
                    <br />
                    knowledge.
                </h1>
                <Link
                    to="/join"
                    className="bg-green-600 text-white px-28 py-6 rounded-full hover:bg-green-700 transition duration-300"
                >
                    <p className="font-bold text-xl">Enter Quiz</p>
                </Link>
            </div>
            <div className="mb-16">
                <h1 className="text-3xl text-left font-bold mb-4 ms-48">
                    Top Quizzes This Week! &#128293;
                </h1>
                <Carousel />
            </div>
            <div className="mb-24">
                <h1 className="text-3xl text-left font-bold mb-4 ms-48">
                    Featured
                </h1>
                <Carousel />
            </div>
            <p className="mb-4 text-2xl">What is Quizmis?</p>
            <h1 className="text-4xl font-bold mb-24">
                Quizmis is a dedicated quiz platform
                <br />
                for University of San Carlos students
                <br />
                and faculty, offering personalized
                <br />
                quizzes, user profiles, and interactive
                <br />
                engagement.
            </h1>
            <Footer />
        </div>
    );
};

export default HomePage;
