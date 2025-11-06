import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Modal } from "./components";
import { ThemeProvider, ModalProvider, AuthProvider } from "./context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <AuthProvider>
          <App />
          <Modal />
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  </StrictMode>
);
