import { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "../../context";

interface CustomTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  validate?: (value: string) => boolean;
}

export const CustomTextArea = ({
  label,
  validate,
  value = "",
  onChange,
  ...props
}: CustomTextAreaProps) => {
  const [focused, setFocused] = useState(false);
  const { isDark } = useTheme();

  const isFloating = focused || (value && value.toString().length > 0);
  const isValid = validate ? validate(value as string) : true;
  const hasTyped = value && value.toString().length > 0;

  let borderClass = "";
  if (!hasTyped) {
    borderClass = isDark ? "border-dark-border" : "border-light-border";
  } else if (isValid) {
    borderClass = isDark ? "border-dark-success/50" : "border-light-success/50";
  } else {
    borderClass = isDark ? "border-dark-warning/50" : "border-light-warning/50";
  }

  return (
    <div className="relative w-full">
      <motion.label
        animate={{
          y: isFloating ? -20 : 0,
          scale: isFloating ? 0.85 : 1,
          x: isFloating ? -2 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`absolute top-2.5 left-3 px-2 pointer-events-none select-none backdrop-blur-2xl`}
      >
        {label}
      </motion.label>

      <textarea
        {...props}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={props.rows || 4}
        className={`px-3 py-2 w-full rounded-lg border-2 transition-colors outline-none resize-none ${borderClass} disabled:line-through disabled:italic`}
        autoComplete="off"
      />
    </div>
  );
};
