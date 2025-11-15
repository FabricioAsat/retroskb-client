import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";

import { CustomButton } from "..";
import { useTheme } from "../../context";
import type { IManga } from "../../models";
import { LinkIMG, NotImageIMG } from "../../assets";
import { ROUTES } from "../../constants/routes";
import { normalizeLink } from "../../utils";

export const ListCard = ({
  manga,
  index,
}: {
  manga: IManga;
  index: number;
}) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const color = getMangaColor(manga.updated_at, isDark, hover);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.05,
      }}
      className="w-full h-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CustomButton
        onClick={() => navigate(ROUTES.MANGA_DETAILS + manga._id)}
        color={color}
        className="flex justify-between w-full h-full truncate"
      >
        <p className="w-full truncate text-start" title={manga.name}>
          {manga.name}
        </p>

        <span className="flex items-center gap-5">
          <small className="italic font-semibold">{manga.chapter}</small>
          {manga.link ? (
            <a
              onClick={(e) => e.stopPropagation()}
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
          ) : (
            <span
              title="No link uplaod"
              className={`px-2 py-2 rounded-lg border border-transparent transition-colors duration-300 ${
                isDark
                  ? "bg-dark-bg/90 text-dark-error"
                  : "bg-light-bg/90 text-light-error"
              }`}
            >
              <NotImageIMG className="w-5 h-5" />
            </span>
          )}
        </span>
      </CustomButton>
    </motion.div>
  );
};

// Solo para este componente
function getMangaColor(updatedAt: string, isDark: boolean, hover: boolean) {
  const updated = new Date(updatedAt);
  const now = new Date();

  const diffMs = now.getTime() - updated.getTime();
  const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30); // Aproximado pero suficiente

  let tone = isDark ? "dark" : "light";

  if (!hover) return `${tone}-disabled`;

  if (diffMonths < 1) {
    return `${tone}-success`;
  }
  if (diffMonths < 6) {
    return `${tone}-warning`;
  }
  return `${tone}-error`;
}
