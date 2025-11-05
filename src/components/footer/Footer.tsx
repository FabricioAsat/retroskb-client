import { LogoIMG } from "../../assets";
import { useThemeContext } from "../../context";

export const Footer = () => {
  const { isDark } = useThemeContext();
  return (
    <div className="justify-between items-center p-2 mx-auto w-full flex max-w-[1440px]">
      <span className="flex flex-col gap-y-2">
        <LogoIMG
          className={`w-10 h-10 p-2 rounded-md ${
            isDark
              ? "bg-dark-bg-secondary text-dark-text-muted"
              : "bg-light-bg-secondary text-light-text-muted"
          }`}
        />

        <span
          className={`text-xs italic text-center ${
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          }`}
        >
          &copy; 2026 Retrokb .back - All rights reserved.
        </span>
      </span>
    </div>
  );
};
