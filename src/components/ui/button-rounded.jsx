const ButtonRounded = ({ title, active }) => {
  return active ? (
    <button
      className="bg-[#ffc800] hover:bg-[#c69f03] text-black outline outline-2 outline-black py-[10px] px-[10px] rounded-full w-full"
      onClick={() => setActive(12)}
      style={{ transition: "all 0.3s ease" }}
    >
      12 words
    </button>
  ) : (
    <button
      className="bg-[#333] hover:bg-[#c69f03] hover:outline hover:outline-2 outline-black py-[10px] px-[10px] rounded-full w-full"
      onClick={() => setActive(24)}
      style={{ transition: "all 0.3s ease" }}
    >
      24 words
    </button>
  );
};

export default ButtonRounded;
