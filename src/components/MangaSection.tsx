import type { IManga } from "../models";
import { MangaCard } from "./MangaCard";

interface Props {
  subtitle: string;
  mangas: IManga[];
}

export const MangaSection = ({ subtitle, mangas }: Props) => {
  if (mangas.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold">Estado: {subtitle}</h2>
      <aside className="flex flex-wrap gap-3 mt-1 mb-5">
        {mangas.map((manga: IManga) => (
          <MangaCard key={manga._id} manga={manga} />
        ))}
      </aside>
    </div>
  );
};
