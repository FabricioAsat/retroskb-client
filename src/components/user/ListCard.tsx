import { motion } from "motion/react";
import { useState } from "react";
import { CustomButton } from "..";
import { useTheme } from "../../context";
import type { IManga } from "../../models";

export const ListCard = ({
  manga,
  index,
  colorSelected,
}: {
  manga: IManga;
  index: number;
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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.05,
      }}
      className="w-full xl:max-w-sm 2xl:max-w-md"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CustomButton
        color={color}
        className="flex justify-between w-full truncate"
      >
        <p className="w-full truncate text-start" title={manga.name}>
          {manga.name}
        </p>
        <small className="italic font-semibold">{manga.chapter}</small>
      </CustomButton>
    </motion.div>
  );
};
