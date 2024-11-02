import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Homepage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Join from "./components/Join";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/join" element={<Join />} />
        </Routes>
    );
}

export default App;
