// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import NavBar from "./components/NavBar";
import RightSidebar from "./components/RightSidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import AdminPanel from "./pages/AdminPanel";
import LiveSession from "./pages/LiveSession";
import UserProfile from "./pages/UserProfile";
import ChatPage from "./pages/ChatPage";
import CodeEditor from "./pages/CodeEditor";
import FloatingChatbot from "./components/FloatingChatbot";
import Footer from "./components/Footer";
import "./style.css";

const AuthWrapper = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && window.location.pathname === '/') {
        navigate('/dashboard');
      } else if (!currentUser && window.location.pathname !== '/' && window.location.pathname !== '/chatbot') {
        navigate('/');
      }
    });
  }, [navigate]);

  // Fetch profile for right sidebar
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          setProfile({ tokens: 0, nfts: [], displayName: user.displayName });
        }
      };
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  // Show sidebar on these routes
  const showRightSidebar = ['/dashboard', '/booking', '/profile', '/code-editor'].includes(location.pathname);

  // Login page doesn't use the 3-column layout
  if (!user) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="app-layout">
      <NavBar setUser={setUser} />
      <div className="main-content">
        <div className="main-content-wrapper">
          <Routes>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/session/:sessionId" element={<LiveSession />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/chat/:sessionId" element={<ChatPage />} />
            <Route path="/code-editor" element={<CodeEditor />} />
          </Routes>
        </div>
      </div>
      {showRightSidebar && profile && <RightSidebar profile={profile} />}
      {user && <FloatingChatbot />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthWrapper />
    </Router>
  );
}












