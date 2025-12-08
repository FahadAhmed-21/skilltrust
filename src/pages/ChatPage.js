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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setError("You must be logged in to view chat.");
      setLoading(false);
      return;
    }

    if (!sessionId) {
      setError("Invalid session ID.");
      setLoading(false);
      return;
    }

    try {
      const messagesRef = collection(db, "sessions", sessionId, "messages");
      const q = query(messagesRef, orderBy("createdAt"));
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const msgs = [];
          snapshot.forEach((doc) => {
            msgs.push({ ...doc.data(), id: doc.id });
          });
          setMessages(msgs);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error("Error fetching messages:", err);
          setError("Failed to load messages. The session may not exist yet.");
          setLoading(false);
        }
      );
      
      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up chat:", err);
      setError("Failed to initialize chat. Please try again.");
      setLoading(false);
    }
  }, [sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    if (!auth.currentUser) {
      alert("You must be logged in to send messages.");
      return;
    }

    try {
      const messagesRef = collection(db, "sessions", sessionId, "messages");
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        createdAt: new Date(),
        user: auth.currentUser.displayName || auth.currentUser.email,
        userId: auth.currentUser.uid,
      });
      setNewMessage("");
      setError(null);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
      alert("Failed to send message. Please try again.");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 40, textAlign: 'center' }}>
        <p>Loading chat...</p>
      </div>
    );
  }

  if (error && messages.length === 0) {
    return (
      <div className="container" style={{ paddingTop: 40, textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40, maxWidth: 800 }}>
      <motion.div className="hero-card" variants={cardVariants}>
        <h1 className="section-title" style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          Live Chat for Session: {sessionId}
        </h1>
        {error && (
          <p style={{ color: 'var(--muted)', padding: '10px', fontSize: '14px' }}>
            {error}
          </p>
        )}
        <div style={{ height: '400px', overflowY: 'scroll', padding: '10px', display: 'flex', flexDirection: 'column' }}>
          {messages.length === 0 ? (
            <p style={{ color: 'var(--muted)', textAlign: 'center', marginTop: '20px' }}>
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} style={{ marginBottom: '10px', textAlign: msg.user === (auth.currentUser?.displayName || auth.currentUser?.email) ? 'right' : 'left' }}>
                <span style={{ fontWeight: 'bold' }}>{msg.user}:</span> {msg.text}
              </div>
            ))
          )}
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