import React, { useState } from 'react';

interface InvoiceData {
  name: string;
  subtitle: string;
  recipient: string;
  startDate: string;
  endDate: string;
  price: string;
  location: string;
  address: string;
  email: string;
  mobile: string;
}

interface InvoiceRow extends InvoiceData {
  date: string;
}

const InvoiceForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [rows, setRows] = useState<InvoiceRow[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceData: InvoiceData = {
      name,
      subtitle,
      recipient,
      startDate,
      endDate,
      price,
      location,
      address,
      email,
      mobile
    };

    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray: Date[] = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dateArray.push(new Date(d));
    }

    setRows(dateArray.map(date => ({
      date: date.toDateString(),
      ...invoiceData
    })));
  };

  return (
    <div>
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Subtitle"
        />
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Home/Clinic"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
        />
        <button type="submit">Generate Invoice</button>
      </form>
      
      {rows.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Subtitle</th>
              <th>Recipient</th>
              <th>Price</th>
              <th>Location</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.name}</td>
                <td>{row.subtitle}</td>
                <td>{row.recipient}</td>
                <td>{row.price}</td>
                <td>{row.location}</td>
                <td>{row.address}</td>
                <td>{row.email}</td>
                <td>{row.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceForm;