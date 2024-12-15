import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Homepage from "./components/HomePage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Join from "./components/Join.jsx";
import Profile from "./components/Profile.jsx";
import ForgotPassword from "./components/Forgot.jsx";
import Create from "./components/Create.jsx";
import CreateItems from "./components/CreateItems.jsx";
import CreateQuestion from "./components/CreateQuestion.jsx";
import EditQuestion from "./components/EditQuestion.jsx";
import YourQuizzes from "./components/Quizzes.jsx";
import AboutUs from "./components/AboutUs.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
import ContactUs from "./components/ContactUs.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/join" element={<Join />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/create" element={<Create />} />
            <Route path="/quiz/:quizId" element={<CreateItems />} />
            <Route path="/quiz/:quizId/add" element={<CreateQuestion />} />
            <Route
                path="/quiz/:quizId/question/:questionIndex/edit"
                element={<EditQuestion />}
            />
            <Route path="/quizzes/:userID" element={<YourQuizzes />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/contact" element={<ContactUs />} />

        </Routes>
    );
}

export default App;
