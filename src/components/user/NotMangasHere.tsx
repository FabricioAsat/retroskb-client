import { CustomButton } from "..";
import { CloseIMG, WarningIMG } from "../../assets";
import { useTheme } from "../../context";
import { motion } from "motion/react";

interface Props {
  label: string;
  buttom?: boolean;
}

export const NotMangasHere = ({ label, buttom }: Props) => {
  const { isDark } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-y-3 justify-center items-center mt-10 w-full"
    >
      <span
        className={`font-bold flex flex-col gap-y-3 justify-center items-center md:text-xl text-lg xl:text-2xl ${
          isDark ? "text-dark-warning" : "text-light-warning"
        }`}
      >
        <WarningIMG className="w-8 h-8 md:w-10 md:h-10 xl:w-16 xl:h-16" />
        <p className={`font-bold`}>{label}</p>
      </span>

      {buttom && (
        <CustomButton color={isDark ? "dark-success" : "light-success"}>
          <CloseIMG className="w-4 h-4 rotate-45" />
          <p>Create your first manga!!</p>
        </CustomButton>
      )}
    </motion.div>
  );
};
