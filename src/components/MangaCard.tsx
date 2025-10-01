import type { IManga } from "../models";

export const MangaCard = ({ manga }: { manga: IManga }) => {
  return (
    <div className="flex relative gap-x-2 items-center p-2 max-w-xl rounded-md border-2 border-neutral-300">
      <h3 className="font-bold">
        {manga.name}{" "}
        <small className="capitalize text-neutral-400">
          {manga.chapter} Cap.
        </small>
      </h3>
    </div>
  );
};
