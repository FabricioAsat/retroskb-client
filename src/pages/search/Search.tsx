import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { useTheme } from "../../context";
import { useFetch } from "../../hooks";
import { getMangas } from "../../service";
import { CustomButton, Error, Loader, PageContainer } from "../../components";
import { BackIMG, GridIMG, ListIMG } from "../../assets";
import { GridContainer } from "../user/GridContainer";
import { ListContainer } from "../user/ListContainer";

export const Search = () => {
  const [isGridOrder, setIsGridOrder] = useState<boolean>(
    localStorage.getItem("order") === "true" || false
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const { isDark } = useTheme();
  const { loading, data, error, fetch } = useFetch(getMangas, {
    params: { search: search || "" },
    autoFetch: true,
  });

  // Si hay un error necesitamos fetchear la data
  function reloadData() {
    fetch({ search: search || "" });
  }

  function changeOrder(order: "list" | "grid") {
    localStorage.setItem("order", order === "grid" ? "true" : "false");
    setIsGridOrder(order === "grid");
  }

  useEffect(() => {
    fetch({ search: search || "" });
  }, [search]);

  return (
    <PageContainer>
      <section
        className={`flex items-center justify-between mb-6 w-full h-full border-b-2 px-2 2xl:px-0 ${
          isDark ? "border-dark-border" : "border-light-border"
        }`}
      >
        <span className="flex items-center h-full gap-x-2">
          <CustomButton
            onClick={() => navigate("/")}
            className="h-full px-4 py-4 mb-2 truncate gap-x-2"
            color={isDark ? "dark-primary" : "light-primary"}
          >
            <BackIMG className="w-4 h-4" />
            <p className="hidden md:block text-sm">Home</p>
          </CustomButton>
        </span>
        <div
          className={`flex items-center justify-end gap-x-2 md:w-full rounded-lg px-2 ${
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
            className="h-full px-4 py-4 mb-2 gap-x-2"
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
            className="h-full px-4 py-4 mb-2 gap-x-2"
          >
            <GridIMG className="w-4 h-4" />
          </CustomButton>
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
        <GridContainer
          mangas={data?.data || []}
          state={null}
          notResultText={`The manga ${search} was not found.`}
        />
      ) : (
        <ListContainer
          mangas={data?.data || []}
          state={null}
          notResultText={`The manga ${search} was not found.`}
        />
      )}
    </PageContainer>
  );
};
