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

// Check if mocks are enabled via environment variable
const useMocks = process.env.REACT_APP_USE_MOCKS === 'true';

let app, auth, provider, db;

if (useMocks) {
  console.warn('⚠️ Firebase is DISABLED - Using mock data for local development');
  // Export null/mock objects when mocks are enabled
  app = null;
  auth = null;
  provider = null;
  db = null;
} else {
  // Initialize Firebase normally for production
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  db = getFirestore(app);
}

export { auth, provider, db };
export default app;
