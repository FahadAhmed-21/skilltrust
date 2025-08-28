// src/pages/Login.js
import React, { useState } from "react";
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

  // A new state to simulate wallet connection
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
        walletAddress: walletConnected ? "0xSimulatedWalletAddress" : null, // Add wallet address
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
  
  // New function to handle the wallet connection simulation
  const connectWallet = () => {
    setWalletConnected(true);
    alert("Wallet connected! You can now sign in.");
  };

  return (
    <div className="hero">
      <div className="hero-card fade-in">
        <div className="hero-headline">
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:56, height:56, borderRadius:12, background: 'linear-gradient(90deg,var(--accent),var(--accent-2))', boxShadow:'0 8px 30px rgba(124,58,237,0.14)'}} />
            <div>
              <div className="title">SkillTrust</div>
              <div className="subtitle">Decentralized skill exchange • Verified mentorship • Resume NFTs</div>
            </div>
          </div>

          <div className="features" style={{marginTop:18}}>
            <div className="feature">Peer teaching</div>
            <div className="feature">On-chain badges</div>
            <div className="feature">Secure wallets</div>
          </div>
        </div>

        <div className="auth">
          <div>
            <div className="label">Continue with</div>
            <button className="btn-primary" onClick={doGoogle} disabled={loading}>
              {loading ? "Please wait..." : "Continue with Google"}
            </button>
            <div className="center hint" style={{marginTop:8}}>or use email</div>
            <div style={{marginTop:10}}>
              <div className="label">Email</div>
              <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@mail.com" />
              <div className="label">Password</div>
              <input className="input" type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" />
            </div>
            <div style={{display:'flex', gap:8, marginTop:8}}>
              <button className="btn-primary" onClick={doEmail} disabled={loading}>
                {isRegister ? "Create account" : "Sign in"}
              </button>
              <button className="btn-ghost" onClick={()=>setIsRegister(!isRegister)}>{isRegister ? "Already have account?" : "Create account"}</button>
            </div>
            <div className="small-note">
              By continuing, you agree to demonstrate skills respectfully. This is a student prototype.
            </div>
            
            {/* New wallet connect button */}
            <div style={{marginTop:24}}>
              <button className="btn-primary" onClick={connectWallet} disabled={walletConnected} style={{ background: walletConnected ? 'var(--mid-30)' : 'linear-gradient(90deg, #ff00ff, #00ffff)' }}>
                {walletConnected ? "Wallet Connected" : "Connect Wallet"}
              </button>
            </div>
            {walletConnected && (
              <div className="hint center" style={{marginTop:8}}>
                Wallet address: 0xSimulatedWalletAddress...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



