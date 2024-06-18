import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <h1>Invoice Generator</h1>
      <nav>
        <ul>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Sign In</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
