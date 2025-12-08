// src/pages/LiveSession.js
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LiveSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const jitsiContainer = useRef(null);
  const jitsiApi = useRef(null);
  const scriptRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src="https://meet.jit.si/external_api.js"]')) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
      setError(null);
    };
    script.onerror = () => {
      setError("Failed to load Jitsi Meet. Please check your internet connection.");
      setScriptLoaded(false);
    };
    
    scriptRef.current = script;
    document.body.appendChild(script);

    // Timeout for script loading
    const timeout = setTimeout(() => {
      if (!scriptLoaded) {
        setError("Jitsi Meet is taking too long to load. Please refresh the page.");
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
      if (scriptRef.current && scriptRef.current.parentNode) {
        try {
          scriptRef.current.parentNode.removeChild(scriptRef.current);
        } catch (e) {
          console.warn("Error removing script:", e);
        }
      }
    };
  }, [scriptLoaded]);

  useEffect(() => {
    if (!scriptLoaded || !jitsiContainer.current || jitsiApi.current || !window.JitsiMeetExternalAPI) return;

    try {
      const domain = 'meet.jit.si';
      const options = {
        roomName: sessionId || 'default-room',
        width: '100%',
        height: '100%',
        parentNode: jitsiContainer.current,
        configOverwrite: {
          disableDeepLinking: true,
        },
        interfaceConfigOverwrite: {
          MOBILE_APP_PROMO: false,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      jitsiApi.current = api;

      api.addEventListener('videoConferenceLeft', () => {
        alert("Session ended. You will now be redirected to the dashboard.");
        navigate('/dashboard');
      });

      api.addEventListener('error', (err) => {
        console.error("Jitsi error:", err);
        setError("An error occurred with the video session. Please try again.");
      });
    } catch (err) {
      console.error("Error initializing Jitsi:", err);
      setError("Failed to initialize video session. Please refresh the page.");
    }

    return () => {
      if (jitsiApi.current) {
        try {
          jitsiApi.current.dispose();
        } catch (e) {
          console.warn("Error disposing Jitsi API:", e);
        }
        jitsiApi.current = null;
      }
    };
  }, [sessionId, navigate, scriptLoaded]);

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40, height: '90vh' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
          borderRadius: 'var(--radius)',
          boxShadow: '0 8px 25px rgba(2, 6, 23, 0.6)',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <h1 className="section-title" style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          Live Session: {sessionId || 'Loading...'}
        </h1>
        {error ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>{error}</p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : scriptLoaded && window.JitsiMeetExternalAPI ? (
          <div ref={jitsiContainer} style={{ height: 'calc(100% - 60px)' }}></div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading live session...</p>
        )}
      </motion.div>
    </div>
  );
}