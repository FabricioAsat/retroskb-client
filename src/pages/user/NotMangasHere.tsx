import { motion } from "motion/react";

import { WarningIMG } from "../../assets";
import { useTheme } from "../../context";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const NotMangasHere = ({ title, description }: EmptyStateProps) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center justify-center w-full mt-14 px-4 text-center gap-y-4"
    >
      <WarningIMG
        className={`w-12 h-12 md:w-14 md:h-14 xl:w-20 xl:h-20 opacity-80 ${
          isDark ? "text-dark-warning" : "text-light-warning"
        }`}
      />
      <h3
        className={`text-xl md:text-2xl font-bold ${
          isDark ? "text-dark-text/90" : "text-light-text/80"
        }`}
      >
        {title}
      </h3>

      {description && (
        <p
          className={`max-w-md text-base md:text-lg ${
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};
