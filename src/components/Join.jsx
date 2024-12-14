import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logo from "/Brand.png";

const Join = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
                <Link to={user ? "/dashboard" : "/"} className="mb-4">
                    <img src={Logo} className="h-40 w-auto" alt="Quizmis Logo" />
                </Link>
            </div>

            <div className="flex flex-col items-center mb-36 mt-4 shadow-lg px-14 py-8 rounded-lg bg-opacity-50 bg-green-300">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Enter quiz code"
                        className="w-full p-4 pr-20 border rounded-lg text-lg focus:outline-none"
                    />
                    <button className="absolute top-0 right-0 bg-green-500 text-white h-full px-4 rounded-r-lg hover:bg-green-400 transition duration-300">
                        JOIN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Join;
