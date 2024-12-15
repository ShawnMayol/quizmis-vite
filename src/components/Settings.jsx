// import React, { useState } from "react";
// import { getAuth, updatePassword, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
// import logo from "/Logo.png";

// const SettingsPage = () => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     const [username, setUsername] = useState(user?.displayName || "");
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     const handleUpdateProfile = async () => {
//         try {
//             if (!oldPassword) {
//                 setError("Please enter your old password.");
//                 return;
//             }
    
//             // Reauthenticate User
//             const credential = EmailAuthProvider.credential(user.email, oldPassword);
//             await reauthenticateWithCredential(user, credential);
    
//             // Update Display Name
//             if (username && username !== user.displayName) {
//                 await updateProfile(user, { displayName: username });
//             }
    
//             // Update Password
//             if (newPassword) {
//                 await updatePassword(user, newPassword);
//             }
    
//             setSuccess("Profile updated successfully!");
//             setError("");
//         } catch (err) {
//             setError(err.message || "Failed to update profile.");
//             setSuccess("");
//         }
//     };
    

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//             <img src={logo} alt="Logo" className="h-24 mb-4" />
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
//                 {error && <p className="text-red-500 mb-4">{error}</p>}
//                 {success && <p className="text-green-500 mb-4">{success}</p>}

//                 <label className="block mb-2 font-semibold">Username</label>
//                 <input
//                     type="text"
//                     className="w-full p-2 mb-4 border rounded"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />

//                 <label className="block mb-2 font-semibold">Old Password</label>
//                 <input
//                     type="password"
//                     className="w-full p-2 mb-4 border rounded"
//                     value={oldPassword}
//                     onChange={(e) => setOldPassword(e.target.value)}
//                     placeholder="Enter old password"
//                 />

//                 <label className="block mb-2 font-semibold">New Password</label>
//                 <input
//                     type="password"
//                     className="w-full p-2 mb-4 border rounded"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     placeholder="Enter new password"
//                 />

//                 <button
//                     className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
//                     onClick={handleUpdateProfile}
//                 >
//                     Update Profile
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SettingsPage;
