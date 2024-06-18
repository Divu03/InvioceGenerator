import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoiceGenerator: React.FC = () => {
  const navigate = useNavigate();

  if (!auth.currentUser) {
    navigate('/login');
  }

  const [recipient, setRecipient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numColumns, setNumColumns] = useState(3);
  const [numRows, setNumRows] = useState(15);

  const handleSaveAndGeneratePDF = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    try {
      const invoiceRef = await addDoc(collection(db, 'invoices'), {
        userId,
        recipient,
        startDate,
        endDate,
        numColumns,
        numRows,
        columns: Array.from({ length: numColumns }, (_, index) => `Column ${index + 1}`),
        createdAt: Timestamp.now(),
      });

      console.log('Invoice saved with ID:', invoiceRef.id);

      generatePDF(invoiceRef.id);
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const generatePDF = (invoiceId: string) => {
    const doc = new jsPDF();
    const columns = Array.from({ length: numColumns }, (_, index) => `Column ${index + 1}`);
    const rows = Array.from({ length: numRows }, () => Array.from({ length: numColumns }, () => ' '));

    doc.text('Invoice', 14, 16);
    doc.text(`Invoice ID: ${invoiceId}`, 14, 22);
    doc.text(`Recipient: ${recipient}`, 14, 28);
    doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 34);

    (doc as any).autoTable({
      startY: 38,
      head: [columns],
      body: rows,
    });

    doc.save('invoice.pdf');
  };

  return (
    <div>
      <h2>Invoice Generator</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSaveAndGeneratePDF(); }}>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient Name"
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <input
          type="number"
          value={numColumns}
          onChange={(e) => setNumColumns(Number(e.target.value))}
          placeholder="Number of Columns"
          required
        />
        <input
          type="number"
          value={numRows}
          onChange={(e) => setNumRows(Number(e.target.value))}
          placeholder="Number of Rows"
          required
        />
        <button type="submit">Save & Generate PDF</button>
      </form>
    </div>
  );
};

export default InvoiceGenerator;