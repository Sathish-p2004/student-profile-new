// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLdptdYH1to3_cI_B6l5N8m_NE6JJCLhc",
  authDomain: "student-profile-d26ab.firebaseapp.com",
  projectId: "student-profile-d26ab",
  storageBucket: "student-profile-d26ab.firebasestorage.app",
  messagingSenderId: "318982117826",
  appId: "1:318982117826:web:c60c120b787fe802efde5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
