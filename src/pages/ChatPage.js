// src/pages/ChatPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function ChatPage() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "sessions", sessionId, "messages");

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: new Date(),
      user: auth.currentUser.displayName || auth.currentUser.email,
    });
    setNewMessage("");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40, maxWidth: 800 }}>
      <motion.div className="hero-card" variants={cardVariants}>
        <h1 className="section-title" style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          Live Chat for Session: {sessionId}
        </h1>
        <div style={{ height: '400px', overflowY: 'scroll', padding: '10px', display: 'flex', flexDirection: 'column' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ marginBottom: '10px', textAlign: msg.user === (auth.currentUser.displayName || auth.currentUser.email) ? 'right' : 'left' }}>
              <span style={{ fontWeight: 'bold' }}>{msg.user}:</span> {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input
            className="input"
            style={{ flexGrow: 1 }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button className="btn-primary" type="submit">
            Send
          </button>
        </form>
      </motion.div>
    </div>
  );
}