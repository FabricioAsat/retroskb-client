import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LogInForm } from "./LogInForm";
import { SignUpForm } from "./SignUpForm";
import { useTheme } from "../../context";
import { CustomButton } from "..";
import { GoogleIMG, TwitterIMG } from "../../assets";

interface FormProps {
  initialForm?: "login" | "signup";
}

export const Form = ({ initialForm = "login" }: FormProps) => {
  const [activeForm, setActiveForm] = useState<"login" | "signup">(initialForm);
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col justify-start items-center mx-auto mt-5 w-full rounded-xl bg-surface">
      <div
        className={`flex gap-4 items-start mb-6 w-full border-b-2 ${
          isDark ? "border-dark-border" : "border-light-border"
        }`}
      >
        <CustomButton
          onClick={() => setActiveForm("login")}
          className="mb-1"
          color={
            activeForm === "login"
              ? isDark
                ? "dark-secondary"
                : "light-secondary"
              : isDark
              ? "dark-disabled"
              : "light-disabled"
          }
        >
          Log In
        </CustomButton>

        <CustomButton
          onClick={() => setActiveForm("signup")}
          className="mb-1"
          color={
            activeForm === "signup"
              ? isDark
                ? "dark-secondary"
                : "light-secondary"
              : isDark
              ? "dark-disabled"
              : "light-disabled"
          }
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

        {/* Continuar con Google account, y demás */}
        <aside className="flex flex-col justify-center items-center">
          <span className="flex gap-x-2 items-center w-full truncate">
            <hr
              className={`border w-full ${
                isDark ? "border-dark-border" : "border-light-border"
              }`}
            />
            <h2
              className={`font-bold ${
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              }`}
            >
              Or continue with
            </h2>
            <hr
              className={`border w-full ${
                isDark ? "border-dark-border" : "border-light-border"
              }`}
            />
          </span>

          {/* Botones decorativos */}
          <nav className="flex gap-4 justify-center items-center mt-4">
            <CustomButton
              onClick={() => console.log("Google")}
              className={`px-2.5 py-2.5 border-transparent ${
                isDark ? "hover:bg-dark-border" : "hover:bg-light-border"
              }`}
            >
              <GoogleIMG className="inline-block w-6 h-6" />
            </CustomButton>

            <CustomButton
              onClick={() => console.log("Twitter")}
              className={`px-2.5 py-2.5 border-transparent ${
                isDark ? "hover:bg-dark-border" : "hover:bg-light-border"
              }`}
            >
              <TwitterIMG className="inline-block w-6 h-6" />
            </CustomButton>
          </nav>
        </aside>
      </div>
    </div>
  );
};
