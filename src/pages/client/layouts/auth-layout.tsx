import React from "react";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      the auth layout is here
      <Outlet />
    </div>
  );
};

export default AuthLayout;
