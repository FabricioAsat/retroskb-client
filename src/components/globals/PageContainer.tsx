import type { ReactNode } from "react";

import bg from "../../assets/img/background.png";
import { useThemeContext } from "../../context";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  const { isDark } = useThemeContext();
  return (
    <section className="relative h-full min-h-screen w-full max-w-[1440px] mx-auto overflow-hidden">
      {/* Imagen de fondo (lgoo) */}
      <div
        className={`absolute inset-0 bg-center bg-cover blur-xs ${
          isDark ? "opacity-40" : "opacity-10"
        }`}
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
};
