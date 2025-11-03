import { LogoIMG } from "../../assets";

export const Logo = ({ WhitText }: { WhitText: boolean }) => {
  return (
    <picture className="flex gap-x-2 items-center select-none">
      <LogoIMG className="w-14 h-14" />
      {WhitText && (
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Retroskb</h1>
          <small className="mr-1 ml-auto text-xs italic font-semibold -translate-y-1.5">
            .back
          </small>
        </div>
      )}
    </picture>
  );
};
