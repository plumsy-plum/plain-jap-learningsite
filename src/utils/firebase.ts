import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBG0IVyAaLYfIWsy0dgKPFlcCDU2rHmx0Q",
  authDomain: "japanese-research-app.firebaseapp.com",
  projectId: "japanese-research-app",
  storageBucket: "japanese-research-app.firebasestorage.app",
  messagingSenderId: "597661569378",
  appId: "1:597661569378:web:9e62ca7e91f45640655c3b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ proper login function
export const loginAnonymously = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Auth error:", error);
  }
};