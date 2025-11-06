import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

const themeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.getItem("isDark") === "true" || false
  );

  function toggleTheme() {
    setIsDark(!isDark);
    localStorage.setItem("isDark", !isDark ? "true" : "false");
  }

  return (
    <themeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
