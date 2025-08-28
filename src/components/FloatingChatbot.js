// src/components/FloatingChatbot.js
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I'm SkillTrust's AI assistant. I can help you with questions about skill exchange, booking sessions, or how to use the app. How can I assist you?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = "AIzaSyCScoF1r9JVt12pN2RvYsPbRgzK08_fosU"; // Your Gemini API key
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { role: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const context = {
      role: 'user',
      parts: [
        { text: "You are an AI assistant for a skill exchange platform called SkillTrust. Your purpose is to help users learn about how to use the platform, book sessions, understand the blockchain features (SkillTokens and Resume NFTs), and find mentors. Always answer questions within the context of the SkillTrust platform." }
      ]
    };

    let chatHistory = [context, ...newMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }))];
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: chatHistory })
      });

      const result = await response.json();
      const assistantMessage = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: "assistant", text: assistantMessage }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages(prev => [...prev, { role: "assistant", text: "I'm sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };
  
  const chatWindowVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          boxShadow: '0 8px 25px rgba(124,58,237,0.4)',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <path d="M7.9 20A9.3 9.3 0 0 1 4 16.1L2 22l6-2zm0-2a9.3 9.3 0 0 1 12.1-12.1L22 2l-6 2zm12.1-6a9.3 9.3 0 0 1-12.1 12.1L2 22l6-2z" />
          <path d="M12 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" />
          <path d="M12 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '20px',
              zIndex: 1000,
              width: '350px',
              height: '450px',
              backgroundColor: 'var(--mid-30)',
              borderRadius: 'var(--radius)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              padding: '15px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div style={{ flexGrow: 1, overflowY: 'scroll', paddingRight: '10px' }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: '10px',
                    textAlign: msg.role === 'user' ? 'right' : 'left',
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '10px',
                    borderRadius: 'var(--radius)',
                    backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-60)',
                    color: 'white',
                  }}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <input
                className="input"
                style={{ flexGrow: 1 }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={loading ? "Waiting for response..." : "Type your message here..."}
                disabled={loading}
              />
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "..." : "Send"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}