import { useState } from "react";
import { CustomButton, CustomInput } from "..";
import { useThemeContext } from "../../context";
import {
  isValidDate,
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utils";
import { HideIMG, ViewIMG } from "../../assets";

export const SignUpForm = () => {
  const { isDark } = useThemeContext();

  const [viewPassword, setViewPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (field: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submited");
  };

  return (
    <form
      className="flex flex-col gap-y-8 md:px-5 py-5"
      onSubmit={handleSubmit}
    >
      <CustomInput
        label="Username"
        type="text"
        value={form.email}
        onChange={(e) => handleChange("username")(e.target.value)}
        validate={(value) => isValidUsername(value)}
      />

      <CustomInput
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email")(e.target.value)}
        validate={(value) => isValidEmail(value)}
      />

      <span className="flex flex-col items-end">
        <CustomInput
          label="Password"
          type={viewPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => handleChange("password")(e.target.value)}
          validate={(value) => isValidPassword(value)}
        />
        <small
          onClick={() => setViewPassword(!viewPassword)}
          className={`flex items-center gap-x-1 text-xs italic cursor-pointer mr-1 mt-1 transition-colors duration-200 ${
            isDark
              ? "text-dark-text-muted hover:text-dark-text"
              : "text-light-text-muted hover:text-light-text"
          }`}
        >
          {viewPassword ? (
            <HideIMG className="inline-block w-4 h-4" />
          ) : (
            <ViewIMG className="inline-block w-4 h-4" />
          )}
          {viewPassword ? "Hide Password" : "Show Password"}
        </small>
      </span>

      <CustomInput
        label="Date of Birth"
        type="date"
        value={form.email}
        onChange={(e) => handleChange("email")(e.target.value)}
        validate={(value) => isValidDate(value)}
      />

      <CustomButton
        type="submit"
        color={isDark ? "dark-success" : "light-success"}
        className="w-full"
      >
        Sign in
      </CustomButton>
    </form>
  );
};
