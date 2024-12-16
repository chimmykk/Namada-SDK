import { Link } from "react-router-dom";

import SyncIcon from "../../../assets/icons/sync";
import WalletIcon from "../../../assets/icons/wallet";
import MobileLayout from "../../../components/layout/mobile-layout";
import SecurityBackupLayout from "./component/layout/Security-backup";
import SupportLayout from "../mobile-settings/component/layout/Support";
import OthersLayout from "./component/layout/Others";
import WalletSettings from "./component/layout/Wallet-settings";
import DarkModeLayout from "./component/layout/Dark-mode";
import AddressBook from "./component/layout/Address-book";
import BellIcon from "../../../assets/icons/bell";
import ArrowLeftIcon from "../../../assets/icons/arrow-left";

const NewSettings = () => {
  return (
    <>
      <MobileLayout>
        <section className="flex justify-between p-8 px-8">
          <Link to={"/mobile-wallets"}>
            <ArrowLeftIcon color={"white"} />
          </Link>
          <p className="text-[1.8rem]">Settings</p>
          <BellIcon w={24} color={"white"} />
        </section>

        <section className="h-full overflow-y-scroll">
          <div className="flex justify-between gap-6 px-10">
            <Link
              to={"/mobile-connection-and-sync"}
              className="flex flex-col items-center bg-[#2E2E2E] rounded-2xl p-6 w-full gap-2 justify-center"
            >
              <SyncIcon w={24} />
              <p className="text-center text-[1.6rem]">Connection and sync</p>
            </Link>

            <Link
              to={"/mobile-wallets"}
              className="flex flex-col items-center bg-[#2E2E2E] rounded-2xl p-6 w-full gap-2 justify-center"
            >
              <WalletIcon w={24} />
              <p className="text-center text-[1.6rem]">Wallets</p>
            </Link>
          </div>

          <DarkModeLayout />
          <AddressBook />
          <WalletSettings />
          <SecurityBackupLayout />
          <OthersLayout />
          <SupportLayout />
        </section>
      </MobileLayout>
    </>
  );
};

export default NewSettings;
