import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return auth.currentUser ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;