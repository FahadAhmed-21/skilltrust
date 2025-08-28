// src/pages/AdminPanel.js
import React from "react";
import { motion } from "framer-motion";

export default function AdminPanel() {
  const disputes = [
    { id: 1, user: "Alice", skill: "UI/UX Design", status: "Open" },
    { id: 2, user: "Bob", skill: "Python Programming", status: "Closed" },
  ];

  const metrics = {
    users: 52,
    sessions: 120,
    tokensMinted: 5400,
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 className="section-title">Admin Dashboard</h1>
      <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 20 }}>
        This is a mock-up of the admin panel for platform management.
      </p>

      <motion.div
        className="dashboard-grid"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="dashboard-card">
          <h2 className="card-title">Platform Metrics</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="list-item">Total Users: {metrics.users}</li>
            <li className="list-item">Total Sessions: {metrics.sessions}</li>
            <li className="list-item">SKLT Minted: {metrics.tokensMinted}</li>
          </ul>
        </div>
        
        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <h2 className="card-title">Recent Disputes</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--accent)', borderBottom: '1px solid var(--muted)' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>User</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Skill</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px' }}>#{d.id}</td>
                  <td style={{ padding: '8px' }}>{d.user}</td>
                  <td style={{ padding: '8px' }}>{d.skill}</td>
                  <td style={{ padding: '8px' }}>{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}