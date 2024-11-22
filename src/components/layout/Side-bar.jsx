import { Link } from "react-router-dom";
import HelpIcon from "../../assets/icons/help";

const navList = {
  1: "wallet",
  2: "help",
  3: "settings",
};

console.log(navList[1]);

const SideBar = ({ currActive }) => {
  return (
    <nav className="flex flex-col gap-4 p-5">
      <Link
        to={"/dashboard"}
        className={`${
          currActive == navList[1]
            ? "bg-secondary text-black"
            : "hover:bg-secondary hover:text-black text-white"
        } font-medium w-full p-2 rounded-md xsm:w-full`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label
          className={`${
            currActive === navList[1] ? "text-black" : "text-white"
          } xxsm:hidden xsm:block cursor-pointer`}
        >
          Wallet
        </label>
        <img
          src={currActive === navList[1] ? wallet : walletActive}
          className={`${
            currActive == "wallet" ? "text-black" : "text-white"
          } w-[40px] xsm:hidden xxsm:w-[40px] xxsm:h-[40px]`}
        />
      </Link>

      <Link
        className={`${
          currActive == "help"
            ? "bg-secondary text-black"
            : "hover:bg-secondary hover:text-black text-white"
        } font-medium w-full p-2 rounded-md xsm:w-full`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label
          className={`${
            currActive === navList[2] ? "text-black" : "text-white"
          } xxsm:hidden xsm:block cursor-pointer`}
        >
          Help and Support
        </label>
        <img
          src={currActive === navList[2] ? help : helpActive}
          className="w-[40px] xsm:hidden xxsm:w-[40px] xxsm:h-[40px]"
        />
      </Link>

      <Link
        to={"/settings"}
        className={`${
          currActive == navList[3]
            ? "bg-secondary text-black"
            : "hover:bg-secondary hover:text-black text-white"
        } font-medium w-full p-2 rounded-md  xsm:w-full`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label
          className={`${
            currActive === navList[3] ? "text-black" : "text-white"
          } xxsm:hidden xsm:block cursor-pointer`}
        >
          Setting
        </label>
        <img
          src={currActive === navList[3] ? setting : settingActive}
          className="w-[40px] xsm:hidden xxsm:w-[40px] xxsm:h-[40px]"
        />
      </Link>
    </nav>
  );
};

export default SideBar;
