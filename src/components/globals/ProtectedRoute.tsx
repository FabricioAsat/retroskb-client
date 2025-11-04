import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("auth_token"); // esto vendra en jwt (creo)

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
