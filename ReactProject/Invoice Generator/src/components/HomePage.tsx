import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h2>Welcome to the Invoice Generator</h2>
      <Link to="/invoice">Generate Invoice</Link>
    </div>
  );
};

export default HomePage;