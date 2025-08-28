// src/pages/UserProfile.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
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
  }, []);

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

  if (loading) {
    return <div className="container" style={{ paddingTop: 40, textAlign: 'center' }}>Loading...</div>;
  }
  if (!profile) {
    return <div className="container" style={{ paddingTop: 40, textAlign: 'center' }}>Please log in to view your profile.</div>;
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="hero-card fade-in" style={{ padding: 28, maxWidth: '600px', margin: '0 auto', display: 'block' }}>
        <img
          src={profile.photoURL || 'https://placehold.co/96x96/0f1724/FFFFFF?text=P'}
          alt="profile"
          className="profile-pic"
        />
        <h1 className="section-title" style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
          {profile.displayName}
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 20 }}>
          {profile.email}
        </p>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          <div className="dashboard-card" variants={cardVariants} style={{ marginBottom: 20 }}>
            <h2 className="card-title">Languages Known</h2>
            <motion.ul variants={listVariants}>
              {profile.languages && profile.languages.length > 0 ? (
                profile.languages.map((lang, i) => (
                  <motion.li key={i} className="list-item" variants={listItemVariants}>
                    {lang}
                  </motion.li>
                ))
              ) : (
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No languages added yet.</p>
              )}
            </motion.ul>
          </div>
          
          <div className="dashboard-card" variants={cardVariants}>
            <h2 className="card-title">My Resume NFTs</h2>
            <motion.ul variants={listVariants}>
              {profile.nfts && profile.nfts.length > 0 ? (
                profile.nfts.map((nft, i) => (
                  <motion.li key={i} className="list-item" variants={listItemVariants}>
                    {nft}
                  </motion.li>
                ))
              ) : (
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No NFTs minted yet.</p>
              )}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}