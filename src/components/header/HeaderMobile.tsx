import { Logo } from "./Logo";
import { UserIMG } from "../../assets";
import { CustomButton } from "..";

import { ToggleTheme } from "./ToggleTheme";

interface HeaderMobileProps {
  onOpenModal: () => void;
}

export const HeaderMobile = ({ onOpenModal }: HeaderMobileProps) => {
  return (
    <div
      className={`flex justify-between items-center p-2 mx-auto w-full max-w-[1440px] md:hidden`}
    >
      <Logo WhitText={true} />

      <div className="flex gap-x-5 items-center">
        <ToggleTheme />

        <CustomButton onClick={onOpenModal} className="border-transparent">
          <UserIMG className="w-8 h-8" />
        </CustomButton>
      </div>
    </div>
  );
};
