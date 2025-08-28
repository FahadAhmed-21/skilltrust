// src/pages/BookingPage.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth, db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function BookingPage() {
  const navigate = useNavigate();
  const skillsAndLanguages = [
    { type: "skill", name: "React Basics", mentor: "Alice" },
    { type: "skill", name: "Python Programming", mentor: "Bob" },
    { type: "skill", name: "Blockchain 101", mentor: "Charlie" },
    { type: "language", name: "English", mentor: "Diana" },
    { type: "language", name: "Tamil", mentor: "Eva" },
    { type: "language", name: "French", mentor: "Frank" },
  ];
  const timeSlots = ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"];

  const [selectedSkill, setSelectedSkill] = useState(skillsAndLanguages[0]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [startDate, setStartDate] = useState(new Date());

  const bookSession = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to book a session.");
      return;
    }

    const sessionData = {
      skill: selectedSkill.name,
      mentor: selectedSkill.mentor,
      date: startDate.toLocaleDateString(),
      time: selectedTime,
      sessionId: `skilltrust-${Date.now()}`
    };

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      if (selectedSkill.type === "language") {
         await updateDoc(userRef, {
          languages: arrayUnion(selectedSkill.name)
        });
      }
      await updateDoc(userRef, {
        sessions: arrayUnion(sessionData)
      });
      alert(`Session booked: ${sessionData.skill} on ${sessionData.date} at ${sessionData.time}`);
      navigate(`/session/${sessionData.sessionId}`);
    } catch (e) {
      console.error("Error booking session: ", e);
      alert("Failed to book session. Please try again.");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 className="section-title">Book a Skill Exchange Session</h1>

      <motion.div className="dashboard-grid" initial="hidden" animate="visible" variants={listVariants}>
        <motion.div className="booking-card" variants={cardVariants} whileHover={{ scale: 1.03 }}>
          <h2 className="card-title">Select a Skill or Language</h2>
          <select
            value={selectedSkill.name}
            onChange={(e) => setSelectedSkill(skillsAndLanguages.find(s => s.name === e.target.value))}
            className="input"
          >
            {skillsAndLanguages.map((skill, idx) => (
              <option key={idx} value={skill.name}>
                {skill.name} ({skill.mentor})
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div className="booking-card" variants={cardVariants} whileHover={{ scale: 1.03 }}>
          <h2 className="card-title">Select Date & Time</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="input" />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="input"
            >
              {timeSlots.map((time, idx) => (
                <option key={idx} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={bookSession}
        className="btn-primary"
        style={{ marginTop: 24, padding: '12px 24px', fontSize: '1rem', width: 'auto' }}
        whileHover={{ scale: 1.05 }}
      >
        Confirm Session & Join
      </motion.button>
    </div>
  );
}




