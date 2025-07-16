// EduPilot Full React App Folder Structure and Contents

// File: package.json
{
  "name": "edupilot-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}

// File: vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});

// File: index.html (in root folder)
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduPilot</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

// File: src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import EduPilot from './EduPilot';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EduPilot />
  </React.StrictMode>
);

// File: src/EduPilot.jsx
import React, { useState } from 'react';

export default function EduPilot() {
  const [teacher, setTeacher] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [objective, setObjective] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const generateLesson = async () => {
    setLoading(true);
    const res = await fetch("edupilot-backend-production.up.railway.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacher, school, grade, subject, topic, objective })
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    setFileUrl(url);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>EduPilot – Lesson Generator</h1>
      <input placeholder="Teacher Name" value={teacher} onChange={(e) => setTeacher(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
      <input placeholder="School" value={school} onChange={(e) => setSchool(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
      <input placeholder="Grade (e.g. 1)" value={grade} onChange={(e) => setGrade(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
      <input placeholder="Subject (e.g. Literacy)" value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
      <input placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
      <input placeholder="Objective" value={objective} onChange={(e) => setObjective(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      <button onClick={generateLesson} disabled={loading} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '1rem' }}>
        {loading ? "Generating..." : "Generate Lesson"}
      </button>
      {fileUrl && <a href={fileUrl} download style={{ color: 'blue', textDecoration: 'underline' }}>Download Lesson Pack</a>}
    </div>
  );
}
