import { NotImageIMG } from "../../assets";

export const NotImage = () => {
  return (
    <picture className="flex flex-col justify-center items-center mb-5 w-full h-full text-center">
      <NotImageIMG className="w-24 h-24" />
      <small className="text-xs italic">There's no image avalaible</small>
    </picture>
  );
};
