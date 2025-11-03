import { useThemeContext } from "../../context";
import { SunIMG, MoonIMG } from "../../assets";
import { CustomButton } from "..";

export const ToggleTheme = () => {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <CustomButton onClick={toggleTheme} className="border-transparent">
      {isDark ? (
        <SunIMG className="w-8 h-8" />
      ) : (
        <MoonIMG className="w-7 h-7" />
      )}
    </CustomButton>
  );
};
