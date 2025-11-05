import type { ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit" | "reset";
}

export const CustomButton = ({
  children,
  onClick,
  color = "none",
  className,
  type = "button",
}: ButtonProps) => {
  const colorMap: Record<string, string> = {
    none: "",

    light: "px-4 py-1.5 bg-light-bg text-light-text border-light-bg",
    "light-primary":
      "px-4 py-1.5 bg-light-primary text-white border-light-primary",
    "light-secondary":
      "px-4 py-1.5 bg-light-secondary text-white border-light-secondary",
    "light-success":
      "px-4 py-1.5 bg-light-success text-white border-light-success",
    "light-warning":
      "px-4 py-1.5 bg-light-warning text-white border-light-warning",
    "light-error": "px-4 py-1.5 bg-light-error text-white border-light-error",

    dark: "px-4 py-1.5 bg-dark-bg text-dark-text border-dark-bg",
    "dark-primary":
      "px-4 py-1.5 bg-dark-primary text-white border-dark-primary",
    "dark-secondary":
      "px-4 py-1.5 bg-dark-secondary text-white border-dark-secondary",
    "dark-success":
      "px-4 py-1.5 bg-dark-success text-white border-dark-success",
    "dark-warning":
      "px-4 py-1.5 bg-dark-warning text-white border-dark-warning",
    "dark-error": "px-4 py-1.5 bg-dark-error text-white border-dark-error",
  };

  const baseStyle = colorMap[color];

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05, opacity: 0.95 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`flex gap-2 justify-center items-center font-bold rounded-xl border-2 transition-colors duration-200 cursor-pointer ${baseStyle} ${className}`}
    >
      <span>{children}</span>
    </motion.button>
  );
};
