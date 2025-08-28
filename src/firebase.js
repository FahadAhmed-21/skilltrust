// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuJv2HiEq_V487bwNZN2eKOo3n7zt-vbE",
  authDomain: "skilltrust-7ddab.firebaseapp.com",
  projectId: "skilltrust-7ddab",
  storageBucket: "skilltrust-7ddab.appspot.com",
  messagingSenderId: "578409234697",
  appId: "1:578409234697:web:cc97fc9ea822b23339d3d8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;







