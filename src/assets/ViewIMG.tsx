export const ViewIMG = ({ className }: { className: string }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.77 12c0-.359-.194-.594-.582-1.066C18.768 9.21 15.636 6 12 6s-6.768 3.21-8.188 4.934c-.388.472-.582.707-.582 1.066s.194.594.582 1.066C5.232 14.79 8.364 18 12 18s6.768-3.21 8.188-4.934c.388-.472.582-.707.582-1.066M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
        fill="currentColor"
      />
    </svg>
  );
};
