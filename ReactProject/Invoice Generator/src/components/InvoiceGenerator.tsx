import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { auth, db } from '../firebase'; // Make sure these are correctly configured and exported
import { doc, getDoc } from 'firebase/firestore';

interface UserInfo {
  name: string;
  subtitle: string;
  mobile: string;
  address: string;
}

const InvoiceGenerator: React.FC = () => {
  const [columns, setColumns] = useState<number>(3);
  const [columnTitles, setColumnTitles] = useState<string[]>([]);
  const [columnTypes, setColumnTypes] = useState<string[]>([]);
  const [rows, setRows] = useState<number>(10);
  const [rowData, setRowData] = useState<string[][]>([]);
  const [recipientName, setRecipientName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserInfo(userDoc.data() as UserInfo);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handleColumnTitleChange = (index: number, title: string) => {
    const newTitles = [...columnTitles];
    newTitles[index] = title;
    setColumnTitles(newTitles);
  };

  const handleColumnTypeChange = (index: number, type: string) => {
    const newTypes = [...columnTypes];
    newTypes[index] = type;
    setColumnTypes(newTypes);
  };

  const handleRowDataChange = (rowIndex: number, colIndex: number, data: string) => {
    const newRowData = [...rowData];
    newRowData[rowIndex][colIndex] = data;
    setRowData(newRowData);
  };

  const generateRowData = () => {
    const newData: string[][] = Array.from({ length: rows }, () => Array(columns).fill(""));
    setRowData(newData);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    if (userInfo) {
      doc.text(`Name: ${userInfo.name}`, 10, 10);
      doc.text(`Subtitle/Degree: ${userInfo.subtitle}`, 10, 20);
      doc.text(`Address: ${userInfo.address}`, 10, 30);
      doc.text(`Mobile: ${userInfo.mobile}`, 10, 40);
    }
    doc.text(`Recipient: ${recipientName}`, 10, 50);
    doc.text(`Invoice Period: ${startDate} to ${endDate}`, 10, 60);

    const tableColumn = columnTitles;
    const tableRows = rowData.map((row, _index) => 
      row.map((cell, colIndex) => 
        columnTypes[colIndex] === "date" 
          ? new Date(startDate).toISOString().split('T')[0] 
          : cell)
    );

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("invoice.pdf");
  };

  return (
    <div>
      <h2>Generate Invoice</h2>
      <div>
        <label>Recipient Name:</label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label>Number of Columns:</label>
        <input
          type="number"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
        />
        <button onClick={generateRowData}>Set Columns</button>
      </div>
      {Array.from({ length: columns }).map((_, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Column ${index + 1} Title`}
            onChange={(e) => handleColumnTitleChange(index, e.target.value)}
          />
          <select onChange={(e) => handleColumnTypeChange(index, e.target.value)}>
            <option value="value">Value</option>
            <option value="date">Date</option>
          </select>
        </div>
      ))}
      <div>
        <label>Number of Rows:</label>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
        <button onClick={generateRowData}>Set Rows</button>
      </div>
      {rowData.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((_, colIndex) => (
            <input
              key={colIndex}
              type="text"
              placeholder={`Row ${rowIndex + 1} Col ${colIndex + 1}`}
              onChange={(e) => handleRowDataChange(rowIndex, colIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default InvoiceGenerator;