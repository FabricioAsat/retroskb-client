import { useTheme } from "../../context";
import { PageContainer } from "../globals/PageContainer";

export const MangaSkeleton = () => {
  const { isDark } = useTheme();

  return (
    <PageContainer>
      <form className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
        <span
          className={`flex justify-center col-span-1 mx-auto border-2 rounded-lg w-60 h-72 animate-pulse ${
            isDark
              ? "border-dark-border bg-dark-disabled"
              : "border-light-border bg-light-disabled"
          }`}
        ></span>

        <span className="flex flex-col w-full col-span-2 xl:pr-0 gap-y-10 md:pr-5">
          <span className="flex flex-col w-full md:flex-row gap-y-5 gap-x-5">
            <span
              className={`border-2 h-11 py-2 w-full rounded-lg px-3 font-bold animate-pulse ${
                isDark
                  ? "border-dark-border bg-dark-disabled"
                  : "border-light-border bg-light-disabled"
              }`}
            ></span>
            <span
              className={`border-2 h-11 py-2 w-full md:w-2/5 rounded-lg px-2 font-bold capitalize text-center animate-pulse ${
                isDark
                  ? "border-dark-border bg-dark-disabled"
                  : "border-light-border bg-light-disabled"
              }`}
            ></span>
          </span>

          <span className="flex flex-col w-full md:flex-row gap-y-5 gap-x-5">
            <span
              className={`border-2 animate-pulse py-2 h-11 w-full md:w-1/3 rounded-lg px-3 italic ${
                isDark
                  ? "border-dark-border bg-dark-disabled"
                  : "border-light-border bg-light-disabled"
              }`}
            ></span>
            <span
              className={`border-2 h-11 animate-pulse py-2 w-full md:w-2/3 flex gap-x-2 rounded-lg px-2 ${
                isDark
                  ? "border-dark-border bg-dark-disabled"
                  : "border-light-border bg-light-disabled"
              }`}
            ></span>
          </span>

          <span
            className={`border-2 animate-pulse py-2 w-full h-28 min-h-28 rounded-lg px-3 italic ${
              isDark
                ? "border-dark-border bg-dark-disabled"
                : "border-light-border bg-light-disabled"
            }`}
          ></span>

          <span className="flex items-start w-full gap-y-2 gap-x-5">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <span
                key={index}
                className={`border-2 animate-pulse py-2 h-11 w-28 rounded-lg px-3 font-bold ${
                  isDark
                    ? "border-dark-border bg-dark-disabled"
                    : "border-light-border bg-light-disabled"
                }`}
              ></span>
            ))}
          </span>
        </span>
      </form>
    </PageContainer>
  );
};
