import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const validateLoggedIn = () => {};

  const LogIn = () => {
    setIsLoggedIn(true);
  };

  const LogOut = () => {
    setIsLoggedIn(false);
  };

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ origin: location.pathname }} />;
  } else {
    return <Outlet />;
  }
}
