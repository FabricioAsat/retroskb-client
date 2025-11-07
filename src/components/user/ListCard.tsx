import { useState } from "react";
import { CustomButton } from "..";
import { useTheme } from "../../context";
import type { IManga } from "../../models";

export const ListCard = ({
  manga,
  colorSelected,
}: {
  manga: IManga;
  colorSelected: string;
}) => {
  const { isDark } = useTheme();
  const [hover, setHover] = useState(false);

  const color = isDark
    ? hover
      ? "dark-" + colorSelected
      : "dark-disabled"
    : hover
    ? "light-" + colorSelected
    : "light-disabled";

  return (
    <CustomButton
      color={color}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex justify-between w-full truncate xl:max-w-sm 2xl:max-w-md`}
      onClick={() => {}}
    >
      <p className="w-full truncate text-start" title={manga.name}>
        {manga.name}
      </p>
      <small className="italic font-semibold">{manga.chapter}</small>
    </CustomButton>
  );
};
