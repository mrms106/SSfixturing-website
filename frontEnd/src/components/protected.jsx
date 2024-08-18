import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isloggedIn, children }) => {
    console.log(isloggedIn)
  return isloggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
