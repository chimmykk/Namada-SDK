import { Link } from "react-router-dom";
import HomeIcon from "../../assets/icons/home";
import WalletIcon from "../../assets/icons/wallet";
import SettingIcon from "../../assets/icons/setting";
import TrendingUpIcon from "../../assets/icons/trending-up";
import SettingActive from "../../assets/icons/setting-active";
import { useLocation } from "react-router-dom";
import { useState, useEffect, act } from "react";
import WalletActiveIcon from "../../assets/icons/wallet-active";

const MobileNav = () => {
  const [active, setActive] = useState("");

  const navList = {
    home: "/mobile-home",
    wallet: "/mobile-wallets",
    market: "/mobile-market",
    setting: "/mobile-setting",
  };

  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
    console.log(active);
  }, [active]);

  return (
    <nav className="flex justify-between items-center w-full  mt-auto border-1 px-10 py-3 bg-[#2a2a2a]">
      <ul className="flex flex-col justify-center items-center gap-2">
        <HomeIcon w={20} />
        <p className="text-[1.3rem]">Home</p>
      </ul>

      <ul className="flex flex-col justify-center items-center gap-2">
        {active === navList.wallet ? (
          <WalletActiveIcon />
        ) : (
          <WalletIcon w={20} />
        )}

        <p
          className={`${
            active === navList.wallet ? "text-[#ffc800]" : "text-[#fff]"
          } text-[1.3rem]`}
        >
          Wallet
        </p>
      </ul>

      <ul className="flex flex-col justify-center items-center gap-2">
        <TrendingUpIcon w={20} />
        <p className="text-[1.3rem]">Market</p>
      </ul>

      <Link
        to={"/mobile-setting"}
        className="flex flex-col justify-center items-center gap-2"
      >
        {active === navList.setting ? (
          <SettingActive />
        ) : (
          <SettingIcon w={20} color={"white"} />
        )}

        <p
          className={`text-[1.3rem] ${
            active === navList.setting ? "text-[#ffc800]" : ""
          }`}
        >
          Setting
        </p>
      </Link>
    </nav>
  );
};

export default MobileNav;
