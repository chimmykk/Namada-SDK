import { useState } from "react";

const Toggle = ({ getValue, id }) => {
  const [active, setActive] = useState(false);

  const activeHandler = () => {
    setActive(!active);
    getValue(!active, id);
  };

  return (
    <div
      onClick={activeHandler}
      className={`${
        active ? "bg-secondary" : "bg-[#555]"
      } relative rounded-full h-[2rem] w-[4.2rem] cursor-pointer`}
      style={{ transition: "all 0.3s ease" }}
    >
      <span
        className={`${
          active ? "right-0 outline outline-1" : "left-0"
        } bg-white rounded-full h-[2rem] w-[2rem] block absolute cursor-pointer`}
        style={{ transition: "all 0.3s ease" }}
      />
    </div>
  );
};

export default Toggle;
