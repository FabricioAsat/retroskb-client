export const CloseIMG = ({ className }: { className?: string }) => {
  return (
    <svg
      width={800}
      height={800}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="m18 18-6-6m0 0L6 6m6 6 6-6m-6 6-6 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
