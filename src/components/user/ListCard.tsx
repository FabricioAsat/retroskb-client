import { motion } from "motion/react";
import { useState } from "react";
import { CustomButton } from "..";
import { useTheme } from "../../context";
import type { IManga } from "../../models";
import { LinkIMG } from "../../assets";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";
import { normalizeLink } from "../../utils";

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
  const navigate = useNavigate();
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
      className="w-full lg:max-w-md xl:max-w-sm 2xl:max-w-md"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CustomButton
        onClick={() => navigate(ROUTES.MANGA_DETAILS + manga._id)}
        color={color}
        className="flex justify-between w-full truncate"
      >
        <p className="w-full truncate text-start" title={manga.name}>
          {manga.name}
        </p>

        <span className="flex items-center gap-5">
          <small className="italic font-semibold">{manga.chapter}</small>
          {manga.link && (
            <a
              href={normalizeLink(manga.link)}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-2 py-2 rounded-lg border border-transparent transition-colors duration-300 ${
                isDark
                  ? "bg-dark-bg/90 hover:border-dark-primary text-dark-primary"
                  : "bg-light-bg/90 hover:border-light-primary text-light-primary"
              }`}
            >
              <LinkIMG className="w-5 h-5" />
            </a>
          )}
        </span>
      </CustomButton>
    </motion.div>
  );
};
