import { useState, useEffect, lazy } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="w-[250px] p-[20px] flex flex-col g-[20px] gap-2 items-start bg-[#1e1e1e]">
      <button
        onClick={() => activeHandler("connection-and-sync")}
        className={`${
          active == "connection-and-sync"
            ? "outline outline-1 outline-[#fff]"
            : ""
        } text-[16px] p-[10px] rounded-md cursor-pointer hover:bg-[#ffc800] hover:text-black w-full text-start`}
        style={{ transition: "all 0.3s ease" }}
      >
        Connection and Sync
      </button>

      <button
        onClick={() => activeHandler("wallets")}
        className={`${
          active === "wallets" ? "outline outline-1 outline-[#fff]" : ""
        } text-[16px] p-[10px] rounded-md cursor-pointer hover:bg-[#ffc800] hover:text-black w-full text-start`}
        style={{ transition: "all 0.3s ease" }}
      >
        Wallets
      </button>

      <button
        onClick={() => activeHandler("address-book")}
        className={`${
          active === "address-book" ? "outline outline-1 outline-[#fff]" : ""
        } text-[16px] p-[10px] rounded-md cursor-pointer hover:bg-[#ffc800] hover:text-black w-full text-start`}
        style={{ transition: "all 0.3s ease" }}
      >
        Address book
      </button>

      <button
        onClick={() => activeHandler("security-and-backup")}
        className={`${
          active === "security-and-backup"
            ? "outline outline-1 outline-[#fff]"
            : ""
        } text-[16px] p-[10px] rounded-md cursor-pointer hover:bg-[#ffc800] hover:text-black w-full text-start`}
        style={{ transition: "all 0.3s ease" }}
      >
        Security and backup
      </button>

      <button
        onClick={() => activeHandler("privacy")}
        className={`${
          active === "privacy" ? "outline outline-1 outline-[#fff]" : ""
        } text-[16px] p-[10px] rounded-md cursor-pointer hover:bg-[#ffc800] hover:text-black w-full text-start`}
        style={{ transition: "all 0.3s ease" }}
      >
        Privacy
      </button>

      <button
        onClick={() => activeHandler("support")}
        className={`${
          active === "support" ? "outline outline-1 outline-[#fff]" : ""
        } text-[16px] p-[10px] rounded-md cursor-pointer hover:bg-[#ffc800] hover:text-black w-full text-start`}
        style={{ transition: "all 0.3s ease" }}
      >
        Support
      </button>
    </div>
  );
};

export default SettingNav;
