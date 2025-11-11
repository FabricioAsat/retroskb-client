import { useNavigate } from "react-router";
import { motion } from "motion/react";

import { useTheme } from "../../context";
import { PageContainer } from "../globals/PageContainer";
import { CustomButton } from "../ui/CustomButton";

interface ErrorProps {
  fetch: () => void;
  status: number;
}

export const MangaError = ({ fetch, status = 500 }: ErrorProps) => {
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
          {status || 500}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-2xl font-semibold"
        >
          Error fetching manga
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`max-w-md mb-8 ${
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          }`}
        >
          There was an error while trying to fetch the manga. Please try again
        </motion.p>

        <motion.span
          className="flex items-center gap-x-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <CustomButton
            color={isDark ? "dark-primary" : "light-primary"}
            onClick={() => navigate("/")}
          >
            Go home
          </CustomButton>
          <CustomButton
            color={isDark ? "dark-error" : "light-error"}
            onClick={fetch}
          >
            Try again
          </CustomButton>
        </motion.span>
      </div>
    </PageContainer>
  );
};
