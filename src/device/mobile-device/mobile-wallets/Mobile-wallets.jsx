import { Link } from "react-router-dom";
import MobileLayout from "../../../components/layout/mobile-layout";
import EyeIcon from "../../../assets/icons/eye";
import QrIcon from "../../../assets/icons/qr";
import SendIcon from "../../../assets/icons/send";
import SwapIcon from "../../../assets/icons/swap";
import RightAchorIcon from "../../../assets/icons/right-achor";
import UpIcon from "../../../assets/icons/up";
import DownIcon from "../../../assets/icons/down";
import Transaction from "../../../components/layout/Transaction";
import ArrowLeftIcon from "../../../assets/icons/arrow-left";
import ScanIcon from "../../../assets/icons/scan";
import MobileNav from "../../../components/layout/mobile-nav";
import DownAchorIcon from "../../../assets/icons/down-achor";

const MobileWallet = () => {
  return (
    <MobileLayout>
      <div className="w-full flex justify-between items-center p-8 py-8">
        <ArrowLeftIcon color={"currentColor"} w={24} />
        <aside className="flex gap-4">
          <h2 className="text-[1.8rem]">Wallet 2</h2>
          <DownAchorIcon w={24} color={"currentColor"} />
        </aside>

        <ScanIcon w={24} color={"currentColor"} />
      </div>

      <div className="bg-primary w-full flex flex-col justify-between overflow-y-auto">
        <section className="w-full px-[2.4rem] pt-[2.4rem] pb-[0rem] flex items-start flex-col h-fit">
          <div className="w-full flex flex-col justify-center mt-[2.4rem]">
            <div className="flex justify-center items-center gap-4">
              <p className="text-[1.4rem]">Total Balance </p>
              <EyeIcon w={18} color={"currentColor"} />
            </div>

            <div className="flex justify-center gap-[0.8rem] items-center mt-8">
              <span className="text-[3.8rem] font-bold inline mt-auto">
                1.234
              </span>
              <p className="mt-5">NAM</p>
            </div>

            <div className="flex gap-4 justify-center">
              <p className="text-secondary text-[1.5rem]">~ $65,000.00</p>
              <p className="text-secondary text-[1.5rem]">USD</p>
            </div>
          </div>

          <div className="w-full flex justify-between mt-[3rem]">
            <Link
              to={"receive"}
              className="flex flex-col justify-center items-center gap-4"
            >
              <div className="bg-[#FFC800] p-4 rounded-[.8rem]">
                <QrIcon w={24} />
              </div>
              <p className="text-[1.4rem]">Receive</p>
            </Link>

            <Link
              to={"send"}
              className="flex flex-col justify-center items-center gap-4"
            >
              <div className="bg-[#FFC800] p-4 rounded-[.8rem]">
                <SendIcon w={24} />
              </div>
              <p className="text-[1.4rem]">Send</p>
            </Link>

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
              <RightAchorIcon w={18} color={"currentColor"} />
            </div>

            <Transaction />
          </div>
        </section>
      </div>

      <MobileNav />
    </MobileLayout>
  );
};

export default MobileWallet;
