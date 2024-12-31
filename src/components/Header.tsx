import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {auth.currentUser ? (
          <>
            <Link to="/invoice">Generate Invoice</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
