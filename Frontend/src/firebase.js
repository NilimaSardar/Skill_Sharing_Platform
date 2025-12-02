// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbuDunpXAEFDGfwObnljnBBoR0ipUDAxg",
  authDomain: "proxchange-3b97b.firebaseapp.com",
  projectId: "proxchange-3b97b",
  storageBucket: "proxchange-3b97b.firebasestorage.app",
  messagingSenderId: "87282410638",
  appId: "1:87282410638:web:a8dfe0a72aa0540a9115df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);