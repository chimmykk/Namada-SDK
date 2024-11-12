const BackButton = ({ link }) => {
  return (
    <a
      href={link}
      className="text-[20px] hover:text-[#ffc800] cursor-pointer hover:translate-x-[-5px] self-start absolute top-2"
      style={{ transition: "all 0.3s ease" }}
    >
      &larr;
    </a>
  );
};

export default BackButton;
