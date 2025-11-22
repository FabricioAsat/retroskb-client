import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../context";
import { ROUTES } from "../../constants/routes";
import { PageContainer } from "../../components";
import { Hero } from "./Hero";
import { Qualities } from "./Qualities";

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
