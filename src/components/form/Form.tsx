import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LogInForm } from "./LogInForm";
import { SignUpForm } from "./SignUpForm";
import { useThemeContext } from "../../context";
import { CustomButton } from "..";

interface FormProps {
  initialForm?: "login" | "signup";
}

export const Form = ({ initialForm = "login" }: FormProps) => {
  const [activeForm, setActiveForm] = useState<"login" | "signup">(initialForm);
  const { isDark } = useThemeContext();

  return (
    <div className="flex flex-col justify-start items-center mx-auto mt-5 w-full rounded-xl bg-surface">
      <div
        className={`flex gap-4 items-start mb-6 w-full border-b-2 ${
          isDark ? "border-dark-border" : "border-light-border"
        }`}
      >
        <CustomButton
          onClick={() => setActiveForm("login")}
          className={`px-4 py-2 border-transparent ${
            activeForm === "login"
              ? isDark
                ? "bg-dark-secondary text-white"
                : "bg-light-secondary text-white"
              : isDark
              ? "bg-transparent text-dark-text-muted"
              : "bg-transparent text-light-text-muted"
          }`}
        >
          Log In
        </CustomButton>

        <CustomButton
          onClick={() => setActiveForm("signup")}
          className={`px-4 py-2 border-transparent ${
            activeForm === "signup"
              ? isDark
                ? "bg-dark-secondary text-white"
                : "bg-light-secondary text-white"
              : isDark
              ? "bg-transparent text-dark-text-muted"
              : "bg-transparent text-light-text-muted"
          }`}
        >
          Sign Up
        </CustomButton>
      </div>

      <div className="overflow-hidden relative w-full">
        <AnimatePresence mode="wait">
          {activeForm === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <LogInForm />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <SignUpForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
