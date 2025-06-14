import jsPDF from 'jspdf';

export default function Report({ violations }) {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Accessibility Audit Report', 10, 10);
    violations.forEach((v, i) => {
      doc.text(`${i + 1}. ${v.description}`, 10, 20 + i * 10);
    });
    doc.save('audit-report.pdf');
  };

  return (
    <button onClick={downloadPDF}>Download PDF Report</button>
  );
}
