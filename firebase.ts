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
  apiKey: "AIzaSyA_MUcg19NpMJI-OnxzPPuf-OfZImmeu0s",
  authDomain: "xtremeauto-5bb6a.firebaseapp.com",
  projectId: "xtremeauto-5bb6a",
  storageBucket: "xtremeauto-5bb6a.appspot.com",
  messagingSenderId: "108301810941",
  appId: "1:108301810941:web:575162ac82c574bbf39294",
  measurementId: "G-HFWZCJX2EV",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export default app;
export { auth, db, storage };
