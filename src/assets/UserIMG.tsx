export const UserIMG = ({ className }: { className: string }) => {
  return (
    <svg
      width={800}
      height={800}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 9.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0m-.359 6.2c1.233-.536 2.85-.7 4.859-.7 2.011 0 3.63.165 4.862.7 1.343.585 2.16 1.58 2.587 2.984A1.02 1.02 0 0 1 15.974 20H3.028a1.02 1.02 0 0 1-.976-1.319c.428-1.404 1.245-2.398 2.59-2.982"
        fill="currentColor"
      />
      <path
        d="M19 3a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0V7h2a1 1 0 1 0 0-2h-2z"
        fill="currentColor"
      />
    </svg>
  );
};
