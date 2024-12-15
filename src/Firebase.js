// Import Firebase libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyJCutcRsFzEZNvj39NLl6n0dmhFMES3QQ",
  authDomain: "quizmis.firebaseapp.com",
  projectId: "quizmis",
  storageBucket: "quizmis.appspot.com",
  messagingSenderId: "1028810121241",
  appId: "1:1028810121241:web:fedcf7314d95989c900574",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
