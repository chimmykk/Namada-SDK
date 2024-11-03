const Button2 = ({ title }) => {
  return (
    <button
      className="bg-[#ffc800] hover:bg-[#c69f03] hover:outline hover:outline-2 hover:outline-black text-black text-[16px] px-[15px] py-[5px] rounded-[5px] active:scale-95 duration-200"
      style={{
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
      }}
    >
      {title}
    </button>
  );
};

export default Button2;
