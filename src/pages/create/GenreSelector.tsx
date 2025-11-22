import { motion } from "motion/react";
import { useTheme } from "../../context";
import { CustomButton } from "../../components/ui/CustomButton";

interface GenresSelectorProps {
  genres: string[];
  selected: string[];
  disabled: boolean;
  onChange: (updated: string[]) => void;
}

export const GenresSelector = ({
  genres,
  selected,
  disabled,
  onChange,
}: GenresSelectorProps) => {
  const { isDark } = useTheme();

  const handleToggle = (genre: string) => {
    if (selected.includes(genre)) {
      onChange(selected.filter((g) => g !== genre));
    } else {
      onChange([...selected, genre]);
    }
  };

  return (
    <section className="flex flex-wrap justify-start w-full gap-2">
      {genres.map((genre, index) => {
        const isActive = selected.includes(genre);
        const color = isDark
          ? isActive
            ? "dark-primary"
            : "dark-disabled"
          : isActive
          ? "light-primary"
          : "light-disabled";

        return (
          <motion.div
            key={genre}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            <CustomButton
              color={color}
              onClick={() => handleToggle(genre)}
              className="px-3 py-1"
              disabled={disabled}
            >
              {genre}
            </CustomButton>
          </motion.div>
        );
      })}
    </section>
  );
};
