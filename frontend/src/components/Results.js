// src/components/Results.js
import React from 'react';
import './Results.css';
import SummaryChart from './SummaryChart';

const Results = ({ results }) => {
  if (!results || results.length === 0) {
    return <p style={{ textAlign: 'center' }}>No accessibility issues found 🎉</p>;
  }

  return (
    <div className="results-container">
      <h2>Accessibility Audit Results</h2>
      <SummaryChart violations={results} />

      {results.map((violation, index) => (
        <div key={index} className="violation-card">
          <h3>
            {violation.help}{' '}
            <span className={`impact ${violation.impact}`}>({violation.impact})</span>
          </h3>
          <p>{violation.description}</p>
          <ul>
            {violation.nodes.map((node, idx) => (
              <li key={idx}>
                <strong>Element:</strong> <code>{node.target.join(', ')}</code>
                <br />
                {node.failureSummary && (
                  <>
                    <strong>Why:</strong> {node.failureSummary}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Results;
