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
      } relative rounded-full h-[24px] w-[50px] cursor-pointer`}
      style={{ transition: "all 0.3s ease" }}
    >
      <span
        className={`${
          active ? "right-0 outline outline-1 outline-black" : "left-0"
        } bg-white rounded-full h-[24px] w-[24px] block absolute cursor-pointer`}
        style={{ transition: "all 0.3s ease" }}
      />
    </div>
  );
};

export default Toggle;
