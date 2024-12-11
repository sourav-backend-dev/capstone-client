// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check for token in localStorage
  return token ? children : <Navigate to="/login" />; // Redirect to login if no token
};

export default ProtectedRoute;
