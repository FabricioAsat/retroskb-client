import { useState } from "react";
import { CustomButton, CustomInput, Loader } from "..";
import { useTheme } from "../../context";
import {
  isValidDate,
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utils";
import { HideIMG, ViewIMG } from "../../assets";
import { useFetch } from "../../hooks";
import { registerUser } from "../../service/user.service";
import type { IUserRegister } from "../../models";

export const SignUpForm = () => {
  const { isDark } = useTheme();
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [form, setForm] = useState<IUserRegister>({
    email: "",
    username: "",
    password: "",
    date_of_birth: "",
  });
  const { loading, data, error, fetch } = useFetch(registerUser, {
    params: form,
    autoFetch: false,
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
      className="flex flex-col gap-y-8 py-5 md:px-5"
      onSubmit={handleSubmit}
    >
      <CustomInput
        label="Username"
        type="text"
        value={form.username}
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
        value={form.date_of_birth}
        onChange={(e) => handleChange("date_of_birth")(e.target.value)}
        validate={(value) => isValidDate(value)}
      />

      <CustomButton
        type="submit"
        disabled={loading}
        color={isDark ? "dark-success" : "light-success"}
        className="w-full"
      >
        {loading ? <Loader /> : "Sign Up"}
      </CustomButton>
    </form>
  );
};
