import { useState } from "react";
import { CustomButton, CustomInput } from "..";
import { useThemeContext } from "../../context";

export const LogInForm = () => {
  const { isDark } = useThemeContext();
  const [form, setForm] = useState({
    email: "",
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
    <form className="flex flex-col gap-y-8 px-5 py-5" onSubmit={handleSubmit}>
      <CustomInput
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email")(e.target.value)}
        validate={(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)}
      />

      <CustomInput
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => handleChange("password")(e.target.value)}
        validate={(value) => value.length >= 8}
      />

      <CustomButton
        type="submit"
        color={isDark ? "dark-primary" : "light-primary"}
        className="w-full"
      >
        Log In
      </CustomButton>
    </form>
  );
};
