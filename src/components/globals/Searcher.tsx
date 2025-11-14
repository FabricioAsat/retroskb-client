import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTheme, useToast, type ToastContextType } from "../../context";
import { CustomButton } from "../ui/CustomButton";
import { CustomInput } from "../ui/CustomInput";
import { SearchIMG } from "../../assets";
import { useNavigate } from "react-router";
import { isValidMangaName } from "../../utils";

export const Searcher = () => {
  const [value, setValue] = useState<string>("");
  const { isDark } = useTheme();
  const { showToast } = useToast() as ToastContextType;
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidMangaName(value)) {
      showToast("Invalid manga name", "error");
      return;
    }

    navigate(`/search?search=${value}`);
  }

  return (
    <section className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full mt-10 max-w-3xl flex gap-x-5 px-5 xl:px-0"
      >
        <CustomInput
          onChange={handleChange}
          label="Search your manga"
          value={value}
          validate={(value) => isValidMangaName(value)}
        />
        <CustomButton
          className="flex items-center gap-x-2"
          color={isDark ? "dark-primary" : "light-primary"}
          type="submit"
        >
          <SearchIMG className="w-4 h-4" />
          <p className="hidden md:block">Search</p>
        </CustomButton>
      </form>
    </section>
  );
};
