// src/components/NavBar.js - Duolingo Style Left Sidebar
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useMocks, mockUserProfile } from "../mocks";
import { useWallet } from "../contexts/WalletContext";

export default function NavBar({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, account, connectWallet, disconnectWallet, loading } = useWallet();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
    if (setUser) setUser(null);
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const photo =
    (useMocks && mockUserProfile?.photoURL) ||
    auth.currentUser?.photoURL ||
    "https://i.pravatar.cc/150?img=20";

  const navItems = [
    { path: '/dashboard', label: 'Learn', icon: '📚' },
    { path: '/booking', label: 'Bookings', icon: '📅' },
    { path: '/live-chat', label: 'Live Chat', icon: '💬' },
    { path: '/code-editor', label: 'Practice', icon: '💻' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/admin', label: 'More', icon: '⚙️' },
  ];

  return (
    <div className="left-sidebar">
      <div className="sidebar-logo">SkillTrust</div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-profile" onClick={() => navigate('/profile')}>
          <img
            src={photo}
            className="sidebar-avatar"
            alt="profile"
          />
          <div className="sidebar-profile-info">
            <div className="sidebar-profile-name">
              {auth.currentUser?.displayName || 'User'}
            </div>
            <div className="sidebar-profile-email">
              {auth.currentUser?.email || ''}
            </div>
          </div>
        </div>
        
        {/* Wallet Connection */}
        <div style={{ marginTop: '12px' }}>
          {!isConnected ? (
            <button
              onClick={connectWallet}
              disabled={loading}
              className="btn-3d btn-3d-primary"
              style={{ 
                width: '100%', 
                fontSize: '12px', 
                padding: '10px',
                background: loading ? '#666' : 'linear-gradient(135deg, #00FFD1, #00C7FF)',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '🔄 Connecting...' : '🦊 Connect Wallet'}
            </button>
          ) : (
            <div>
              <div style={{
                background: 'rgba(0, 255, 209, 0.1)',
                border: '1px solid rgba(0, 255, 209, 0.3)',
                borderRadius: '8px',
                padding: '8px',
                fontSize: '11px',
                color: '#00FFD1',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                🟢 {account?.slice(0, 6)}...{account?.slice(-4)}
              </div>
              <button
                onClick={disconnectWallet}
                className="btn-3d btn-3d-secondary"
                style={{ width: '100%', fontSize: '11px', padding: '8px' }}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          className="btn-3d btn-3d-secondary"
          style={{ width: '100%', marginTop: '8px', fontSize: '12px', padding: '10px' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
