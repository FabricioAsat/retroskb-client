import { Logo } from "./Logo";
import { CustomButton } from "..";
import { ToggleTheme } from "./ToggleTheme";

export const HeaderDesktop = ({
  isDark,
  onOpenModal,
}: {
  isDark: boolean;
  onOpenModal: () => void;
}) => {
  return (
    <div
      className={`hidden flex-row justify-between items-center p-2 mx-auto w-full md:flex max-w-[1440px]`}
    >
      <Logo WhitText={true} />

      <nav className="flex gap-x-5 items-center">
        <ToggleTheme />
        <CustomButton
          onClick={onOpenModal}
          className={`px-4 py-1.5 
            ${
              isDark
                ? "bg-transparent border-dark-border hover:bg-dark-border/50"
                : "bg-transparent border-light-border hover:bg-light-border/25"
            }`}
        >
          Log in
        </CustomButton>
        <CustomButton
          onClick={onOpenModal}
          color={isDark ? "dark-primary" : "light-primary"}
        >
          Sign up
        </CustomButton>
      </nav>
    </div>
  );
};
