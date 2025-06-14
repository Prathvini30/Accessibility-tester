// src/App.js
import React, { useState } from 'react';
import './App.css';
import Results from './components/Results';

const App = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAudit = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('http://localhost:5000/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data.violations);
      }
    } catch (err) {
      setError('Could not audit the website.');
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Accessibility Analyzer 🔍</h1>
      
      <div className="form-section">
        <input
          type="text"
          placeholder="Enter website URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleAudit}>Run Audit</button>
      </div>

      {loading && <p className="status-message">Auditing... Please wait ⏳</p>}
      {error && <p className="error-message">❌ {error}</p>}
      {results && <Results results={results} />}
    </div>
  );
};

export default App;
