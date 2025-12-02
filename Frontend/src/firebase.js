// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8AQA7_fDkyoVtKQo9xWEDLxqF14pIjno",
  authDomain: "proxchange-a876e.firebaseapp.com",
  projectId: "proxchange-a876e",
  storageBucket: "proxchange-a876e.firebasestorage.app",
  messagingSenderId: "138891190348",
  appId: "1:138891190348:web:c95ae8a54e0e91566414e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);