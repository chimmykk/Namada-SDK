const Eth = ({ w, color }) => {
  return (
    <svg width={w} height={w} viewBox="0 0 20 20">
      <defs>
        <clipPath id="clipPath6148154647">
          <path
            transform="matrix(1 0 0 1 0 0)"
            d="M0 0L20 0L20 20L0 20L0 0Z"
            fillRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clip-path="url(#clipPath6148154647)">
        <path
          transform="matrix(1 0 0 1 0 0)"
          d="M15.9336 10.1875L10 13.8125L4.0625 10.1875L10 0L15.9336 10.1875M10 14.9766L4.0625 11.3516L10 20L15.9375 11.3516L10 14.9766"
          fillRule="nonzero"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default Eth;
