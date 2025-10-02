import { Error, Loading, MangaSection, PageContainer } from "../components";
import type { IManga, IResponse } from "../models";
import { getMangas } from "../service/manga.service";
import { useFetch } from "../hooks";
import { groupMangasByStates } from "../utils";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export const Home = () => {
  const { data, loading, error, fetch } = useFetch<IResponse<IManga[]>, null>(
    getMangas,
    { autoFetch: true, params: null }
  );
  const [mangas, setMangas] = useState<{
    reading: IManga[];
    completed: IManga[];
    abandoned: IManga[];
    deleted: IManga[];
    onHold: IManga[];
  }>({
    reading: [],
    completed: [],
    abandoned: [],
    deleted: [],
    onHold: [],
  });

  useEffect(() => {
    if (!data?.data) return;
    const { reading, completed, abandoned, deleted, onHold } =
      groupMangasByStates(data.data);
    setMangas({ reading, completed, abandoned, deleted, onHold });
  }, [data]);

  if (loading) return <Loading />;
  if (error)
    return <Error message={error.message} fetch={async () => fetch(null)} />;

  if (
    !mangas.reading.length &&
    !mangas.onHold.length &&
    !mangas.completed.length &&
    !mangas.abandoned.length &&
    !mangas.deleted.length
  )
    return (
      <PageContainer>
        <span className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-center mt-5">
            No hay mangas disponibles
          </h2>
          <Link
            to={"/create"}
            className="font-bold cursor-pointer px-10 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-100 mt-5"
          >
            Crea tu primer manga
          </Link>
        </span>
      </PageContainer>
    );

  return (
    <PageContainer>
      <MangaSection subtitle="Leyendo" mangas={mangas.reading} />
      <MangaSection subtitle="Esperando para leer" mangas={mangas.onHold} />
      <MangaSection subtitle="Completados" mangas={mangas.completed} />
      <MangaSection subtitle="Abandonados" mangas={mangas.abandoned} />
      <MangaSection subtitle="En papelera" mangas={mangas.deleted} />
    </PageContainer>
  );
};
