import { useState } from "react";

import { ProfileIMG, UserIMG } from "../../assets";
import { Logo } from "./Logo";
import { ToggleTheme } from "./ToggleTheme";
import { useAuth, useModal, useTheme } from "../../context";
import { LogoutIMG } from "../../assets/LogoutIMG";
import { CustomButton, Form } from "../../components";
import { ShowProfile } from "./ShowProfile";

export const HeaderMobile = () => {
  const { openModal } = useModal();
  const { isDark } = useTheme();
  const { token, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  function handleOpenModal() {
    openModal(<Form initialForm="login" />);
  }

  function handleLogout() {
    logout();
  }

  function handleProfile() {
    setShowProfile(!showProfile);
  }

  return (
    <div
      className={`flex relative justify-between items-center p-2 mx-auto w-full max-w-[1440px] md:hidden`}
    >
      <Logo WhitText={true} />

      <div className="flex items-center gap-x-5">
        <ToggleTheme />

        <CustomButton
          onClick={token ? handleLogout : handleOpenModal}
          className="px-2 py-2 md:px-2 md:py-2"
          color={
            isDark
              ? token
                ? "dark-error"
                : "dark-success"
              : token
              ? "light-error"
              : "light-success"
          }
        >
          {token ? (
            <LogoutIMG className={`w-6 h-6`} />
          ) : (
            <UserIMG className={`w-6 h-6`} />
          )}
        </CustomButton>

        {token && (
          <CustomButton
            onClick={handleProfile}
            className="px-2 py-2 md:px-2 md:py-2"
            color={isDark ? "dark-disabled" : "light-disabled"}
          >
            <ProfileIMG className={`w-6 h-6`} />
          </CustomButton>
        )}
        {showProfile && <ShowProfile />}
      </div>
    </div>
  );
};
