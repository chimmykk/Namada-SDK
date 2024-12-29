import { useState } from "react";

const Toggle = ({ getValue, id, state }) => {
  const [active, setActive] = useState(state);

  const activeHandler = () => {
    setActive(!active);
    getValue(!active, id);
  };

  return (
    <div
      onClick={activeHandler}
      className={`${
        active ? "bg-[#FFC800]" : "bg-[#555]"
      } relative rounded-full h-[2rem] w-[3.6rem] cursor-pointer`}
      style={{ transition: "all 0.3s ease" }}
    >
      <span
        className={`${
          active ? "right-0 bg-[#e9e9e9] " : "left-0 bg-white "
        } rounded-full h-[2rem] w-[2rem] block absolute cursor-pointer`}
        style={{ transition: "all 0.3s ease" }}
      />
    </div>
  );
};

export default Toggle;
