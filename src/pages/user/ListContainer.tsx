import { MangaState, type IManga } from "../../models";
import { ListCard } from "./ListCard";
import { NotMangasHere } from "./NotMangasHere";

interface Props {
  mangas: IManga[];
  state: MangaState | null;
  notResultText?: string;
}

export const ListContainer = ({ mangas, state, notResultText }: Props) => {
  return (
    <section
      className={`${
        mangas.length === 0
          ? "grid grid-cols-1 justify-items-center"
          : "grid grid-cols-1 w-full px-2 gap-y-3 md:grid-cols-2 gap-x-5 xl:grid-cols-3"
      }`}
    >
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
          <ListCard key={manga._id} index={index} manga={manga} />
        ))
      )}
    </section>
  );
};
