import { Route } from "react-router-dom";
import MobileConnectionAndSync from "../../device/mobile-device/connection-and-sync/Mobile-connection-and-sync";
import ConnectionSetting from "../../device/mobile-device/mobile-settings/Connect-setting";
import WalletSetting from "../../device/mobile-device/mobile-settings/Wallet-setting";
import SecuritySetting from "../../device/mobile-device/mobile-settings/Security-setting";
import AddressBook from "../../device/mobile-device/mobile-settings/Address-book";

const MobileMainRoutes = () => {
  return (
    <>
      <Route
        path="/mobile-connection-and-sync"
        element={<MobileConnectionAndSync />}
      />
      <Route path="/connection-setting" element={<ConnectionSetting />} />
      <Route path="/wallets-setting" element={<WalletSetting />} />
      <Route path="/security-setting" element={<SecuritySetting />} />
      <Route path="/address-wallet" element={<AddressBook />} />
    </>
  );
};

export default MobileMainRoutes;
