import type { IManga } from "../models";
import { MangaState } from "../models/manga.model";

export function groupMangasByStates(
  mangas: IManga[]
): Record<MangaState, IManga[]> {
  const reading = mangas.filter((manga) => manga.state === MangaState.Reading);
  const completed = mangas.filter(
    (manga) => manga.state === MangaState.Completed
  );
  const dropped = mangas.filter((manga) => manga.state === MangaState.Dropped);
  const onHold = mangas.filter((manga) => manga.state === MangaState.OnHold);

  return {
    [MangaState.Reading]: reading,
    [MangaState.OnHold]: onHold,
    [MangaState.Completed]: completed,
    [MangaState.Dropped]: dropped,
  };
}
