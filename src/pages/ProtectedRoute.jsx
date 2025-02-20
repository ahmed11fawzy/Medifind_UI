// src/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, isAllowed, userRole }) => {
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasAccess = isAllowed(location.pathname, userRole);
  console.log('Access check:', {
    path: location.pathname,
    role: userRole,
    hasAccess
  });

  if (!hasAccess) {
    // Redirect to home only if not already on home
    return location.pathname === '/home' 
      ? <Navigate to="/login" replace />
      : <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
