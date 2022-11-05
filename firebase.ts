// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkAKrdzcMh-v1P6PrJOvQux973EtmgH2c",
  authDomain: "extreme-auto-71cd3.firebaseapp.com",
  projectId: "extreme-auto-71cd3",
  storageBucket: "extreme-auto-71cd3.appspot.com",
  messagingSenderId: "467097570928",
  appId: "1:467097570928:web:1e9e9c8d77e8fe1e0baeb5",
  measurementId: "G-CL2DB2BWHX",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export default app;
export { auth, db, storage };
