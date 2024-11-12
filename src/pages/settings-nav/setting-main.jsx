import { useState } from "react";
import ConnectionAndSync from "./Connection-and-sync";
import Wallet from "../../pages/settings-nav/wallets/wallet-main";
import AddressBook from "./Address-book";
import SecurityAndBackup from "./Security-and-backup";
import SettingNav from "./Setting-nav";

function SettingMain({ children }) {
  const [active, setActive] = useState("Connection and Sync");

  // Active display handler
  const activeHandler = (value) => {
    setActive(value);
  };

  return (
    <div className="flex w-auto max-w-[1200px] rounded-lg overflow-hidden shadow-custom-shadow bg-[#2a2a2a]">
      <SettingNav />

      <div className="flex justify-center items-center p-[20px] min-w-[450px]">
        <div className="bg-[#2a2a2a] rounded-md p-[20px] shadow-custom-shadow w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SettingMain;
