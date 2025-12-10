// src/pages/AdminPanel.js
import React from "react";
import { motion } from "framer-motion";
import { mockBookings, mockMentors, mockCourses, mockUserProfile } from "../mocks";

export default function AdminPanel() {
  // Calculate dynamic metrics from mock data
  const metrics = {
    users: mockMentors.length,
    sessions: mockBookings.length,
    tokensMinted: mockUserProfile.tokens * mockBookings.length,
    courses: mockCourses.length
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 className="section-title">Admin Dashboard</h1>
      <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 20 }}>
        Platform management dashboard with real-time metrics.
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
            <li className="list-item">Total Courses: {metrics.courses}</li>
          </ul>
        </div>
        
        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <h2 className="card-title">Recent Bookings</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--accent)', borderBottom: '1px solid var(--muted)' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Mentor</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Skill</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Time</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map(booking => (
                <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px' }}>#{booking.id}</td>
                  <td style={{ padding: '8px' }}>{booking.mentor}</td>
                  <td style={{ padding: '8px' }}>{booking.skill}</td>
                  <td style={{ padding: '8px' }}>{booking.date}</td>
                  <td style={{ padding: '8px' }}>{booking.time}</td>
                  <td style={{ 
                    padding: '8px',
                    color: booking.status === 'Completed' ? '#00FFD1' : 
                           booking.status === 'Upcoming' ? '#00C7FF' : '#FF6B6B'
                  }}>
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
