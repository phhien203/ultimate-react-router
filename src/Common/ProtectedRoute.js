import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ authenticated, redirectTo }) => {
  return authenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
