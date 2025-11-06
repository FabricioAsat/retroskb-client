import { motion } from "motion/react";
import { useTheme } from "../../context";

export const Loader = () => {
  const { isDark } = useTheme();
  return (
    <div className="flex gap-x-2 justify-center items-center bg-transparent">
      <motion.div
        className={`w-4 h-4 rounded-full border-2 border-t-transparent ${
          isDark ? "border-dark-text-muted" : "border-light-text-muted"
        }`}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
      <p className="italic">Loading...</p>
    </div>
  );
};
