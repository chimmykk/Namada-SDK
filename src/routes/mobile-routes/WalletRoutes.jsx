import { Route } from "react-router-dom";
import MobileWallet from "../../device/mobile-device/mobile-wallets/Mobile-wallets";
import Receive from "../../device/mobile-device/mobile-wallets/Receive";
import SendToken from "../../pages/Send-token";

const MobileWalletRoutes = () => {
  return (
    <>
      <Route path="" element={<MobileWallet />}></Route>
      <Route path="receive" element={<Receive />}></Route>
      <Route path="send" element={<SendToken />}></Route>
    </>
  );
};

export default MobileWalletRoutes;
