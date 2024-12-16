import { Link } from "react-router-dom";

const BackButton = ({ link }) => {
  return (
    <Link
      to={link}
      className="text-[2.4rem] hover:text-[#ffc800] cursor-pointer hover:translate-x-[-5px] self-start top-2 xxsm:hidden"
      style={{ transition: "all 0.3s ease" }}
    >
      &larr;
    </Link>
  );
};

export default BackButton;
