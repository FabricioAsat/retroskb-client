import { motion } from "motion/react";

export const Loader = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div className="flex gap-x-2 justify-center items-center bg-transparent">
      <motion.div
        className={`w-4 h-4 rounded-full border-2 border-t-transparent`}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
      <p className="italic">{label}</p>
    </div>
  );
};
