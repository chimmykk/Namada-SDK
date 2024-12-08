import PlusIcon from "../../../assets/icons/plus";
import MinusIcon from "../../../assets/icons/minus";
import Toggle from "../../../components/ui/toggle";
import { useState } from "react";

const SettingDashboardList = ({ prop, EnableButton }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <aside style={{ borderBottom: "1px solid #555" }}>
        <button
          onClick={() => setShow(!show)}
          className="flex w-full justify-between items-center text-[1.8rem] xxsm:text-[1.6rem] py-[1rem] text-[#ffc800]"
        >
          {prop.title}

          {show ? (
            <MinusIcon color={"#ffc800"} w={24} />
          ) : (
            <PlusIcon color={"#ffc800"} w={24} />
          )}
        </button>
      </aside>

      {show ? (
        <ul className="flex gap-4 mt-6 flex-col justify-between">
          {prop.list.map((item) => {
            return (
              <li key={item} className="flex gap-4 items-center w-full">
                <label className="xxsm:w-full">{item}</label>
                <Toggle getValue={EnableButton} id={item} />
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default SettingDashboardList;
