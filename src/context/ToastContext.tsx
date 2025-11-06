import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { CustomToast } from "../components";

type ToastType = "success" | "error" | "warning" | "neutral";

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(
    (message: string, type: ToastType = "neutral") => {
      setToast({ message, type });
      setVisible(true);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <CustomToast
        show={visible}
        message={toast?.message || ""}
        type={toast?.type}
        onClose={() => setVisible(false)}
      />
    </ToastContext.Provider>
  );
};
