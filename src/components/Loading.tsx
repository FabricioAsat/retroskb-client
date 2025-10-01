import { PageContainer } from ".";

export const Loading = () => {
  return (
    <PageContainer>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="w-12 h-12 rounded-full border-4 animate-spin border-neutral-300 border-l-sky-400"></div>
        <p className="mt-1 text-sm italic text-neutral-400">Cargando...</p>
      </div>
    </PageContainer>
  );
};
