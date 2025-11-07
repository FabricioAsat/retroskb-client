import { useState } from "react";
import { CustomButton } from "..";
import { useTheme } from "../../context";
import type { IManga } from "../../models";
import { motion } from "motion/react";

import img from "../../assets/img/poster4.webp";

export const GridCard = ({
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
      className={`overflow-hidden relative px-0 py-0 w-full h-60 rounded-xl max-w-40`}
      onClick={() => {}}
    >
      <motion.div
        className="absolute inset-0 bg-center bg-cover rounded-xl"
        style={{
          backgroundImage: `url(${img})`,
        }}
      />

      <div
        className={`absolute px-1 py-2 w-full bottom-0 backdrop-blur-xs ${
          isDark ? "bg-dark-bg/90" : "bg-light-bg/90"
        }`}
      >
        <p className="w-full text-center truncate" title={manga.name}>
          {manga.name}
        </p>
      </div>
      <div
        className={`absolute px-3 py-0.5 rounded-tr-md top-0 right-0 ${
          isDark ? "bg-dark-bg/90" : "bg-light-bg/90"
        }`}
      >
        <small className="italic font-semibold">{manga.chapter}</small>
      </div>
    </CustomButton>
  );
};
