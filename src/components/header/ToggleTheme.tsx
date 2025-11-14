import { useTheme } from "../../context";
import { SunIMG, MoonIMG } from "../../assets";
import { CustomButton } from "..";

export const ToggleTheme = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <CustomButton
      onClick={toggleTheme}
      className="h-full py-2 px-2 md:px-1 md:py-1"
      color={isDark ? "dark" : "light"}
    >
      {isDark ? (
        <SunIMG className="w-6 h-6" />
      ) : (
        <MoonIMG className="w-6 h-6" />
      )}
    </CustomButton>
  );
};
