import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Modal } from "./components";
import {
  ThemeProvider,
  ModalProvider,
  ToastProvider,
  AuthProvider,
} from "./context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <ModalProvider>
          <AuthProvider>
            <App />
            <Modal />
          </AuthProvider>
        </ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
