const SwapIcon = ({ w, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={w}
      viewBox="0 0 32 32"
    >
      <path
        transform="matrix(1 0 0 1 6 6)"
        d="M12.8203 20L12.8203 18L16.6172 18L12.1562 13.5391L13.5781 12.1094L18 16.5312L18 12.8594L20 12.8594L20 20L12.8203 20ZM1.40625 20L0 18.5938L16.5938 2L12.8203 2L12.8203 0L20 0L20 7.14062L18 7.14062L18 3.40625L1.40625 20ZM6.375 7.76562L0 1.39062L1.39062 0L7.76562 6.375L6.375 7.76562Z"
        fill={color}
      />
    </svg>
  );
};

export default SwapIcon;
