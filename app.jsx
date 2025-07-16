// EduPilot Frontend - React App

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    const res = await fetch("https://your-api-url.com/generate-lesson", {
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">EduPilot – Lesson Generator</h1>
      <Card>
        <CardContent className="space-y-4 p-4">
          <input className="w-full p-2 border" placeholder="Teacher Name" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
          <input className="w-full p-2 border" placeholder="School" value={school} onChange={(e) => setSchool(e.target.value)} />
          <input className="w-full p-2 border" placeholder="Grade (e.g. 1)" value={grade} onChange={(e) => setGrade(e.target.value)} />
          <input className="w-full p-2 border" placeholder="Subject (e.g. Literacy)" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <input className="w-full p-2 border" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
          <input className="w-full p-2 border" placeholder="Objective" value={objective} onChange={(e) => setObjective(e.target.value)} />
          <Button onClick={generateLesson} disabled={loading}>
            {loading ? "Generating..." : "Generate Lesson"}
          </Button>
          {fileUrl && <a href={fileUrl} download className="text-blue-600 underline">Download Lesson Pack</a>}
        </CardContent>
      </Card>
    </div>
  );
}
