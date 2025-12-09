// src/pages/Login.js - Premium Mint-Cyan Login
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, provider, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const createUserProfile = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || null,
        tokens: 0,
        nfts: [],
        sessions: [],
        createdAt: new Date(),
        walletAddress: walletConnected ? "0xSimulatedWalletAddress" : null,
      });
    }
    setUser(user);
    navigate("/dashboard");
  };

  const doGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, provider);
      await createUserProfile(res.user);
    } catch (err) {
      console.error(err);
      alert("Google sign-in failed");
    } finally { setLoading(false); }
  };

  const doEmail = async () => {
    setLoading(true);
    try {
      if (isRegister) {
        const uc = await createUserWithEmailAndPassword(auth, email, pw);
        await createUserProfile(uc.user);
      } else {
        const uc = await signInWithEmailAndPassword(auth, email, pw);
        await createUserProfile(uc.user);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Auth error");
    } finally { setLoading(false); }
  };
  
  const connectWallet = () => {
    setWalletConnected(true);
    alert("Wallet connected! You can now sign in.");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="split-layout">
      {/* Floating Background Orbs */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      
      {/* Branding Side */}
      <motion.div 
        className="branding-side"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="login-brand"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 3D Floating Logo */}
          <motion.div 
            className="brand-logo"
            animate={{ 
              y: [0, -15, 0],
              rotateZ: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              boxShadow: '0 0 60px rgba(0, 255, 224, 0.5), 0 0 100px rgba(0, 199, 255, 0.3)',
            }}
          />
          
          <motion.div className="brand-text" variants={itemVariants}>
            <h1 style={{
              fontSize: '56px',
              fontWeight: 900,
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #00FFD1 0%, #00C7FF 50%, #00F5A0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
            }}>
              SkillTrust
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: '#A8C7D8',
              maxWidth: '400px',
              lineHeight: '1.6'
            }}>
              Decentralized skill exchange • Verified mentorship • Resume NFTs
            </p>
          </motion.div>
        </motion.div>
        
        {/* Feature Pills */}
        <motion.div 
          className="features-grid stagger-animation"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ marginTop: '40px' }}
        >
          {['🎓 Peer Teaching', '🏆 On-chain Badges', '🔐 Secure Wallets', '💎 NFT Resumes'].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-item"
              variants={featureVariants}
              whileHover={{ 
                scale: 1.05, 
                borderColor: '#00FFE0',
                boxShadow: '0 0 20px rgba(0, 255, 224, 0.3)'
              }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '14px 24px',
                borderRadius: '50px',
                fontSize: '14px',
                color: '#A8C7D8',
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div 
          style={{ 
            display: 'flex', 
            gap: '40px', 
            marginTop: '50px',
            zIndex: 1 
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            { value: '10K+', label: 'Learners' },
            { value: '500+', label: 'Mentors' },
            { value: '50K+', label: 'Sessions' }
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00FFD1, #00C7FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#6B8A9E', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Form Side */}
      <motion.div 
        className="form-side"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="login-form-container"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            background: 'rgba(0, 20, 30, 0.7)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(0, 255, 224, 0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top gradient border */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #00FFD1, #00C7FF, #00F5A0)',
          }} />

          <motion.h2 
            style={{ 
              textAlign: 'center', 
              marginBottom: '30px',
              fontSize: '28px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00FFD1, #00C7FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </motion.h2>

          {/* Google Sign In */}
          <div className="form-group">
            <motion.button 
              className="btn-cta-premium" 
              onClick={doGoogle} 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '20px' }}>🔐</span>
              {loading ? "Please wait..." : "Continue with Google"}
            </motion.button>
          </div>
          
          {/* Divider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '24px 0',
            gap: '16px'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ color: '#6B8A9E', fontSize: '13px' }}>or use email</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          </div>
          
          {/* Email Input */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <motion.input 
              className="input-premium" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="you@email.com"
              whileFocus={{ scale: 1.01 }}
            />
          </div>
          
          {/* Password Input */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <motion.input 
              className="input-premium" 
              type="password" 
              value={pw} 
              onChange={e => setPw(e.target.value)} 
              placeholder="••••••••"
              whileFocus={{ scale: 1.01 }}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="form-group" style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <motion.button 
              className="btn-cta-premium" 
              onClick={doEmail} 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ flex: 1 }}
            >
              {isRegister ? "Create Account" : "Sign In"}
            </motion.button>
            <motion.button 
              className="btn-ghost-premium" 
              onClick={() => setIsRegister(!isRegister)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isRegister ? "Login" : "Register"}
            </motion.button>
          </div>
          
          {/* Wallet Connect */}
          <div className="form-group" style={{ marginTop: '24px' }}>
            <motion.button 
              className="btn-gradient-secondary" 
              onClick={connectWallet} 
              disabled={walletConnected}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ width: '100%' }}
            >
              {walletConnected ? "✓ Wallet Connected" : "🔗 Connect Wallet"}
            </motion.button>
            
            <AnimatePresence>
              {walletConnected && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: 'rgba(0, 255, 156, 0.1)',
                    border: '1px solid rgba(0, 255, 156, 0.3)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#00FF9C',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Connected:</span> 0xSimu...Wallet
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Disclaimer */}
          <div style={{
            marginTop: '24px',
            padding: '14px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)',
            fontSize: '11px',
            color: '#6B8A9E',
            textAlign: 'center',
            lineHeight: '1.5',
          }}>
            By continuing, you agree to demonstrate skills respectfully.<br/>
            This is a student prototype project.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
