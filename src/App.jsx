import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Homepage from "./components/HomePage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Join from "./components/Join.jsx";
import Profile from "./components/Profile.jsx";
import ForgotPassword from "./components/Forgot.jsx";

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
        </Routes>
    );
}

export default App;
