import { Error, Loading, MangaSection, PageContainer } from "../components";
import type { IManga, IResponse } from "../models";
import { getMangas } from "../service/manga.service";
import { useFetch } from "../hooks";
import { groupMangasByStates } from "../utils";

export const Home = () => {
  const { data, loading, error, fetch } = useFetch<IResponse<IManga[]>, null>(
    getMangas,
    { autoFetch: true, params: null }
  );

  if (loading) return <Loading />;
  if (error)
    return <Error message={error.message} fetch={async () => fetch(null)} />;

  const { reading, completed, abandoned, deleted, onHold } =
    groupMangasByStates(data?.data || []);

  return (
    <PageContainer>
      <MangaSection subtitle="Leyendo" mangas={reading} />
      <MangaSection subtitle="Esperando para leer" mangas={onHold} />
      <MangaSection subtitle="Completados" mangas={completed} />
      <MangaSection subtitle="Abandonados" mangas={abandoned} />
      <MangaSection subtitle="En papelera" mangas={deleted} />
    </PageContainer>
  );
};
