import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Modal } from "./components";
import {
  ThemeProvider,
  ModalProvider,
  AuthProvider,
  ToastProvider,
} from "./context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <AuthProvider>
          <ToastProvider>
            <App />
            <Modal />
          </ToastProvider>
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  </StrictMode>
);
