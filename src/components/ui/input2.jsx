const Input2 = ({ placeholder }) => {
  return (
    <input
      className="p-[10px] bg-[#333]  border-2 rounded-lg border-[#555] text-center text-white w-full box-border text-[1rem] cursor-pointer"
      placeholder={placeholder}
      type="password"
      onMouseOver={(e) => (e.target.type = "text")}
      onMouseLeave={(e) => (e.target.type = "password")}
    ></input>
  );
};

export default Input2;
