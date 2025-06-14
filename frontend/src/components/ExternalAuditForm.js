// src/components/ExternalAuditForm.js

import React, { useState } from 'react';

export default function ExternalAuditForm({ setViolations }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAudit = async () => {
    if (!url) return setError('Please enter a URL');

    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setViolations(data.violations);
      } else {
        setError(data.error || 'Error occurred while auditing');
      }
    } catch (err) {
      setError('Could not connect to the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>External Website Accessibility Audit</h2>
      <input
        type="text"
        value={url}
        placeholder="Enter URL (e.g., https://cmrit.ac.in)"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAudit}>Run Audit</button>
      {loading && <p>Loading audit...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
