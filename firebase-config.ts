import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKey = process.env.FIREBASE_API_KEY!
const appId = process.env.FIREBASE_API_ID!

const firebaseConfig = {
  apiKey,
  authDomain: "instagram---facebook---twitter.firebaseapp.com",
  projectId: "instagram---facebook---twitter",
  storageBucket: "instagram---facebook---twitter.appspot.com",
  messagingSenderId: "544640961165",
  appId,
};

const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app)
export const storage = getStorage(app)
export const IGPostsCollectionRef =  collection(db, 'Instagram-Posts')
