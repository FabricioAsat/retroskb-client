import { useEffect } from "react";
import { Hero, PageContainer, Qualities } from "../components";
import { useNavigate } from "react-router";
import { useAuth } from "../context";
import { ROUTES } from "../constants/routes";

export const Home = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate(ROUTES.USER);
    else logout();
  }, []);

  return (
    <PageContainer>
      <Hero />
      <Qualities />
    </PageContainer>
  );
};
