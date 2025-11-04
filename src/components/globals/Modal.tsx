import { AnimatePresence, motion } from "motion/react";

import { useModal, useThemeContext } from "../../context";
import { Logo } from "../header/Logo";
import { CloseIMG } from "../../assets";
import { CustomButton } from "..";
import { Portal } from "./Portal";

export function Modal() {
  const { closeModal, isOpen, content } = useModal();
  const { isDark } = useThemeContext();

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={closeModal}
            className={`flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm ${
              isDark
                ? "bg-dark-bg-secondary/25 text-dark-text"
                : "bg-light-bg-secondary/25 text-light-text"
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
              className={`flex flex-col items-start p-2 md:p-5 w-full md:max-w-xl rounded-xl border shadow-lg bg-surface text-text-main ${
                isDark
                  ? "border-dark-border bg-dark-bg-secondary/90"
                  : "border-light-border bg-light-bg-secondary/90"
              }`}
            >
              <div className="flex justify-between items-center mt-2 mb-5 w-full">
                <Logo WhitText={true} />
                <CustomButton
                  onClick={closeModal}
                  className={`p-0.5 border-transparent`}
                >
                  <CloseIMG className="w-9 h-9" />
                </CustomButton>
              </div>

              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
