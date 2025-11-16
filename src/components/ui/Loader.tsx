export const Loader = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div className="flex items-center justify-center bg-transparent gap-x-2">
      <div
        className={`w-4 h-4 rounded-full border-2 border-t-transparent animate-spin`}
      />
      {label && <p className="italic">{label}</p>}
    </div>
  );
};
