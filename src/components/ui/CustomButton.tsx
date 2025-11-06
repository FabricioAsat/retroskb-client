import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useTheme } from "../../context";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const CustomButton = ({
  children,
  onClick,
  color = "none",
  className,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const { isDark } = useTheme();
  const colorMap: Record<string, string> = {
    none: "",

    light: "bg-light-bg text-light-text border-light-bg",
    "light-primary":
      "bg-light-primary/15 text-light-primary border-light-primary/15",
    "light-secondary":
      "bg-light-secondary/15 text-light-secondary border-light-secondary/15",
    "light-success":
      "bg-light-success/15 text-light-success border-light-success/15",
    "light-warning":
      "bg-light-warning/15 text-light-warning border-light-warning/15",
    "light-error": "bg-light-error/15 text-light-error border-light-error/15",
    "light-disabled":
      "bg-light-disabled/15 text-light-text-muted border-light-disabled/15",

    dark: "bg-dark-bg text-dark-text border-dark-bg",
    "dark-primary":
      "bg-dark-primary/15 text-dark-primary border-dark-primary/15",
    "dark-secondary":
      "bg-dark-secondary/15 text-dark-secondary border-dark-secondary/15",
    "dark-success":
      "bg-dark-success/15 text-dark-success border-dark-success/15",
    "dark-warning":
      "bg-dark-warning/15 text-dark-warning border-dark-warning/15",
    "dark-error": "bg-dark-error/15 text-dark-error border-dark-error/15",
    "dark-disabled":
      "bg-dark-disabled/15 text-dark-text-muted border-dark-disabled/15",
  };

  const baseStyle = colorMap[color];

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05, opacity: disabled ? 1 : 0.95 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`flex px-4 py-1.5 gap-2 justify-center items-center font-bold rounded-xl border-2 transition-colors duration-200 cursor-pointer ${
        disabled ? "" : baseStyle
      } ${className} disabled:cursor-not-allowed ${
        isDark
          ? "disabled:bg-dark-disabled disabled:text-dark-text-muted disabled:border-dark-disabled"
          : "disabled:bg-light-disabled disabled:text-light-text-muted disabled:border-light-disabled"
      }`}
    >
      <span>{children}</span>
    </motion.button>
  );
};
