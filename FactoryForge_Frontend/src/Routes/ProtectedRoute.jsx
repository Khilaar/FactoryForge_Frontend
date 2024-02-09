import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
