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
      <ModalProvider>
        <ToastProvider>
          <AuthProvider>
            <App />
            <Modal />
          </AuthProvider>
        </ToastProvider>
      </ModalProvider>
    </ThemeProvider>
  </StrictMode>
);
