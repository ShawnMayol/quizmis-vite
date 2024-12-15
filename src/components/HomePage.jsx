import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import HomePagetopbar from "./HomepageTopbar.jsx"; // Updated top bar component
import logo from "/Logo.png";

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
                <div className="absolute z-30 mt-6 flex -translate-x-1/2  left-1/2 space-x-3 rtl:space-x-reverse">
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
                </div>
                <button
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
                </button>
            </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <div className="text-center">
            {/* HomePage_topbar at the very top */}
            <HomePagetopbar />

            {/* Main Page Content */}
            <div className="flex flex-col items-center justify-start text-center my-40">
                <h1 className="text-4xl font-bold mb-24">
                    Empowering Carolinians,
                    <br />
                    one quiz at a time,
                    <br />
                    connecting learners
                    <br />
                    through shared knowledge.
                </h1>
                <Link
                    to="/join"
                    className="bg-green-600 text-white px-28 py-6 rounded-full hover:bg-green-700 transition duration-300"
                >
                    <p className="font-bold text-xl">Enter Quiz</p>
                </Link>
            </div>

            {/* Section: Top Quizzes */}
            <div className="mb-16">
                <h1 className="text-3xl text-left font-bold mb-4 ms-48">
                    Top Quizzes This Week! &#128293;
                </h1>
                <Carousel />
            </div>a

            {/* Section: Featured */}
            <div className="mb-24">
                <h1 className="text-3xl text-left font-bold mb-4 ms-48">Featured</h1>
                <Carousel />
            </div>

            {/* Quizmis Description */}
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

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
