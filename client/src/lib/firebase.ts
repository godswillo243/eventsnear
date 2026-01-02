// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "eventsnear-1768c.firebaseapp.com",
  projectId: "eventsnear-1768c",
  storageBucket: "eventsnear-1768c.firebasestorage.app",
  messagingSenderId: "87751877272",
  appId: "1:87751877272:web:1d9b949a1b49006fe7e6ed",
  measurementId: "G-98LFS9T8P8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
