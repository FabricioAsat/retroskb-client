import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useTheme } from "../../context";
import { CloseIMG, SuccessIMG, WarningIMG } from "../../assets";
import { CustomButton } from "..";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "neutral";
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export const CustomToast = ({
  message,
  type = "neutral",
  show,
  onClose,
  duration = 3000,
}: ToastProps) => {
  const { isDark } = useTheme();
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const colors = {
    neutral: isDark
      ? "bg-dark-text/15 text-dark-text"
      : "bg-light-text/15 text-light-text",
    success: isDark
      ? "bg-dark-success/15 text-dark-success"
      : "bg-light-success/15 text-light-success",
    error: isDark
      ? "bg-dark-error/15 text-dark-error"
      : "bg-light-error/15 text-light-error",
    warning: isDark
      ? "bg-dark-warning/15 text-dark-warning"
      : "bg-light-warning/15 text-light-warning",
  };

  const icon = {
    neutral: null,
    success: <SuccessIMG className="w-5 h-5" />,
    error: <WarningIMG className="w-5 h-5" />,
    warning: <WarningIMG className="w-5 h-5" />,
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className={`flex fixed right-6 bottom-6 justify-between items-center px-4 py-5 w-full max-w-xs rounded-lg shadow-lg md:max-w-sm ${colors[type]} z-[9999]`}
        >
          {icon[type]}
          <p className="pr-3 ml-2 w-full font-bold truncate" title={message}>
            {message}
          </p>

          <CustomButton
            onClick={onClose}
            className="border-transparent cursor-pointer"
          >
            <CloseIMG className="w-5 h-5" />
          </CustomButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
