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
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full gap-y-3 md:gap-y-5 gap-x-5">
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
