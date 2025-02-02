const TransactionIcon = ({ w, color }) => {
  return (
    <svg
      width={w}
      height={w}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.8 7.8H16.2M7.8 12.6H16.2M5.76 3H18.24C19.1016 3 19.8 3.80589 19.8 4.8V21L17.2 19.2L14.6 21L12 19.2L9.4 21L6.8 19.2L4.2 21V4.8C4.2 3.80589 4.89844 3 5.76 3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TransactionIcon;
