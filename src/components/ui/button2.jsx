const Button2 = ({ title }) => {
  return (
    <button
      className="bg-[#ffc800] hover:bg-[#c69f03] hover:outline hover:outline-2 hover:outline-black text-black text-[1.6rem] px-[1.5rem] py-[.5rem] rounded-[.5rem] active:scale-95 duration-200"
      style={{
        boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
      }}
    >
      {title}
    </button>
  );
};

export default Button2;
