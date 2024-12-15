import React from "react";
import TopBar from "./TopBar.jsx";
import useAuthCheck from "../hooks/useAuthCheck.jsx";
import LoadingScreen from "./LoadingScreen.jsx";

const DashboardBody = () => {
    const user = useAuthCheck('/login');

    if (!user) {
        return <LoadingScreen />
    }

    return (
        <div>
            <TopBar />
            <div className="flex justify-between py-8 px-4 min-h-screen pt-24">
                <div className="hidden lg:block lg:w-1/4 p-4">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Left Side Content</p>
                        <p className="text-xs text-gray-400">
                            Additional information or widgets can go here.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Another Widget</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-4">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <p className="text-gray-800 font-semibold">
                            News Feed Item 1
                        </p>
                        <p className="text-gray-600">
                            This is a placeholder for a news feed item.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <p className="text-gray-800 font-semibold">
                            News Feed Item 2
                        </p>
                        <p className="text-gray-600">
                            More content for the feed.
                        </p>
                    </div>
                </div>

                <div className="hidden lg:block lg:w-1/4 p-4">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Right Side Content</p>
                        <p className="text-xs text-gray-400">
                            Notifications or other widgets.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Another Widget</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBody;
