import { useState } from "react";
import { CustomButton } from "..";
import { useTheme } from "../../context";
import type { IManga } from "../../models";
import { motion } from "motion/react";

import img from "../../assets/img/poster4.webp";

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
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const color = isDark
    ? hover
      ? "dark-" + colorSelected
      : "dark-disabled"
    : hover
    ? "light-" + colorSelected
    : "light-disabled";

  console.log(loaded);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.05,
      }}
      className="w-full h-60 rounded-xl max-w-40"
    >
      <img
        src={img}
        alt={manga.name}
        className="hidden"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />

      <CustomButton
        color={color}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`relative w-full h-full`}
        onClick={() => {}}
      >
        {!loaded ? (
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-xl ${
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
        ) : (
          <motion.div
            className="absolute inset-0 bg-center bg-cover rounded-xl"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div
          className={`absolute px-1 py-2 w-full bottom-0 rounded-b-xl backdrop-blur-xs ${
            isDark ? "bg-dark-bg/90" : "bg-light-bg/90"
          }`}
        >
          <p className="w-full text-center truncate" title={manga.name}>
            {manga.name}
          </p>
        </div>
        <div
          className={`absolute px-3 py-0.5 rounded-tr-xl top-0 right-0 ${
            isDark ? "bg-dark-bg/90" : "bg-light-bg/90"
          }`}
        >
          <small className="italic font-semibold">{manga.chapter}</small>
        </div>
      </CustomButton>
    </motion.div>
  );
};
