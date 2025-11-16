import { CustomButton } from "..";
import { useTheme } from "../../context";

interface ErrorProps {
  label: string;
  desc: string;
  fetch: () => void;
}

export const Error = ({ label, desc, fetch }: ErrorProps) => {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-center gap-y-2">
      <p
        className={`text-2xl md:text-3xl xl:text-4xl font-bold ${
          isDark ? "text-dark-error" : "text-light-error"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-base italic ${
          isDark ? "text-dark-text-muted" : "text-light-text-muted"
        }`}
      >
        {desc}
      </p>
      <CustomButton
        className="px-4 py-1.5"
        onClick={() => fetch()}
        color={isDark ? "dark-error" : "light-error"}
      >
        Try again
      </CustomButton>
    </div>
  );
};
