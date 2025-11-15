import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;