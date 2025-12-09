// src/pages/CodeEditor.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [code, setCode] = useState("// Write your JavaScript code here\nconsole.log('Hello, SkillTrust!');");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const compileCode = () => {
    setLoading(true);
    
    // TODO: Implement secure sandbox execution (e.g., Web Workers, iframe sandbox)
    // For now, using mock runner for security
    const mockRunnerOutput = `Execution disabled (mock)
    
⚠️  Code execution is currently disabled for security reasons.
    
Your code:
${code}

TODO: Integrate secure sandbox environment for safe code execution.
Options: Web Workers, sandboxed iframe, or server-side execution.`;
    
    setOutput(mockRunnerOutput);
    setLoading(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40, maxWidth: 1200 }}>
      <motion.div className="hero-card" variants={cardVariants} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h1 className="section-title">In-Browser Code Editor</h1>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label style={{ color: 'var(--muted)' }}>Language: JavaScript (in-browser)</label>
          <button onClick={compileCode} disabled={loading} className="btn-primary">
            {loading ? "Running..." : "Run Code"}
          </button>
        </div>
        
        <Editor
          height="50vh"
          language="javascript"
          value={code}
          theme="vs-dark"
          onChange={handleEditorChange}
        />

        <div className="dashboard-card">
          <h2 className="card-title">Output Console</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--muted)', fontSize: '14px' }}>
            {output}
          </pre>
        </div>
      </motion.div>
    </div>
  );
}
