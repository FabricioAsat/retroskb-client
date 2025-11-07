import { useState } from "react";
import { useTheme } from "../../context";
import { MangaState } from "../../models";
import {
  DeletedIMG,
  GridIMG,
  ListIMG,
  OnHoldIMG,
  ReadingIMG,
  SuccessIMG,
  WarningIMG,
} from "../../assets";
import { CustomButton, Error, Loader } from "..";
import { useFetch } from "../../hooks";
import { getMangas } from "../../service";
import { ListContainer } from "./ListContainer";
import { GridContainer } from "./GridContainer";

const states = [
  {
    label: "Reading",
    state: MangaState.Reading,
    icon: <ReadingIMG className="w-4 h-4" />,
    color: "primary",
  },
  {
    label: "On hold",
    state: MangaState.OnHold,
    icon: <OnHoldIMG className="w-4 h-4" />,
    color: "warning",
  },
  {
    label: "Completed",
    state: MangaState.Completed,
    icon: <SuccessIMG className="w-4 h-4" />,
    color: "success",
  },
  {
    label: "Abandoned",
    state: MangaState.Abandoned,
    icon: <WarningIMG className="w-4 h-4" />,
    color: "error",
  },
  {
    label: "Deleted",
    state: MangaState.Deleted,
    icon: <DeletedIMG className="w-4 h-4" />,
    color: "error",
  },
];

export const MangasContainer = () => {
  const [mangaState, setMangaState] = useState<MangaState>(MangaState.Reading);
  const [mangasOrder, setMangaOrder] = useState<"list" | "grid">("list");

  const { isDark } = useTheme();

  const { loading, data, error, fetch } = useFetch(getMangas, {
    params: undefined,
    autoFetch: true,
  });

  function reloadData() {
    fetch(undefined);
  }

  console.log(data);

  return (
    <section className="flex flex-col justify-center items-center">
      <section
        className={`grid md:grid-cols-3 justify-items-center mb-6 w-full h-full border-b-2 px-2 2xl:px-0 ${
          isDark ? "border-dark-border" : "border-light-border"
        }`}
      >
        <span className="flex col-span-2 gap-x-2 items-center w-full h-full">
          {states.map(({ state, icon, label, color }) => (
            <CustomButton
              key={state}
              onClick={() => setMangaState(state)}
              className={`${
                mangaState === state ? "" : ""
              } mb-2 px-4 py-4 md:px-4 md:py-2 capitalize gap-x-2 md:h-full fles`}
              color={
                mangaState === state
                  ? isDark
                    ? "dark-" + color
                    : "light-" + color
                  : isDark
                  ? "dark-disabled"
                  : "light-disabled"
              }
            >
              <picture>{icon}</picture>
              <p
                className={`hidden ${
                  mangaState === state ? "md:block" : "hidden"
                } xl:block`}
              >
                {label}
              </p>
            </CustomButton>
          ))}
        </span>

        <span className="flex fixed bottom-2 right-4 z-40 gap-x-2 justify-end items-center md:relative md:bottom-0 md:right-0 md:w-full">
          <CustomButton
            onClick={() => setMangaOrder("list")}
            color={
              mangasOrder === "list"
                ? isDark
                  ? "dark-primary"
                  : "light-primary"
                : isDark
                ? "dark-disabled"
                : "light-disabled"
            }
            className="gap-x-2 px-4 py-4 mb-2 h-full capitalize md:px-4 md:py-2"
          >
            <ListIMG className="w-4 h-4" />
          </CustomButton>
          <CustomButton
            onClick={() => setMangaOrder("grid")}
            color={
              mangasOrder === "grid"
                ? isDark
                  ? "dark-primary"
                  : "light-primary"
                : isDark
                ? "dark-disabled"
                : "light-disabled"
            }
            className="gap-x-2 px-4 py-4 mb-2 h-full capitalize md:px-4 md:py-2"
          >
            <GridIMG className="w-4 h-4" />
          </CustomButton>
        </span>
      </section>

      {loading ? (
        <Loader label="Loading mangas..." />
      ) : error ? (
        <Error
          label={error.message}
          desc={
            error.response?.data.error ||
            "Failed to fetch mangas, please try again"
          }
          fetch={reloadData}
        />
      ) : mangasOrder === "list" ? (
        <ListContainer mangas={data?.data || []} state={mangaState} />
      ) : (
        <GridContainer mangas={data?.data || []} state={mangaState} />
      )}
    </section>
  );
};

// Forma sencilla, pero quiero manipular colores
