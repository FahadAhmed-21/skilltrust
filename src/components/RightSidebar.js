// src/components/RightSidebar.js - Premium Mint-Cyan Stats Panel
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RightSidebar({ profile }) {
  const streak = 7;
  const xp = profile?.tokens || 0;
  const level = Math.floor(xp / 1000) + 1;
  const userName = profile?.displayName || "You";

  const dailyQuests = [
    { id: 1, text: "Complete a session", completed: false, reward: 50 },
    { id: 2, text: "Book a new session", completed: false, reward: 30 },
    { id: 3, text: "Mint an NFT", completed: profile?.nfts?.length > 0, reward: 100 },
  ];

  const leaderboard = [
    { rank: 1, name: "Alice", xp: 5420 },
    { rank: 2, name: "Bob", xp: 4890 },
    { rank: 3, name: "Charlie", xp: 4320 },
    { rank: 4, name: userName, xp: xp, isUser: true },
  ].sort((a, b) => b.xp - a.xp).slice(0, 4).map((item, index) => ({
    ...item,
    rank: index + 1
  }));

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="right-sidebar"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: 'rgba(0, 18, 26, 0.6)',
        backdropFilter: 'blur(30px)',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Stats Panel */}
      <motion.div 
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover={{ borderColor: 'rgba(0, 255, 224, 0.2)' }}
      >
        {/* Top gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #00FFD1, #00C7FF)',
        }} />

        <h3 style={{ 
          margin: '0 0 20px 0', 
          fontSize: '14px',
          fontWeight: 600,
          color: '#A8C7D8',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          📊 Your Stats
        </h3>
        
        {/* Streak */}
        <motion.div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}
          variants={itemVariants}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🔥</span>
            <span style={{ color: '#A8C7D8', fontSize: '14px' }}>Streak</span>
          </div>
          <span style={{ 
            color: '#00FF9C', 
            fontWeight: 700,
            fontSize: '18px'
          }}>
            {streak} Days
          </span>
        </motion.div>

        {/* XP/Tokens */}
        <motion.div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}
          variants={itemVariants}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>💰</span>
            <span style={{ color: '#A8C7D8', fontSize: '14px' }}>SKLT Tokens</span>
          </div>
          <span style={{ 
            background: 'linear-gradient(135deg, #00FFD1, #00C7FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            fontSize: '18px'
          }}>
            {xp.toLocaleString()}
          </span>
        </motion.div>

        {/* Level */}
        <motion.div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
          }}
          variants={itemVariants}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🏆</span>
            <span style={{ color: '#A8C7D8', fontSize: '14px' }}>Level</span>
          </div>
          <span style={{ 
            color: '#FFB800', 
            fontWeight: 700,
            fontSize: '18px'
          }}>
            {level}
          </span>
        </motion.div>
      </motion.div>

      {/* Daily Quests */}
      <motion.div 
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover={{ borderColor: 'rgba(0, 255, 224, 0.2)' }}
      >
        {/* Top gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #00F5A0, #00D2FF)',
        }} />

        <h3 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '14px',
          fontWeight: 600,
          color: '#A8C7D8',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          🎯 Daily Quests
        </h3>

        {dailyQuests.map((quest, index) => (
          <motion.div 
            key={quest.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              marginBottom: '8px',
              background: quest.completed ? 'rgba(0, 255, 156, 0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${quest.completed ? 'rgba(0, 255, 156, 0.3)' : 'rgba(255,255,255,0.05)'}`,
              borderRadius: '12px',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '6px',
              border: `2px solid ${quest.completed ? '#00FF9C' : 'rgba(255,255,255,0.2)'}`,
              background: quest.completed ? '#00FF9C' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A1118',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              {quest.completed && '✓'}
            </div>
            <span style={{
              flex: 1,
              fontSize: '13px',
              color: quest.completed ? '#00FF9C' : '#A8C7D8',
              textDecoration: quest.completed ? 'line-through' : 'none',
            }}>
              {quest.text}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#00FFD1',
              background: 'rgba(0, 255, 209, 0.1)',
              padding: '4px 8px',
              borderRadius: '50px',
            }}>
              +{quest.reward}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Leaderboard Preview */}
      <motion.div 
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover={{ borderColor: 'rgba(0, 255, 224, 0.2)' }}
      >
        {/* Top gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #FFB800, #FF6B6B)',
        }} />

        <h3 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '14px',
          fontWeight: 600,
          color: '#A8C7D8',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          🏅 Leaderboard
        </h3>

        {leaderboard.map((user, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              marginBottom: '8px',
              background: user.isUser ? 'rgba(0, 255, 224, 0.1)' : 'transparent',
              border: user.isUser ? '1px solid rgba(0, 255, 224, 0.3)' : '1px solid transparent',
              borderRadius: '10px',
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: user.rank === 1 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                         user.rank === 2 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' :
                         user.rank === 3 ? 'linear-gradient(135deg, #CD7F32, #8B4513)' :
                         'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              color: user.rank <= 3 ? '#0A1118' : '#A8C7D8',
            }}>
              {user.rank}
            </div>
            <span style={{
              flex: 1,
              fontSize: '14px',
              fontWeight: user.isUser ? 600 : 400,
              color: user.isUser ? '#00FFE0' : '#E8F9FF',
            }}>
              {user.name}
            </span>
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#A8C7D8',
            }}>
              {user.xp.toLocaleString()}
            </span>
          </motion.div>
        ))}

        <motion.div
          whileHover={{ color: '#00FFD1' }}
          style={{
            textAlign: 'center',
            marginTop: '16px',
            fontSize: '13px',
            color: '#00C7FF',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'color 0.2s ease'
          }}
        >
          View Full Leaderboard →
        </motion.div>
      </motion.div>

      {/* NFT Collection Preview */}
      {profile?.nfts?.length > 0 && (
        <motion.div 
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ borderColor: 'rgba(0, 255, 224, 0.2)' }}
        >
          {/* Top gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #00FFE0, #00B4D8)',
          }} />

          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '14px',
            fontWeight: 600,
            color: '#A8C7D8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            💎 Your NFTs
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profile.nfts.slice(0, 4).map((nft, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 224, 0.3)' }}
                style={{
                  padding: '10px 14px',
                  background: 'linear-gradient(135deg, rgba(0, 255, 224, 0.1), rgba(0, 199, 255, 0.1))',
                  border: '1px solid rgba(0, 255, 224, 0.3)',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#00FFE0',
                }}
              >
                {nft}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
