import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import ClientsList from './pages/client-list/ClientsList';
import ClientForm from './pages/client-form/ClientForm';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      {/* Header displayed on all pages */}
      <Header />

      {/* Application routes */}
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes for authenticated users */}
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/new"
          element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/:id"
          element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
