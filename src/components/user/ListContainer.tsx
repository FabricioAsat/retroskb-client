import { MangaState, type IManga } from "../../models";
import { groupMangasByStates } from "../../utils";
import { ListCard } from "./ListCard";
import { NotMangasHere } from "./NotMangasHere";

interface Props {
  mangas: IManga[];
  state: MangaState;
}

const typeColors: Record<MangaState, string> = {
  [MangaState.Reading]: "primary",
  [MangaState.Completed]: "success",
  [MangaState.OnHold]: "warning",
  [MangaState.Dropped]: "error",
};

export const ListContainer = ({ mangas, state }: Props) => {
  const mangasByState = groupMangasByStates(mangas);

  return (
    <section className="flex flex-col items-center justify-start w-full px-2 gap-y-3 lg:gap-x-5 lg:flex-wrap lg:flex-row">
      {mangasByState[state].length === 0 ? (
        <NotMangasHere
          label={`There's no ${state} mangas.`}
          buttom={state === MangaState.Reading}
        />
      ) : (
        mangasByState[state].map((manga: IManga, index: number) => (
          <ListCard
            key={manga._id}
            index={index}
            manga={manga}
            colorSelected={typeColors[state]}
          />
        ))
      )}
    </section>
  );
};
