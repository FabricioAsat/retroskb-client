import { useNavigate } from "react-router";
import { useState } from "react";
import { useTheme } from "../../context";
import { MangaState } from "../../models";
import {
  CloseIMG,
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
import { ROUTES } from "../../constants/routes";

const states = [
  {
    label: MangaState.Reading,
    state: MangaState.Reading,
    icon: <ReadingIMG className="w-4 h-4" />,
    color: "primary",
  },
  {
    label: MangaState.OnHold,
    state: MangaState.OnHold,
    icon: <OnHoldIMG className="w-4 h-4" />,
    color: "warning",
  },
  {
    label: MangaState.Completed,
    state: MangaState.Completed,
    icon: <SuccessIMG className="w-4 h-4" />,
    color: "success",
  },
  {
    label: MangaState.Dropped,
    state: MangaState.Dropped,
    icon: <WarningIMG className="w-4 h-4" />,
    color: "error",
  },
];

export const MangasContainer = () => {
  const [mangaState, setMangaState] = useState<MangaState>(MangaState.Reading);
  const [mangasOrder, setMangaOrder] = useState<"list" | "grid">("list");

  const { isDark } = useTheme();
  const navigate = useNavigate();

  const { loading, data, error, fetch } = useFetch(getMangas, {
    params: undefined,
    autoFetch: true,
  });

  function reloadData() {
    fetch(undefined);
  }

  function gotoCreate() {
    navigate(ROUTES.CREATE);
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <section
        className={`grid md:grid-cols-3 justify-items-center mb-6 w-full h-full border-b-2 px-2 2xl:px-0 ${
          isDark ? "border-dark-border" : "border-light-border"
        }`}
      >
        <span className="flex items-center w-full h-full col-span-2 gap-x-2">
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
                }`}
              >
                {label}
              </p>
            </CustomButton>
          ))}
        </span>

        <span className="fixed z-40 flex items-center justify-end bottom-2 right-4 gap-x-2 md:relative md:bottom-0 md:right-0 md:w-full">
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
            className="h-full px-4 py-4 mb-2 capitalize gap-x-2 md:px-4 md:py-2"
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
            className="h-full px-4 py-4 mb-2 capitalize gap-x-2 md:px-4 md:py-2"
          >
            <GridIMG className="w-4 h-4" />
          </CustomButton>
          <CustomButton
            onClick={gotoCreate}
            color={isDark ? "dark-success" : "light-success"}
            className="h-full px-4 py-4 mb-2 capitalize gap-x-2 md:px-4 md:py-2"
          >
            <CloseIMG className="w-4 h-4 rotate-45" />
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
