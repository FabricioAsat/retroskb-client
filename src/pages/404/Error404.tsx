import { motion } from "motion/react";
import { useNavigate } from "react-router";

import { useTheme } from "../../context";
import { CustomButton, PageContainer } from "../../components";
import { ROUTES } from "../../constants/routes";

export const Error404 = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div
        className={`flex flex-col justify-center items-center px-4 text-center`}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-8xl font-bold mb-4 ${
            isDark ? "text-dark-error" : "text-light-error"
          }`}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-2xl font-semibold"
        >
          Page not found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`max-w-md mb-8 ${
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          }`}
        >
          It seems you got lost in some non-existent manga 😅 The page is not
          available.
        </motion.p>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <CustomButton
            color={isDark ? "dark-primary" : "light-primary"}
            onClick={() => navigate(ROUTES.HOME)}
            className={`px-5 py-2 rounded-lg ${
              isDark ? "bg-dark-primary" : "bg-light-primary"
            } hover:${
              isDark ? "bg-dark-primary-hover" : "bg-light-primary-hover"
            } transition-colors shadow-md font-medium`}
          >
            Go home
          </CustomButton>
        </motion.span>
      </div>
    </PageContainer>
  );
};
