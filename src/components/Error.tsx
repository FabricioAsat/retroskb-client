import { PageContainer } from ".";

interface Props {
  message?: string;
  fetch: (param?: any) => Promise<void>;
}

export const Error = ({ message, fetch }: Props) => {
  return (
    <PageContainer>
      <div className="flex flex-col justify-center items-center mx-auto w-full max-w-lg h-full text-center">
        <p className="text-3xl font-bold text-red-500">
          {message || "Ocurrió un error"}
        </p>
        <button
          onClick={fetch}
          className="px-3 py-1.5 mt-3 bg-neutral-800 text-neutral-100 rounded-md font-bold cursor-pointer hover:bg-neutral-700"
        >
          Reintentar
        </button>
      </div>
    </PageContainer>
  );
};
