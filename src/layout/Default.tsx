import { motion } from "motion/react";
import { Outlet } from "react-router";

import {
  AuthRedirect,
  Footer,
  HeaderDesktop,
  HeaderMobile,
  ScrollToTop,
  Searcher,
} from "../components";
import { useAuth, useTheme } from "../context";
import { getColorVar } from "../utils";

export const Default = () => {
  const { isDark } = useTheme();
  const { token } = useAuth();

  return (
    <motion.div
      key={isDark ? "dark" : "light"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`min-h-screen flex flex-col ${
        isDark
          ? "bg-dark-bg text-dark-text border-dark-border"
          : "bg-light-bg text-light-text border-light-border"
      }`}
    >
      <AuthRedirect />
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isDark
            ? getColorVar("--color-dark-bg")
            : getColorVar("--color-light-bg"),
          borderColor: isDark
            ? getColorVar("--color-dark-border")
            : getColorVar("--color-light-border"),
          color: isDark
            ? getColorVar("--color-dark-text")
            : getColorVar("--color-light-text"),
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center border-b-2"
      >
        <HeaderDesktop isDark={isDark} />
        <HeaderMobile />
      </motion.header>

      <ScrollToTop />

      <motion.main
        initial={false}
        animate={{
          backgroundColor: isDark
            ? getColorVar("--color-dark-bg")
            : getColorVar("--color-light-bg"),
          color: isDark
            ? getColorVar("--color-dark-text")
            : getColorVar("--color-light-text"),
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="h-full overflow-y-auto"
      >
        {token && <Searcher />}
        <Outlet />
        <footer
          className={`flex flex-col justify-center items-center border-t-2 ${
            isDark ? "border-dark-border" : "border-light-border"
          } text-text-main pt-4 pb-1 text-center`}
        >
          <Footer />
        </footer>
      </motion.main>
    </motion.div>
  );
};
