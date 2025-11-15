import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
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
import { MoreOptions } from "./MoreOptions";

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
  const [isGridOrder, setIsGridOrder] = useState<boolean>(
    localStorage.getItem("order") === "true" || false
  );
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const { loading, data, error, fetch } = useFetch(getMangas, {
    params: { state: MangaState.Reading },
    autoFetch: true,
  });

  function reloadData(state: MangaState = mangaState) {
    if (state !== mangaState && !error) return;
    fetch({ state });
  }

  function changeState(state: MangaState) {
    if (state === mangaState) return;
    setMangaState(state);
    reloadData(state);
  }

  function changeOrder(order: "list" | "grid") {
    localStorage.setItem("order", order === "grid" ? "true" : "false");
    setIsGridOrder(order === "grid");
  }

  function gotoCreate() {
    navigate(ROUTES.CREATE);
  }

  useEffect(() => {
    reloadData(mangaState);
  }, [mangaState]);

  return (
    <section className="flex flex-col items-center justify-center">
      <section
        className={`flex justify-between items-center mb-6 w-full h-full border-b-2 px-2 2xl:px-0 md:h-14 pb-2 ${
          isDark ? "border-dark-border" : "border-light-border"
        }`}
      >
        <span className="flex items-center w-full h-full col-span-2 gap-x-2">
          {states.map(({ state, icon, label, color }) => (
            <CustomButton
              title={label}
              key={state}
              onClick={() => changeState(state)}
              className={`${
                mangaState === state ? "" : ""
              } px-4 py-4 md:px-3 md:py-3 capitalize gap-x-2 md:h-full`}
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
                className={`hidden text-sm ${
                  mangaState === state ? "md:block" : "hidden"
                }`}
              >
                {label}
              </p>
            </CustomButton>
          ))}
        </span>

        <div
          className={`fixed z-40 flex items-center justify-end bottom-2 right-4 gap-x-2 md:relative md:bottom-0 md:right-0 md:w-full rounded-lg px-2 md:px-0 py-2 md:py-0 md:h-full ${
            isDark ? " bg-dark-bg" : "bg-light-bg"
          }`}
        >
          <CustomButton
            title="List order mangas"
            onClick={() => changeOrder("list")}
            color={
              !isGridOrder
                ? isDark
                  ? "dark-primary"
                  : "light-primary"
                : isDark
                ? "dark-disabled"
                : "light-disabled"
            }
            className="px-4 py-4 md:px-4 md:py-3 gap-x-2 md:h-full"
          >
            <ListIMG className="w-4 h-4" />
          </CustomButton>
          <CustomButton
            title="Grid order mangas"
            onClick={() => changeOrder("grid")}
            color={
              isGridOrder
                ? isDark
                  ? "dark-primary"
                  : "light-primary"
                : isDark
                ? "dark-disabled"
                : "light-disabled"
            }
            className="px-4 py-4 md:px-4 md:py-3 gap-x-2 md:h-full"
          >
            <GridIMG className="w-4 h-4" />
          </CustomButton>
          <CustomButton
            title="Create new manga"
            onClick={gotoCreate}
            color={isDark ? "dark-success" : "light-success"}
            className="px-4 py-4 md:px-4 md:py-3 gap-x-2 md:h-full"
          >
            <CloseIMG className="w-4 h-4 rotate-45" />
          </CustomButton>
          {/* Dentro están los buttons import/export */}
          <MoreOptions reloadMangas={reloadData} />{" "}
        </div>
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
      ) : isGridOrder ? (
        <GridContainer mangas={data?.data || []} state={mangaState} />
      ) : (
        <ListContainer mangas={data?.data || []} state={mangaState} />
      )}
    </section>
  );
};
