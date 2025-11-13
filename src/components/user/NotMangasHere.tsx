import { motion } from "motion/react";
import {  WarningIMG } from "../../assets";
import { useTheme } from "../../context";

interface Props {
  label: string;
}

export const NotMangasHere = ({ label }: Props) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center w-full mt-10 gap-y-3"
    >
      <span
        className={`font-bold flex flex-col gap-y-3 justify-center items-center md:text-xl text-lg xl:text-2xl ${
          isDark ? "text-dark-warning" : "text-light-warning"
        }`}
      >
        <WarningIMG className="w-8 h-8 md:w-10 md:h-10 xl:w-16 xl:h-16" />
        <p className={`font-bold`}>{label}</p>
      </span>

    </motion.div>
  );
};
