import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navList = [
  "connection-and-sync",
  "wallets",
  "address-book",
  "security-and-backup",
  "privacy",
  "support",
];

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
    <div className="w-[30rem] p-[2.4rem] flex flex-col gap-[1.2rem] items-start bg-[#1e1e1e] ">
      {navList.map((items) => {
        return (
          <button
            key={items}
            onClick={() => activeHandler(items)}
            className={`${
              active === items
                ? "bg-[#ffc800]"
                : "hover:outline hover:outline-1 outline-white"
            } text-[2.4rem] p-[1rem] rounded-md cursor-pointer hover:text-black w-full text-start`}
            style={{ transition: "all 0.3s ease" }}
          >
            <label className="text-[2.4rem]">
              {items.replaceAll("-", " ")}
            </label>
          </button>
        );
      })}
    </div>
  );
};

export default SettingNav;
