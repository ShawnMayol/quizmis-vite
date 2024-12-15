import React from "react";
import HomePagetopbar from "./HomepageTopbar.jsx";
import Footer from "./Footer.jsx";

const AboutUs = () => {
  const mascotImg = "/Mascot_image.PNG"; // Public folder image path

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-cyan-50 via-cyan-100 to-green-200">
      {/* Topbar Component */}
      <HomePagetopbar />

      {/* Main Content */}
      <div className="flex-1 p-10 text-center">
        <h1 className="text-5xl font-bold mb-8 text-gray-800">About Us</h1>
        <p className="text-lg text-gray-600 mb-10">
          Welcome to Quizmis! We are dedicated to empowering Carolinians through
          interactive learning and personalized quizzes.
        </p>

        {/* Image Section */}
        <div className="flex justify-center mb-10">
        <img
          src="/assets/Mascot_image.PNG" 
          alt="Quizmis Mascot"
          className="rounded-lg shadow-lg mx-auto w-64 h-64 border-2 border-green-400"
        />
        </div>

        {/* Vision & Mission Section */}
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-6">
            To create a dynamic quiz platform that enhances learning for
            Carolinians and connects students and faculty through shared
            knowledge.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            We strive to provide an accessible, personalized, and interactive
            quiz experience for University of San Carlos students and faculty,
            ensuring an engaging learning environment.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                Striving for the highest standards in everything we do.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Integrity
              </h3>
              <p className="text-gray-600">
                Honesty and transparency are at the heart of our platform.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                Continuously improving to provide better solutions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Collaboration
              </h3>
              <p className="text-gray-600">
                Fostering teamwork between students and faculty.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default AboutUs;
