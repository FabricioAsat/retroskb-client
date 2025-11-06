import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context";
import { useLocation } from "react-router";

export const AuthRedirect = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // si hay token y estoy en "/", me manda a /mangas
    if (token && location.pathname === "/") {
      navigate("/mangas");
    }

    // si NO hay token y estoy en una ruta protegida, me manda al home
    if (!token && location.pathname.startsWith("/mangas")) {
      navigate("/");
    }
  }, [token, navigate, location]);

  return null;
};
