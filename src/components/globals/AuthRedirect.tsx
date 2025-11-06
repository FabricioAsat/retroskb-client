import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context";
import { useLocation } from "react-router";
import { ROUTES } from "../../constants/routes";

export const AuthRedirect = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      if (location.pathname === ROUTES.HOME) {
        navigate(ROUTES.USER, { replace: true });
      }
    } else {
      if (location.pathname.startsWith(ROUTES.USER)) {
        navigate(ROUTES.HOME, { replace: true });
      }
    }
  }, [token]);

  return null;
};
