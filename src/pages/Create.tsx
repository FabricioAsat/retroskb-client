import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import {
  CustomButton,
  CustomDropdown,
  CustomInput,
  CustomTextArea,
  GenresSelector,
  ImageUpdate,
  Loader,
  PageContainer,
} from "../components";
import { MangaState, type IMangaCreate } from "../models";
import { useTheme, useToast, type ToastContextType } from "../context";
import { isValidChapter, isValidMangaName } from "../utils/validators.util";
import { getGenres } from "../utils";
import { createManga } from "../service";
import { useFetch } from "../hooks";
import { BackIMG } from "../assets";

export const Create = () => {
  const { isDark } = useTheme();
  const [form, setForm] = useState<IMangaCreate>({
    name: "",
    state: "" as MangaState,
    chapter: null,
    image: "",
    link: "",
    description: "",
    genre: [],
  });
  const { showToast } = useToast() as ToastContextType;
  const navigate = useNavigate();
  const { loading, error, data, fetch } = useFetch(createManga, {
    params: form,
    autoFetch: false,
  });

  const handleChange = (field: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [field as keyof IMangaCreate]: value }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validaciones
    if (form.name.length < 2) {
      showToast("Manga name must be at least 2 characters long", "error");
      return;
    }

    if (form.state === "") {
      showToast("Please select a manga state", "error");
      return;
    }

    if (!isValidChapter(form.chapter?.toString() || "")) {
      showToast("Please enter a valid chapter number", "error");
      return;
    }

    fetch({ ...form, chapter: Number(form.chapter) });
  }

  useEffect(() => {
    if (data) {
      showToast(data.message || "Manga created successfully", "success");
      navigate("/");
      return;
    }
  }, [loading]);

  return (
    <PageContainer>
      <nav className="mb-12">
        <CustomButton
          onClick={() => navigate("/")}
          className="flex items-center gap-x-2"
          color={isDark ? "dark-primary" : "light-primary"}
        >
          <BackIMG className="w-4 h-4" />
          <p>Go home</p>
        </CustomButton>
      </nav>

      <form
        className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3"
        onSubmit={handleSubmit}
      >
        <span className="w-full col-span-1 mx-auto max-w-60 h-60 lg:max-w-60 lg:h-96">
          <ImageUpdate handleChange={handleChange} />
        </span>

        <span className="flex flex-col items-center w-full col-span-2 xl:pr-0 gap-y-10 md:pr-5">
          <span className="flex flex-col items-center w-full md:flex-row gap-y-5 gap-x-5">
            <CustomInput
              disabled={loading}
              label="Name of the manga"
              type="text"
              value={form?.name}
              onChange={(e) => handleChange("name")(e.target.value)}
              validate={(value) => isValidMangaName(value)}
            />
            <span className="w-full h-full md:w-2/5">
              <CustomDropdown
                disabled={loading}
                label={form.state}
                dropdownItems={Object.entries(MangaState)}
                handleChange={handleChange}
              />
            </span>
          </span>

          <span className="flex flex-col items-center w-full md:flex-row gap-y-5 gap-x-5">
            <span className="w-full h-full md:w-1/3">
              <CustomInput
                disabled={loading}
                label="Last chapter readed"
                type="text"
                value={form?.chapter || ""}
                onChange={(e) => handleChange("chapter")(e.target.value)}
                validate={(value) => isValidChapter(value)}
              />
            </span>
            <span className="w-full h-full md:w-2/3">
              <CustomInput
                disabled={loading}
                label="Link of the webpage"
                type="text"
                value={form?.link}
                onChange={(e) => handleChange("link")(e.target.value)}
                validate={(value) => value.length > 0}
              />
            </span>
          </span>

          <span className="flex items-center w-full gap-x-5">
            <CustomTextArea
              disabled={loading}
              label="Manga description"
              value={form?.description}
              onChange={(e) => handleChange("description")(e.target.value)}
              validate={(v) => v.length > 0}
            />
          </span>

          <span className="flex flex-col items-start w-full gap-y-2 gap-x-5">
            <p className={`px-2 select-none`}>Select manga genres</p>
            <GenresSelector
              disabled={loading}
              genres={getGenres()}
              selected={form.genre}
              onChange={(updated) => setForm({ ...form, genre: updated })}
            />
          </span>

          <CustomButton
            disabled={loading}
            className="w-full md:w-2/3 xl:w-1/3"
            type="submit"
            color={
              isDark
                ? error
                  ? "dark-error"
                  : "dark-success"
                : error
                ? "light:error"
                : "light-success"
            }
          >
            {loading ? (
              <Loader />
            ) : error ? (
              "Ups.! Try again"
            ) : (
              "Create new Manga"
            )}
          </CustomButton>
        </span>
      </form>
    </PageContainer>
  );
};
