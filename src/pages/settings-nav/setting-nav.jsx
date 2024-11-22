import { useState, useEffect, lazy } from "react";
import { useNavigate } from "react-router-dom";

import LinkIcon from "../../assets/icons/link";
import BookIcon from "../../assets/icons/book";
import WalletIcon from "../../assets/icons/wallet";
import AddressIcon from "../../assets/icons/wallet";
import SecurityBackupIcon from "../../assets/icons/security-backup";
import PrivacyIcon from "../../assets/icons/shield";
import SupportIcon from "../../assets/icons/help";
import HelpIcon from "../../assets/icons/help";

const navList = {
  1: "connection-and-sync",
  2: "wallets",
  3: "address-book",
  4: "security-and-backup",
  5: "privacy",
  6: "support",
};

const SettingNav = () => {
  const [active, setActive] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname.split("/");
    const lastPath = path[path.length - 1];
    setActive(lastPath);
  }, []);

  // Active display handler
  const activeHandler = (value) => {
    setActive(value);
    navigate("/Setting-nav/" + value);
  };

  return (
    <div className="w-[25rem] p-[2rem] flex flex-col gap-[1.2rem] items-start bg-[#1e1e1e] xxsm:p-[1rem] xxsm:w-fit">
      <button
        onClick={() => activeHandler(navList[1])}
        className={`${
          active === navList[1]
            ? "bg-[#ffc800]"
            : "hover:outline hover:outline-1 outline-white"
        } text-[1.6rem] p-[1rem] rounded-md cursor-pointer hover:text-black w-full text-start xxsm:w-fit`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label className="xxsm:hidden">Connection and Sync</label>
        <LinkIcon w={28} color={active === navList[1] ? "black" : "white"} />
      </button>

      <button
        onClick={() => activeHandler(navList[2])}
        className={`${
          active === navList[2]
            ? "bg-[#ffc800]"
            : "hover:outline hover:outline-1 outline-white"
        } text-[1.6rem] p-[1rem] rounded-md cursor-pointer hover:text-black w-full text-start xxsm:w-fit`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label className="xxsm:hidden">Wallets</label>
        <WalletIcon w={28} color={active === navList[2] ? "black" : "white"} />
      </button>

      <button
        onClick={() => activeHandler(navList[3])}
        className={`${
          active === navList[3]
            ? "bg-[#ffc800]"
            : "hover:outline hover:outline-1 outline-white"
        } text-[1.6rem] p-[1rem] rounded-md cursor-pointer hover:text-black w-full text-start xxsm:w-fit`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label className="xxsm:hidden">Address Book</label>
        <BookIcon w={28} color={active === navList[3] ? "black" : "white"} />
      </button>

      <button
        onClick={() => activeHandler(navList[4])}
        className={`${
          active === navList[4]
            ? "bg-[#ffc800]"
            : "hover:outline hover:outline-1 outline-white"
        } text-[1.6rem] p-[1rem] rounded-md cursor-pointer hover:text-black w-full text-start xxsm:w-fit`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label className="xxsm:hidden">Security and Backup</label>
        <SecurityBackupIcon
          w={28}
          fill={active === navList[4] ? "#ffc800" : "#1e1e1e"}
          color={active === navList[4] ? "black" : "white"}
        />
      </button>

      <button
        onClick={() => activeHandler(navList[5])}
        className={`${
          active === navList[5]
            ? "bg-[#ffc800]"
            : "hover:outline hover:outline-1 outline-white"
        } text-[1.6rem] p-[1rem] rounded-md cursor-pointer hover:text-black w-full text-start xxsm:w-fit`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label className="xxsm:hidden">Privacy</label>
        <PrivacyIcon w={28} color={active === navList[5] ? "black" : "white"} />
      </button>

      <button
        onClick={() => activeHandler(navList[6])}
        className={`${
          active === navList[6]
            ? "bg-[#ffc800]"
            : "hover:outline hover:outline-1 outline-white"
        } text-[1.6rem] p-[1rem] rounded-md cursor-pointer hover:text-black w-full text-start xxsm:w-fit`}
        style={{ transition: "all 0.3s ease" }}
      >
        <label className="xxsm:hidden">Support</label>
        <HelpIcon w={28} color={active === navList[6] ? "black" : "white"} />
      </button>
    </div>
  );
};

export default SettingNav;
