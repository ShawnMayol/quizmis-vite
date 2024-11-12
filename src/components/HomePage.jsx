import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Scroller = () => {
    return (
        <div className="px-4 mx-24">
            <h2 className="text-2xl text-left font-bold mb-4 ms-3">
                Title Here
            </h2>

            <div className="overflow-x-auto whitespace-nowrap flex space-x-4 px-2">
                <div className="w-1/2 min-w-[calc(50%-0.5rem)] bg-gray-300 h-48 rounded-lg flex items-center justify-center">
                    Placeholder 1
                </div>
                <div className="w-1/2 min-w-[calc(50%-0.5rem)] bg-gray-300 h-48 rounded-lg flex items-center justify-center">
                    Placeholder 2
                </div>
                <div className="w-1/2 min-w-[calc(50%-0.5rem)] bg-gray-300 h-48 rounded-lg flex items-center justify-center">
                    Placeholder 3
                </div>
                <div className="w-1/2 min-w-[calc(50%-0.5rem)] bg-gray-300 h-48 rounded-lg flex items-center justify-center">
                    Placeholder 4
                </div>
                {/* Add more placeholders as needed */}
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-14">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src={Logo}
                                className="h-14 me-3"
                                alt="Quizmis Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                                <span className="text-green-500">
                                    <span className="text-red-500">Q</span>
                                    uizmis
                                </span>
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-8 text-sm font-semibold uppercase text-white">
                                Title
                            </h2>
                            <ul className=" text-gray-400 font-medium">
                                <li className="mb-6">
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                                <li className="mb-6">
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                                <li className="mb-6">
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-8 text-sm font-semibold uppercase text-white">
                                Title
                            </h2>
                            <ul className=" text-gray-400 font-medium">
                                <li className="mb-6">
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                                <li className="mb-6">
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                                <li className="mb-6">
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-8 text-sm font-semibold uppercase text-white">
                                Title
                            </h2>
                            <ul className=" text-gray-400 font-medium">
                                <li className="mb-6">
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                                <li className="mb-6">
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                                <li className="mb-6">
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:underline">
                                        Text Text Text
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between cursor-default">
                    <span className="text-sm sm:text-center text-gray-400">
                        © 2024{" "}
                        <span className="hover:underline">Quizmis Inc</span>.
                        All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        {/* Facebook */}
                        <Link to="/" className="text-gray-500 hover:text-white">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 8 19"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </Link>
                        {/* Discord */}
                        <Link
                            to="/"
                            className="text-gray-500 hover:text-white ms-5"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 21 16"
                            >
                                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                            </svg>
                        </Link>
                        {/* X/Twitter */}
                        <Link
                            to="/"
                            className="text-gray-500 hover:text-white ms-5"
                        >
                            <svg
                                className="w-3.5 h-4"
                                aria-hidden="true"
                                viewBox="0 0 1200 1227"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </Link>

                        {/* Github */}
                        <Link
                            to="/"
                            className="text-gray-500 hover:text-white ms-5"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const HomePage = () => {
    return (
        <div className="bg-white text-center">
        {/* <div className="bg-green-200 text-center"> */}
            <TopBar />
            <div className="flex flex-col items-center justify-start text-center mt-28 mb-24">
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
                <Scroller />
            </div>
            <div className="mb-24">
                <Scroller />
            </div>
            <p className="mb-4 text-xl">What is Quizmis?</p>
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
