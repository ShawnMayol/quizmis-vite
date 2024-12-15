import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import HomePagetopbar from "./HomepageTopbar.jsx";
import Carousel from "./Carousel.jsx";
import useAuthCheck from "../hooks/useAuthCheck.jsx";

const HomePage = () => {
    const gradients = [
        "from-red-100 via-purple-200 to-cyan-200",
        "from-orange-100 via-yellow-200 to-green-200",
        "from-yellow-100 via-green-300 to-blue-200",
        "from-blue-100 via-indigo-200 to-purple-200",
        "from-pink-100 via-rose-200 to-red-200",
        "from-lime-100 via-teal-200 to-blue-200",
        "from-emerald-100 via-sky-200 to-indigo-200",
    ];

    const [gradientClass, setGradientClass] = useState(gradients[0]);
    const navigate = useNavigate();
    const user = useAuthCheck("/login");

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }

        let index = 0;
        const gradientInterval = setInterval(() => {
            index = (index + 1) % gradients.length;
            setGradientClass(gradients[index]);
        }, 4000); // Change gradient every 4 seconds

        return () => clearInterval(gradientInterval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Topbar Component */}
            <HomePagetopbar />

            {/* Hero Section */}
            <section
                className={`relative h-screen flex justify-center items-center bg-gradient-to-br ${gradientClass} transition-all duration-1000`}
            >
                <div className="absolute text-center p-10 bg-white shadow-2xl rounded-2xl max-w-4xl mx-4 transform hover:scale-105 transition-transform duration-300">
                    <h1 className="text-6xl font-extrabold text-gray-800 mb-6 leading-snug">
                        Empowering{" "}
                        <span className="text-green-500">Carolini​ans</span>,
                        <br /> one <span className="text-red-500">quiz</span> at
                        a time
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Connecting learners through shared knowledge and
                        interactive experiences.
                    </p>
                    <Link
                        to="/join"
                        className="inline-block bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-green-600 shadow-lg transition duration-300"
                    >
                        Enter Quiz
                    </Link>
                </div>
            </section>

            {/* Top Quizzes Section */}
            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8 flex items-center justify-center">
                        🏆 Top Quizzes This Week
                    </h2>
                    <div className="flex justify-center">
                        <div className="bg-white shadow-md rounded-lg p-4 w-3/4">
                            <Carousel />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Quizzes Section */}
            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8 flex items-center justify-center">
                        ⭐ Featured Quizzes
                    </h2>
                    <div className="flex justify-center">
                        <div className="bg-white shadow-md rounded-lg p-4 w-3/4">
                            <Carousel />
                        </div>
                    </div>
                </div>
            </section>

            {/* What is Quizmis Section */}
            <section
                className={`relative h-screen flex flex-col justify-center items-center space-y-8 bg-gradient-to-br ${gradientClass} transition-all duration-1000`}
            >
                {/* Card 1 */}
                <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Discover{" "}
                        <span className="text-purple-500">Quizmis</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-700">
                            Quizmis
                        </span>{" "}
                        is the trusted quiz platform for University of San
                        Carlos students and faculty. It provides{" "}
                        <span className="text-blue-500 font-medium">
                            personalized quizzes
                        </span>
                        ,{" "}
                        <span className="text-green-500 font-medium">
                            interactive engagement
                        </span>
                        , and{" "}
                        <span className="text-yellow-500 font-medium">
                            user profiles
                        </span>{" "}
                        to enhance your learning experience.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Elevate Your{" "}
                        <span className="text-green-500">Study Game</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Master your subjects with{" "}
                        <span className="text-blue-500 font-medium">
                            interactive quizzes
                        </span>{" "}
                        and{" "}
                        <span className="text-red-500 font-medium">
                            real-time analytics
                        </span>
                        . Understand your strengths, pinpoint areas for
                        improvement, and boost academic success.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Collaborate with{" "}
                        <span className="text-blue-500">Peers</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Join group quizzes and{" "}
                        <span className="text-green-500 font-medium">
                            study sessions
                        </span>{" "}
                        with fellow students. Leverage shared knowledge and
                        enjoy the collaborative learning experience Quizmis
                        offers.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Track Your{" "}
                        <span className="text-yellow-500">Progress</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Keep a close eye on your achievements with intuitive{" "}
                        <span className="text-purple-500 font-medium">
                            progress charts
                        </span>{" "}
                        and{" "}
                        <span className="text-blue-500 font-medium">
                            milestones
                        </span>{" "}
                        designed to motivate and reward your hard work.
                    </p>
                </div>
            </section>

            {/* Why Choose Quizmis Section */}
            <section className="py-16">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Why Choose Quizmis?
                </h2>
                <div className="bg-white shadow-lg rounded-lg p-6 mx-auto w-3/4 overflow-auto h-60">
                    <ul className="list-none space-y-4 text-gray-700 text-lg">
                        <li className="flex items-start">
                            <span className="inline-block text-green-500 text-2xl mr-2">
                                ✔
                            </span>
                            <span>Customizable quiz creation tools.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block text-blue-500 text-2xl mr-2">
                                ✔
                            </span>
                            <span>Real-time performance analytics.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block text-yellow-500 text-2xl mr-2">
                                ✔
                            </span>
                            <span>
                                User-friendly interfaces for students and
                                faculty.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block text-purple-500 text-2xl mr-2">
                                ✔
                            </span>
                            <span>
                                Secure and efficient platform management.
                            </span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
