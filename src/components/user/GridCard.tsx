import { useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";

import { CustomButton } from "..";
import { useTheme } from "../../context";
import type { IManga } from "../../models";
import { NotImage } from "./NotImage";
import { LinkIMG } from "../../assets";
import { ROUTES } from "../../constants/routes";
import { normalizeLink } from "../../utils";

export const GridCard = ({
  manga,
  colorSelected,
  index,
}: {
  manga: IManga;
  colorSelected: string;
  index: number;
}) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const color = isDark
    ? hover
      ? "dark-" + colorSelected
      : "dark-disabled"
    : hover
    ? "light-" + colorSelected
    : "light-disabled";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.05,
      }}
      className="w-full rounded-lg h-60 max-w-40"
    >
      {manga.image && (
        <img
          src={manga.image}
          alt={manga.name}
          className="hidden"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      )}

      <CustomButton
        color={color}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`relative w-full h-full`}
        onClick={() => navigate(ROUTES.MANGA_DETAILS + manga._id)}
      >
        {!loaded ? (
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-lg ${
              isDark ? "bg-dark-bg/40" : "bg-light-bg/40"
            }`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className={`w-8 h-8 border-4 border-t-transparent rounded-full ${
                isDark ? "border-dark-primary" : "border-light-primary"
              }`}
            />
          </div>
        ) : !manga.image ? (
          <NotImage />
        ) : (
          <motion.div
            className="absolute inset-0 bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url(${manga.image})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div
          className={`absolute px-1 py-2 w-full bottom-0 rounded-b-lg backdrop-blur-xs ${
            isDark ? "bg-dark-bg/90" : "bg-light-bg/90"
          }`}
        >
          <p className="w-full text-center truncate" title={manga.name}>
            {manga.name}
          </p>
        </div>
        {manga.link && (
          <a
            onClick={(e) => e.stopPropagation()}
            href={normalizeLink(manga.link)}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute px-2 py-2 rounded-lg top-0 border border-transparent transition-colors duration-300 right-0 ${
              isDark
                ? "bg-dark-bg/90 hover:border-dark-primary text-dark-primary"
                : "bg-light-bg/90 hover:border-light-primary text-light-primary"
            }`}
          >
            <LinkIMG className="w-6 h-6" />
          </a>
        )}
        <div
          className={`absolute px-3 py-0.5 rounded-tl-lg top-0 left-0 ${
            isDark ? "bg-dark-bg/90" : "bg-light-bg/90"
          }`}
        >
          <small className="italic font-semibold">{manga.chapter}</small>
        </div>
      </CustomButton>
    </motion.div>
  );
};
