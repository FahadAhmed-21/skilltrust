// src/pages/LiveSession.js
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LiveSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const jitsiContainer = useRef(null);
  const jitsiApi = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !jitsiContainer.current || jitsiApi.current) return;

    const domain = 'meet.jit.si';
    const options = {
      roomName: sessionId,
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

    return () => {
      if (jitsiApi.current) {
        jitsiApi.current.dispose();
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
          Live Session: {sessionId}
        </h1>
        {scriptLoaded ? (
          <div ref={jitsiContainer} style={{ height: 'calc(100% - 60px)' }}></div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading live session...</p>
        )}
      </motion.div>
    </div>
  );
}