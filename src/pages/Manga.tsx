import { useEffect, useState } from "react";
import { BackIMG, DeletedIMG, EditIMG, LinkIMG, NotImageIMG } from "../assets";
import {
  ConfirmationDelete,
  CustomButton,
  CustomDropdown,
  CustomInput,
  CustomTextArea,
  GenresSelector,
  ImageUpdate,
  Loader,
  MangaError,
  MangaSkeleton,
  PageContainer,
} from "../components";
import { MangaState, type IMangaCreate, type IMangaUpdate } from "../models";
import { isValidChapter } from "../utils/validators.util";
import { useFetch } from "../hooks";
import { useNavigate } from "react-router";
import {
  useModal,
  useTheme,
  useToast,
  type ToastContextType,
} from "../context";
import { getGenres, normalizeLink } from "../utils";
import { getManga, updateManga } from "../service";
import { useParams } from "react-router";

export const Manga = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { openModal, closeModal } = useModal();
  const { showToast } = useToast() as ToastContextType; // para que no joda el linter
  console.log("Manga.tsx: ", showToast);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<IMangaUpdate>({
    name: "",
    state: "" as MangaState,
    chapter: null,
    image: "",
    link: "",
    description: "",
    genre: [],
  });
  const { loading, error, data, fetch } = useFetch(getManga, {
    params: id || "",
    autoFetch: true,
  });

  const {
    loading: loadingEdit,
    error: errorEdit,
    data: dataEdit,
    fetch: fetchEdit,
  } = useFetch(updateManga, {
    params: { body: form, id: id || "" },
    autoFetch: false,
  });

  // Maneja los imputs
  const handleChange = (field: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [field as keyof IMangaCreate]: value }));
  };

  // Edita el manga
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

    fetchEdit({
      body: { ...form, chapter: Number(form.chapter) },
      id: id || "",
    });
  }

  function handleConfirmDelete() {
    openModal(
      <ConfirmationDelete
        closeModal={closeModal}
        id={id || ""}
        navigate={navigate}
      />
    );
  }

  // Cuando salta el error de fetch, podes volver a fetchear
  function reFetchManga() {
    fetch(id || "");
  }

  // Maneja la respuesta de la actualizacion
  useEffect(() => {
    if (loadingEdit) return;
    if (errorEdit) {
      showToast("There was an error updating the manga", "error");
      return;
    }
    if (dataEdit) {
      showToast(dataEdit?.message || "", "success");
      navigate("/");
    }
  }, [loadingEdit]);

  // Carga al form los datos del manga fetcheado
  useEffect(() => {
    if (loading) return;
    if (data) {
      setForm({
        name: data.data.name,
        state: data.data.state,
        chapter: data.data.chapter,
        image: data.data.image || "",
        link: data.data.link || "",
        description: data.data.description || "",
        genre: data.data.genre || [],
      });
    }
  }, [loading, error, data]);

  if (loading) {
    return <MangaSkeleton />;
  }

  if (error || !data) {
    return <MangaError fetch={reFetchManga} status={error?.status || 500} />;
  }

  return (
    <PageContainer>
      <nav className="flex justify-between mb-12 gap-x-5">
        <CustomButton
          onClick={() => navigate("/")}
          className="flex items-center py-3 gap-x-2"
          color={isDark ? "dark-primary" : "light-primary"}
        >
          <BackIMG className="w-5 h-5" />
          <p className="hidden md:block">Go home</p>
        </CustomButton>

        <span className="flex items-center gap-x-5">
          <CustomButton
            onClick={() => setIsEditing(!isEditing)}
            color={isDark ? "dark-secondary" : "light-secondary"}
            className="flex items-center py-3 gap-x-2"
          >
            <EditIMG className="w-5 h-5" />
            <p className="hidden md:block">Edit info</p>
          </CustomButton>

          <CustomButton
            onClick={handleConfirmDelete}
            color={isDark ? "dark-error" : "light-error"}
            className="flex items-center py-3 gap-x-2"
          >
            <DeletedIMG className="w-5 h-5" />
            <p className="hidden md:block">Delete</p>
          </CustomButton>
        </span>
      </nav>

      <form className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
        <span className="flex items-center justify-center col-span-1 mx-auto w-60 h-90">
          {data.data.image && !isEditing ? (
            <img
              src={data.data.image}
              alt={data.data.name + " image"}
              className="object-cover rounded-lg"
            />
          ) : !isEditing ? (
            <div className="flex flex-col items-center justify-center">
              <NotImageIMG className="w-full h-full" />
              <p>No image available</p>
            </div>
          ) : (
            <ImageUpdate image={data.data.image} handleChange={handleChange} />
          )}
        </span>

        <span className="flex flex-col items-center w-full col-span-2 xl:pr-0 gap-y-10 md:pr-5">
          <span className="flex flex-col items-center w-full md:flex-row gap-y-5 gap-x-5">
            {!isEditing ? (
              <>
                <span
                  className={`border-2 py-2 w-full rounded-lg px-3 truncate font-bold ${
                    isDark ? "border-dark-border" : "border-light-border"
                  }`}
                  title={data.data.name}
                >
                  {data.data.name}
                </span>
                <span
                  className={`border-2 py-2 w-full md:w-2/5 rounded-lg px-2 font-bold capitalize text-center ${
                    isDark ? "border-dark-border" : "border-light-border"
                  }`}
                >
                  {data.data.state}
                </span>
              </>
            ) : (
              <>
                <CustomInput
                  disabled={loading || loadingEdit}
                  label="Name of the manga"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name")(e.target.value)}
                  validate={(value) => value.length > 2}
                />
                <span className="w-full h-full md:w-2/5">
                  <CustomDropdown
                    disabled={loading || loadingEdit}
                    label={form.state}
                    dropdownItems={Object.entries(MangaState)}
                    handleChange={handleChange}
                  />
                </span>
              </>
            )}
          </span>

          <span className="flex flex-col items-center w-full md:flex-row gap-y-5 gap-x-5">
            {!isEditing ? (
              <>
                <span
                  className={`border-2 py-2 w-full font-bold md:w-1/3 rounded-lg px-3 truncate italic ${
                    isDark ? "border-dark-border" : "border-light-border"
                  }`}
                >
                  Chapter {data.data.chapter}
                </span>
                {data.data.link ? (
                  <a
                    href={normalizeLink(data.data.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`border-2 py-2 w-full font-bold md:w-2/3 flex items-center truncate gap-x-2 rounded-lg px-2 cursor-pointer ${
                      isDark
                        ? "border-dark-border hover:text-dark-primary hover:underline"
                        : "border-light-border hover:text-light-primary hover:underline"
                    }`}
                  >
                    <LinkIMG className="w-4 h-4" />
                    {data.data.link}
                  </a>
                ) : (
                  <span
                    className={`border-2 py-2 w-full font-bold md:w-2/3 flex items-center truncate gap-x-2 rounded-lg px-2 ${
                      isDark ? "border-dark-border" : "border-light-border"
                    }`}
                  >
                    <LinkIMG className="w-4 h-4" />
                    No link available
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="w-full h-full md:w-1/3">
                  <CustomInput
                    disabled={loading || loadingEdit}
                    label="Last chapter readed"
                    type="text"
                    value={form.chapter?.toString() || ""}
                    onChange={(e) => handleChange("chapter")(e.target.value)}
                    validate={(value) => isValidChapter(value)}
                  />
                </span>
                <span className="w-full h-full md:w-2/3">
                  <CustomInput
                    disabled={loading || loadingEdit}
                    className="w-2/3"
                    label="Link of the webpage"
                    type="text"
                    value={form.link || ""}
                    onChange={(e) => handleChange("link")(e.target.value)}
                    validate={(value) => value.length > 0}
                  />
                </span>
              </>
            )}
          </span>

          {!isEditing ? (
            <span
              className={`border-2 py-2 w-full font-bold min-h-28 rounded-lg px-3 italic ${
                isDark ? "border-dark-border" : "border-light-border"
              }`}
            >
              {data.data?.description || "No description available"}
            </span>
          ) : (
            <span className="flex items-center w-full gap-x-5">
              <CustomTextArea
                disabled={loading || loadingEdit}
                label="Manga description"
                value={form.description || ""}
                onChange={(e) => handleChange("description")(e.target.value)}
                validate={(v) => v.length > 0}
              />
            </span>
          )}

          <span className="flex flex-col items-start w-full gap-y-2 gap-x-5">
            <p className={`px-2 select-none font-bold`}>
              {isEditing
                ? "Select manga genres"
                : form.genre.length === 0
                ? "No genres selected"
                : "Manga genres"}
            </p>
            {!isEditing && form.genre.length > 0 ? (
              <section className="flex flex-wrap justify-start w-full gap-2">
                {form.genre.map((genre) => (
                  <CustomButton
                    color={isDark ? "dark" : "light"}
                    key={genre}
                    className={`border-2 py-1 px-2 rounded-lg ${
                      isDark ? "border-dark-border" : "border-light-border"
                    }`}
                  >
                    {genre}
                  </CustomButton>
                ))}
              </section>
            ) : (
              <GenresSelector
                disabled={loading || loadingEdit}
                genres={isEditing ? getGenres() : form.genre}
                selected={form.genre}
                onChange={(updated) => setForm({ ...form, genre: updated })}
              />
            )}
          </span>

          {isEditing && (
            <CustomButton
              disabled={loadingEdit}
              className="w-full md:w-2/3 xl:w-1/3"
              type="submit"
              onClick={handleSubmit}
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
              {loading ? <Loader /> : error ? "Ups.! Try again" : "Edit Manga"}
            </CustomButton>
          )}
        </span>
      </form>
    </PageContainer>
  );
};
