import { LogoIMG } from "../../assets";
import { useThemeContext } from "../../context";

export const Hero = () => {
  const { isDark } = useThemeContext();
  return (
    <article className="">
      <LogoIMG
        className={`w-12 h-12 rounded-xl p-1  ${
          isDark
            ? "bg-dark-primary text-dark-bg"
            : "bg-light-primary text-light-bg"
        }`}
      />
      <h1 className="mb-2 text-5xl font-bold">Retroskb</h1>
      <p className="text-lg opacity-70">A next-gen motion experience</p>
    </article>
  );
};
