import { MangaState, type IManga } from "../../models";
import { groupMangasByStates } from "../../utils";
import { GridCard } from "./GridCard";

interface Props {
  mangas: IManga[];
  state: MangaState;
}

const typeColors = {
  [MangaState.Reading]: "primary",
  [MangaState.Completed]: "success",
  [MangaState.OnHold]: "warning",
  [MangaState.Abandoned]: "error",
  [MangaState.Deleted]: "error",
};

export const GridContainer = ({ mangas, state }: Props) => {
  const mangasByState = groupMangasByStates(mangas);

  return (
    <section className="flex flex-wrap gap-x-3 gap-y-3 justify-start items-center w-full">
      {mangasByState[state].map((manga: IManga) => (
        <GridCard
          key={manga._id}
          manga={manga}
          colorSelected={typeColors[state]}
        />
      ))}
    </section>
  );
};
