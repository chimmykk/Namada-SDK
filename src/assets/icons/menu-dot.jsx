const MenuDot = ({ w, color }) => {
  return (
    <svg
      width={w}
      height={w}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="1"
        transform="rotate(-90 12 12)"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="18"
        r="1"
        transform="rotate(-90 12 18)"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="6"
        r="1"
        transform="rotate(-90 12 6)"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MenuDot;
