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
      <MangaSection subtitle="Reading" mangas={reading} />
      <MangaSection subtitle="Completed" mangas={completed} />
      <MangaSection subtitle="Abandoned" mangas={abandoned} />
      <MangaSection subtitle="Deleted" mangas={deleted} />
      <MangaSection subtitle="On Hold" mangas={onHold} />
    </PageContainer>
  );
};
