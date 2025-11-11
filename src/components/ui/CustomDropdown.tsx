import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CustomButton } from "./CustomButton";
import { useTheme } from "../../context";

interface DropdownProps {
  label: string;
  disabled: boolean;
  dropdownItems: Array<[key: string, value: string]>;
  handleChange: (field: string) => (value: string) => void;
}
export const CustomDropdown = ({
  label,
  disabled,
  dropdownItems,
  handleChange,
}: DropdownProps) => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  function handleClick(state: string) {
    handleChange("state")(state);
  }

  // Cierro la dropdown si clickeo afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="relative inline-block w-full h-full" ref={dropdownRef}>
      <CustomButton
        disabled={disabled}
        className={`w-full h-full ${label ? "capitalize" : ""}  ${
          isDark
            ? label
              ? "border-dark-success/50"
              : "border-dark-border hover:bg-dark-bg-secondary"
            : label
            ? "border-light-success/50"
            : "border-light-border hover:bg-light-bg-secondary"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {label || "Manga state"}
      </CustomButton>

      <AnimatePresence>
        {open && !disabled && (
          <motion.span
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-40 top-full left-0 w-full mt-1 rounded-lg shadow-lg overflow-hidden border-2 ${
              isDark
                ? "bg-dark-bg-secondary border-dark-border"
                : "bg-light-bg-secondary border-light-border"
            }`}
          >
            {dropdownItems.map(([key, value]) => (
              <button
                type="button"
                key={key}
                onClick={() => {
                  handleClick(value);
                  setOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 capitalize transition-colors cursor-pointer ${
                  isDark ? "hover:bg-dark-bg/75" : "hover:bg-light-bg/75"
                }`}
              >
                {value}
              </button>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </aside>
  );
};
