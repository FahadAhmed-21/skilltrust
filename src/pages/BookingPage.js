// src/pages/BookingPage.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth, db } from "../firebase";
import { doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { mockMentors } from "../mocks";
import SelectDropdown from "../components/SelectDropdown";

export default function BookingPage() {
  const navigate = useNavigate();
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  const [selectedMentor, setSelectedMentor] = useState(mockMentors[0]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [startDate, setStartDate] = useState(new Date());

  const bookSession = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to book a session.");
      return;
    }

    const sessionData = {
      skill: selectedMentor.skill,
      mentor: selectedMentor.name,
      date: startDate.toLocaleDateString(),
      time: selectedTime,
      sessionId: `skilltrust-${Date.now()}`
    };

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        sessions: arrayUnion(sessionData)
      });
      alert(`Session booked: ${sessionData.skill} with ${sessionData.mentor} on ${sessionData.date} at ${sessionData.time}`);
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

  // Format mentor options for display
  const mentorOptions = mockMentors.map(mentor => ({
    ...mentor,
    label: `${mentor.skill} (${mentor.name})`
  }));

  return (
    <div className="container" style={{ 
      paddingTop: 40, 
      paddingBottom: 100, 
      minHeight: '100vh',
      padding: "40px",
      overflow: "visible",
      position: "relative",
      zIndex: 1
    }}>
      <h1 className="section-title">Book a Skill Exchange Session</h1>

      <motion.div 
        className="dashboard-grid" 
        initial="hidden" 
        animate="visible" 
        variants={listVariants}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}
      >
        <motion.div 
          className="booking-card" 
          variants={cardVariants} 
          whileHover={{ scale: 1.02 }}
          style={{ 
            overflow: 'visible',
            position: 'relative',
            zIndex: 10,
            padding: '28px',
          }}
        >
          <h2 className="card-title" style={{ marginBottom: '20px' }}>Select a Skill or Language</h2>
          <div className="select-dropdown-container" style={{ zIndex: 1500 }}>
            <SelectDropdown
              options={mentorOptions}
              value={selectedMentor.skill}
              onChange={(skill) => {
                const mentor = mockMentors.find(m => m.skill === skill);
                setSelectedMentor(mentor || mockMentors[0]);
              }}
              placeholder="Choose a skill or language"
            />
          </div>
        </motion.div>

        <motion.div 
          className="booking-card" 
          variants={cardVariants} 
          whileHover={{ scale: 1.02 }}
          style={{ 
            overflow: 'visible',
            position: 'relative',
            zIndex: 5,
            padding: '28px',
          }}
        >
          <h2 className="card-title" style={{ marginBottom: '20px' }}>Select Date & Time</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div className="datepicker-wrapper" style={{ width: '100%' }}>
              <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                className="input booking-datepicker"
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                calendarClassName="booking-calendar"
                popperClassName="booking-popper"
              />
            </div>
            <div className="select-dropdown-container" style={{ zIndex: 1500 }}>
              <SelectDropdown
                options={timeSlots}
                value={selectedTime}
                onChange={setSelectedTime}
                placeholder="Select time slot"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={bookSession}
        className="btn-cta-premium"
        style={{ marginTop: 32, padding: '14px 32px', fontSize: '1rem', width: 'auto' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        🚀 Confirm Session & Join
      </motion.button>
    </div>
  );
}
