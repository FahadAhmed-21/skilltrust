// src/components/NavBar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function NavBar({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
    if (setUser) setUser(null);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-title">SkillTrust</div>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/booking">Book Session</Link>
        <Link to="/admin">Admin Panel</Link>
        <Link to="/code-editor">Code Editor</Link>
        <Link to="/chat/sample-session-id">Chat</Link>
        <Link to="/profile">
          <img 
            src={auth.currentUser?.photoURL || 'https://placehold.co/40x40/0f1724/FFFFFF?text=P'} 
            alt="profile" 
            className="profile-pic" 
            style={{ width: '40px', height: '40px' }} 
          />
        </Link>
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}


