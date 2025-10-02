import type { IManga } from "../models";

import notImage from "../assets/no_image.svg";
import { useNavigate } from "react-router";

export const MangaCard = ({ manga }: { manga: IManga }) => {
  const updatedAt = new Date(manga.updated_at).toLocaleDateString();
  const navigateTo = useNavigate();

  function goToMangaDetail() {
    navigateTo(`/manga/${manga._id}`);
  }

  return (
    <div
      onClick={goToMangaDetail}
      className="flex relative gap-x-2 items-center w-52 h-64 rounded-md border-2 shadow-lg transition-all duration-300 cursor-pointer border-neutral-300 hover:scale-105 hover:shadow-neutral-800/50"
    >
      <span className="flex absolute top-0 left-0 z-10 flex-col items-end w-full">
        <small className="py-1.5 px-3 text-xs italic font-bold text-green-400 rounded-md bg-neutral-800/25 backdrop-blur-xs">
          {manga.state}
        </small>
      </span>

      <img
        src={manga.image ? `data:image/png;base64,${manga.image}` : notImage}
        alt="Manga image"
        className="object-cover absolute top-0 w-full h-full rounded-md"
      />

      <span className="flex absolute bottom-0 left-0 flex-col items-center p-2 pt-4 w-full text-center rounded-b-md backdrop-blur-xs text-neutral-100 bg-neutral-800/25">
        <h3 className="w-full font-extrabold truncate" title={manga.name}>
          {manga.name}
        </h3>

        <span className="flex justify-between items-center mt-2 w-full">
          <small
            className="px-2 py-1 text-xs font-bold rounded-md bg-neutral-800/25 text-neutral-100"
            title={"Last update: " + updatedAt}
          >
            {updatedAt}
          </small>
          <small
            className="px-2 py-1 text-xs font-bold bg-blue-400 rounded-md text-neutral-100"
            title={"Final chapter readed: " + manga.chapter}
          >
            {manga.chapter} Cap.
          </small>
        </span>
      </span>
    </div>
  );
};
