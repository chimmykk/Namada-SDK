import { Link } from "react-router-dom";
import WalletIcon from "../../assets/icons/wallet";
import HelpIcon from "../../assets/icons/help";
import SettingIcon from "../../assets/icons/settings";

const navList = {
  1: "wallet",
  2: "help",
  3: "settings",
};

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
        <WalletIcon
          color={`${currActive === navList[1] ? "black" : "white"}`}
          w={32}
        />
        <label
          className={`${
            currActive === navList[1] ? "text-black" : "text-white"
          } xxsm:hidden xsm:block cursor-pointer`}
        >
          Wallet
        </label>
      </Link>

      <Link
        to={"/help-and-support"}
        className={`${
          currActive === navList[2]
            ? "bg-secondary text-black"
            : "hover:bg-secondary hover:text-black text-white"
        } font-medium w-full p-2 rounded-md xsm:w-full`}
        style={{ transition: "all 0.3s ease" }}
      >
        <HelpIcon
          color={`${currActive === navList[2] ? "black" : "white"}`}
          w={32}
        />
        <label
          className={`${
            currActive === navList[2] ? "text-black" : "text-white"
          } xxsm:hidden xsm:block cursor-pointer`}
        >
          Help and Support
        </label>
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
        <SettingIcon
          color={`${currActive === navList[3] ? "black" : "white"}`}
          w={32}
        />
        <label
          className={`${
            currActive === navList[2] ? "text-black" : "text-white"
          } xxsm:hidden xsm:block cursor-pointer`}
        >
          Settings
        </label>
      </Link>
    </nav>
  );
};

export default SideBar;
