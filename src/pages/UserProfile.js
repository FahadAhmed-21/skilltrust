import React from "react";
import { motion } from "framer-motion";
import { useMocks, mockUserProfile } from "../mocks";

export default function UserProfile() {
  const profile = useMocks ? mockUserProfile : null;

  if (!profile) {
    return (
      <div className="profile-container">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="profile-container-premium"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER */}
      <div className="profile-header-premium">
        <img src={profile.photoURL} className="profile-avatar-premium" />
        <div>
          <h1>{profile.displayName}</h1>
          <p>{profile.email}</p>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="profile-stats-row">
        <div className="profile-stat">Tokens: {profile.tokens}</div>
        <div className="profile-stat">NFTs: {profile.nfts.length}</div>
        <div className="profile-stat">Sessions: {profile.sessions.length}</div>
        <div className="profile-stat">Languages: {profile.languages.join(", ")}</div>
      </div>

      {/* ACHIEVEMENTS */}
      <div className="profile-section">
        <h2>Achievements</h2>
        <div className="achievements-grid">
          {profile.nfts.map((n, i) => (
            <motion.div
              key={i}
              className="achievement-card"
              whileHover={{ scale: 1.05 }}
            >
              🏆 {n}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
