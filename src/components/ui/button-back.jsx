import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../assets/icons/arrow-left";

const ButtonBack = ({ to, color, w }) => {
  return (
    <Link to={to}>
      <ArrowLeftIcon color={color} w={w} />
    </Link>
  );
};

export default ButtonBack;
