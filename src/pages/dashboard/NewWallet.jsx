import EyeIcon from "../../assets/icons/eye";
import QrIcon from "../../assets/icons/qr";
import SendIcon from "../../assets/icons/send";
import SwapIcon from "../../assets/icons/swap";
import RightAchorIcon from "../../assets/icons/right-achor";
import UpIcon from "../../assets/icons/up";
import DownIcon from "../../assets/icons/down";
import Transaction from "../../components/layout/Transaction";
import WalletIcon from "../../assets/icons/wallet";
import SettingIcon from "../../assets/icons/setting";

const NewSettings = () => {
  return (
    <div className="bg-[#2A2A2A] w-full h-screen flex flex-col justify-between">
      <section className="w-full px-[2.4rem] pt-[2.4rem] pb-[0rem] flex h-[95%] items-start flex-col">
        <div className="w-full flex justify-between items-center">
          <WalletIcon w={24} color={"white"} />
          <h2 className="text-[1.8rem]">Wallet 1</h2>
          <SettingIcon w={24} color={"white"} />
        </div>

        <div className="w-full flex flex-col justify-center mt-[2.4rem]">
          <div className="flex justify-center items-center gap-4">
            <p className="text-[1.4rem]">Total Balance </p>
            <EyeIcon w={18} />
          </div>

          <div className="flex justify-center gap-[0.8rem] items-center mt-8">
            <span className="text-[3.8rem] font-bold inline mt-auto">
              1.234
            </span>
            <p className="mt-5">NAM</p>
          </div>

          <div className="flex gap-4 justify-center">
            <p className="text-[#dddddd] text-[1.5rem]">~ $65,000.00</p>
            <p className="text-[#dddddd] text-[1.5rem]">USD</p>
          </div>
        </div>

        <div className="w-full flex justify-between mt-[3rem]">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-[#FFC800] p-4 rounded-[.8rem]">
              <QrIcon w={24} />
            </div>
            <p className="text-[1.4rem]">Receive</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-[#FFC800] p-4 rounded-[.8rem]">
              <SendIcon w={24} />
            </div>
            <p className="text-[1.4rem]">Send</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-[#FFC800] p-4 rounded-[.8rem]">
              <UpIcon w={24} />
            </div>
            <p className="text-[1.4rem]">Buy</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-[#FFC800] p-4 rounded-[.8rem]">
              <DownIcon w={24} />
            </div>
            <p className="text-[1.4rem]">Sell</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-[#FFC800] p-4 rounded-[.8rem]">
              <SwapIcon w={24} />
            </div>
            <p className="text-[1.4rem]">Swap</p>
          </div>
        </div>

        <div className="mt-[3rem] w-full mb-8">
          <div className="flex justify-start items-center gap-4">
            <p className="text-[1.8rem]">Transaction History</p>
            <RightAchorIcon w={18} color={"white"} />
          </div>

          <Transaction />
        </div>
      </section>
    </div>
  );
};

export default NewSettings;
