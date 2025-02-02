import HomeIcon from "../../../assets/icons/home";
import WalletIcon from "../../../assets/icons/wallet";
import Transaction from "../../../assets/icons/Transaction";
import MarketIcon from "../../../assets/icons/trending-up";
import SettingIcon from "../../../assets/icons/setting";
import CopyIcon from "../../../assets/icons/copy";
import ProfileIcon from "../../../assets/icons/people";

const TabletNav = () => {
  return (
    <nav className="w-[28rem] h-fill bg-primary">
      <div className="flex gap-4 items-center h-fit py-8 px-8 bg-secondary rounded-r-[1.6rem] w-[95%] mb-12 mt-4 shadow-md">
        <aside className="bg-yellow rounded-full p-4">
          <ProfileIcon w={42} />
        </aside>

        <aside>
          <h2 className="text-[2.2rem]">Account 1</h2>
          <div className="flex gap-2">
            <p className="text-secondary text-[1.4rem]">0x1234...5678</p>
            <CopyIcon w={18} color={"#aaa"} />
          </div>
        </aside>
      </div>

      <ul className="flex gap-4 flex-col">
        <li className="flex gap-4 items-center border-r-4 border-t-4 border-b-4 p-8 rounded-r-[1.6rem] border-[#e6e6e64f] w-[90%]">
          <HomeIcon w={24} color={"currentColor"} />
          Dashboard
        </li>

        <li className="flex gap-4 items-center border-r-4 border-t-4 border-b-4 p-8 rounded-r-[1.6rem] border-[#e6e6e64f] w-[85%] bg-yellow">
          <WalletIcon w={24} color={"currentColor"} />
          Wallet
        </li>

        <li className="flex gap-4 items-center border-r-4 border-t-4 border-b-4 p-8 rounded-r-[1.6rem] border-[#e6e6e64f] w-[90%]">
          <Transaction w={24} color={"currentColor"} />
          Transaction
        </li>

        <li className="flex gap-4 items-center border-r-4 border-t-4 border-b-4 p-8 rounded-r-[1.6rem] border-[#e6e6e64f] w-[90%]">
          <MarketIcon w={24} color={"currentColor"} />
          Market
        </li>

        <li className="flex gap-4 items-center border-r-4 border-t-4 border-b-4 p-8 rounded-r-[1.6rem] border-[#e6e6e64f] w-[90%]">
          <SettingIcon w={24} color={"currentColor"} />
          Setting
        </li>
      </ul>
    </nav>
  );
};

export default TabletNav;
