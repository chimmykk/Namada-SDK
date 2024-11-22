const Button = ({ title, link }) => {
  return (
    <a
      href={link}
      className="bg-[#ffc800] text-[#2b2b2b] text-[2rem] rounded-[0.5rem] py-[1rem] px-[1rem] cursor-pointer m-[0.5rem] border-2 border-[#7c151511] hover:shadow-[1rem_1rem_1rem_rgba(0,0,0,0.3)] hover:outline outline-[0.2rem] hover:outline-[#000105] font-normal xxsm:text-[1.8rem]"
      style={{ boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.3)" }}
    >
      {title}
    </a>
  );
};

export default Button;
