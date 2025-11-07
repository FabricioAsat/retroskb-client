import { useState } from "react";
import { useTheme } from "../../context";
import { MangaState } from "../../models/manga.model";
import {
  DeletedIMG,
  GridIMG,
  ListIMG,
  OnHoldIMG,
  ReadingIMG,
  SuccessIMG,
  WarningIMG,
} from "../../assets";
import { CustomButton, Error } from "..";
import { useFetch } from "../../hooks";
import { getMangas } from "../../service";
import { ListConteiner } from "./ListConteiner";
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

  return (
    <section className="flex flex-col items-center justify-center">
      <section
        className={`grid md:grid-cols-3 justify-items-center mb-6 w-full h-full border-b-2 px-2 2xl:px-0 ${
          isDark ? "border-dark-border" : "border-light-border"
        }`}
      >
        <span className="flex items-center  gap-x-2 h-full col-span-2 w-full">
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

        <span className="md:flex items-center justify-end w-full gap-x-2 hidden">
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
            className="mb-2 px-4 py-4 md:px-4 md:py-2 capitalize gap-x-2 h-full"
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
            className="mb-2 px-4 py-4 md:px-4 md:py-2 capitalize gap-x-2 h-full"
          >
            <GridIMG className="w-4 h-4" />
          </CustomButton>
        </span>
      </section>
      <section>
        {mangasOrder === "list" ? <ListConteiner /> : <GridContainer />}
      </section>
    </section>
  );
};

// Forma sencilla, pero quiero manipular colores
