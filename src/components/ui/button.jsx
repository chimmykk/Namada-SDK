const Button = ({ title, link }) => {
  return (
    <a
      href={link}
      className="bg-[#ffc800] text-black rounded-[5px] py-[10px] text-sm px-[20px] cursor-pointer m-[5px] border-2 border-[#7c151511] hover:shadow-[0px_10px_20px_rgba(0,0,0,0.3)] hover:outline outline-[2px] hover:outline-[#000105]"
      style={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
    >
      {title}
    </a>
  );
};

export default Button;
