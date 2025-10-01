import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Protects routes that require authentication
export default function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token); // Get auth token from Redux

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect if not authenticated
  }

  return children; // Render protected content if authenticated
}
