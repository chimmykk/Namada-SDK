const BackButton = () => {
  return (
    <a
      href="/"
      className="hover:text-[#ffc800] cursor-pointer hover:translate-x-[-5px] self-start"
      style={{ transition: "color 0.3s ease, transform 0.3 ease" }}
    >
      &larr;
    </a>
  );
};

export default BackButton;
