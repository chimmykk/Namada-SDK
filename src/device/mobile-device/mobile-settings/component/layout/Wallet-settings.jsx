import CurrencyIcon from "../../../../../assets/icons/currency-change";
import GlobalIcon from "../../../../../assets/icons/global";

const WalletSettings = () => {
  return (
    <div className=" border-b-[0.2rem] border-[#4d4d4d] pb-8">
      <p className=" mt-8 mx-8 text-[1.8rem] font-medium">Wallet Settings</p>

      <div className="mt-8 rounded-2xl flex flex-col gap-8">
        <div className="flex gap-8 items-center pl-8">
          <div className="bg-[#FFC800] p-4 rounded-xl">
            <CurrencyIcon w={24} color={"black"} />
          </div>

          <div>
            <p className="w-full">Currency Preferences</p>
            <p className="text-[1.2rem] text-[#bbb]">NAM</p>
          </div>
        </div>

        <div className="flex gap-8 items-center pl-8">
          <div className="bg-[#FFC800] p-4 rounded-xl">
            <GlobalIcon w={24} color={"black"} />
          </div>

          <div>
            <p className="w-full">Language</p>
            <p className="text-[1.2rem] text-[#bbb]">English</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSettings;
