import { useState } from "react";
import { BackIMG, EditIMG, LinkIMG, NotImageIMG } from "../assets";
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
import { isValidChapter } from "../utils/validators.util";
import { useFetch } from "../hooks";
import { useNavigate } from "react-router";
import { useTheme } from "../context";
import { getGenres } from "../utils";
import { getManga } from "../service";
import { useParams } from "react-router";

export const Manga = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { loading, error, data, fetch } = useFetch(getManga, {
    params: id || "",
    autoFetch: true,
  });

  //   TODO - Update
  const {
    loading: loadingEdit,
    error: errorEdit,
    data: dataEdit,
    fetch: fetchEdit,
  } = useFetch(getManga, {
    params: id || "",
    autoFetch: false,
  });

  if (false) {
    return <Loader />;
  }

  if (error || !data) {
    return <p>There was an error loading the manga data.</p>;
  }

  return (
    <PageContainer>
      <nav className="mb-12 flex gap-x-5 justify-between">
        <CustomButton
          onClick={() => navigate("/")}
          className="flex items-center gap-x-2"
          color={isDark ? "dark-primary" : "light-primary"}
        >
          <BackIMG className="w-4 h-4" />
          <p>Go home</p>
        </CustomButton>

        <CustomButton
          onClick={() => setIsEditing(!isEditing)}
          color={isDark ? "dark-secondary" : "light-secondary"}
          className="flex items-center gap-x-2"
        >
          <EditIMG className="w-4 h-4" />
          <p>Edit info</p>
        </CustomButton>
      </nav>

      <form className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
        <span className="col-span-1 mx-auto w-60 h-90 flex items-center justify-center">
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
            <ImageUpdate image={data.data.image} handleChange={() => {}} />
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
                  value={data.data?.name}
                  validate={(value) => value.length > 2}
                />
                <span className="md:w-2/5 w-full h-full">
                  <CustomDropdown
                    disabled={loading || loadingEdit}
                    label={data.data?.state || ""}
                    dropdownItems={[]}
                    handleChange={() => {}}
                  />
                </span>
              </>
            )}
          </span>

          <span className="flex flex-col items-center w-full md:flex-row gap-y-5 gap-x-5">
            {!isEditing ? (
              <>
                <span
                  className={`border-2 py-2 w-full md:w-1/3 rounded-lg px-3 truncate italic ${
                    isDark ? "border-dark-border" : "border-light-border"
                  }`}
                >
                  Chapter {data.data.chapter}
                </span>
                <button
                  type="button"
                  className={`border-2 py-2 w-full md:w-2/3 flex items-center truncate gap-x-2 rounded-lg px-2 cursor-pointer ${
                    isDark
                      ? "border-dark-border hover:text-dark-primary hover:underline"
                      : "border-light-border hover:text-light-primary hover:underline"
                  }`}
                >
                  <LinkIMG className="w-4 h-4" />
                  {data.data?.link || "No link available"}
                </button>
              </>
            ) : (
              <>
                <span className="h-full w-1/3">
                  <CustomInput
                    disabled={loading || loadingEdit}
                    label="Last chapter readed"
                    type="text"
                    value={data.data?.chapter || ""}
                    validate={(value) => isValidChapter(value)}
                  />
                </span>
                <span className="h-full w-2/3">
                  <CustomInput
                    disabled={loading || loadingEdit}
                    className="w-2/3"
                    label="Link of the webpage"
                    type="text"
                    value={data.data?.link}
                    validate={(value) => value.length > 0}
                  />
                </span>
              </>
            )}
          </span>

          {!isEditing ? (
            <span
              className={`border-2 py-2 w-full min-h-28 rounded-lg px-3 italic ${
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
                value={data.data?.description}
                validate={(v) => v.length > 0}
              />
            </span>
          )}

          <span className="flex flex-col items-start w-full gap-y-2 gap-x-5">
            <p className={`px-2 select-none`}>
              {isEditing ? "Select manga genres" : "Manga genres"}
            </p>
            <GenresSelector
              disabled={loading || loadingEdit}
              genres={isEditing ? getGenres() : data.data.genre}
              selected={data.data.genre}
              onChange={() => {}}
            />
          </span>

          {!isEditing && (
            <CustomButton
              disabled={true}
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
              {loading ? <Loader /> : error ? "Ups.! Try again" : "Edit Manga"}
            </CustomButton>
          )}
        </span>
      </form>
    </PageContainer>
  );
};
