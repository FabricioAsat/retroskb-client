import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context";
import { ROUTES } from "../../constants/routes";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
