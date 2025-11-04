import { Logo } from "./Logo";
import { UserIMG } from "../../assets";
import { CustomButton, Form } from "..";

import { ToggleTheme } from "./ToggleTheme";
import { useModal } from "../../context";

export const HeaderMobile = () => {
  const { openModal } = useModal();

  function handleOpenModal() {
    openModal(<Form initialForm="login" />);
  }

  return (
    <div
      className={`flex justify-between items-center p-2 mx-auto w-full max-w-[1440px] md:hidden`}
    >
      <Logo WhitText={true} />

      <div className="flex gap-x-5 items-center">
        <ToggleTheme />

        <CustomButton onClick={handleOpenModal} className="border-transparent">
          <UserIMG className="w-8 h-8" />
        </CustomButton>
      </div>
    </div>
  );
};
