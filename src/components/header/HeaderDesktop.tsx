import { Logo } from "./Logo";
import { CustomButton, Form } from "..";
import { ToggleTheme } from "./ToggleTheme";
import { useAuth, useModal } from "../../context";
import { LogoutIMG, LoginIMG, UserIMG } from "../../assets";

interface HeaderDesktopProps {
  isDark: boolean;
}

export const HeaderDesktop = ({ isDark }: HeaderDesktopProps) => {
  const { openModal } = useModal();
  const { token, logout } = useAuth();

  const handleSelectForm = (form: "login" | "signup") => {
    openModal(<Form initialForm={form} />);
  };

  return (
    <div
      className={`hidden flex-row justify-between items-center p-2 mx-auto w-full md:flex max-w-[1440px]`}
    >
      <Logo WhitText={true} />

      <nav className="flex gap-x-5 items-center">
        <ToggleTheme />

        {token ? (
          <CustomButton
            className="h-full py-4 px-4 md:px-3 md:py-3 truncate gap-x-2"
            onClick={logout}
            color={isDark ? "dark-error" : "light-error"}
          >
            <LogoutIMG className="w-4 h-4" />
            <p className="hidden md:block text-sm">Log out</p>
          </CustomButton>
        ) : (
          <>
            <CustomButton
              onClick={() => handleSelectForm("login")}
              className={`ph-full py-4 px-4 md:px-3 md:py-3 truncate gap-x-2  
            ${
              isDark
                ? "bg-transparent border-dark-border hover:bg-dark-border/50"
                : "bg-transparent border-light-border hover:bg-light-border/25"
            }`}
            >
              <LoginIMG className="w-4 h-4" />
              <p className="hidden md:block text-sm">Log in</p>
            </CustomButton>
            <CustomButton
              className="h-full py-4 px-4 md:px-3 md:py-3 truncate gap-x-2"
              onClick={() => handleSelectForm("signup")}
              color={isDark ? "dark-success" : "light-success"}
            >
              <UserIMG className="w-4 h-4" />
              <p className="hidden md:block text-sm">Sign up</p>
            </CustomButton>
          </>
        )}
      </nav>
    </div>
  );
};
