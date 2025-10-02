import { Link } from "react-router";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 w-full max-w-[1440px] mx-auto">
      <h1 className="text-2xl font-bold">Mangas Viewer</h1>

      <nav>
        <Link
          to={"/create"}
          className="px-3 py-1.5 text-neutral-800 hover:bg-neutral-300/50 bg-neutral-200/50 rounded-md"
        >
          Crear manga
        </Link>
      </nav>
    </div>
  );
};
