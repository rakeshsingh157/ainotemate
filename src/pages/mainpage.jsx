// src/pages/Notemate.jsx (React)
import React, { useState } from 'react';

function Notemate() {
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setSummary('');
    setError('');

    if (!content.trim()) {
      setError('Please enter some text to summarize.');
      setLoading(false);
      return;
    }

    const API_ENDPOINT = 'https://ai-notemake.vercel.app/api/chat';

    try {
      console.log("📢 Sending Request to API with content:", content);

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: 'user123',
          message: content.trim(),
        }),
      });

      console.log("📢 Response Status:", response.status);

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        console.error("🚫 Server Response Error:", errorMessage);

        if (response.status === 404) {
          errorMessage = 'API endpoint not found.';
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("✅ API Response Data:", data);

      if (data && data.response) {
        setSummary(data.response);
        setContent('');
      } else {
        console.error("🚫 Invalid Response Format:", data);
        setError('Invalid response from the server.');
      }
    } catch (err) {
      console.error("🚫 Fetch Error (Full Error Object):", err);
      setError(err.message || 'Failed to generate summary. Please check your network or API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>ΛI ПӨƬΣMΛƬΣ</h1>
      <p style={styles.description}>A summarizer for all your notes</p>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your notes here..."
        style={styles.textarea}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !content.trim()}
        style={styles.button}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && <p style={styles.error}>⚠️ {error}</p>}

      {summary && (
        <div style={styles.summaryContainer}>
          <h2 style={styles.summaryHeading}>Summary:</h2>
          <p style={styles.summaryText}>{summary}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#F97316',
    padding: '20px',
    color: 'white',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '20px',
  },
  textarea: {
    width: '80%',
    maxWidth: '600px',
    height: '200px',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    resize: 'vertical',
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  summaryContainer: {
    width: '80%',
    maxWidth: '600px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: 'black',
  },
  summaryHeading: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  summaryText: {
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Notemate;