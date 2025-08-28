// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Notifications from "../components/Notifications";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const mintSkillToken = async () => {
    if (!profile) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      tokens: profile.tokens + 100
    });
    setProfile(prev => ({ ...prev, tokens: prev.tokens + 100 }));
    alert("100 SKLT minted!");
  };

  const mintResumeNFT = async () => {
    if (!profile) return;
    const userRef = doc(db, "users", user.uid);
    const newNftName = `Resume NFT #${profile.nfts.length + 1}`;
    await updateDoc(userRef, {
      nfts: arrayUnion(newNftName)
    });
    setProfile(prev => ({ ...prev, nfts: [...prev.nfts, newNftName] }));
    alert(`Resume NFT "${newNftName}" minted!`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const topMentors = [
    { name: "Alice", skill: "UI/UX Design", rating: 4.8 },
    { name: "Bob", skill: "Python Programming", rating: 4.5 },
    { name: "Charlie", skill: "Blockchain 101", rating: 4.9 },
  ];

  if (loading) {
    return <div className="container" style={{ paddingTop: 40, textAlign: 'center' }}>Loading...</div>;
  }
  if (!profile) {
    return <div className="container" style={{ paddingTop: 40, textAlign: 'center' }}>Please log in to view your dashboard.</div>;
  }

  const nextSession = profile.sessions && profile.sessions.length > 0 ? profile.sessions[0] : null;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', gap: '20px' }}>
      {/* Left Column: Profile and Main Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: '1' }}>
        {/* Profile and Streak */}
        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div
            className="dashboard-card"
            variants={cardVariants}
            whileHover={{ scale: 1.01, boxShadow: '0 15px 40px rgba(124,58,237,0.2)' }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img
                src={profile.photoURL || 'https://placehold.co/60x60/0f1724/FFFFFF?text=P'}
                alt="profile"
                className="profile-pic"
                style={{ width: '60px', height: '60px', margin: 0 }}
              />
              <div>
                <h2 className="card-title" style={{ marginBottom: 0 }}>
                  {profile.displayName || "Learner"}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
                  Total SKLT: {profile.tokens}
                </p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 className="card-title" style={{ marginBottom: 0, color: 'var(--accent-3)' }}>
                1 Day 🔥
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
                Streak
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Next Session Card */}
        <motion.div className="dashboard-card" variants={cardVariants} whileHover={{ scale: 1.03 }}>
          <h2 className="card-title">Next Session</h2>
          {nextSession ? (
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
              **{nextSession.skill}** with {nextSession.mentor} on **{nextSession.date}** at **{nextSession.time}**
            </p>
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
              You have no upcoming sessions.
            </p>
          )}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button onClick={() => navigate('/booking')} className="btn-primary" style={{ flex: 1 }}>
              Book a New Session
            </button>
            {nextSession && (
              <button onClick={() => navigate(`/session/${nextSession.sessionId}`)} className="btn-primary" style={{ flex: 1, background: 'var(--accent)' }}>
                Join Session
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Minting Buttons Card */}
        <motion.div className="dashboard-card" variants={cardVariants} whileHover={{ scale: 1.03 }}>
          <h2 className="card-title">Mint Your Progress</h2>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button onClick={mintSkillToken} className="btn-primary">
              Mint 100 SKLT
            </button>
            <button onClick={mintResumeNFT} className="btn-primary">
              Mint Resume NFT
            </button>
          </div>
        </motion.div>

        <Notifications />
      </div>

      {/* Right Column: Progress and Community */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: '1' }}>
        <motion.div className="dashboard-card" variants={cardVariants} whileHover={{ scale: 1.03 }}>
          <h2 className="card-title">Resume NFTs</h2>
          {profile.nfts && profile.nfts.length > 0 ? (
            <motion.ul variants={listVariants} style={{ listStyle: 'none', padding: 0 }}>
              {profile.nfts.map((nft, i) => (
                <motion.li key={i} className="list-item" variants={listItemVariants}>
                  {nft}
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No NFTs minted yet.</p>
          )}
        </motion.div>

        <motion.div className="dashboard-card" variants={cardVariants} whileHover={{ scale: 1.03 }}>
          <h2 className="card-title">Languages</h2>
          {profile.languages && profile.languages.length > 0 ? (
            <motion.ul variants={listVariants} style={{ listStyle: 'none', padding: 0 }}>
              {profile.languages.map((lang, i) => (
                <motion.li key={i} className="list-item" variants={listItemVariants}>
                  {lang}
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No languages added yet.</p>
          )}
        </motion.div>

        <motion.div className="dashboard-card" variants={cardVariants} whileHover={{ scale: 1.03 }}>
          <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 15.45l-2.4 1.8L12 21l-1.08-3.75-2.4-1.8A6 6 0 0 1 12 14a6 6 0 0 1 3.477 1.45z" />
            </svg>
            <span>Top Mentors</span>
          </h2>
          <motion.ul variants={listVariants} style={{ listStyle: 'none', padding: 0 }}>
            {topMentors.map((mentor, i) => (
              <motion.li key={i} className="list-item" variants={listItemVariants}>
                {mentor.name} - {mentor.skill} ({mentor.rating} ⭐)
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
}






