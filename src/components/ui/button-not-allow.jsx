const ButtonNotAllow = ({ title, allow }) => {
  return (
    <button
      disabled={!allow}
      style={{ transition: "all 0.3s ease" }}
      className={`${
        allow
          ? "cursor-pointer hover:bg-[#c69f03] outline outline-1"
          : "cursor-not-allowed opacity-50"
      } w-full bg-[#ffc800] text-black p-[10px] rounded-md text-[14px]`}
    >
      {title}
    </button>
  );
};

export default ButtonNotAllow;
