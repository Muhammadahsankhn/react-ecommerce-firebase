import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBk3umlC38sNSFuWIZtM7em_EKxk08ThQw",
    authDomain: "react-e59d1.firebaseapp.com",
    projectId: "react-e59d1",
    storageBucket: "react-e59d1.firebasestorage.app",
    messagingSenderId: "457632008744",
    appId: "1:457632008744:web:cfce742a2ce9e47cb5431d",
    measurementId: "G-09TJWGDK1M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };
