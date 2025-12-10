// src/components/SelectDropdown.js - Custom Select with Neon/Glass Styling
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SelectDropdown({ options, value, onChange, placeholder = "Select an option" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Find the currently selected option
  const selectedOption = options.find(option => 
    typeof option === 'string' ? option === value : option.value === value || option.name === value || option.label === value
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setFocusedIndex(-1);
  };

  const handleSelect = (option) => {
    const optionValue = typeof option === 'string' ? option : option.value || option.name || option.label;
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDisplayText = (option) => {
    if (typeof option === 'string') return option;
    return option.label || option.name || option.value || option.toString();
  };

  return (
    <div className="select-dropdown-container" ref={dropdownRef} style={{ position: 'relative', zIndex: isOpen ? 1000 : 1 }}>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="select-dropdown-button"
        whileHover={{ 
          scale: 1.02,
          borderColor: 'rgba(0, 255, 224, 0.4)',
          boxShadow: '0 0 20px rgba(0, 255, 224, 0.2)'
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          color: '#E8F9FF',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          outline: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '48px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span style={{ 
          color: selectedOption ? '#E8F9FF' : '#6B8A9E',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {selectedOption ? getDisplayText(selectedOption) : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #6B8A9E',
            marginLeft: '12px',
            flexShrink: 0,
          }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="select-dropdown-menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: 'rgba(0, 20, 30, 0.95)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(0, 255, 224, 0.3)',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 255, 224, 0.1)',
              zIndex: 1000,
              maxHeight: '300px',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {options.map((option, index) => {
              const displayText = getDisplayText(option);
              const isSelected = selectedOption && getDisplayText(selectedOption) === displayText;
              const isFocused = focusedIndex === index;

              return (
                <motion.div
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="select-dropdown-option"
                  whileHover={{ 
                    backgroundColor: 'rgba(0, 255, 224, 0.15)',
                    x: 4
                  }}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: index < options.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    backgroundColor: isSelected 
                      ? 'rgba(0, 255, 224, 0.2)' 
                      : isFocused 
                        ? 'rgba(0, 255, 224, 0.1)' 
                        : 'transparent',
                    color: isSelected ? '#00FFD1' : '#E8F9FF',
                    fontSize: '14px',
                    fontWeight: isSelected ? '600' : '400',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {displayText}
                  </span>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        color: '#00FFD1',
                        fontSize: '16px',
                        marginLeft: '8px',
                      }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
