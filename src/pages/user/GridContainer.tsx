import { MangaState, type IManga } from "../../models";
import { GridCard } from "./GridCard";
import { NotMangasHere } from "./NotMangasHere";

interface Props {
  mangas: IManga[];
  state: MangaState | null;
  notResultText?: string;
}

export const GridContainer = ({ mangas, state, notResultText }: Props) => {
  return (
    <section
      className={`${
        mangas.length === 0
          ? "grid grid-cols-1 justify-items-center"
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full gap-y-3 md:gap-y-5 gap-x-5"
      }`}
    >
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
          <GridCard key={manga._id} manga={manga} index={index} />
        ))
      )}
    </section>
  );
};
