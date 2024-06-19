import { forwardRef } from 'react';

interface InvoiceProps {
  recipientName: string;
  startDate: string;
  endDate: string;
  columnTitles: string[];
  rowData: string[][];
  userInfo: {
    name: string;
    subtitle: string;
    mobile: string;
    address: string;
  };
}

const Invoice = forwardRef<HTMLDivElement, InvoiceProps>((props, ref) => {
  const { recipientName, startDate, endDate, columnTitles, rowData, userInfo } = props;

  return (
    <div ref={ref} className="invoice">
      <h1>Invoice</h1>
      <div>
        <strong>Name:</strong> {userInfo.name}
      </div>
      <div>
        <strong>Subtitle/Degree:</strong> {userInfo.subtitle}
      </div>
      <div>
        <strong>Address:</strong> {userInfo.address}
      </div>
      <div>
        <strong>Mobile:</strong> {userInfo.mobile}
      </div>
      <div>
        <strong>Recipient:</strong> {recipientName}
      </div>
      <div>
        <strong>Invoice Period:</strong> {startDate} to {endDate}
      </div>
      <table>
        <thead>
          <tr>
            {columnTitles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Invoice;