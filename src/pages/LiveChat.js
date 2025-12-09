// src/pages/LiveChat.js - Premium Global Chat Room
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: "Sarah_Dev",
      text: "Hey everyone! Just finished learning React hooks 🎉",
      timestamp: "2 min ago",
      isSelf: false
    },
    {
      id: 2,
      username: "Fahad (mock)",
      text: "That's awesome! Hooks are game changers for functional components.",
      timestamp: "1 min ago",
      isSelf: true
    },
    {
      id: 3,
      username: "CodeMaster42",
      text: "Anyone want to pair program on a blockchain project?",
      timestamp: "30 sec ago",
      isSelf: false
    },
    {
      id: 4,
      username: "Maya_UX",
      text: "I'd love to! I've been wanting to learn Web3 development.",
      timestamp: "Just now",
      isSelf: false
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate random typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(Math.random() > 0.7);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      username: "Fahad (mock)",
      text: input,
      timestamp: "Just now",
      isSelf: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");

    // Simulate a response after 2 seconds
    setTimeout(() => {
      const responses = [
        "That's a great point! 🚀",
        "Interesting perspective!",
        "I totally agree with that.",
        "Has anyone tried using TypeScript with that?",
        "Welcome to the chat! 👋"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const mockUsers = ["Sarah_Dev", "CodeMaster42", "Maya_UX", "BlockchainBob", "ReactRuby"];
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        username: randomUser,
        text: randomResponse,
        timestamp: "Just now",
        isSelf: false
      }]);
    }, 2000 + Math.random() * 2000);
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <div className="live-chat-container">
      {/* Floating Background Orbs */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>

      {/* Header */}
      <motion.div 
        className="live-chat-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: 'var(--shadow-neon)'
          }}>
            💬
          </div>
          <div>
            <h1>Global Chat Room</h1>
            <p>Connect with learners worldwide • <span style={{ color: 'var(--success)' }}>● 42 online</span></p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <span className="skill-badge-premium" style={{ background: 'rgba(0, 255, 156, 0.15)', color: 'var(--success)' }}>
            🟢 Live
          </span>
          <span className="skill-badge-premium">
            🌐 Public
          </span>
        </div>
      </motion.div>

      {/* Messages Container */}
      <motion.div 
        className="live-chat-messages"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`live-chat-bubble ${msg.isSelf ? 'self' : 'other'}`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <span className="username">{msg.username}</span>
              <span className="message-text">{msg.text}</span>
              <span className="timestamp">{msg.timestamp}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="live-chat-bubble other"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ 
                background: 'var(--glass-bg)', 
                border: '1px solid var(--glass-border)',
                display: 'inline-block',
                padding: 'var(--space-md)'
              }}
            >
              <span className="username">Someone is typing...</span>
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </motion.div>

      {/* Input Area */}
      <motion.form 
        className="live-chat-input-area"
        onSubmit={handleSend}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <input
          type="text"
          className="live-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <motion.button
          type="submit"
          className="live-chat-send"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send 🚀
        </motion.button>
      </motion.form>
    </div>
  );
}
