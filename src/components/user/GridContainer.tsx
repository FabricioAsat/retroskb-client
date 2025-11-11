import { MangaState, type IManga } from "../../models";
import { groupMangasByStates } from "../../utils";
import { GridCard } from "./GridCard";
import { NotMangasHere } from "./NotMangasHere";

interface Props {
  mangas: IManga[];
  state: MangaState;
}

const typeColors = {
  [MangaState.Reading]: "primary",
  [MangaState.Completed]: "success",
  [MangaState.OnHold]: "warning",
  [MangaState.Dropped]: "error",
};

export const GridContainer = ({ mangas, state }: Props) => {
  const mangasByState = groupMangasByStates(mangas);

  return (
    <section className="flex flex-wrap items-center justify-start w-full gap-x-3 gap-y-3">
      {mangasByState[state].length === 0 ? (
        <NotMangasHere
          label={`There's no ${state} mangas.`}
          buttom={state === MangaState.Reading}
        />
      ) : (
        mangasByState[state].map((manga: IManga, index: number) => (
          <GridCard
            key={manga._id}
            manga={manga}
            index={index}
            colorSelected={typeColors[state]}
          />
        ))
      )}
    </section>
  );
};
