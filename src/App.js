// src/App.js - Premium SkillTrust Application
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import RightSidebar from "./components/RightSidebar";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import AdminPanel from "./pages/AdminPanel";
import LiveSession from "./pages/LiveSession";
import UserProfile from "./pages/UserProfile";
import ChatPage from "./pages/ChatPage";
import CodeEditor from "./pages/CodeEditor";
import LiveChat from "./pages/LiveChat";
import FloatingChatbot from "./components/FloatingChatbot";
import Footer from "./components/Footer";
import "./style.css";
import "./styles/theme.css";

// FAB Component with radial menu
const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: '📅', label: 'Book Session', action: () => navigate('/booking') },
    { icon: '💰', label: 'Mint Tokens', action: () => alert('Opening Mint Tokens...') },
    { icon: '💬', label: 'Live Chat', action: () => navigate('/live-chat') },
  ];

  return (
    <>
      {/* FAB Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <div className="fab-menu open">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="fab-menu-item"
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0, 
                  y: 20,
                  transition: { delay: (menuItems.length - index) * 0.05 }
                }}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                title={item.label}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.div 
        className="fab-premium"
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 45 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};

// Page transition wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

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
  const showRightSidebar = ['/dashboard', '/booking', '/profile', '/code-editor', '/live-chat'].includes(location.pathname);

  // Login page doesn't use the 3-column layout
  if (!user) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Login setUser={setUser} />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <div className="app-layout">
      {/* Floating Background Orbs */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>

      <NavBar setUser={setUser} />
      <div className="main-content">
        <div className="main-content-wrapper">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/dashboard" element={
                <PageTransition>
                  <Dashboard user={user} />
                </PageTransition>
              } />
              <Route path="/booking" element={
                <PageTransition>
                  <BookingPage />
                </PageTransition>
              } />
              <Route path="/admin" element={
                <PageTransition>
                  <AdminPanel />
                </PageTransition>
              } />
              <Route path="/session/:sessionId" element={
                <PageTransition>
                  <LiveSession />
                </PageTransition>
              } />
              <Route path="/profile" element={
                <PageTransition>
                  <UserProfile />
                </PageTransition>
              } />
              <Route path="/chat/:sessionId" element={
                <PageTransition>
                  <ChatPage />
                </PageTransition>
              } />
              <Route path="/code-editor" element={
                <PageTransition>
                  <CodeEditor />
                </PageTransition>
              } />
              <Route path="/live-chat" element={
                <PageTransition>
                  <LiveChat />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
      {showRightSidebar && profile && <RightSidebar profile={profile} />}
      {user && <FloatingChatbot />}
      
      {/* Floating Action Button - Repositioned to avoid chatbot collision */}
      <FloatingActionButton />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthWrapper />
      </Router>
    </ErrorBoundary>
  );
}
