// src/components/RightSidebar.js - Duolingo Style Stats Panel
import React from "react";
import { Link } from "react-router-dom";

export default function RightSidebar({ profile }) {
  const streak = 1; // TODO: Get from profile
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

  return (
    <div className="right-sidebar">
      {/* Stats Panel */}
      <div className="stats-panel">
        <div className="stats-title">Your Stats</div>
        
        <div className="stats-row">
          <div className="stats-label">
            <span>🔥</span>
            <span>Streak</span>
          </div>
          <div className="stats-value green">{streak} Day{streak !== 1 ? 's' : ''}</div>
        </div>

        <div className="stats-row">
          <div className="stats-label">
            <span>⭐</span>
            <span>XP / Tokens</span>
          </div>
          <div className="stats-value blue">{xp.toLocaleString()}</div>
        </div>

        <div className="stats-row">
          <div className="stats-label">
            <span>🏆</span>
            <span>Level</span>
          </div>
          <div className="stats-value purple">{level}</div>
        </div>
      </div>

      {/* Daily Quests */}
      <div className="quest-box">
        <div className="quest-title">Daily Quests</div>
        {dailyQuests.map((quest) => (
          <div key={quest.id} className="quest-item">
            <div className={`quest-checkbox ${quest.completed ? 'completed' : ''}`}></div>
            <div className={`quest-text ${quest.completed ? 'completed' : ''}`}>
              {quest.text}
            </div>
            <div className="quest-reward">+{quest.reward} XP</div>
          </div>
        ))}
      </div>

      {/* Leaderboard Preview */}
      <div className="leaderboard-box">
        <div className="leaderboard-title">Leaderboard</div>
        {leaderboard.map((user, index) => (
          <div key={index} className={`leaderboard-item ${user.isUser ? 'user' : ''}`}>
            <div className={`leaderboard-rank ${user.rank <= 3 ? 'top' : ''}`}>
              {user.rank}
            </div>
            <div className="leaderboard-name">{user.name}</div>
            <div className="leaderboard-xp">{user.xp.toLocaleString()} XP</div>
          </div>
        ))}
        <Link
          to="/leaderboard"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '16px',
            fontSize: '14px',
            color: '#1cb0f6',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#58cc02'}
          onMouseLeave={(e) => e.target.style.color = '#1cb0f6'}
        >
          View Full Leaderboard →
        </Link>
      </div>
    </div>
  );
}
