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
    <section className="flex flex-col items-center justify-start w-full px-2 gap-y-3 lg:gap-x-5 lg:flex-wrap lg:flex-row">
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
