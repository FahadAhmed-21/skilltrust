// src/pages/Dashboard.js - Premium Mint-Cyan Learning Dashboard
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useMocks, fetchUserProfile, mockMintTokens, mockMintNFT, mockCourses, mockUserProfile } from "../mocks";

// Animated Skill Badge Component
const SkillBadge = ({ skill, isCompleted, isLocked, delay = 0 }) => {
  return (
    <motion.span
      className={`skill-badge-premium ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: delay * 0.1, 
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }}
      whileHover={!isLocked ? { 
        scale: 1.1, 
        y: -3,
        boxShadow: '0 0 20px rgba(0, 255, 224, 0.4)'
      } : {}}
      style={{
        cursor: isLocked ? 'not-allowed' : 'pointer',
      }}
    >
      {isCompleted && <span style={{ marginRight: '4px' }}>✓</span>}
      {skill}
    </motion.span>
  );
};

// Stats Card Component
const StatsCard = ({ icon, value, label, gradient }) => {
  return (
    <motion.div
      style={{
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ 
        scale: 1.05, 
        borderColor: 'rgba(0, 255, 224, 0.3)',
        boxShadow: '0 0 30px rgba(0, 255, 224, 0.2)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: gradient || 'linear-gradient(90deg, #00FFD1, #00C7FF)',
      }} />
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ 
        fontSize: '28px', 
        fontWeight: 800,
        background: gradient || 'linear-gradient(135deg, #00FFD1, #00C7FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', color: '#6B8A9E', textTransform: 'uppercase', marginTop: '4px' }}>
        {label}
      </div>
    </motion.div>
  );
};

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (useMocks) {
        const mockProfile = await fetchUserProfile();
        setProfile(mockProfile);
        setLoading(false);
        return;
      }

      if (user && db) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          setProfile({
            displayName: user.displayName || "Learner",
            tokens: 0,
            nfts: [],
            sessions: [],
            languages: []
          });
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  // === Course Icon Map ===
  const getCourseIcon = (category) => {
    const icons = {
      "Programming": "💻",
      "Web Development": "🌐",
      "Database": "🗄️",
      "AI/ML": "🤖",
      "Cybersecurity": "🔒",
      "Web3": "⛓️",
      "Cloud": "☁️",
      "Soft Skills": "🎯",
      "Languages": "🗣️"
    };
    return icons[category] || "📚";
  };

  // === Course Color Map ===
  const getCourseColor = (category) => {
    const colors = {
      "Programming": "#00FFD1",
      "Web Development": "#00C7FF",
      "Database": "#00F5A0",
      "AI/ML": "#00FFE0",
      "Cybersecurity": "#FF6B6B",
      "Web3": "#FFB800",
      "Cloud": "#9D4EDD",
      "Soft Skills": "#FF69B4",
      "Languages": "#32CD32"
    };
    return colors[category] || "#00FFD1";
  };

  const learningUnits = mockCourses.map((course, index) => ({

    id: index + 1,
    title: course.title,
    description: `${course.category} - ${course.difficulty} level course`,
    progress: course.progress,
    skills: course.tags || ["Skills", "Development", "Practice"],
    completedSkills: course.progress > 0 ? ["Introduction", "Basics"] : [],
    icon: getCourseIcon(course.category),
    color: getCourseColor(course.category),
    locked: course.progress === 0
  }));



  const handleUnitClick = (unit) => {
    if (unit.locked) {
      alert("Complete previous units to unlock this one!");
      return;
    }
    navigate(`/booking?skill=${encodeURIComponent(unit.title)}`);
  };

  const mintSkillToken = async () => {
    if (!profile) return;
    
    if (useMocks) {
      const result = await mockMintTokens(100);
      setProfile(prev => ({ ...prev, tokens: result.newBalance }));
      alert("🎉 100 SKLT minted successfully!");
      return;
    }

    if (db && user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        tokens: (profile.tokens || 0) + 100
      });
      setProfile(prev => ({ ...prev, tokens: (prev.tokens || 0) + 100 }));
      alert("🎉 100 SKLT minted!");
    }
  };

  const mintResumeNFT = async () => {
    if (!profile) return;
    
    if (useMocks) {
      const newNftName = `Resume NFT #${(profile.nfts?.length || 0) + 1}`;
      await mockMintNFT({ name: newNftName });
      setProfile(prev => ({ ...prev, nfts: [...(prev.nfts || []), newNftName] }));
      alert(`🎉 "${newNftName}" minted successfully!`);
      return;
    }

    if (db && user) {
      const userRef = doc(db, "users", user.uid);
      const newNftName = `Resume NFT #${(profile.nfts?.length || 0) + 1}`;
      await updateDoc(userRef, {
        nfts: arrayUnion(newNftName)
      });
      setProfile(prev => ({ ...prev, nfts: [...(prev.nfts || []), newNftName] }));
      alert(`🎉 "${newNftName}" minted!`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.1)',
              borderTopColor: '#00FFE0',
              margin: '0 auto 20px',
            }}
          />
          <p style={{ color: '#A8C7D8', fontSize: '16px' }}>
            Loading your premium learning experience...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard-container" style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ color: '#A8C7D8', fontSize: '18px' }}>
          Please log in to view your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '30px',
          padding: '40px',
          marginBottom: '30px',
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
        
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          top: '4px',
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(180deg, rgba(0, 255, 224, 0.08), transparent)',
          pointerEvents: 'none',
        }} />

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 
            variants={itemVariants}
            style={{
              fontSize: '42px',
              fontWeight: 800,
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #00FFD1 0%, #00C7FF 50%, #00F5A0 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'textShimmer 4s ease-in-out infinite',
            }}
          >
            Welcome back, {profile.displayName || 'Learner'}! 👋
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            style={{ 
              fontSize: '18px', 
              color: '#A8C7D8', 
              marginBottom: '30px',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}
          >
            Continue your learning journey and unlock new skills. Each unit brings you closer to mastery.
          </motion.p>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button 
            onClick={() => navigate('/booking')} 
            className="btn-cta-premium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            📅 Book a Session
          </motion.button>
          <motion.button 
            onClick={mintSkillToken} 
            className="btn-3d-premium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            💰 Mint 100 SKLT
          </motion.button>
          <motion.button 
            onClick={mintResumeNFT} 
            className="btn-3d-premium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            🏆 Mint Resume NFT
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <StatsCard 
          icon="💰" 
          value={profile.tokens || 0} 
          label="SKLT Tokens"
          gradient="linear-gradient(135deg, #00FFD1, #00C7FF)"
        />
        <StatsCard 
          icon="🏆" 
          value={profile.nfts?.length || 0} 
          label="NFTs Owned"
          gradient="linear-gradient(135deg, #00F5A0, #00D2FF)"
        />
        <StatsCard 
          icon="📚" 
          value={profile.sessions?.length || 0} 
          label="Sessions"
          gradient="linear-gradient(135deg, #00FFE0, #00B4D8)"
        />
        <StatsCard 
          icon="🔥" 
          value="7" 
          label="Day Streak"
          gradient="linear-gradient(135deg, #FFB800, #FF6B6B)"
        />
      </motion.div>

      {/* Learning Path Section */}
      <motion.div 
        className="learning-path-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '30px',
          padding: '40px',
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
          height: '3px',
          background: 'linear-gradient(90deg, #00F5A0, #00D2FF)',
        }} />

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px' 
        }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 700, 
            margin: 0,
            background: 'linear-gradient(135deg, #00FFD1, #00C7FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            🎯 Your Learning Path
          </h2>
          <span style={{
            padding: '8px 16px',
            background: 'rgba(0, 255, 156, 0.15)',
            border: '1px solid rgba(0, 255, 156, 0.3)',
            borderRadius: '50px',
            fontSize: '13px',
            color: '#00FF9C',
            fontWeight: 600,
          }}>
            {mockCourses.length} Courses Available
          </span>
        </div>
        
        <p style={{ 
          color: '#A8C7D8', 
          fontSize: '16px', 
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Continue your journey and unlock new skills. Each unit builds on the previous one.
        </p>

        {/* Course Cards Grid */}
        <motion.div 
          className="courses-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {learningUnits.map((unit, index) => (
            <motion.div
              key={unit.id}
              variants={itemVariants}
              className={`course-unit ${unit.locked ? 'locked' : ''}`}
              onClick={() => handleUnitClick(unit)}
              whileHover={!unit.locked ? { 
                y: -10, 
                boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${unit.color}30`
              } : {}}
              style={{
                background: 'rgba(0, 20, 30, 0.6)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${unit.locked ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '24px',
                padding: '28px',
                cursor: unit.locked ? 'not-allowed' : 'pointer',
                opacity: unit.locked ? 0.5 : 1,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease',
              }}
            >
              {/* Top gradient border on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${unit.color}, #00C7FF)`,
                opacity: unit.locked ? 0.3 : 1,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.4s ease',
              }} className="course-top-border" />

              {/* Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${unit.color}30, transparent)`,
                    border: `1px solid ${unit.color}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}>
                    {unit.icon}
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 700, 
                      margin: 0,
                      color: '#E8F9FF',
                    }}>
                      {unit.title}
                    </h3>
                    {unit.locked && (
                      <span style={{ fontSize: '11px', color: '#6B8A9E' }}>🔒 Locked</span>
                    )}
                  </div>
                </div>
                <span style={{
                  padding: '6px 12px',
                  background: `${unit.color}20`,
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: unit.color,
                }}>
                  {unit.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                marginBottom: '16px',
                overflow: 'hidden',
              }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${unit.progress}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${unit.color}, #00C7FF)`,
                    borderRadius: '3px',
                    boxShadow: `0 0 10px ${unit.color}50`,
                  }}
                />
              </div>

              {/* Description */}
              <p style={{ 
                fontSize: '14px', 
                color: '#A8C7D8', 
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {unit.description}
              </p>

              {/* Skill Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {unit.skills.map((skill, skillIndex) => {
                  const isCompleted = unit.completedSkills.includes(skill);
                  const isLocked = unit.locked || (!isCompleted && skillIndex > unit.completedSkills.length);
                  return (
                    <SkillBadge
                      key={skillIndex}
                      skill={skill}
                      isCompleted={isCompleted}
                      isLocked={isLocked}
                      delay={skillIndex}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
