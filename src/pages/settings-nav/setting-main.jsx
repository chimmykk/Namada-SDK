import { useState } from "react";
import SettingNav from "./Setting-nav";

function SettingMain({ children }) {
  const [active, setActive] = useState("Connection and Sync");

  // Active display handler
  const activeHandler = (value) => {
    setActive(value);
  };

  return (
    <div className="flex w-auto max-w-[120rem] rounded-lg overflow-hidden shadow-custom-shadow bg-[#2a2a2a] xxsm:w-[90%]">
      <SettingNav />

      <div className="flex justify-start items-center p-[2rem] xsm:min-w-[45rem] xxsm:w-full xxsm:p-[1rem]">
        <div className="bg-[#2a2a2a] rounded-md p-[2rem] shadow-custom-shadow w-fit xxsm:w-full xxsm:p-[1rem]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SettingMain;
