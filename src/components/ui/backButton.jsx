const BackButton = ({ link }) => {
  return (
    <a
      href={link}
      className="text-[2.4rem] hover:text-[#ffc800] cursor-pointer hover:translate-x-[-5px] self-start absolute top-2 xxsm:hidden"
      style={{ transition: "all 0.3s ease" }}
    >
      &larr;
    </a>
  );
};

export default BackButton;
