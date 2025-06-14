import React, { useEffect, useState } from 'react';
import axe from 'axe-core';

export default function AuditForm({ setViolations }) {
  const handleAudit = () => {
    axe.run(document, {}, (err, results) => {
      if (err) throw err;
      setViolations(results.violations);
    });
  };

  return (
    <div>
      <h2>Click below to run audit</h2>
      <button onClick={handleAudit}>Run Accessibility Audit</button>
    </div>
  );
}
