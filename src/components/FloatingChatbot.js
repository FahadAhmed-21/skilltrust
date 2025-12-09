// src/components/FloatingChatbot.js - Premium Mint-Cyan AI Assistant
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

  const API_KEY = "AIzaSyCScoF1r9JVt12pN2RvYsPbRgzK08_fosU";
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
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #00FFD1 0%, #00C7FF 100%)',
          color: '#0A1118',
          border: 'none',
          borderRadius: '50%',
          width: '65px',
          height: '65px',
          fontSize: '24px',
          boxShadow: '0 0 20px rgba(0, 255, 224, 0.4), 0 0 40px rgba(0, 255, 224, 0.2), 0 8px 30px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '20px',
              zIndex: 1000,
              width: '380px',
              height: '500px',
              background: 'rgba(0, 20, 30, 0.95)',
              backdropFilter: 'blur(30px)',
              borderRadius: '22px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0, 255, 224, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              background: 'linear-gradient(180deg, rgba(0, 255, 224, 0.1), transparent)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #00FFD1, #00C7FF)',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00FFD1, #00C7FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  boxShadow: '0 0 20px rgba(0, 255, 224, 0.4)',
                }}>
                  🤖
                </div>
                <div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '16px', 
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #00FFD1, #00C7FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    SkillTrust AI
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '12px', 
                    color: '#A8C7D8',
                  }}>
                    <span style={{ color: '#00FF9C' }}>●</span> Online • Ready to help
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      maxWidth: '85%',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      background: msg.role === 'user' 
                        ? 'linear-gradient(135deg, #00FFD1, #00C7FF)' 
                        : 'rgba(255,255,255,0.06)',
                      color: msg.role === 'user' ? '#0A1118' : '#E8F9FF',
                      border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                      borderBottomLeftRadius: msg.role === 'user' ? '16px' : '4px',
                      boxShadow: msg.role === 'user' 
                        ? '0 0 15px rgba(0, 255, 224, 0.3)' 
                        : 'none',
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    borderBottomLeftRadius: '4px',
                  }}
                >
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form 
              onSubmit={handleSubmit} 
              style={{ 
                display: 'flex', 
                gap: '10px', 
                padding: '16px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
              }}
            >
              <input
                style={{
                  flexGrow: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  color: '#E8F9FF',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00FFE0';
                  e.target.style.boxShadow = '0 0 15px rgba(0, 255, 224, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={loading ? "AI is thinking..." : "Ask me anything..."}
                disabled={loading}
              />
              <motion.button 
                type="submit" 
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, #00FFD1, #00C7FF)',
                  color: '#0A1118',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px 20px',
                  fontWeight: 600,
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 15px rgba(0, 255, 224, 0.3)',
                }}
              >
                {loading ? "..." : "Send"}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
