export const HideIMG = ({ className }: { className: string }) => {
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
        d="M18.237 15.116a19.5 19.5 0 0 0 1.951-2.05c.388-.472.582-.707.582-1.066s-.194-.594-.582-1.066C18.768 9.21 15.636 6 12 6c-.84 0-1.652.171-2.423.456l2.547 2.547a3 3 0 0 1 2.874 2.873zm-8.844-4.602a3 3 0 0 0 4.093 4.092l2.301 2.303C14.636 17.555 13.353 18 12 18c-3.636 0-6.768-3.21-8.188-4.934-.388-.472-.582-.707-.582-1.066s.194-.594.582-1.066c.673-.817 1.732-1.97 3.046-2.954z"
        fill="currentColor"
      />
      <path d="m5 2 16 16" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
};
