import { motion } from "motion/react";
import { useModal, useTheme, useToast } from "../../context";
import { LogoIMG } from "../../assets";
import { CustomButton, Form } from "..";

export const Hero = () => {
  const { isDark } = useTheme();
  const { showToast } = useToast();
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(<Form initialForm="signup" />);
  };

  return (
    <motion.article
      className="flex flex-col items-center justify-center p-2 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <LogoIMG
          className={`w-12 h-12 rounded-xl p-1.5 ${
            isDark
              ? "bg-dark-primary text-dark-bg"
              : "bg-light-primary text-light-bg"
          }`}
        />
      </motion.div>

      {/* Textos */}
      <span className="flex flex-col items-center max-w-lg">
        <motion.h2
          className={`mb-2 text-3xl md:text-4xl xl:text-5xl font-bold ${
            isDark ? "text-dark-primary" : "text-light-primary"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Retroskb.
        </motion.h2>

        <motion.p
          className="mb-2 text-3xl md:text-4xl xl:text-5xl font-bold text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          A new way to organise your mangas
        </motion.p>

        <motion.p
          className={`text-base text-center italic ${
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Start managing and organising your series easily, efficiently and
          neatly!
        </motion.p>

        {/* Botón */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <CustomButton
            onClick={handleOpenModal}
            color={isDark ? "light" : "dark"}
            className="mt-4"
          >
            Try it now!
          </CustomButton>
        </motion.div>
      </span>
    </motion.article>
  );
};
