// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import NavBar from "./components/NavBar";
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
  const navigate = useNavigate();

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

  return (
    <>
      {user && <NavBar setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/session/:sessionId" element={<LiveSession />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/chat/:sessionId" element={<ChatPage />} />
        <Route path="/code-editor" element={<CodeEditor />} />
      </Routes>
      <Footer />
      {user && <FloatingChatbot />}
    </>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-white flex flex-col">
        <AuthWrapper />
      </div>
    </Router>
  );
}












