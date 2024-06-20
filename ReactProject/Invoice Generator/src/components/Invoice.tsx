import React from 'react';

interface InvoiceProps {
  userInfo: {
    name: string;
    subtitle: string;
    address: string;
    mobile: string;
    email: string;
  };
  recipient: string;
  columns: string[];
  rows: { date: string; values: string[] }[];
}

const Invoice: React.FC<InvoiceProps> = ({ userInfo, recipient, columns, rows }) => {
  const total = rows.reduce((sum, row) => sum + row.values.reduce((subSum, value) => subSum + parseFloat(value), 0), 0);

  return (
    <div style={{ padding: '20px', width: '210mm', minHeight: '297mm', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Invoice</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <p><strong>From:</strong></p>
          <p>{userInfo.name}</p>
          <p>{userInfo.subtitle}</p>
          <p>{userInfo.address}</p>
        </div>
        <div>
          <p><strong>To:</strong></p>
          <p>{recipient}</p>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.date}</td>
              {row.values.map((value, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <p><strong>Total: ${total.toFixed(2)}</strong></p>
      </div>
      <div>
        <p><strong>Address:</strong> {userInfo.address}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Mobile:</strong> {userInfo.mobile}</p>
      </div>
    </div>
  );
};

export default Invoice;
