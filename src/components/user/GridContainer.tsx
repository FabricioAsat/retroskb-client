import { MangaState, type IManga } from "../../models";
import { GridCard } from "./GridCard";
import { NotMangasHere } from "./NotMangasHere";

interface Props {
  mangas: IManga[];
  state: MangaState | null;
  notResultText?: string;
}

const typeColors = {
  [MangaState.Reading]: "primary",
  [MangaState.Completed]: "success",
  [MangaState.OnHold]: "warning",
  [MangaState.Dropped]: "error",
};

export const GridContainer = ({ mangas, state, notResultText }: Props) => {
  return (
    <section className="flex flex-wrap items-center justify-start w-full gap-x-3 gap-y-3">
      {mangas.length === 0 ? (
        <NotMangasHere
          title={notResultText ? notResultText : `There's no ${state} mangas`}
          description={
            state
              ? `Create a new ${state} manga`
              : `Perhaps you spelled the name incorrectly.`
          }
        />
      ) : (
        mangas.map((manga: IManga, index: number) => (
          <GridCard
            key={manga._id}
            manga={manga}
            index={index}
            colorSelected={state ? typeColors[state] : "secondary"}
          />
        ))
      )}
    </section>
  );
};
