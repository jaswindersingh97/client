import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isPublic = false }) => {
    const token = localStorage.getItem('token');

    if (isPublic && token) {
        return <Navigate to="/dashboard" replace />;
    }

    if (!isPublic && !token) {
        return <Navigate to="/signIn" replace />;
    }

    return element; 
};

export default ProtectedRoute;
