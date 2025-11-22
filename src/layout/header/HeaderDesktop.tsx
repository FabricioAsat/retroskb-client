import { useState } from "react";

import { useAuth, useModal } from "../../context";
import { LogoutIMG, LoginIMG, UserIMG, ProfileIMG } from "../../assets";
import { CustomButton, Form } from "../../components";
import { ToggleTheme } from "./ToggleTheme";
import { Logo } from "./Logo";
import { ShowProfile } from "./ShowProfile";

interface HeaderDesktopProps {
  isDark: boolean;
}

export const HeaderDesktop = ({ isDark }: HeaderDesktopProps) => {
  const { openModal } = useModal();
  const { token, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleSelectForm = (form: "login" | "signup") => {
    openModal(<Form initialForm={form} />);
  };

  function handleProfile() {
    setShowProfile(!showProfile);
  }

  return (
    <div
      className={`hidden relative flex-row justify-between items-center p-2 mx-auto w-full md:flex max-w-[1440px]`}
    >
      <Logo WhitText={true} />

      <nav className="flex items-center gap-x-5">
        <ToggleTheme />

        {token ? (
          <>
            <CustomButton
              className="h-full px-4 py-4 truncate md:px-3 md:py-3 gap-x-2"
              onClick={logout}
              color={isDark ? "dark-error" : "light-error"}
            >
              <LogoutIMG className="w-4 h-4" />
              <p className="hidden text-sm md:block">Log out</p>
            </CustomButton>
            <CustomButton
              onClick={handleProfile}
              className="px-2 py-2 md:px-2 md:py-2"
              color={isDark ? "dark-disabled" : "light-disabled"}
            >
              <ProfileIMG className={`w-6 h-6`} />
            </CustomButton>
            {showProfile && <ShowProfile />}
          </>
        ) : (
          <>
            <CustomButton
              onClick={() => handleSelectForm("login")}
              color={isDark ? "dark-disabled" : "light-disabled"}
              className={`ph-full py-4 px-4 md:px-3 md:py-3 truncate gap-x-2`}
            >
              <LoginIMG className="w-4 h-4" />
              <p className="hidden text-sm md:block">Log in</p>
            </CustomButton>
            <CustomButton
              className="h-full px-4 py-4 truncate md:px-3 md:py-3 gap-x-2"
              onClick={() => handleSelectForm("signup")}
              color={isDark ? "dark-success" : "light-success"}
            >
              <UserIMG className="w-4 h-4" />
              <p className="hidden text-sm md:block">Sign up</p>
            </CustomButton>
          </>
        )}
      </nav>
    </div>
  );
};
