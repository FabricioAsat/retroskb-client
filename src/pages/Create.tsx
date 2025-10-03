import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";

import {
  CustomInput,
  PageContainer,
  ButtonSelect,
  CustomTextArea,
} from "../components";
import uploadImage from "../assets/upload.svg";
import type { IMangaCreate, IResponse } from "../models";
import type { IManga, MangaState } from "../models/manga.model";
import { createManga } from "../service/manga.service";
import { useFetch } from "../hooks";
import { getGenres } from "../utils";

export const Create = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigateTo = useNavigate();
  const [body, setBody] = useState<IMangaCreate>({
    name: "",
    link: "",
    chapter: 0,
    image: "",
    state: "",
    description: "",
    genre: [],
  });

  const { data, loading, error, fetch } = useFetch<
    IResponse<IManga>,
    IMangaCreate
  >(createManga, { autoFetch: false, params: body });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  }

  function handleChapterChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!/^[0-9]*$/.test(e.target.value)) return;
    if (e.target.value === "") {
      setBody({
        ...body,
        chapter: 0,
      });
      return;
    }
    setBody({
      ...body,
      chapter: Number(e.target.value),
    });
  }

  function handleStateChange(state: MangaState) {
    setBody({
      ...body,
      state,
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Elimina el "data:image/png;base64," antes de enviarlo
      const base64 = result.split(",")[1];
      setBody({ ...body, image: base64 });
    };
    reader.readAsDataURL(file);
  }

  function handleGenreChange(genre: string) {
    setBody({
      ...body,
      genre: body.genre.includes(genre.toLocaleLowerCase())
        ? body.genre.filter((g) => g !== genre.toLocaleLowerCase())
        : [...body.genre, genre.toLocaleLowerCase()],
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validaciones
    if (!body.name || !body.state) return;

    fetch(body);
  }

  useEffect(() => {
    if (loading || error || !data) return;
    navigateTo("/");
  }, [data, loading, error]);

  return (
    <PageContainer>
      <Link
        to={"/"}
        className="mx-auto max-w-5xl text-lg font-bold hover:underline underline-offset-2"
      >
        ← Volver a inicio
      </Link>

      {error && (
        <div className="mx-auto max-w-5xl text-lg font-bold text-red-400">
          {error.message} - {error?.response?.data.error}
        </div>
      )}

      <div className="grid grid-cols-4 gap-5 mx-auto mt-10 max-w-5xl">
        <div className="relative mx-auto w-full h-80 max-w-60">
          {body.image ? (
            <picture className="flex flex-col justify-center items-center w-full h-full rounded-md border-2 cursor-pointer border-neutral-300">
              <img
                src={`data:image/png;base64,${body.image}`}
                alt="Selected manga image"
                className="object-cover w-full h-full rounded-md"
              />

              <button
                onClick={() => setBody({ ...body, image: "" })}
                className="absolute bottom-0 left-0 z-10 p-2 w-full font-bold text-center text-white rounded-md cursor-pointer bg-neutral-700/75 hover:bg-neutral-800/75"
              >
                Remove image
              </button>
            </picture>
          ) : (
            <picture
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col justify-center items-center w-full h-full rounded-md border-2 cursor-pointer border-neutral-300 hover:bg-neutral-200"
            >
              <img src={uploadImage} alt="Upload image" className="w-16 h-16" />
              <h4 className="font-bold text-center">Upload image</h4>
              <small className="italic text-neutral-400">Optional</small>
            </picture>
          )}

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col col-span-3 gap-5 w-full"
        >
          <span className="grid grid-cols-3 gap-5">
            <CustomInput
              isDisabled={loading}
              name="name"
              id="name"
              type="text"
              placeholder="Nombre del manga*"
              value={body.name}
              className="col-span-2"
              onAction={handleChange}
            />
            <ButtonSelect
              isDisabled={loading}
              selected={body.state}
              onAction={handleStateChange}
            />
          </span>

          <span className="grid grid-cols-3 gap-5">
            <CustomInput
              isDisabled={loading}
              name="link"
              id="link"
              type="text"
              placeholder="Link del manga"
              className="col-span-2"
              value={body.link}
              onAction={handleChange}
            />
            <CustomInput
              isDisabled={loading}
              name="chapter"
              id="chapter"
              type="text"
              placeholder="Capitulo del manga"
              className="text-center"
              value={body.chapter.toString()}
              pattern="[0-9]*"
              onAction={handleChapterChange}
            />
          </span>

          {/* TODO: Implementar en el body */}
          <span className="grid grid-cols-3 gap-5">
            <CustomTextArea
              name="description"
              id="description"
              placeholder="Por el momento no hay campo descripción para el body, luego se correguirá."
              className="col-span-3 resize-none"
              value={body.description}
              onAction={handleChange}
            />
          </span>

          <span className="flex flex-col gap-y-1 mt-5">
            <small className="italic text-sm font-bold px-2">
              Selecciona los géneros
            </small>
            <span className="flex items-center flex-wrap gap-2">
              {getGenres().map((genre: string) => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => handleGenreChange(genre)}
                  className={`text-xs italic capitalize font-bold cursor-pointer hover:bg-neutral-400/25 py-1 px-2 rounded-md ${
                    body.genre.includes(genre.toLocaleLowerCase())
                      ? "text-sky-500"
                      : "text-neutral-500"
                  }`}
                >
                  {genre.toLocaleLowerCase()}
                </button>
              ))}
            </span>
          </span>

          <button
            disabled={loading}
            type="submit"
            className="p-2 mx-auto w-1/3 font-bold text-center rounded-md cursor-pointer hover:bg-neutral-700 bg-neutral-800 text-neutral-100 active:scale-95 disabled:bg-neutral-500 disabled:line-through"
          >
            Crear Manga
          </button>
        </form>
      </div>
    </PageContainer>
  );
};
