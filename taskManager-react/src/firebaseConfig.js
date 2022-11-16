import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2LZ4Dm6UXrVYIoG_ODMv36L90LwZ_wNs",
  authDomain: "taskmanagers-e7d31.firebaseapp.com",
  projectId: "taskmanagers-e7d31",
  storageBucket: "taskmanagers-e7d31.appspot.com",
  messagingSenderId: "454439418534",
  appId: "1:454439418534:web:d2d1ff3fdb5878c7f4d267"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
