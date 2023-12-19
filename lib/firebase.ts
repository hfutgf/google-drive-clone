import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "drive-clone-ea6d7.firebaseapp.com",
  projectId: "drive-clone-ea6d7",
  storageBucket: "drive-clone-ea6d7.appspot.com",
  messagingSenderId: "17995345788",
  appId: "1:17995345788:web:a8dd3f893e6f7acf0b3ef9",
  measurementId: "G-7NE3ZC6ZKK",
};

!getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();
export { db, storage };
