import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJSAe6E9GHXcYkSC-1_l1blQM97sxGRbc",
  authDomain: "memestagram-app.firebaseapp.com",
  projectId: "memestagram-app",
  storageBucket: "memestagram-app.appspot.com",
  messagingSenderId: "29510997039",
  appId: "1:29510997039:web:48ac3b56b7e5082efe22da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)