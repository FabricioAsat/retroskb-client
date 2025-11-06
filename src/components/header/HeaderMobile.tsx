import { Logo } from "./Logo";
import { UserIMG } from "../../assets";
import { CustomButton, Form } from "..";

import { ToggleTheme } from "./ToggleTheme";
import { useAuth, useModal, useTheme } from "../../context";
import { LogoutIMG } from "../../assets/LogoutIMG";

export const HeaderMobile = () => {
  const { openModal } = useModal();
  const { isDark } = useTheme();
  const { token, logout } = useAuth();

  function handleOpenModal() {
    openModal(<Form initialForm="login" />);
  }

  function handleLogout() {
    logout();
  }

  return (
    <div
      className={`flex justify-between items-center p-2 mx-auto w-full max-w-[1440px] md:hidden`}
    >
      <Logo WhitText={true} />

      <div className="flex gap-x-5 items-center">
        <ToggleTheme />

        <CustomButton
          onClick={token ? handleLogout : handleOpenModal}
          className="border-transparent"
        >
          {token ? (
            <LogoutIMG
              className={`w-8 h-8 ${
                isDark ? "text-dark-error" : "text-light-error"
              }`}
            />
          ) : (
            <UserIMG
              className={`w-8 h-8 ${
                isDark ? "text-dark-success" : "text-light-success"
              }`}
            />
          )}
        </CustomButton>
      </div>
    </div>
  );
};
