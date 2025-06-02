import React from 'react';
import { Navigate } from 'react-router-dom';

function RutaProtegida({ isLoggedIn, children }) {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default RutaProtegida;