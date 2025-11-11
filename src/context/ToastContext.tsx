import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { CustomToast } from "../components";

type ToastType = "success" | "error" | "warning" | "neutral";

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const toastContext = createContext<ToastContextType | undefined>(undefined);

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
    <toastContext.Provider value={{ showToast }}>
      {children}
      <CustomToast
        show={visible}
        message={toast?.message || ""}
        type={toast?.type}
        onClose={() => setVisible(false)}
      />
    </toastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(toastContext);
  if (!ctx) {
    if (import.meta.env.DEV) {
      console.warn("useToast used outside ToastProvider (dev hot reload)");
      return { toast: () => {}, dismiss: () => {} };
    }
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
