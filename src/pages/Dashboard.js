// src/pages/Dashboard.js - Duolingo Style Learning Path
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useMocks, fetchUserProfile, mockMintTokens, mockMintNFT } from "../mocks";

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      // Use mocks when enabled
      if (useMocks) {
        const mockProfile = await fetchUserProfile();
        setProfile(mockProfile);
        setLoading(false);
        return;
      }

      // Use Firebase when not using mocks
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

  const learningUnits = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Master the basics of React including components, props, state, and hooks.",
      progress: 60,
      skills: ["Components", "Props", "State", "Hooks", "Events"],
      completedSkills: ["Components", "Props", "State"],
      completed: false
    },
    {
      id: 2,
      title: "Python Programming",
      description: "Learn Python from scratch. Cover syntax, data structures, and basic algorithms.",
      progress: 30,
      skills: ["Syntax", "Variables", "Loops", "Functions", "Classes"],
      completedSkills: ["Syntax", "Variables"],
      completed: false
    },
    {
      id: 3,
      title: "Blockchain Basics",
      description: "Understand blockchain technology, smart contracts, and Web3 development.",
      progress: 0,
      skills: ["Blockchain", "Smart Contracts", "Web3", "NFTs", "DeFi"],
      completedSkills: [],
      completed: false,
      locked: true
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "Learn design principles, user research, wireframing, and prototyping.",
      progress: 0,
      skills: ["Design Principles", "User Research", "Wireframing", "Prototyping"],
      completedSkills: [],
      completed: false,
      locked: true
    }
  ];

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
      alert("100 SKLT minted (mock)!");
      return;
    }

    if (db && user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        tokens: (profile.tokens || 0) + 100
      });
      setProfile(prev => ({ ...prev, tokens: (prev.tokens || 0) + 100 }));
      alert("100 SKLT minted!");
    }
  };

  const mintResumeNFT = async () => {
    if (!profile) return;
    
    if (useMocks) {
      const newNftName = `Resume NFT #${(profile.nfts?.length || 0) + 1}`;
      const result = await mockMintNFT({ name: newNftName });
      setProfile(prev => ({ ...prev, nfts: [...(prev.nfts || []), newNftName] }));
      alert(`Resume NFT "${newNftName}" minted (mock)!`);
      return;
    }

    if (db && user) {
      const userRef = doc(db, "users", user.uid);
      const newNftName = `Resume NFT #${(profile.nfts?.length || 0) + 1}`;
      await updateDoc(userRef, {
        nfts: arrayUnion(newNftName)
      });
      setProfile(prev => ({ ...prev, nfts: [...(prev.nfts || []), newNftName] }));
      alert(`Resume NFT "${newNftName}" minted!`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
        Please log in to view your dashboard.
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="hero-section">
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700, 
          color: 'var(--text-primary)', 
          marginBottom: '12px',
          lineHeight: 1.2
        }}>
          Welcome back, {profile.displayName || 'Learner'}! 👋
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: 'var(--text-secondary)', 
          lineHeight: 1.6,
          marginBottom: '24px'
        }}>
          Continue your learning journey and unlock new skills. Each unit brings you closer to mastery.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/booking')} className="btn-cta">
            Book a Session
          </button>
          <button onClick={mintSkillToken} className="btn-3d-gradient">
            Mint 100 SKLT
          </button>
          <button onClick={mintResumeNFT} className="btn-3d-gradient">
            Mint Resume NFT
          </button>
        </div>
      </motion.div>

      {/* Learning Path */}
      <div className="learning-path">
        <motion.div variants={itemVariants} className="path-header">
          <h1 className="path-title">Your Learning Path</h1>
          <p className="path-subtitle">
            Continue your journey and unlock new skills. Each unit builds on the previous one.
          </p>
        </motion.div>

        <div className="path-units">
          {learningUnits.map((unit, index) => (
            <motion.div
              key={unit.id}
              variants={itemVariants}
              className={`path-unit ${unit.completed ? 'completed' : ''} ${unit.locked ? 'locked' : ''}`}
              onClick={() => handleUnitClick(unit)}
              style={{ opacity: unit.locked ? 0.5 : 1 }}
            >
              <div className="path-unit-header">
                <h2 className="path-unit-title">{unit.title}</h2>
                <span className="path-unit-progress">{unit.progress}% Complete</span>
              </div>
              <p className="path-unit-description">{unit.description}</p>
              <div className="path-unit-skills">
                {unit.skills.map((skill, skillIndex) => {
                  const isCompleted = unit.completedSkills.includes(skill);
                  const isLocked = unit.locked || (!isCompleted && skillIndex > unit.completedSkills.length);
                  return (
                    <span
                      key={skillIndex}
                      className={`skill-badge ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                    >
                      {isCompleted && '✓ '}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
