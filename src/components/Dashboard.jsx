import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import TopBar from "./TopBar.jsx";
import useAuthCheck from "../hooks/useAuthCheck.jsx";
import LoadingScreen from "./LoadingScreen.jsx";


// Image URLs provided
const imageURLs = [
    "https://goldpenguin.org/wp-content/uploads/2024/03/sunset.png",
    "https://img.freepik.com/free-photo/pixel-art-river-landscape-illustration_23-2151793157.jpg",
    "https://i.pinimg.com/474x/04/14/87/0414874d9c531d082636ffcb37b217da.jpg",
    "https://i.pinimg.com/736x/3c/89/e4/3c89e4af1e9d5fdba724648354a7f2d2.jpg",
    "https://pbs.twimg.com/media/FX09OEOUYAAy-uQ.png",
    "https://64.media.tumblr.com/4d9f911a9310776d716e492e8fd03cad/tumblr_p1oxc3f1jS1tlgv32o1_540.png",
    "https://64.media.tumblr.com/e9740a1c752a6d7af27e3f04d7c2f97d/tumblr_p4433mMcfS1tlgv32o1_r1_540.png",
    "https://i.pinimg.com/1200x/6e/13/c4/6e13c4f292191b12aa31eb1d4df24128.jpg",
];

const Dashboard = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const db = getFirestore();

    // Fetch Firestore Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const announcementsSnapshot = await getDocs(collection(db, "announcements"));
                setAnnouncements(announcementsSnapshot.docs.map((doc) => doc.data()));

                const activitySnapshot = await getDocs(collection(db, "recent_activity"));
                setRecentActivity(activitySnapshot.docs.map((doc) => doc.data()));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    const user = useAuthCheck('/login');

    if (!user) {
        return <LoadingScreen />
    }

    return (
        <div>
            <TopBar />
            <div
                className="p-8 pt-24 min-h-screen"
                style={{
                    background: "linear-gradient(to bottom, #e6f5e6, #c7e9c0, #90ee90)",
                }}
            >
                {/* Admin Updates */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
                        <h2 className="text-3xl font-extrabold text-green-700 mb-4">📢 Admin Updates</h2>
                        {announcements.length > 0 ? (
                            announcements.map((item, index) => (
                                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm mb-2">
                                    <p className="text-gray-700">{item.Hello || "No Message"}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No announcements yet.</p>
                        )}
                    </div>
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-3xl font-extrabold text-green-700 mb-4">📈 Activity Logs</h2>
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, index) => (
                                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {item["Beat Around"] || "Activity Title"}
                                    </h3>
                                    <p className="text-gray-600">{item.description || "No details provided."}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No recent activity available.</p>
                        )}
                    </div>
                </div>

                {/* Section Template */}
                {["Templates", "Mathematics", "English and Language Arts"].map((section, idx) => (
                    <div key={idx} className="mb-8">
                        <h2 className="text-3xl font-extrabold text-green-700 mb-4">
                            {section === "Templates" ? "🎨 Templates" : section === "Mathematics" ? "🧮 Mathematics" : "📚 English and Language Arts"}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <a
                                    key={i}
                                    href="/quizzes"
                                    className="block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                                >
                                    <img
                                        src={imageURLs[(idx * 4 + i) % imageURLs.length]}
                                        alt={`${section} ${i + 1}`}
                                        className="rounded-lg mb-4 w-full h-40 object-cover"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800">{`${section} ${i + 1}`}</h3>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
