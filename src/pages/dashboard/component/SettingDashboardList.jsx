import Toggle from "../../../components/ui/toggle";
import { useState } from "react";

const SettingDashboardList = ({ prop, EnableButton }) => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <aside style={{ borderBottom: "1px solid #555" }}>
        <button
          onClick={() => setShow(!show)}
          className="flex w-full justify-between items-center text-[1.8rem] xxsm:text-[1.6rem] py-[1rem] text-[#ffc800]"
        >
          {prop.title}
        </button>
      </aside>

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
    </div>
  );
};

export default SettingDashboardList;
