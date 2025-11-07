import { NotImageIMG } from "../../assets";

export const NotImage = () => {
  return (
    <picture className="flex flex-col items-center mt-10 h-40">
      <NotImageIMG className="w-32 h-32" />
      <p>There's no image avalaible</p>
    </picture>
  );
};
