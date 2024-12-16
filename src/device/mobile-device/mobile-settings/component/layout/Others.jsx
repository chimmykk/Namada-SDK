import { Link } from "react-router-dom";

import LinkThree from "../../../../../assets/icons/link-three";
import SecurityIcon from "../../../../../assets/icons/shield";
import RightAchorIcon from "../../../../../assets/icons/right-achor";
import WalletIcon from "../../../../../assets/icons/wallet";

const OthersLayout = () => {
  return (
    <div className=" border-b-[0.2rem] border-[#4d4d4d] pb-8">
      <p className=" mt-8 mx-8 text-[1.8rem] font-medium">Others</p>

      <div className="mt-8 rounded-2xl flex flex-col gap-8">
        <Link
          to={"/connection-setting"}
          className="flex gap-8 items-center px-8"
        >
          <div className="p-4 rounded-xl">
            <LinkThree w={24} color={"white"} />
          </div>

          <p className="w-full">Connect setting</p>
          <RightAchorIcon w={24} />
        </Link>

        <Link to={"/wallets-setting"} className="flex gap-8 items-center px-8">
          <div className="p-4 rounded-xl">
            <WalletIcon w={24} color={"white"} />
          </div>

          <p className="w-full">Wallet Setting</p>
          <RightAchorIcon w={24} />
        </Link>

        <Link to={"/security-setting"} className="flex gap-8 items-center px-8">
          <div className="p-4 rounded-xl">
            <SecurityIcon w={24} color={"white"} />
          </div>

          <p className="w-full">Security Setting</p>
          <RightAchorIcon w={24} color={"white"} />
        </Link>
      </div>
    </div>
  );
};

export default OthersLayout;
