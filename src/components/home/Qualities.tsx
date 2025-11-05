import { CleanIMG, EasyIMG, FastIMG, SecureIMG } from "../../assets";
import { motion } from "motion/react";
import { useThemeContext } from "../../context";

const qualities = [
  {
    description: "We encrypt your data",
    Icon: <SecureIMG className="w-8 h-8" />,
  },
  {
    description: "Easy to use",
    Icon: <EasyIMG className="w-8 h-8" />,
  },
  {
    description: "Clean & Organized",
    Icon: <CleanIMG className="w-8 h-8" />,
  },
  {
    description: "Fast & Efficient",
    Icon: <FastIMG className="w-8 h-8" />,
  },
];

export const Qualities = () => {
  const { isDark } = useThemeContext();

  return (
    <motion.aside
      className="mx-auto flex flex-wrap justify-center items-start gap-3 md:gap-4 py-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {qualities.map((item) => (
        <motion.div
          key={item.description}
          className={`flex flex-col items-center justify-start text-center p-2 w-full max-w-28 h-24 rounded-xl transition-colors duration-200 select-none ${
            isDark
              ? "text-dark-text-muted hover:bg-dark-bg-secondary"
              : "text-light-text-muted hover:bg-light-bg-secondary"
          }`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="mb-2 flex items-center justify-center text-3xl">
            {item.Icon}
          </div>
          <p className="text-sm font-semibold">{item.description}</p>
        </motion.div>
      ))}
    </motion.aside>
  );
};
