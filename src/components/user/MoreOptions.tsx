import { AnimatePresence, motion, type Variants } from "motion/react";
import { CustomButton } from "../ui/CustomButton";
import { useState } from "react";
import { useTheme } from "../../context";
import { CloseIMG, ExportIMG, HamburgerIMG, ImportIMG } from "../../assets";

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
};

export const MoreOptions = () => {
  const [isOpenMoreOptions, setIsOpenMoreOptions] = useState<boolean>(false);
  const { isDark } = useTheme();

  return (
    <span className="relative h-full mb-2">
      <CustomButton
        title="More options"
        onClick={() => setIsOpenMoreOptions(!isOpenMoreOptions)}
        color={isDark ? "dark-secondary" : "light-secondary"}
        className="h-full px-4 py-4 capitalize gap-x-2 md:px-4 md:py-2"
      >
        {isOpenMoreOptions ? (
          <CloseIMG className="w-4 h-4" />
        ) : (
          <HamburgerIMG className="w-4 h-4" />
        )}
      </CustomButton>

      <AnimatePresence>
        {isOpenMoreOptions && (
          <motion.div
            key="more-options"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`flex flex-col gap-y-1 items-center z-50 justify-center absolute bottom-16 md:top-16 h-fit right-0 rounded-lg md:py-4 pl-4 backdrop-blur-xs ${
              isDark ? "bg-dark-bg/50" : "bg-light-bg/50"
            }`}
          >
            <CustomButton
              color={isDark ? "dark-secondary" : "light-secondary"}
              className="h-full flex items-center md:h-full px-4 py-4 mb-2 md:mb-1 gap-x-2 md:px-10 md:py-2.5"
            >
              <p className="text-xs md:text-sm truncate">Import</p>
              <ImportIMG className="w-4 h-4" />
            </CustomButton>

            <CustomButton
              color={isDark ? "dark-secondary" : "light-secondary"}
              className="h-full flex items-center md:h-full px-4 py-4 mb-2 md:mb-1 gap-x-2 md:px-10 md:py-2.5"
            >
              <p className="text-xs md:text-sm truncate">Export</p>
              <ExportIMG className="w-4 h-4" />
            </CustomButton>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
