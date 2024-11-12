import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ currActive }) => {
  return (
    <nav className="flex flex-col gap-4 p-5 w-full max-w-[300px]">
      <Link
        to={"/dashboard"}
        className={`${
          currActive == "wallet"
            ? "bg-secondary text-black"
            : "hover:bg-secondary hover:text-black text-white"
        } font-medium w-full p-2 rounded-md `}
        style={{ transition: "all 0.3s ease" }}
      >
        Wallet
      </Link>

      <Link
        to={""}
        onClick={() => setActive("Help and Support")}
        className={`${
          currActive == "Help and Support"
            ? "bg-secondary text-black"
            : "hover:bg-secondary hover:text-black text-white"
        } font-medium w-full p-2 rounded-md `}
        style={{ transition: "all 0.3s ease" }}
      >
        Help and Support
      </Link>

      <Link
        to={"/settings"}
        onClick={() => setActive("Settings")}
        className={`${
          currActive == "Settings"
            ? "bg-secondary text-black"
            : "hover:bg-secondary hover:text-black text-white"
        } font-medium w-full p-2 rounded-md `}
        style={{ transition: "all 0.3s ease" }}
      >
        Sittings
      </Link>
    </nav>
  );
};

export default SideBar;
