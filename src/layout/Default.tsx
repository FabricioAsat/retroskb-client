import { motion } from "motion/react";
import { Outlet } from "react-router";

import { HeaderDesktop, HeaderMobile, Modal, ScrollToTop } from "../components";
import { useThemeContext } from "../context";
import { getColorVar } from "../utils";
import { useState } from "react";

export const Default = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeContext();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
      key={isDark ? "dark" : "light"} // para reiniciar animación si cambia el tema
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`min-h-screen flex flex-col ${
        isDark
          ? "bg-dark-bg text-dark-text border-dark-border"
          : "bg-light-bg text-light-text border-light-border"
      }`}
    >
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
        className="flex flex-col justify-center items-center border-b-2"
      >
        <HeaderDesktop isDark={isDark} onOpenModal={openModal} />
        <HeaderMobile isDark={isDark} onOpenModal={openModal} />
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
        className="overflow-y-auto h-full"
      >
        <section className="h-full max-w-[1440px] w-full mx-auto">
          <Outlet />
          <button onClick={toggleTheme}>Change Theme</button>
        </section>
      </motion.main>

      <Modal show={isModalOpen} onClose={closeModal}>
        <small>TODO: Formularios de Log in y Sign up</small>
      </Modal>
    </motion.div>
  );
};
