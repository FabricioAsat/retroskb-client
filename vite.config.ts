import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("motion")) return "motion";
            if (id.includes("react-router")) return "router";
            if (id.includes("react")) return "react"; // incluye react y react-dom
            return "vendor"; // el resto
          }
        },
      },
    },
  },
});
