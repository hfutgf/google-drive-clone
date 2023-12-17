import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "drive-clone-ea6d7.firebaseapp.com",
  projectId: "drive-clone-ea6d7",
  storageBucket: "drive-clone-ea6d7.appspot.com",
  messagingSenderId: "17995345788",
  appId: "1:17995345788:web:a8dd3f893e6f7acf0b3ef9",
  measurementId: "G-7NE3ZC6ZKK",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
getAnalytics(app);

const db = getFirestore();
export { db };
