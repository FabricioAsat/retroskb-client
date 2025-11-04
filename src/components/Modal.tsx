import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useThemeContext } from "../context";
import { Logo } from "./header/Logo";
import { CloseIMG } from "../assets";
import { CustomButton } from ".";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}
export function Modal({ children, show, onClose }: ModalProps) {
  const { isDark } = useThemeContext();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={onClose}
          className={`flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm ${
            isDark ? "bg-dark-bg-secondary/25" : "bg-light-bg-secondary/25"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex flex-col items-start p-6 w-full md:max-w-xl rounded-xl border shadow-lg bg-surface text-text-main ${
              isDark
                ? "border-dark-border bg-dark-bg-secondary/90"
                : "border-light-border bg-light-bg-secondary/90"
            }`}
          >
            <div className="flex justify-between items-center mt-2 mb-5 w-full">
              <Logo WhitText={true} />
              <CustomButton
                onClick={onClose}
                className={`p-0.5 border-transparent`}
              >
                <CloseIMG className="w-9 h-9" />
              </CustomButton>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
