import { MangaState, type IManga } from "../../models";
import { ListCard } from "./ListCard";
import { NotMangasHere } from "./NotMangasHere";

interface Props {
  mangas: IManga[];
  state: MangaState | null;
  notResultText?: string;
}

const typeColors: Record<MangaState, string> = {
  [MangaState.Reading]: "primary",
  [MangaState.Completed]: "success",
  [MangaState.OnHold]: "warning",
  [MangaState.Dropped]: "error",
};

export const ListContainer = ({ mangas, state, notResultText }: Props) => {
  return (
    <section className="grid grid-cols-1 w-full px-2 gap-y-3 md:grid-cols-2 gap-x-5 xl:grid-cols-3">
      {mangas.length === 0 ? (
        <NotMangasHere
          title={
            notResultText ? notResultText : `There're no "${state}" mangas`
          }
          description={
            state
              ? `Create a new ${state} manga`
              : `Perhaps you spelled the name incorrectly.`
          }
        />
      ) : (
        mangas.map((manga: IManga, index: number) => (
          <ListCard
            key={manga._id}
            index={index}
            manga={manga}
            colorSelected={state ? typeColors[state] : "secondary"}
          />
        ))
      )}
    </section>
  );
};
