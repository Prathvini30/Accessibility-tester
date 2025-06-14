// src/components/SummaryChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, BarElement, LinearScale, Tooltip, Legend);

const SummaryChart = ({ violations }) => {
  const impactCounts = { minor: 0, moderate: 0, serious: 0, critical: 0 };

  violations.forEach(v => {
    if (impactCounts[v.impact] !== undefined) {
      impactCounts[v.impact]++;
    }
  });

  const data = {
    labels: ['Minor', 'Moderate', 'Serious', 'Critical'],
    datasets: [
      {
        label: 'Accessibility Issues by Severity',
        data: [
          impactCounts.minor,
          impactCounts.moderate,
          impactCounts.serious,
          impactCounts.critical,
        ],
        backgroundColor: ['#fdd', '#fbb', '#f77', '#f33'],
      },
    ],
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Bar data={data} />
    </div>
  );
};

export default SummaryChart;
