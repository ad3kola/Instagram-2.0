import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKey = process.env.FIREBASE_API_KEY!
const appId = process.env.FIREBASE_API_ID!

const firebaseConfig = {
  apiKey,
  authDomain: "facebook-clone-build-7586b.firebaseapp.com",
  projectId: "facebook-clone-build-7586b",
  storageBucket: "facebook-clone-build-7586b.appspot.com",
  messagingSenderId: "1025951340309",
  appId,
};

const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app)
export const storage = getStorage(app)
export const IGPostsCollectionRef =  collection(db, 'Instagram-Posts')
