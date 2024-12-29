const ScanIcon = ({ w, color }) => {
  return (
    <svg width={w} height={w} viewBox="0 0 24 24" fill="none">
      <path
        d="M8.80002 2.3999H4.53336C3.35515 2.3999 2.40002 3.35503 2.40002 4.53324V8.7999M8.80002 21.5999H4.53336C3.35515 21.5999 2.40002 20.6448 2.40002 19.4666V15.1999M15.2 2.3999H19.4667C20.6449 2.3999 21.6 3.35503 21.6 4.53324V8.7999M21.6 15.1999V19.4666C21.6 20.6448 20.6449 21.5999 19.4667 21.5999H15.2M2.40002 12.0002H21.6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ScanIcon;
