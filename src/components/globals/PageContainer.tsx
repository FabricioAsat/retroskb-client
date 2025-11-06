import type { ReactNode } from "react";

import bg from "../../assets/img/background.png";
import { useTheme } from "../../context";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  const { isDark } = useTheme();
  return (
    <section className="relative h-full min-h-[calc(100vh-72px)] w-full max-w-[1440px] mx-auto overflow-hidden flex items-center justify-center">
      {/* Imagen de fondo (lgoo) */}
      <div
        className={`absolute inset-0 bg-center bg-cover blur-xs ${
          isDark ? "opacity-25" : "opacity-10"
        }`}
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
};
