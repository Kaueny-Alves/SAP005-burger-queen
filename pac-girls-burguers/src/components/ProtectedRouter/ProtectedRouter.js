import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  const userToken = localStorage.getItem("token");
  return userToken ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
