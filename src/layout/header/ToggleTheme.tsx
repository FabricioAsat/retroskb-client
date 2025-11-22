import { useTheme } from "../../context";
import { SunIMG, MoonIMG } from "../../assets";
import { CustomButton } from "../../components";

export const ToggleTheme = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <CustomButton
      onClick={toggleTheme}
      className="py-2 px-2 md:px-2 md:py-2"
      color={isDark ? "dark-disabled" : "light-disabled"}
    >
      {isDark ? (
        <SunIMG className="w-6 h-6" />
      ) : (
        <MoonIMG className="w-6 h-6" />
      )}
    </CustomButton>
  );
};
