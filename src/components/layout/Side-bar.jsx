import { Link } from "react-router-dom";

const navList = {
  1: "wallet",
  2: "help",
  3: "settings",
};

const SideBar = ({ currActive }) => {
  return (
    <nav className="flex flex-col gap-4 p-[1.8rem] w-fit">
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
            currActive === navList[1] ? "text-white" : "text-white"
          } xxsm:hidden xsm:block cursor-pointer text-[1.8rem]`}
        >
          Wallet
        </label>
      </Link>

      <Link
        to={"/help-and-support"}
        className={`${
          currActive === navList[2]
            ? "bg-secondary "
            : "hover:bg-secondary hover:text-black text-white"
        } font-medium w-full p-2 rounded-md xsm:w-full `}
        style={{ transition: "all 0.3s ease" }}
      >
        <label
          className={`${
            currActive === navList[2] ? "text-white" : "text-white"
          } xxsm:hidden xsm:block cursor-pointer text-[1.8rem]`}
        >
          Help and Support
        </label>
      </Link>

      <Link
        to={"/settings"}
        className={`${
          currActive == navList[3] ? "bg-secondary " : "hover:bg-secondary"
        } text-white font-medium w-full p-2 rounded-md  xsm:w-full`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label
          className={`${
            currActive === navList[2] ? "text-white" : "text-white"
          } xxsm:hidden xsm:block cursor-pointer text-[1.8rem]`}
        >
          Settings
        </label>
      </Link>
    </nav>
  );
};

export default SideBar;
