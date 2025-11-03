export const CloseIMG = ({ className }: { className?: string }) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="-5 -6 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        <path
          d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
