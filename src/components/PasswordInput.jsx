import React, { useState } from "react";
import Show from "/assets/eye.svg";
import Hide from "/assets/eye-slash.svg";

const PasswordInput = ({ password, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full mb-4">
            {/* Password Input */}
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Show/Hide Toggle */}
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center"
            >
                <img
                    src={showPassword ? Hide : Show}
                    alt={showPassword ? "Hide Password" : "Show Password"}
                    className="h-6 w-6"
                />
            </button>
        </div>
    );
};

export default PasswordInput;
