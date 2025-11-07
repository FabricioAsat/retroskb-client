import type { IManga } from "../models";
import { MangaState } from "../models/manga.model";

export function groupMangasByStates(mangas: IManga[]) {
  const reading = mangas.filter((manga) => manga.state === MangaState.Reading);
  const completed = mangas.filter(
    (manga) => manga.state === MangaState.Completed
  );
  const abandoned = mangas.filter(
    (manga) => manga.state === MangaState.Abandoned
  );
  const deleted = mangas.filter((manga) => manga.state === MangaState.Deleted);
  const onHold = mangas.filter((manga) => manga.state === MangaState.OnHold);

  return {
    [MangaState.Reading]: reading,
    [MangaState.OnHold]: onHold,
    [MangaState.Completed]: completed,
    [MangaState.Abandoned]: abandoned,
    [MangaState.Deleted]: deleted,
  };
}
