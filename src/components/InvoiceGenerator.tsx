import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Invoice from './Invoice';

const InvoiceGenerator: React.FC = () => {
  const [columns, setColumns] = useState<number>(3);
  const [columnTitles, setColumnTitles] = useState<string[]>([]);
  const [columnTypes, setColumnTypes] = useState<string[]>([]);
  const [rows, setRows] = useState<number>(10);
  const [rowData, setRowData] = useState<{ date: string; values: string[] }[]>([]);
  const [recipient, setRecipient] = useState<string>('');
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    subtitle: '1234 Main St.',
    address: 'Springfield, IL 62701',
    mobile: '(555) 555-5555',
    email: 'john.doe@example.com'
  });

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
    newRowData[rowIndex].values[colIndex] = data;
    setRowData(newRowData);
  };

  const generateRowData = () => {
    const newData = Array.from({ length: rows }, (_, rowIndex) => ({
      date: `2024-01-${rowIndex + 1}`,
      values: Array(columns).fill('')
    }));
    setRowData(newData);
  };

  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: 'Invoice',
    pageStyle: '@page { size: A4; }'
  });

  return (
    <div>
      <h2>Generate Invoice</h2>
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
      <div>
        <label>Recipient Name:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      {rowData.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.values.map((_, colIndex) => (
            <input
              key={colIndex}
              type="text"
              placeholder={`Row ${rowIndex + 1} Col ${colIndex + 1}`}
              onChange={(e) => handleRowDataChange(rowIndex, colIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
      <button onClick={handlePrint}>Print Invoice</button>
      <div style={{ display: 'none' }}>
        <Invoice
          ref={invoiceRef}
          userInfo={userInfo}
          recipient={recipient}
          columns={columnTitles}
          rows={rowData}
        />
      </div>
    </div>
  );
};

export default InvoiceGenerator;
