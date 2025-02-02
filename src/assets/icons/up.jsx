const UpIcon = ({ w, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={w}
      height={w}
      viewBox="0 0 32 32"
    >
      <path
        transform="matrix(1 0 0 1 6 6)"
        d="M9 20L9 3.82812L1.40625 11.4219L0 10L10 0L20 10L18.5938 11.4219L11 3.82812L11 20L9 20Z"
        fill={color}
      />
    </svg>
  );
};

export default UpIcon;
