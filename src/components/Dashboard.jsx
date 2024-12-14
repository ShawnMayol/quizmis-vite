import React from "react";
import TopBar from "./TopBar.jsx";

const DashboardBody = () => {
    return (
        <div>
            <TopBar />
            <div className="flex justify-between py-8 px-4 min-h-screen pt-24">
            {/* <div className="flex justify-between py-8 px-4 bg-[#20935C] min-h-screen pt-24"> */}
                {/* Left Side Content */}
                <div className="hidden lg:block lg:w-1/4 p-4">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Left Side Content</p>
                        <p className="text-xs text-gray-400">
                            Additional information or widgets can go here.
                        </p>
                    </div>
                    {/* Additional Placeholder Boxes */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Another Widget</p>
                    </div>
                </div>

                {/* Main News Feed */}
                <div className="w-full lg:w-1/2 p-4">
                    {/* News Feed Post */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <p className="text-gray-800 font-semibold">
                            News Feed Item 1
                        </p>
                        <p className="text-gray-600">
                            This is a placeholder for a news feed item.
                        </p>
                    </div>
                    {/* Additional News Feed Items */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <p className="text-gray-800 font-semibold">
                            News Feed Item 2
                        </p>
                        <p className="text-gray-600">
                            More content for the feed.
                        </p>
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="hidden lg:block lg:w-1/4 p-4">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Right Side Content</p>
                        <p className="text-xs text-gray-400">
                            Notifications or other widgets.
                        </p>
                    </div>
                    {/* Additional Placeholder Boxes */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <p className="text-gray-600">Another Widget</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBody;
