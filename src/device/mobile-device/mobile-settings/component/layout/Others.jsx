import { Link } from "react-router-dom";

import LinkThree from "../../../../../assets/icons/link";
import SecurityIcon from "../../../../../assets/icons/shield";
import RightAchorIcon from "../../../../../assets/icons/right-achor";
import WalletIcon from "../../../../../assets/icons/wallet";
import SyncIcon from "../../../../../assets/icons/sync";
import LinkIcon from "../../../../../assets/icons/link";

const OthersLayout = () => {
  return (
    <div className=" border-b-[0.2rem] border-[#d3d3d3] dark:border-[#4d4d4d] pb-8">
      <p className=" mt-8 mx-8 text-[1.8rem] font-medium">Others</p>

      <div className="mt-8 rounded-2xl flex flex-col gap-8">
        <Link
          to={"mobile-connection-and-sync"}
          className="flex gap-8 items-center px-8"
        >
          <div className="p-4 rounded-xl">
            <SyncIcon w={24} color={"currentColor"} />
          </div>

          <p className="w-full">Connection and sync</p>
          <RightAchorIcon w={24} color={"currentColor"} />
        </Link>

        <Link
          to={"connection-setting"}
          className="flex gap-8 items-center px-8"
        >
          <div className="p-4 rounded-xl text-primary">
            <LinkIcon w={28} color={"currentColor"} />
          </div>

          <p className="w-full">Connect setting</p>
          <RightAchorIcon w={24} color={"currentColor"} />
        </Link>

        <Link to={"wallets-setting"} className="flex gap-8 items-center px-8">
          <div className="p-4 rounded-xl">
            <WalletIcon w={24} color={"currentColor"} />
          </div>

          <p className="w-full">Wallet Setting</p>
          <RightAchorIcon w={24} color={"currentColor"} />
        </Link>

        <Link to={"security-setting"} className="flex gap-8 items-center px-8">
          <div className="p-4 rounded-xl">
            <SecurityIcon w={24} color={"currentColor"} />
          </div>

          <p className="w-full">Security Setting</p>
          <RightAchorIcon w={24} color={"currentColor"} />
        </Link>
      </div>
    </div>
  );
};

export default OthersLayout;
