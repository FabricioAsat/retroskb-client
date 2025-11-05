export const EasyIMG = ({ className }: { className: string }) => {
  return (
    <svg
      width={800}
      height={800}
      viewBox="0 0 16 16"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <title />
      <ellipse cx={6} cy={5.5} rx={1} ry={1.5} />
      <ellipse cx={10} cy={5.5} rx={1} ry={1.5} />
      <path d="M8.071 13.071A5.076 5.076 0 0 1 3 8h1.143A3.929 3.929 0 1 0 12 8h1.143a5.077 5.077 0 0 1-5.072 5.071" />
      <path d="M8 1a7 7 0 1 1-7 7 7.01 7.01 0 0 1 7-7m0-1a8 8 0 1 0 8 8 8 8 0 0 0-8-8" />
    </svg>
  );
};
