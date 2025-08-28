// src/components/Footer.js
import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      style={{
        textAlign: 'center',
        padding: '20px',
        color: 'var(--muted)',
        fontSize: '14px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: 'auto'
      }}
    >
      <p>&copy; 2025 SkillTrust. A Final Year Project for CSE. All rights reserved.</p>
    </motion.footer>
  );
}