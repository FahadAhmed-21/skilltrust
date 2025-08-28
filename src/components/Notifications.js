// src/components/Notifications.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const user = auth.currentUser;
      if (user) {
        // For this prototype, we'll use a hardcoded list of notifications
        const userNotifications = [
          { id: 1, message: "Your session with Alice has been booked." },
          { id: 2, message: "You received 100 SKLT from a completed session." },
          { id: 3, message: "Your Resume NFT has been minted." },
        ];
        setNotifications(userNotifications);
      }
      setLoading(false);
    };
    fetchNotifications();
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
    return <p style={{ color: 'var(--muted)', textAlign: 'center' }}>Loading notifications...</p>;
  }

  return (
    <motion.div
      className="dashboard-card"
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
      style={{ gridColumn: '1 / -1', marginTop: '20px' }}
    >
      <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell-ring">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          <path d="M2.92 7.23a2.46 2.46 0 0 0-.02 4.86" />
          <path d="M21.02 12.09a2.46 2.46 0 0 0-.02-4.86" />
        </svg>
        <span>Recent Notifications</span>
      </h2>
      <motion.ul variants={listVariants} style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map(n => (
          <motion.li key={n.id} className="list-item" variants={listItemVariants}>
            {n.message}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}