import { useEffect, useState } from "react";

import { CustomButton, CustomInput, Loader } from "..";
import {
  useAuth,
  useModal,
  useTheme,
  useToast,
  type ToastContextType,
} from "../../context";
import { isValidEmail, isValidPassword } from "../../utils";
import { HideIMG, ViewIMG } from "../../assets";
import { useFetch } from "../../hooks";
import { loginUser } from "../../service";

export const LogInForm = () => {
  const { isDark } = useTheme();
  const { showToast } = useToast() as ToastContextType;
  const { closeModal } = useModal();
  const { setToken } = useAuth();

  const [viewPassword, setViewPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { loading, data, error, fetch } = useFetch(loginUser, {
    params: form,
    autoFetch: false,
  });
  const handleChange = (field: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones
    if (!isValidEmail(form.email.trim())) {
      showToast("Invalid email format", "error");
      return;
    }
    if (!isValidPassword(form.password.trim())) {
      showToast("Password must be at least 8 characters long", "error");
      return;
    }

    fetch({ email: form.email.trim(), password: form.password.trim() });
  };

  useEffect(() => {
    if (error) {
      showToast(error.response?.data.error || error.message, "error");
    } else if (data) {
      showToast(data.message || "Log In Successfully", "success");
      setToken(data.data.token);
      closeModal();
    }
  }, [error, data]);

  return (
    <form
      className="flex flex-col py-5 gap-y-8 md:px-5"
      onSubmit={handleSubmit}
    >
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

      <CustomButton
        type="submit"
        disabled={loading}
        color={isDark ? "dark-success" : "light-success"}
        className="w-full px-4 py-1.5"
      >
        {loading ? <Loader /> : "Log In"}
      </CustomButton>
    </form>
  );
};
