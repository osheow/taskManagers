import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs4e6y2jZonC1AcFFLG931zgVRqqgb8OE",
  authDomain: "basic-blog-173f5.firebaseapp.com",
  projectId: "basic-blog-173f5",
  storageBucket: "basic-blog-173f5.appspot.com",
  messagingSenderId: "310512611673",
  appId: "1:310512611673:web:be338b5fc633a0d0e65c48",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
